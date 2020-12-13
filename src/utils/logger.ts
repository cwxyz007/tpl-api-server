import { createLogger, format, transports } from 'winston'
import configs from '../config'

const { combine, timestamp, json, colorize } = format

// todo, redis
export const logger = createLogger({
  level: 'info',
  format: combine(colorize(), timestamp(), json())
})

if (configs.isDev) {
  logger.add(
    new transports.Console({
      format: format.simple()
    })
  )
}
