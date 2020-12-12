import 'reflect-metadata'
import Router, { IMiddleware } from 'koa-router'

export enum RequestMethod {
  Head = 'head',
  Options = 'options',
  Get = 'get',
  Put = 'put',
  Patch = 'patch',
  Post = 'post',
  Delete = 'delete'
}

export type Method = 'head' | 'options' | 'get' | 'put' | 'patch' | 'post' | 'delete' | RequestMethod

export enum MetaData {
  router = 'routing:router',
  routes = 'routing:routes'
}

export interface IDecoratedRoute {
  method: Method
  path: string
  key: string
  middlewares: IMiddleware[]
}

export function Route(
  method: Method,
  pathOrMiddleware?: string | IMiddleware,
  ...middlewares: IMiddleware[]
): PropertyDecorator {
  // @ts-ignore
  return function (target: any, key: string): void {
    let routes: IDecoratedRoute[] = Reflect.getMetadata(MetaData.routes, target)

    if (!routes) {
      routes = []
      Reflect.defineMetadata(MetaData.routes, routes, target)
    }

    let path = '/' + key

    if (typeof pathOrMiddleware === 'string') {
      path = pathOrMiddleware
    } else if (pathOrMiddleware) {
      middlewares.unshift(pathOrMiddleware)
    }

    routes.push({ method, path, key, middlewares })
  }
}

export function Head(path: string, ...middlewares: IMiddleware[]): PropertyDecorator
export function Head(...middlewares: IMiddleware[]): PropertyDecorator
export function Head(pathOrMiddleware?: string | IMiddleware, ...middlewares: IMiddleware[]): PropertyDecorator {
  return Route(RequestMethod.Head, pathOrMiddleware, ...middlewares)
}

export function Options(path: string, ...middlewares: IMiddleware[]): PropertyDecorator
export function Options(...middlewares: IMiddleware[]): PropertyDecorator
export function Options(pathOrMiddleware?: string | IMiddleware, ...middlewares: IMiddleware[]): PropertyDecorator {
  return Route(RequestMethod.Options, pathOrMiddleware, ...middlewares)
}

export function Get(path: string, ...middlewares: IMiddleware[]): PropertyDecorator
export function Get(...middlewares: IMiddleware[]): PropertyDecorator
export function Get(pathOrMiddleware?: string | IMiddleware, ...middlewares: IMiddleware[]): PropertyDecorator {
  return Route(RequestMethod.Get, pathOrMiddleware, ...middlewares)
}

export function Put(path: string, ...middlewares: IMiddleware[]): PropertyDecorator
export function Put(...middlewares: IMiddleware[]): PropertyDecorator
export function Put(pathOrMiddleware?: string | IMiddleware, ...middlewares: IMiddleware[]): PropertyDecorator {
  return Route(RequestMethod.Put, pathOrMiddleware, ...middlewares)
}

export function Post(path: string, ...middlewares: IMiddleware[]): PropertyDecorator
export function Post(...middlewares: IMiddleware[]): PropertyDecorator
export function Post(pathOrMiddleware?: string | IMiddleware, ...middlewares: IMiddleware[]): PropertyDecorator {
  return Route(RequestMethod.Post, pathOrMiddleware, ...middlewares)
}

export function Patch(path: string, ...middlewares: IMiddleware[]): PropertyDecorator
export function Patch(...middlewares: IMiddleware[]): PropertyDecorator
export function Patch(pathOrMiddleware?: string | IMiddleware, ...middlewares: IMiddleware[]): PropertyDecorator {
  return Route(RequestMethod.Patch, pathOrMiddleware, ...middlewares)
}

export function Delete(path: string, ...middlewares: IMiddleware[]): PropertyDecorator
export function Delete(...middlewares: IMiddleware[]): PropertyDecorator
export function Delete(pathOrMiddleware?: string | IMiddleware, ...middlewares: IMiddleware[]): PropertyDecorator {
  return Route(RequestMethod.Delete, pathOrMiddleware, ...middlewares)
}

export function Controller(prefix: string = '', ...middlewares: IMiddleware[]): ClassDecorator {
  return function (target) {
    const router = new Router({
      prefix
    })

    router.use(...middlewares)

    Reflect.defineMetadata(MetaData.router, router, target.prototype)
  }
}

export function useController(target: any) {
  const router: Router = Reflect.getMetadata(MetaData.router, target)
  const routes: IDecoratedRoute[] = Reflect.getMetadata(MetaData.routes, target)

  for (const route of routes) {
    router[route.method](route.path, ...route.middlewares, target[route.key])
  }

  return router
}
