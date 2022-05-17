import { Middleware } from '@koa/router'
import { ParameterizedContext } from 'koa'
import { z } from 'zod'
import { validate } from '../validator'

const authParams = z.object({
  username: z.string().min(4).max(20),
  password: z.string().min(8).max(20),
})

export const post: Middleware = (ctx, next) => {
  const body = ctx.request.body

  validate(authParams, body)

  return next()
}

