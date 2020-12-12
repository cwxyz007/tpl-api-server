import { createConnection } from 'typeorm'
import * as models from './models'
import configs from '../config'
import { isDatabaseModel } from './utils'
import { logger, sleep } from '../utils'

const allEntities = Object.values(models).filter((m) => isDatabaseModel(m))

async function connectDatabase() {
  await createConnection({
    ...configs.database,
    entities: allEntities,
    synchronize: true
  })
}

export async function connect(times = 10) {
  for (let idx = 0; idx < times; idx++) {
    try {
      await connectDatabase()
      break
    } catch (error) {
      logger.info(error)

      await sleep()
    }
  }
}
