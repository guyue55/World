# 阶段 4：权限与私密边界任务板

**目标：** 后端控制权限，前端只体现结果。

## 批次 4.1：公开/私密事实源边界

**目标：**
- [ ] 明确角色：public、owner、future private roles。
- [ ] 梳理 `permissions`、`visibility`、`owner-auth`。
- [ ] 确保所有公开页面只能消费公开数据或公开 surface。
- [ ] 私密档案、AI 建议、内部运营页面不能直接暴露在前端。

**改动范围（执行留痕）：**
- [ ] 数据层：建立 API 独立防线注册表，标注 `public-read` / `owner-only` 等
- [ ] 页面层：重构中间件或服务端页面鉴权拦截逻辑
- [ ] 组件层：无
- [ ] 权限边界：核心拦截逻辑梳理
- [ ] 检查脚本：新增或强化 `check:api-boundary`

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
- [ ] 建立 `/forbidden` 页面并统一文案。
- [ ] 保证空状态、不可见状态给用户一致的体验解释。
- [ ] 建立权限边界检查：禁止前端硬编码绕过权限（如靠 CSS 隐藏）。

**改动范围（执行留痕）：**
- [ ] 数据层：无
- [ ] 页面层：建立并完善 403 / 401 降级页面
- [ ] 组件层：定制无权限/需授权保护的展示外壳
- [ ] 权限边界：确认被拦截的接口能安全返回友好的降级协议
- [ ] 检查脚本：无

**不做：**
- 不向匿名用户展示含有敏感提示的弹窗，统一走标准的 Forbidden 降级。

**验收命令：**
```bash
npm run check:boundary
npm run check:routes
```
