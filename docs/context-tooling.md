# Context Tooling

本仓库的 token-saving 工作流分为两层：项目内立即可用的上下文索引，以及需要 Codex 新会话/重启后才会加载的机器级 MCP。

## 立即可用

### Repo Map

运行：

```bash
python3 scripts/context/repo_map.py
```

输出：

```text
tmp/World-repo-map.md
```

用途：

- 快速了解文件分布、扩展名分布和可提取符号。
- 在摸底、跨模块审查、排障、权限、GraphQL/API、前端路由或核心业务任务前，先生成低 token 结构视图。
- 之后用 `rg` 精读 repo map 指向的相关文件。

安全边界：

- 默认跳过 `.env*`、密钥、证书、缓存、构建产物、二进制、大文件和常见备份。
- 不把私有环境变量或 token 写入输出。
- `tmp/` 是生成产物位置，不应作为长期事实源。

### Repomix

配置文件：

```text
repomix.config.json
.repomixignore
```

有 `npx` 时运行：

```bash
NPM_CONFIG_CACHE=tmp/npm-cache npx -y repomix@latest --config repomix.config.json
```

用途：

- 生成面向 LLM 的压缩上下文包。
- 结合 token 统计判断是否需要缩小 include 范围。
- 用安全检查和 ignore 规则降低敏感文件进入上下文的风险。

安全边界：

- 不使用 Gitingest 网页处理私有仓库。
- 不把 API key、token、私有 `.env` 写进仓库。
- Repomix 输出应留在 `tmp/`，不要提交。

## 需要新开 Codex 线程或重启后生效

### Serena MCP

用途：

- 面向代码库的符号检索、跨文件定位和语义化编辑辅助。
- 适合大仓库摸底、跨模块调用链、重构前定位。

计划配置：

```toml
[mcp_servers.serena]
command = "<which serena>"
args = ["start-mcp-server", "--project-from-cwd", "--context=codex", "--open-web-dashboard=false"]
```

本机要求：

- 如果已有 `serena`，先确认 `serena start-mcp-server --help` 成功。
- 如果没有 `serena` 且有 `uv`，用 `uv tool install -p 3.13 serena-agent` 安装。
- 如果没有 `uv`，不要强行污染系统 Python；记录未配置原因。

### Context7 MCP

用途：

- 拉取第三方库和框架的最新文档上下文。
- 适合依赖 API、框架行为和版本相关问题。

计划配置：

```toml
[mcp_servers.context7]
command = "<which npx>"
args = ["-y", "@upstash/context7-mcp"]

[mcp_servers.context7.env]
NPM_CONFIG_CACHE = "<codex_home>/npm-cache"
```

本机要求：

- 先运行 `NPM_CONFIG_CACHE=tmp/npm-cache npx -y @upstash/context7-mcp --help`。
- 只有测试成功后才追加 Codex MCP 配置。

## 入口规则

对项目摸底、跨模块审查、排障、权限、GraphQL/API、前端路由或核心业务相关任务，先运行：

```bash
python3 scripts/context/repo_map.py
```

刷新 `tmp/World-repo-map.md` 后，再按 repo map 与 `rg` 精读相关文件。
