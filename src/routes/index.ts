import { Middleware } from "koa";

export const get: Middleware = (ctx) => {
  ctx.body = 'Cool!'
}
