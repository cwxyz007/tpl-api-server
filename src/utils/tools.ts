import bcrypt from 'bcrypt'

export function sleep(ts = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ts))
}

export function crypto(str: string): Promise<string> {
  return bcrypt.hash(str, 10)
}

export function compare(str: string, hash: string): Promise<boolean> {
  return bcrypt.compare(str, hash)
}
