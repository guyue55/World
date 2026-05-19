# 古月浮屿｜V1 工具链基线

> 阶段：V1
> 性质：真实构建与工程工具链收口
> 目标：让项目在真实依赖环境下可以安装、检查、构建和持续维护。

## 1. 基线文件

```text
data/tooling-baseline.json
```

## 2. 必需配置

```text
package.json
tsconfig.json
next.config.ts
eslint.config.mjs
postcss.config.mjs
.gitignore
.nvmrc
```

## 3. 必需脚本

```bash
npm run dev
npm run build
npm run lint
npm run lint:fix
npm run typecheck
npm run check:tooling
npm run check:world-core
npm run check:strict
```

## 4. 本批修复重点

```text
使用 eslint . 替代 next lint。
补齐 eslint.config.mjs。
补齐 postcss.config.mjs。
补齐 autoprefixer 开发依赖。
补齐 .gitignore 和 .nvmrc。
把工具链检查纳入 check:world-core。
```

## 5. 未执行说明

当前生成环境无法联网安装 npm 依赖，因此本批完成的是工具链配置和静态验证。下一步应在真实项目目录执行：

```bash
npm install
npm run lint
npm run typecheck
npm run build
npm run check:world-core
```
