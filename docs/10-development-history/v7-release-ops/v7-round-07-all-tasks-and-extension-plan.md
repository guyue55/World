# V7｜第七轮公开发布运营版：所有任务与扩展任务规划

## 总目标

V7 不再继续堆世界概念，而是建立公开发布、长期运营、备份回滚、证据治理和 V8 生产运维交接的完整结构闭环。

## 阶段规划

| 阶段 | 批次 | 重点 | 阶段后检查 |
|---:|---:|---|---|
| 1 | 01-04 | 发布证据与环境门禁 | `npm run check:v7-release:stage-01` + `npm run lint` |
| 2 | 05-08 | 公开运营驾驶舱与状态页 | `npm run check:v7-release:stage-02` + `npm run lint` |
| 3 | 09-12 | 长期内容运营、备份与回滚 | `npm run check:v7-release:stage-03` + `npm run lint` |
| 4 | 13-16 | 质量硬化、边界审查与 V8 交接 | `npm run check:v7-release:stage-04` + `npm run lint` |

## 扩展任务

- 发布运营驾驶舱
- 公开状态页预案
- 部署运行手册
- 回滚阶梯
- SEO 节奏
- 内容运营节奏
- 事故响应手册
- 轻量观测层
- 无障碍预算
- 性能预算
- 发布隐私守门
- AI 发布守门
- 备份恢复协议
- 版本治理协议
- V8 生产运维交接

## 不做事项

- 不声明 productionLive=true。
- 不把本地结构通过等同于真实发布。
- 不允许 AI 自动发布、删除、改权限。
- 不允许 private/family/partner/vault/sealed 内容进入公开发布包。
