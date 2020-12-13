import helmet from 'helmet'
import { Middleware } from 'koa'

import { promisify } from 'util'

/**
 *
 * @param opt HelmetOptions
 */
export function koaHelmet(opt?: any): Middleware {
  const hp = promisify(helmet(opt))

  return async (ctx, next) => {
    await hp(ctx.req, ctx.res)
    next()
  }
}
