import { Application } from './core'
import { logger } from './utils'
import configs from './config'

const app = new Application()

app
  .start(configs.app.port)
  .then(() => {
    logger.info('server started: https//localhost:9555')
  })
  .catch((err) => {
    logger.error(err)
  })
