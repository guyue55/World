# Kernel Check Usage

当前 `check:world-core` 仍保留为历史完整门禁，不在本批中直接替换。

新增轻量主线门禁：

```bash
npx tsx scripts/check-kernel-mainline-all.ts
```

它会顺序执行：

```text
scripts/check-world-kernel-mainline.ts
scripts/check-check-groups.ts
```

用途：

```text
1. 验证 WorldShell / WorldRuntimeStack 的主线边界。
2. 验证 Core Model / Runtime Rules / Presentation Projections 的边界文件存在。
3. 验证 check-groups.proposed.json 的分组结构。
4. 在不触发超长历史检查链的前提下，给日常重构提供快速反馈。
```

后续当该脚本在本地和 CI 中稳定后，再把 `package.json` 中的门禁逐步拆分为：

```text
check:core
check:runtime
check:release
check:legacy
```
