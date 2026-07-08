# MCP 协议实践笔记

Model Context Protocol 让 AI 能调用工具，而不是只能生成文本。WorldOS 只在明确受控的场景使用 MCP，避免"AI 可以做任何事"的失控感。

## 已接入的 MCP

飞书 MCP（读日程、发消息）、GitHub MCP（读 issue、看 PR）、本地文件 MCP（读 nodes.json）。owner-only 目录始终不接入。

## 一个踩坑

早期把日历 MCP 权限开得过宽，AI 一次读了整月日程，包含私人事件。之后收紧到"仅返回时间与地点"，隐私边界立即回来。

## 与 ai-prompt-hygiene 的关系

MCP 是工具入口，prompt-hygiene 是内容底线。工具再强大也必须服从底线。

## 未来方向

MCP 生态还在早期，接口每季度都在变。WorldOS 的策略是"用少量稳定的 MCP，观察生态"，等社区收敛后再增加接入。
