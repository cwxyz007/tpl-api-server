# API Server Template

前后端分离，NodeJS 后端模板。

- 所有 API 都以 `/api` 开头

## 目录

- [目录](#目录)
- [目录结构](#目录结构)

## 目录结构

- api: [Swagger OpenAPI 3.0](https://github.com/OAI/OpenAPI-Specification) 格式的 API 文档
- src:
  - config: 配置文件，分为 `development` 和 `production` 两类
  - controller: 路由，都以 `Controller` 结尾
  - service: 主要业务逻辑，服务等
  - database: 数据库连接和数据库模型等
  - middleware: 一些通用的中间件
  - utils: 工具函数
  - validator: 验证相关函数
  - router.ts: 路由入口
  - server.ts: 程序入口
