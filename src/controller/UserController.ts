import jwt from 'jsonwebtoken'
import { Controller, Get, Post } from '../router'
import { UserModel } from '../database'
import { compare, crypto } from '../utils'
import configs from '../config'
import { validator, ErrorCode } from '../validator'
import { AuthMiddleware, BasicMiddleware, TokenContent } from './typedef'
import { decodeToken, genToken } from './utils'

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
    user.password = await crypto(password)

    await user.save()
  }

  @Post()
  login: BasicMiddleware = async (ctx) => {
    const { username, password } = ctx.request.body

    validator.password(password)
    validator.username(username)

    const user = await UserModel.findOne(
      {},
      {
        where: {
          username
        },
        select: ['id', 'password']
      }
    )

    if (user && (await compare(password, user.password))) {
      ctx.body = {
        ...user,
        ...genToken({ id: user.id })
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
        const decode: TokenContent = jwt.verify(refreshToken, configs.SECRET) as any

        ctx.body = genToken({ id: decode.id })
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
