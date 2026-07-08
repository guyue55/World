# Next.js 部署经验

Next.js 15 的部署有两种典型形态：Vercel serverless 与本地 LAN standalone。WorldOS 目前专注后者，未来 Phase 15 再评估前者。

## 本地 LAN 形态

`next build` 后用 `next start` 或 standalone 输出，host 到 172.30.111.222:4320，家庭网络内任意设备可访问。中间件仍然生效，权限守门不受影响。

## 与 Vercel 的对比

Vercel 首屏更快但计费复杂，本地 LAN 零成本但访问受限。WorldOS 的选择是先自用够，再考虑公网。

## 一个坑

app router 里 `dynamic = 'force-static'` 与 `dynamicParams = true` 的组合要谨慎：前者会让所有请求走静态，后者却期望 fallback，实测冲突时以 dynamic 为准。

## 一次决定

是否升到 Next 15 canary？答案是不。稳定版够用，canary 的新特性对个人世界没有可见收益。稳定优先于新奇。
