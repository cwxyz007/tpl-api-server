import { IMiddleware } from 'koa-router'
import { decodeToken } from '../controller/utils'
import { UserModel } from '../database'

export const isAuth: IMiddleware = async (ctx, next) => {
  const token = ctx.request.header.authorization
  if (token) {
    try {
      const content = decodeToken(token.slice('Bearer '.length))

      ctx.state.user = await UserModel.findOne({ id: content.id })
    } catch (error) {
      ctx.status = 401
    }

    await next()
  } else {
    ctx.status = 401
  }
}
