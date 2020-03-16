import { AES } from 'crypto-js'

export function crypto(str: string, key: string): string {
  return AES.encrypt(str, key).toString()
}
