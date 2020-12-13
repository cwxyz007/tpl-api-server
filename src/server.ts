import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import configs from './config'
import { koaLogger, errorCatch, koaHelmet } from './middleware'
import { logger } from './utils'
import { connect } from './database'
import { router, routerResponse } from './router'

export class Application {
  app: Koa

  constructor() {
    this.app = new Koa()
    this.app.keys = configs.SECRET.split('-')

    this.init()
  }

  private init() {
    this.app.use(koaHelmet())

    this.app.use(koaLogger(logger))
    if (configs.isDev) {
      this.app.use(cors())
    }

    this.app.use(bodyParser())
    this.app.use(errorCatch)

    this.app.use(router.routes())
    this.app.use(router.allowedMethods())
    this.app.use(routerResponse())
  }

  async start(port: number) {
    await connect()

    this.app.listen(port)
  }
}

const app = new Application()

app
  .start(configs.app.port)
  .then(() => {
    logger.info(`server started: http://localhost:${configs.app.port}/api`)
  })
  .catch((err) => {
    logger.error(err)
  })
