import Router, { Middleware } from '@koa/router'
import path from 'path'
import glob from 'fast-glob'

const methods = ['get', 'post', 'put', 'del', 'all'] as const

type AllowedMethods = typeof methods[number]

export async function initRouter() {
  const router = new Router()

  const files = await glob('routes/**/*.ts', {
    cwd: __dirname,
  })

  for (const file of files) {
    const filePath = path.join(__dirname, file)

    const m: Record<AllowedMethods, Middleware> = await import(filePath)

    for (const method of methods) {
      if (m[method]) {
        let name = file.endsWith('/index.ts')
          ? file.slice('routes'.length, -'/index.ts'.length)
          : file.slice('routes'.length, -'.ts'.length)
        name = name || '/'

        console.log(`register ${name} - ${method}`)
        router[method](name, m[method])
      }
    }
  }

  return router
}
