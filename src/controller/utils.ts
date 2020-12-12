import { ErrorCode } from '../validator'
import jwt from 'jsonwebtoken'
import configs from '../config'
import { TokenContent } from './typedef'

export function ResponseJson(data: Record<string, unknown> = {}) {
  return {
    code: ErrorCode.success,
    ...data
  }
}

export function genToken(data: TokenContent) {
  return {
    accessToken: jwt.sign(data, configs.SECRET, {
      expiresIn: '2h'
    }),
    refreshToken: jwt.sign(data, configs.SECRET, {
      expiresIn: '1 day'
    })
  }
}

export function decodeToken(accessToken: string): TokenContent & { iat: number; exp: number } {
  const content = jwt.verify(accessToken, configs.SECRET)

  return content as any
}
