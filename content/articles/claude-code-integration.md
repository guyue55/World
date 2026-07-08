# Claude Code 集成经验

Claude Code 与 Codex 定位不同：Codex 更适合走 Skill 的结构化任务，Claude Code 更适合长文本的分析与判断。两者在 WorldOS 里被分开使用。

## 常见分工

代码修改、门禁编排、日常提交交给 Codex。跨仓库审查、长文档摘要、复杂 review 交给 Claude Code。切换时保留同一份工作树，避免上下文丢失。

## 一次典型场景

评估 Phase 14 收束策略时，用 Claude Code 对 src/lib 100+ 文件做整体阅读并给出"可合并候选"清单；再让 Codex 按清单做实际重构。这样两位 AI 各司其职。

## 边界

两个 AI 都不会写 owner-only 数据的提示词。permission-audit 会在调用前扫过，保证隐私不外泄。

## 一个观察

两个 AI 一起用之后，创作者的角色反而更清晰：从"写代码的人"变成"决定方向的人"。这份角色转变比工具本身的能力更值得记录。
