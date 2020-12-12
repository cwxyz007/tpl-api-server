import { promisify } from 'util'
import { createClient } from 'redis'
import configs from '../config'

const client = createClient(configs.cacheDB)

export const cache = {
  async get(key: string) {
    const val = await promisify(client.get).call(client, key)

    if (!val) return null

    return JSON.parse(val)
  },
  async set(key: string, value: any, duration = 24 * 60 * 60) {
    const val = JSON.stringify(value)

    return promisify(client.setex).call(client, key, duration, val)
  }
}
