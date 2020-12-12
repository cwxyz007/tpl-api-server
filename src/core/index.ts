import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import configs from '@/config'
import { koaLogger, errorCatch } from '../middleware'
import { logger } from '@/utils'
import { connectDatabase } from '@/database'
import { router } from '@/router'

export class Application {
  app: Koa

  constructor() {
    this.app = new Koa()
    this.app.keys = configs.SECRET.split('-')

    this.init()
  }

  private init() {
    this.app.use(koaLogger(logger))
    if (configs.debug) {
      this.app.use(cors())
    }

    this.app.use(bodyParser())
    this.app.use(errorCatch)

    this.app.use(router.routes())
    this.app.use(router.allowedMethods())
  }

  async start(port: number) {
    await connectDatabase()

    this.app.listen(port)
  }
}
