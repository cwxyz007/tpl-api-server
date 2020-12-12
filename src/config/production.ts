import { ClientOpts } from 'redis'
import { ConnectionOptions } from 'typeorm'

const databaseConfig: ConnectionOptions = {
  type: 'mysql',
  username: 'root',
  password: 'admin',
  database: 'app',
  host: 'mysql',
  port: 3306
}

const redisConf: ClientOpts = {
  host: 'redis',
  port: 6379
}

export const productionConfig = {
  database: databaseConfig,
  redisConf
}
