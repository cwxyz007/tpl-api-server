import { Middleware } from 'koa'
import { z, ZodSchema } from 'zod'

export function validate<T extends ZodSchema>(scheme: T, val: unknown): asserts val is z.infer<T> {
  return scheme.parse(val)
}

export function safeValidate<T extends ZodSchema>(scheme: T, val: unknown): val is z.infer<T> {
  return scheme.safeParse(val).success
}

/**
 * validator middleware
 * @returns
 */
export function validator(): Middleware {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      if (err instanceof z.ZodError) {
        ctx.body = {
          errors: err.format(),
        }
      } else {
        throw err
      }
    }
  }
}
