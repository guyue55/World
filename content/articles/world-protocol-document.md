# 世界协议文档

世界协议规定了古月浮屿如何被外部理解：字段命名、visibility 层级、导出格式、federation 接口。

## 五个部分

数据模型 (Node/Area/Relation/Path/Event 的字段与枚举)、可见性层级 (public/permission/owner-only)、导出格式 (Markdown+JSON 双份 zip)、Federation 协议 (公开索引可被其他世界订阅)、错误码与降级路径。

## 与 schema-evolution-log 的关系

协议是稳定层，schema 是执行层。schema 每次演化都要检查是否破坏协议兼容性。若破坏，须升 major 版本并留 ADR。

## 协议开源

Phase 12 已把协议草稿开源。任何其他个人世界只要遵循协议就可以与古月浮屿互访。

## 版本策略

协议用语义化版本 v1、v2 命名。破坏性变更升 major，前后兼容变更升 minor。每次升级都留 ADR。

## 与 Federation 的关系

协议是 Federation 的基础：两个个人世界能互访，前提是双方都实现协议 v1。
