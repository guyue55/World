# ADR-001: 选择 Next.js App Router 作为前端架构

> 状态：已采纳
> 日期：2026-05

## 背景

古月浮屿需要一种前端架构来承载个人数字世界的公开页面、私密路由和 API 端点。候选方案包括 Pages Router、App Router、Astro、Remix。

## 决策

选择 Next.js 15 App Router。

## 理由

1. **Server Components**：公开页面可在构建时静态生成，减少客户端 JavaScript，降低访问门槛
2. **文件式路由**：页面与 URL 一一对应，降低新维护者的认知成本
3. **内置 API 路由**：灯塔搜索/问答 API 不需要额外服务
4. **middleware 权限守门**：服务端拦截私密路由，不在前端硬编码权限
5. **生态成熟**：Tailwind、Framer Motion、TypeScript 均有良好集成

## 后果

- 正面：静态生成 + 服务端权限守门，安全性和性能兼得
- 负面：App Router 的缓存语义较复杂，需要 force-static / no-store 明确标注
- 负面：动态路由（[slug]）的 generateStaticParams 需要维护参数列表

## 相关

- ADR-003 权限守门策略
- ADR-005 内容门禁体系
