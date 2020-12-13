import { IMiddleware } from 'koa-router'
import { UserModel } from '../database'

export interface TokenContent {
  /**
   * user id
   */
  id: string
}

export interface UserState {
  user: UserModel
}

export type BasicMiddleware = IMiddleware

export type AuthMiddleware = IMiddleware<UserState>
