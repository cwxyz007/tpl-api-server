import { Middleware } from 'koa'
import { ResError } from '@/validator/validator'
import { ResponseJson } from '@/controller/utils'

export const errorCatch: Middleware = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    if (error instanceof ResError) {
      ctx.body = ResponseJson({
        code: error.code
      })
    } else {
      throw error
    }
  }
}
