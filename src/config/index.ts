import { ConnectionOptions } from 'typeorm'
import { ClientOpts } from 'redis'

const debug = process.env.NODE_ENV === 'development'

const dbConf: { [key: string]: ConnectionOptions } = {
  postgres: {
    type: 'postgres',
    username: 'postgres',
    password: 'admin',
    database: 'test',
    host: '127.0.0.1',
    port: 8900
  },
  mysql: {
    type: 'mysql',
    username: 'root',
    password: 'admin',
    database: 'test',
    host: '127.0.0.1',
    port: 8901
  }
}

const redisConf: ClientOpts = {
  host: '127.0.0.1',
  port: 8902
}

const configs = {
  debug,
  SECRET: '4zsvw5b1-azu4j927-4hfld2yj-imrs03rq',
  app: {
    port: 9555
  },
  registerCode: ['4zsvw5b1-azu4j927-4hfld2yj-imrs03rq'],
  database: dbConf.mysql,
  cacheDB: redisConf
}

export default configs
