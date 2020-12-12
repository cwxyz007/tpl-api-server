import { developmentConfig } from './development'
import { productionConfig } from './production'

const debug = process.env.NODE_ENV === 'development'

const baseConf = debug ? developmentConfig : productionConfig

const configs = {
  debug,
  SECRET: '4zsvw5b1-azu4j927-4hfld2yj-imrs03rq',
  app: {
    port: 9555
  },
  registerCode: ['4zsvw5b1-azu4j927-4hfld2yj-imrs03rq'],
  database: baseConf.database,
  cacheDB: baseConf.redisConf
}

export default configs
