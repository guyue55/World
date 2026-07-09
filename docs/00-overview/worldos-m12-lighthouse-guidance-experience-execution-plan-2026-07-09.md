# WorldOS M12 灯塔导览体验可感知化执行计划

## 1. 目标

灯塔不只是 FAQ、推荐列表或状态面板，而是世界中的观测站。它要让用户清楚感到：可以问路、解释、推荐、总结，但不会越权或改写世界。

## 2. 核心体验

- 问路：我在哪里，下一步去哪。
- 解释：这个节点、区域或路径为什么重要。
- 推荐：推荐公开路径和节点，并给出理由。
- 总结：只基于公开摘要。
- 边界：明确展示不能读取私密层、不能写入、不能改权限。

## 3. 执行项

- [ ] 审计当前 `/ask` 是否仍像静态推荐页。
- [ ] 强化灯塔观测站舞台：扫描、光束、公开上下文、边界环。
- [ ] 接入服务端低光运行器结果展示：intent、sources、limits、auditSummary。
- [ ] 增加中文友好的离线 / 无 key / provider disabled / 权限不足 fallback。
- [ ] 不引入真实 Provider，不读取 API key。
- [ ] 前端不硬编码权限结论，只展示后端 / 数据契约结果。
- [ ] 推荐卡必须显示推荐理由和公开来源。

## 4. 验收标准

- [ ] Lighthouse 人工体验量表“场景人格”和“权限边界”不低于 2。
- [ ] `npm run check:lighthouse` 通过。
- [ ] `npm run check:ai-provider-boundary` 通过。
- [ ] 直接调用低光运行器可返回 ask / explain / recommend / route / summarize 意图。
- [ ] `npm run release:local-rc` 通过。

## 5. 边界

- 不接真实 AI Provider。
- 不流式输出假 AI。
- 不写入世界源文件。
- 不读取 private / family / partner / vault / sealed / silent 内容。

