# TypeScript 严格模式指南

严格模式不是折磨，是把"错误发现时机"提前到写代码那一刻。WorldOS 从 Phase 1 就开了 strict，坚持了 12 个 Phase 都没关。

## 关键开关

`strict: true`、`noUncheckedIndexedAccess: true`、`exactOptionalPropertyTypes: true`。第三个最容易被误关掉，但一旦关掉，`optional` 与 `undefined` 的语义就模糊了。

## 一次典型收益

Zod schema 演化时，`exactOptionalPropertyTypes` 立即指出老数据的缺字段情况，避免了运行时崩溃。

## 与 schema-evolution-log 的关系

Schema 每次变更都会有 TS 错误陪跑：错误列表就是迁移清单，比写文档准确得多。

## 一个建议

新项目从第一行就开 strict。老项目分模块开：先把 lib/ 打开，再把 app/ 打开。逐步 strict 比一次性开更可持续。
