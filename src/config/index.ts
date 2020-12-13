import { developmentConfig } from './development'
import { productionConfig } from './production'

const isTest = process.env.NODE_EVN === 'test'

const isDev = process.env.NODE_ENV === 'development' || isTest

const baseConf = isDev ? developmentConfig : productionConfig

const configs = {
  isTest,
  isDev,
  SECRET: '4zsvw5b1-azu4j927-4hfld2yj-imrs03rq',
  app: {
    port: 9555
  },
  registerCode: ['4zsvw5b1-azu4j927-4hfld2yj-imrs03rq'],
  database: baseConf.database,
  cacheDB: baseConf.redisConf
}

export default configs
