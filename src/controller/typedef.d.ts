import { IMiddleware } from 'koa-router'

export interface TokenContent {
  /**
   * user id
   */
  id: string
}

export type BasicMiddleware = IMiddleware
