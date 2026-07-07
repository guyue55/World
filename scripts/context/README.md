# Context Tools

这些工具用于在长仓库里先拿到低 token 的结构视图，再用 `rg` 精读相关文件。

## Repo Map

刷新 Markdown 版仓库地图：

```bash
python3 scripts/context/repo_map.py
```

默认输出：

```text
tmp/World-repo-map.md
```

同时输出 JSON：

```bash
python3 scripts/context/repo_map.py --json
```

默认 JSON 输出：

```text
tmp/World-repo-map.json
```

实现边界：

- 只使用 Python 标准库。
- 优先用 `git ls-files -z` 获取已跟踪文件；非 Git 仓库会退化为遍历当前目录。
- 跳过 `.env*`、`.git/`、`node_modules/`、`dist/`、`build/`、`.next/`、虚拟环境、缓存、日志、压缩包、数据库备份、密钥、证书、二进制和大文件。
- Python 文件用 AST 提取 class/function。
- JS/TS/TSX 文件用保守正则提取 export/function/class/const/type 级符号。

建议工作流：

```bash
python3 scripts/context/repo_map.py
rg "<keyword>" src data docs scripts
```
