# WorldOS 本地截图人工复核清单

**用途：** 配合 `npm run release:local-rc` 生成的 LAN 截图，人工复核“能看但不好用”的问题。当前只覆盖 localhost / LAN IP，不作为外部 Preview / Production 证据。

## 复核入口

- LAN 报告：`docs/90-archive/reports/worldos-local-lan-rc-report.json`
- 截图目录：`docs/90-archive/reports/worldos-local-lan-rc/`
- 推荐命令：`npm run release:local-rc`

## 必看截图

- `desktop-home.png`：首页首屏入口、主 CTA、动态状态卡是否清楚。
- `desktop-paths-first-visit.png`：新手路径是否像旅程，不像链接清单。
- `desktop-node-world-manifesto.png`：正文阅读、关系星线、返回出口是否明显。
- `desktop-node-ai-lighthouse-boundary.png`：灯塔边界正文是否能解释“不读私密、不写世界”。
- `mobile-reduced-motion-home.png`：移动端入口是否无横向溢出。
- `mobile-reduced-motion-paths-first-visit.png`：低动效路径详情是否可读。
- `mobile-reduced-motion-node-world-manifesto.png`：移动端节点阅读后是否能继续探索。
- `mobile-reduced-motion-node-ai-lighthouse-boundary.png`：低动效灯塔边界是否可读。

## 复核问题

- 是否知道“我在哪里”？
- 是否知道“这里是什么”？
- 是否知道“能去哪”？
- 是否知道“如何回去”？
- 动态效果是否帮助理解，而不是遮挡正文？
- 低动效模式是否仍保留完整信息？
- 是否出现外部 Preview / Production 的误导性表达？
- 是否出现私密、家庭、伴侣、vault、sealed、silent 内容泄漏？

## 处理规则

- 发现白屏、遮挡、横向溢出、死路：必须修复后重新跑 `npm run release:local-rc`。
- 发现“能看但不好逛”：记录到下一批本地体验巡检，不用伪装成发布阻断。
- 外部 Preview / Production 仍冻结，不在本清单内验收。
