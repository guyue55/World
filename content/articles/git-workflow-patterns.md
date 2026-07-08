# Git 工作流模式

个人项目不需要 GitFlow，但需要一套自洽的分支纪律。WorldOS 用的是"主线 + 短寿命分支"。

## 分支约定

主线：main。开发分支：codex/xxx，只用于一次 Phase 或一个批次，合并后立即删。热修：hotfix/xxx，从 main 直出直入。避免长寿命特性分支，减少 rebase 成本。

## 提交规范

type(scope): 中文描述。type 从 feat/fix/chore/docs/refactor/test 选。scope 表示影响范围。中文正文让日后回看有情绪线索。

## 与 codex-commit-story 的关系

规范一旦被 Codex 稳定执行，就变成世界的呼吸节奏。每一条中文 commit 都是一次记忆锚点。

## 一个反例

曾经保留过 3 周的长寿命分支，rebase 时冲突超过 50 处。之后所有分支寿命不超过 3 天，问题消失。短寿命是节奏本身。
