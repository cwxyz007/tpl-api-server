import { ClientOpts } from 'redis'
import { ConnectionOptions } from 'typeorm'

const databaseConfig: ConnectionOptions = {
  type: 'mysql',
  username: 'root',
  password: 'admin',
  database: 'test',
  host: '127.0.0.1',
  port: 8901
}

const redisConf: ClientOpts = {
  host: 'redis',
  port: 6379
}

export const developmentConfig = {
  database: databaseConfig,
  redisConf
}
