import { IMiddleware } from 'koa-router'

export interface TokenContent {
  /**
   * wechat id
   */
  id: string
}

export type BasicMiddleware = IMiddleware
