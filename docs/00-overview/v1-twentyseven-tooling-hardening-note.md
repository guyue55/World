# 古月浮屿｜V1 第二十七批真实构建与工具链修复说明

> 本文件说明第二十七批变更：进入第一阶段 P0 收口，修复和固化真实构建前的工具链基线。

## 本次重点

第二十七批解决：

```text
Next/ESLint 脚本兼容
PostCSS/autoprefixer 依赖一致性
工具链基线数据化
真实构建命令收口
check:strict 汇总
工具链检查脚本
```

## 新增/修改

```text
package.json
eslint.config.mjs
postcss.config.mjs
.gitignore
.nvmrc
data/tooling-baseline.json
src/lib/tooling-baseline.ts
scripts/check-tooling.ts
scripts/print-tooling-report.ts
src/components/world/ToolingBaselinePanel.tsx
docs/05-engineering/v1-tooling-baseline.md
```

## 阶段判断

本批是第一阶段收口 P0 的第一步。完成后，下一步应进入真实项目目录，执行真实依赖安装和构建验证。

## 核心判断

```text
工具链是地基的一部分，
但不能反过来绑架世界。
```
