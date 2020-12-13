import { Middleware } from 'koa'
import { ErrorCode } from '../validator'

export function routerResponse(): Middleware {
  return async function (ctx, next) {
    const data = ctx.body || {}

    ctx.body = {
      code: ErrorCode.success,
      ...data
    }

    next()
  }
}
