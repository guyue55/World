# Schema 演化日志

Schema 是世界的骨架。骨架的每一次变更都会影响所有节点，因此需要日志。

## 关键变更

春季新增 lifeStage 枚举，让节点有生命周期。夏季扩展 relation.type，加入 theme/reference/sequence。夏末新增 event.summary，让事件既有 description 又有短摘要。每一次变更都伴随一次 data:audit。

## 变更纪律

新增字段默认 optional，让老数据无需迁移。扩展枚举时保留旧值，避免删除。删除字段前先跑一遍全数据 grep，确认无引用。

## 与传承协议的关系

Schema 演化日志是传承协议的关键输出：未来接手世界的人可以沿着日志理解字段的历史含义。

## 版本号策略

Schema 采用语义化版本：新增字段升 minor，破坏性变更升 major。每次 major 变更前跑一次全数据 dry-run，确保 100% 老数据可迁移。
