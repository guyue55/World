# WorldOS 备份与回滚手册

## 目的

让作者在本地改坏内容、关系、场景、脚本或配置时，可以恢复到可信状态。当前依赖 Git、导出脚本、备份脚本和 RC 证据，不建设复杂后台。

## 变更前

1. 查看工作区。

```bash
git status --short
```

2. 确认没有不理解的用户改动。
3. 大改前运行一次主线检查。

```bash
npm run check:mainline
```

## 备份

```bash
npm run export:world
npm run backup:world
```

备份产物应记录时间、范围和用途。不要把 private、vault、sealed 内容误放到公开导出。

## 回滚

优先使用 Git 回滚自己的提交，不回滚不理解的用户改动。若只是数据输入错误，优先做新的修复提交。

```bash
git log --oneline -5
git diff
```

禁止在未确认影响范围时执行破坏性命令，例如 `git reset --hard` 或批量删除。

## 失败处理

- 内容校验失败：检查节点、关系、路径、事件是否缺必填字段。
- 权限边界失败：检查事实源 visibility 与 API guard，不在前端硬编码。
- RC 失败：读取失败报告和对应日志，不改松检查。
- 截图异常：优先修 UI 遮挡、白屏、文本溢出，而不是删除检查。

## 验收

恢复后必须运行：

```bash
npm run check:mainline
npm run release:local-rc
```

只有两者通过，才认为本地世界恢复到可信状态。
