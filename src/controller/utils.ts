import jwt from 'jsonwebtoken'
import configs from '../config'
import { TokenContent } from './typedef'

export function genToken(data: TokenContent) {
  return {
    accessToken: jwt.sign(data, configs.SECRET, {
      expiresIn: '1d'
    }),
    refreshToken: jwt.sign(data, configs.SECRET, {
      expiresIn: '7d'
    })
  }
}

export function decodeToken(accessToken: string): TokenContent & { iat: number; exp: number } {
  const content = jwt.verify(accessToken, configs.SECRET)

  return content as any
}
