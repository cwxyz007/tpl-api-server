import { User } from '../../.prisma/client'
import { Middleware } from 'koa'
import jwt from 'jsonwebtoken'
import { isMatch } from 'micromatch'

declare module 'koa' {
  export interface ExtendableContext {
    user: User
  }
}

const secret = 'xxx'
// const token = jwt.sign({}, secret, { expiresIn: '1d' })

export interface AuthOption {
  /**
   * glob pattern
   */
  exclude: string[]
}

export function auth(opt: Partial<AuthOption> = {}): Middleware {
  const option: AuthOption = Object.assign(
    {
      exclude: [],
    },
    opt
  )

  return async (ctx, next) => {
    const pathname = ctx.request.path

    if (isMatch(pathname, option.exclude)) {
      return next()
    }

    const token = ctx.header.authorization || ''
    if (!token) {
      ctx.status = 403
      return
    }

    try {
      const data = jwt.decode(token)
      // todo query user info
      // ctx.user = client
    } catch (error) {
      ctx.status = 403

      ctx.body = {
        error: 'invalid token.',
      }

      return
    }

    return next()
  }
}
