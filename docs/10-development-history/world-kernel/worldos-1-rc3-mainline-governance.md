# WorldOS 1.0 RC3｜主线治理与非部署问题收束

## 背景

RC2 已经补强公开内容、路径、关系和反迷路体验，但从代码、功能、项目角度看仍有几个本地可修问题：

- 主线代码地图不够清晰，未来容易误入历史阶段线。
- 历史 V/R/R8 runtime 和脚本仍然体量很大，需要更明确的边界说明。
- 脚本入口过多，缺少长期默认入口。
- 公开内容虽已超过 30 个节点，但距离可停留、可复访的世界还需要继续补厚。
- 暂不能部署时，必须继续保持 production 状态诚实。

## 本轮目标

RC3 不新增宇宙大概念，不推进真实外部部署，而是继续解决本地可修问题：

1. 建立主线代码注册表。
2. 建立脚本分类注册表。
3. 增加主线导入和 legacy 回流检查。
4. 将公开内容推进到 50+ 节点、80+ 关系、12+ 路径。
5. 将长期脚本入口收束为 `check:mainline`、`check:content`、`check:experience:public`、`check:release:rc`、`check:legacy-boundary`。

## 完成标准

```text
publicNodes >= 50
contentBackedPublicNodes >= 50
publicPaths >= 12
relations >= 80
worldEvents >= 20
representedAreas >= 8
featuredNodes >= 14
公开主线页面不得直接 import legacy runtime
package scripts 必须提供短门禁入口
productionLive / releaseReady / cleanProductionReady 继续为 false
```

## 真实状态

RC3 只能证明本地治理、内容和门禁继续收束，仍不能证明真实上线完成。

缺口保持：

```text
真实外部 Preview URL
真实 Production URL
线上 smoke test
域名 HTTPS
Web Vitals / Accessibility 快照
人工签收
真实回滚演练
```
