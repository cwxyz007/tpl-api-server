import { Middleware } from 'koa'
import { ErrorCode, ResError } from '../validator'

export function routerResponse(): Middleware {
  return async function (ctx, next) {
    try {
      await next()
      const data = ctx.body || {}

      ctx.body = {
        code: ErrorCode.success,
        ...data
      }
    } catch (error) {
      if (error instanceof ResError) {
        ctx.body = {
          code: error.code
        }
      } else {
        throw error
      }
    }
  }
}
