# 内容迁移脚本

从旧格式往世界节点结构迁移不是一次性的：迁移的动作会反复发生，因此需要脚本而不是 checklist。

## 脚本骨架

输入：旧格式路径（可能是 markdown、csv、notion export）。输出：符合 Zod schema 的 nodes.json 片段与 content markdown。中间步骤：字段映射、slug 生成、visibility 兜底、tags 归一。

## 一次实战

把 2023 年博客的 30 篇文章迁进世界时，脚本先跑 dry-run 生成候选，再由创作者用 diff 审查，最后 apply。中间人工修正只有 5 处。

## 与 schema-evolution-log 的关系

Schema 每变一次，迁移脚本就要跟着升级一次。让脚本读 schema-version 字段是自动兼容的第一步。

## 迁移的边界

脚本只做结构转换，不做内容改写。改写留给创作者本人，因为语气与判断没法自动化。
