import Koa from 'koa'
import koaBody from 'koa-body'
import { initRouter } from './router'
import { validator } from './validator'

async function start() {
  const app = new Koa()
  const router = await initRouter()

  app
    .use(koaBody())
    .use(validator())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000)

    console.log('http://localhost:3000')
}

start()
