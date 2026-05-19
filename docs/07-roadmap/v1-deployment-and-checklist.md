# 古月浮屿｜V1 部署与检查清单

> 阶段：V1 公开世界核心版
> 性质：部署前检查与发布守门
> 目标：确保第一阶段不是只能本地运行，而是具备真实发布前的最低质量门槛。

## 1. 本地检查

```bash
npm install
npm run check
npm run check:routes
npm run typecheck
npm run build
```

## 2. 严格检查

```bash
npm run check:strict
```

`check:strict` 包含：

- 世界数据校验
- 公开构建守门
- 项目完整性检查
- 基础格式检查
- 路由文件检查
- TypeScript 类型检查

## 3. 环境变量

复制：

```bash
cp .env.example .env.local
```

设置：

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 4. 发布前必须确认

- [ ] 首页可访问
- [ ] Atlas 可访问
- [ ] Archive 可搜索
- [ ] Node 详情可打开
- [ ] Paths 详情可打开
- [ ] Timeline 有 WorldEvent
- [ ] Ask 低光可用
- [ ] Status 面板可访问
- [ ] sitemap.xml 可访问
- [ ] rss.xml 可访问
- [ ] robots.txt 可访问
- [ ] private / vault 内容没有进入公开构建

## 5. Vercel 部署建议

构建命令：

```bash
npm run build
```

输出：

```text
Next.js 默认输出
```

环境变量：

```text
NEXT_PUBLIC_SITE_URL
```

## 6. 当前不部署的能力

V1 发布时仍不包含：

- 登录系统
- 私密在线访问
- 完整 AI RAG
- 3D 世界
- Avatar
- 多人在线

这些能力必须等后续阶段边界稳定后再接入。
