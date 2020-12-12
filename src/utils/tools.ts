import { AES } from 'crypto-js'

export function crypto(str: string, key: string): string {
  return AES.encrypt(str, key).toString()
}

export function sleep(ts = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ts))
}
