import * as jwt from 'jsonwebtoken'
import { Controller, Post } from '@/decorator'
import { ResponseJson } from './utils'
import { UserModel } from '@/database'
import { crypto } from '@/utils'
import configs from '@/config'
import { validator, ErrorCode } from '@/validator'
import { IMiddleware } from 'koa-router'

@Controller('/account')
export class AccountController {
  @Post()
  register: IMiddleware = async (ctx) => {
    const { username, password, registerCode } = ctx.request.body

    validator.password(password)
    validator.username(username)
    validator.registerCode(registerCode)

    const registered = await UserModel.findOne({
      where: {
        username
      }
    })

    if (registered) {
      ctx.body = ResponseJson({
        code: ErrorCode.duplicateUsername
      })

      return
    }

    const user = new UserModel()
    user.username = username
    user.password = crypto(password, username)
    await user.save()

    ctx.body = ResponseJson()
  }

  @Post()
  login: IMiddleware = async (ctx) => {
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
      ctx.body = ResponseJson({
        accessToken: jwt.sign({ id: user.id }, configs.SECRET, {
          expiresIn: '2h'
        }),
        refreshToken: jwt.sign({ id: user.id }, configs.SECRET, {
          expiresIn: '1 day'
        })
      })
    } else {
      ctx.body = ResponseJson({ code: ErrorCode.loginFailed })
    }
  }

  @Post()
  refreshToken: IMiddleware = async (ctx) => {
    const { accessToken, refreshToken } = ctx.request.body

    if (!accessToken) {
      ctx.body = ResponseJson({ code: ErrorCode.invalidToken })
    }

    try {
      jwt.verify(accessToken, configs.SECRET)
      ctx.body = ResponseJson({
        accessToken,
        refreshToken
      })
    } catch (error) {
      try {
        const decode: any = jwt.verify(refreshToken, configs.SECRET)

        ctx.body = ResponseJson({
          accessToken: jwt.sign({ id: decode.id }, configs.SECRET, {
            expiresIn: '20s'
          }),
          refreshToken: jwt.sign({ id: decode.id }, configs.SECRET, {
            expiresIn: '1 day'
          })
        })
      } catch (error) {
        ctx.body = ResponseJson({ code: ErrorCode.invalidToken })
      }
    }
  }
}
