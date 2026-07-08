# Codex Skills 工作流实践

Codex Skills 是让 AI 稳定完成工程动作的最直接手段：给它一份 Skill 文件，它就知道从哪里开始、遵守什么纪律、在什么条件下停手。

## 在 WorldOS 中怎么用

把 SKILL.md 写在 `.codex/skills/xxx/` 下，Codex 在识别到相关话题时自动加载。技术型 Skill 优先描述边界（什么该做、什么不该做），流程型 Skill 优先给命令示例。

## 一次真实经验

给 build-web-apps 装了 frontend-app-builder Skill 之后，Codex 不再自作主张换框架，而是先读现有依赖再动手。这份稳定性比"更强的模型"更值钱。

## 与 codex-agent-workflow 的关系

Skill 是纪律，workflow 是节奏。Skill 说"做的时候要遵守什么"，workflow 说"每一步的顺序是什么"。两者一起构成 Codex 在世界里的行为约束。

## 何时不用 Skill

临时性的一次性动作不必写 Skill，直接对话即可。Skill 适合"未来还会重复"的场景，写 Skill 的成本值得摊薄。
