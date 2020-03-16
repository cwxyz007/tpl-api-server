import { createConnection } from 'typeorm'
import * as models from './models'
import configs from '@/config'
import { isDatabaseModel } from './utils'

const allEntities = Object.values(models).filter((m) => isDatabaseModel(m))

export async function connectPostgres() {
  await createConnection({
    ...configs.database,
    entities: allEntities,
    synchronize: true
  })
}
