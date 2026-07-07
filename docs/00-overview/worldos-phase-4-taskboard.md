# 阶段 4：权限与私密边界任务板

**目标：** 后端控制权限，前端只体现结果。

## 批次 4.1：公开/私密事实源边界

**目标：**
- [x] 明确角色：public、owner、future private roles。
- [x] 梳理 `permissions`、`visibility`、`owner-auth`。
- [x] 确保所有公开页面只能消费公开数据或公开 surface。
- [x] 私密档案、AI 建议、内部运营页面不能直接暴露在前端。

**改动范围（执行留痕）：**
- [x] 数据层：建立 API 独立防线注册表，标注 `public-read` / `owner-only` 等
- [x] 页面层：复核中间件和服务端页面鉴权拦截逻辑
- [x] 组件层：无新增权限组件，保持前端只体现结果
- [x] 权限边界：核心拦截逻辑已由 `worldos-permission-boundary-contract-v1.json` 固化
- [x] 检查脚本：新增 `check:permission-boundary`，并接入 `check:boundary`

**不做：**
- 暂不开发复杂的多用户 RBAC 分发后台。

**验收命令：**
```bash
npm run check:api-boundary
npm run check:public
npm run check:boundary
```

## 批次 4.2：无权限体验

**目标：**
- [x] 建立 `/forbidden` 页面并统一文案。
- [x] 保证空状态、不可见状态给用户一致的体验解释。
- [x] 建立权限边界检查：禁止前端硬编码绕过权限（如靠 CSS 隐藏）。

**改动范围（执行留痕）：**
- [x] 数据层：无新增私密数据进入公开构建
- [x] 页面层：`/forbidden` 作为统一降级页面
- [x] 组件层：使用公开替代路径，不在前端硬编码权限事实
- [x] 权限边界：owner-only API 返回 403 JSON，私密/内部页面由路由边界拦截
- [x] 检查脚本：由 `check:permission-boundary` 和 `check:api-boundary` 覆盖

**不做：**
- 不向匿名用户展示含有敏感提示的弹窗，统一走标准的 Forbidden 降级。

**验收命令：**
```bash
npm run check:boundary
npm run check:routes
```
