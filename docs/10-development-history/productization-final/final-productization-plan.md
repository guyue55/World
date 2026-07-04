# WorldOS v1.0 产品化最终推进计划

## 目标

把当前“产品化入口 + 路由守门”基线继续推进为更可用、更清晰、更适合上线验收的公开世界体验。

## 执行原则

- 前台只暴露公开世界主路径，不暴露阶段线、治理线、私密层和内部审计面板。
- 权限边界优先由 `middleware`、公开索引和构建门禁控制，前端只做体验表达。
- 保持入口清澈、深处浩瀚，避免重新堆叠 R8.x 动态宇宙组件。
- 保留真实状态说明，不把本地构建产物验证伪装成真实生产上线。

## 批次计划

### 批次 1：公开路径收束

- 将 `/paths` 纳入产品公开路由体系。
- 移除 `/paths` 页面中仍残留的 R8.x 动态宇宙组件。
- 改为清晰的路径导览页：当前位置、边界说明、路径卡片和归途。

### 批次 2：复访与模式体验

- 在 `WorldShell` 中加入轻量本地旅程记录。
- 支持继续上次旅程。
- 支持世界 / 现实 / 静读模式切换。
- 该功能只使用浏览器本地状态，不产生服务端写入。

### 批次 3：产品门禁增强

- 扩展 `check:product-release` 覆盖 `/paths` 和本地旅程组件。
- 确认公开入口不再引用 R8.x 动态宇宙组件。
- 继续验证 sitemap / robots / middleware 边界。

### 批次 4：质量门禁、提交与打包

- 复跑产品门禁、lint、typecheck、项目检查、路由检查、构建产物验证和 audit。
- 及时提交 Git，使用中文注释 commit。
- 输出完整全量包、变更文件包、manifest 和交付说明。

## 完成标准

- `npm run check:product-release` 通过。
- `npm run lint` 通过。
- `npm run typecheck` 通过。
- `npm run check` 通过。
- `npm run check:routes` 通过。
- `npm run build` 通过产物验证包装器。
- `npm run build:verify-artifacts` 通过。
- `npm run audit:report` 生成报告。
- Git 工作区在提交后保持干净。
