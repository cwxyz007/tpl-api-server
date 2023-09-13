import { Middleware } from 'koa'
import { ZodSchema, z } from 'zod'
import { validate } from '../validator'

interface IListener<T extends ZodSchema> {
  (query: z.infer<T>, ctx: Parameters<Middleware>['0']): any
}

const DEFAULT_STATUS = 404

export function defGet<T extends ZodSchema>(listener: IListener<T>): Middleware
export function defGet<T extends ZodSchema>(querySchema: T, listener: IListener<T>): Middleware
export function defGet<T extends ZodSchema>(
  schemaOrListener: T | IListener<T>,
  listener?: IListener<T>
): Middleware {
  if (typeof schemaOrListener === 'function') {
    const g: Middleware = async (ctx) => {
      const params = ctx.request.query

      const resp = await schemaOrListener(params, ctx)
      if (ctx.status === DEFAULT_STATUS) ctx.body = resp
    }

    return g
  }

  const g: Middleware = async (ctx) => {
    const params = ctx.request.query
    validate(schemaOrListener, params)

    const resp = await listener?.(params, ctx)
    if (ctx.status === DEFAULT_STATUS) ctx.body = resp
  }

  return g
}

export function defPost<T extends ZodSchema>(listener: IListener<T>): Middleware
export function defPost<T extends ZodSchema>(bodySchema: T, listener: IListener<T>): Middleware
export function defPost<T extends ZodSchema>(
  schemaOrListener: T | IListener<T>,
  listener?: IListener<T>
) {
  if (typeof schemaOrListener === 'function') {
    const g: Middleware = async (ctx) => {
      const params = ctx.request.body

      const resp = await schemaOrListener(params, ctx)
      if (ctx.status === DEFAULT_STATUS) ctx.body = resp
    }

    return g
  }

  const g: Middleware = async (ctx) => {
    const params = ctx.request.body
    validate(schemaOrListener, params)

    const resp = await listener?.(params, ctx)
    if (ctx.status === DEFAULT_STATUS) ctx.body = resp
  }

  return g
}
