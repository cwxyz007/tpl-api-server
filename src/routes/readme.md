## 文件式路由

示例

### `user.ts`

```ts
import { Middleware } from 'koa'

export const get: Middleware = (ctx) => {
  ctx.body = 'Cool!'
}

export const post: Middleware = (ctx) => {
  ctx.body = 'Cool!'
}
```

此文件，会注册两个路由，分别为 `[GET] /user` 和 `[POST] /user`

### `user/index.ts`

```ts
import { Middleware } from 'koa'

export const get: Middleware = (ctx) => {
  ctx.body = 'Cool!'
}

export const post: Middleware = (ctx) => {
  ctx.body = 'Cool!'
}
```

此文件，会注册两个路由，分别为 `[GET] /user/` 和 `[POST] /user/`，注意结尾和上面不一样。

### `user/:id.ts`

```ts
import { Middleware } from 'koa'

export const get: Middleware = (ctx) => {
  ctx.body = 'Cool!'
}

export const post: Middleware = (ctx) => {
  ctx.body = 'Cool!'
}
```

此文件，会注册两个路由，分别为 `[GET] /user/:id` 和 `[POST] /user/:id`
