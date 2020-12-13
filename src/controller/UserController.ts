import * as jwt from 'jsonwebtoken'
import { Controller, Get, Post } from '../router'
import { UserModel } from '../database'
import { crypto } from '../utils'
import configs from '../config'
import { validator, ErrorCode } from '../validator'
import { AuthMiddleware, BasicMiddleware } from './typedef'
import { decodeToken } from './utils'

export const isAuth: AuthMiddleware = async (ctx, next) => {
  const token = ctx.request.header.authorization
  if (token) {
    try {
      const content = decodeToken(token.slice('Bearer '.length))

      const user = await UserModel.findOne({ id: content.id })

      if (user) {
        ctx.state.user = user
      } else {
        ctx.status = 401
      }
    } catch (error) {
      ctx.status = 401
    }

    await next()
  } else {
    ctx.status = 401
  }
}

@Controller('/user')
export class UserController {
  @Post()
  register: BasicMiddleware = async (ctx) => {
    const { username, password, registerCode, nickName } = ctx.request.body

    validator.username(username)
    validator.password(password)
    validator.registerCode(registerCode)

    const registered = await UserModel.findOne({
      where: {
        username
      }
    })

    if (registered) {
      ctx.body = {
        code: ErrorCode.duplicateUsername
      }

      return
    }

    const user = new UserModel()
    user.username = username
    user.nickName = nickName
    user.password = crypto(password, username)

    await user.save()
  }

  @Post()
  login: BasicMiddleware = async (ctx) => {
    const { username, password } = ctx.request.body

    validator.password(password)
    validator.username(username)

    const user = await UserModel.findOne({
      where: {
        username,
        password: crypto(password, username)
      }
    })

    if (user) {
      ctx.body = {
        ...user,
        accessToken: jwt.sign({ id: user.id }, configs.SECRET, {
          expiresIn: '2h'
        }),
        refreshToken: jwt.sign({ id: user.id }, configs.SECRET, {
          expiresIn: '1 day'
        })
      }
    } else {
      ctx.body = { code: ErrorCode.loginFailed }
    }
  }

  @Post()
  refreshToken: BasicMiddleware = async (ctx) => {
    const { accessToken, refreshToken } = ctx.request.body

    if (!accessToken) {
      ctx.body = { code: ErrorCode.invalidToken }
    }

    try {
      jwt.verify(accessToken, configs.SECRET)
      ctx.body = {
        accessToken,
        refreshToken
      }
    } catch (error) {
      try {
        const decode: any = jwt.verify(refreshToken, configs.SECRET)

        ctx.body = {
          accessToken: jwt.sign({ id: decode.id }, configs.SECRET, {
            expiresIn: '20s'
          }),
          refreshToken: jwt.sign({ id: decode.id }, configs.SECRET, {
            expiresIn: '1 day'
          })
        }
      } catch (error) {
        ctx.body = { code: ErrorCode.invalidToken }
      }
    }
  }
}

@Controller('/user', isAuth)
export class UserAuthController {
  @Get()
  info: AuthMiddleware = async (ctx) => {
    ctx.body = ctx.state.user
  }
}
