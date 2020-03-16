import { Middleware } from 'koa'
import * as winston from 'winston'

export function koaLogger(logger: winston.Logger): Middleware {
  return async (ctx, next) => {
    const start = new Date()
    await next()
    const end = new Date()

    const message =
      `${start.toLocaleDateString()}T${start.toLocaleTimeString()} ` +
      `[${ctx.method}](${end.getTime() - start.getTime()} ms)  ${ctx.originalUrl} ` +
      `${JSON.stringify(ctx.request.body)} => ${JSON.stringify(ctx.response.body)}`

    logger.info(message)
  }
}
