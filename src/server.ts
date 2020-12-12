import { Application } from './core'
import { logger } from './utils'
import configs from './config'

const app = new Application()

app
  .start(configs.app.port)
  .then(() => {
    logger.info(`server started: http://localhost:${configs.app.port}/api`)
  })
  .catch((err) => {
    logger.error(err)
  })
