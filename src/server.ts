import { Application } from './core'
import { logger } from './utils'
import configs from './config'

const app = new Application()

app
  .start(configs.app.port)
  .then(() => {
    logger.info('server started: http://localhost:9555/api')
  })
  .catch((err) => {
    logger.error(err)
  })
