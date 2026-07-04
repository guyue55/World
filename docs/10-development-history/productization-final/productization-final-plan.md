# WorldOS v1.0 产品化上线收束计划

## 目标

把 R8.9 后的产品化基线继续推进为更适合公开访问的运行态：入口更清晰、边界由服务端控制、搜索引擎只索引产品级路由，状态页不暴露 R8.x 内部组件。

## 本轮原则

- 不再新增宇宙层、运行时层或阶段线。
- 对外只保留产品主路径：入口、地图、时间、档案、灯塔、宪章、状态。
- 私密与内部入口由 middleware 在服务端侧拦截；前端只做可见性体现。
- 保留历史页面文件，但从导航、sitemap、robots 与中间件层面隔离，避免破坏历史交付物。
- 所有说明与入口中文优先，降低首次访问理解成本。

## 执行项

1. 新增 `src/lib/product-routes.ts`，集中定义公开路由、深层公开前缀、旧入口重定向、私密入口与内部路由模式。
2. 新增 `middleware.ts`，对旧入口做 308 重定向，对私密入口和内部阶段入口做服务端重定向。
3. 修正 `sitemap.ts`，移除 R2/R3/R5/R8 阶段页和 skeleton 等非产品路由。
4. 修正 `robots.ts`，统一使用产品私密路由注册表。
5. 改造首页、状态页、403、404 和路由引导组件，去掉工程化英文标签和内部组件暴露。
6. 增加跳过导航链接、焦点样式和 reduced-motion 降级。
7. 增强 `check:product-release`，把 middleware、sitemap、robots、状态页与禁止 token 纳入门禁。
8. 复跑 `check:product-release / lint / typecheck / check / check:routes / build / build:verify-artifacts / audit:report`。

## 完成标准

- 主导航只暴露产品级公开入口。
- sitemap 不再包含阶段线或私密入口。
- 私密和内部入口不能靠前端隐藏，而是由 middleware 做路由守门。
- 状态页变成公开运行态说明，不再渲染 R8.x 动态宇宙组件。
- 所有本地门禁通过；真实 productionLive 仍需外部部署与人工签收证明。
