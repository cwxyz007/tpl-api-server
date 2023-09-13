import Koa from 'koa'
import koaBody from 'koa-body'
import { initRouter } from './router/generator'
import { validator } from './validator'

async function start() {
  const app = new Koa()
  const router = await initRouter()

  const port = 3000

  app
    .use(koaBody())
    .use(validator())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(port, () => console.log(`http://127.0.0.1:${port}`))
}

start()
