# Mac 日常开发环境

让一台 Mac 常年保持可写作、可开发、可实验的状态并不容易，需要一份最低但完整的配置清单。

## 最小基座

Homebrew 装 node、python@3.12、git、rg、fd、fzf、zoxide、starship。npm 装 pnpm 与 tsx。Python 用 uv 管理虚拟环境。Codex CLI 常驻，作为主要 AI 伙伴。

## 工作面约定

iTerm 三个 tab：项目、Codex、通用工作。Alfred 或 Raycast 作为跳转入口。Screen Studio 用于偶尔的录屏。相机与麦克风默认关闭，需要用时才启用。

## 与终端优先的关系

环境干净是终端优先的前置条件。桌面越乱、菜单栏图标越多，越难保持在一个黑底白字里工作。

## 维护频率

每季度 brew cleanup 一次，节点管理器不轻易换。稳定的环境比先进的工具重要。
