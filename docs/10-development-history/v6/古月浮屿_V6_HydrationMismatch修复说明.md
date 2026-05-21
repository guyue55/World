# 古月浮屿｜V6 Hydration Mismatch 修复说明

## 问题

运行时报错：

```text
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties.
<html lang="zh-CN" - data-immersive-translate-page-theme="light">
```

根因是浏览器扩展在 React hydration 前向 `<html>` 注入了：

```text
data-immersive-translate-page-theme="light"
```

这类属性不是应用自身 SSR 输出，因此服务端 HTML 与客户端初始 DOM 属性出现差异。

## 修复

修改：

```text
src/app/layout.tsx
```

从：

```tsx
<html lang="zh-CN">
```

改为：

```tsx
<html lang="zh-CN" suppressHydrationWarning>
```

同时保留：

```tsx
<body suppressHydrationWarning>
```

## 为什么这样修

```text
body 之前已处理扩展注入 body 属性的问题。
本次错误发生在 html 根节点，因此需要在 html 上也启用 suppressHydrationWarning。
不把 data-immersive-translate-page-theme 写死进业务代码，避免绑定特定浏览器扩展。
```

## 同步修复

```text
scripts/check-v6-24.ts
```

修正了第 24 批检查脚本的旧规则：当 V6 已有本地工程证据、build 87/87 已通过时，允许 `v7FormalDevelopmentAllowed: true`。

## 验证结果

```text
npm install: already-present
npm run lint: passed
npm run typecheck: passed
npm run check:v6:all: passed
npm run check:v6:real-implementation: passed
npm run build: passed
Next static pages: 87 / 87
JSON parse check: passed
Required files check: passed
```

## 变更文件

```text
data/v6/v6-hydration-extension-fix.json
docs/61-v6/hydration-extension-fix.md
scripts/check-v6-24.ts
src/app/layout.tsx
tsconfig.tsbuildinfo
```

## 说明

该修复面向浏览器扩展导致的根节点属性不一致，不会掩盖普通业务组件内部的真实 hydration 错误。
