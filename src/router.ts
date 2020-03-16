import KoaRouter from 'koa-router'
import { useController } from '@/decorator'
import { controllers } from '@/controller'

export const router = new KoaRouter({ prefix: '/api' })

function useRouter(target: any) {
  const r = useController(target)

  return [r.routes(), r.allowedMethods()]
}

for (const c of controllers) {
  router.use(...useRouter(c))
}
