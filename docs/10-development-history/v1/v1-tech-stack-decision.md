# 古月浮屿｜V1 技术栈决策文档

> 阶段：V1｜公开世界核心版  
> 性质：技术选型冻结文件 / Tech Stack Decision Record  
> 目标：冻结第一阶段技术栈，避免开发中因工具、框架、AI、数据库、3D 等选择反复摇摆。  
> 核心原则：**静态优先、协议先行、无 AI 可运行、AI 可插拔、公开与私密隔离、数据可导出。**

---

## 1. 决策结论

V1 技术栈冻结为：

```text
Next.js
React
TypeScript
Tailwind CSS
Framer Motion
MDX / Markdown
JSON 数据协议
Fuse.js 或 Pagefind 本地搜索
Vercel / Cloudflare Pages 静态部署
```

V1 暂不引入：

```text
数据库后台
复杂 CMS
完整 AI RAG
多用户权限系统
Three.js 3D 宇宙
复杂私密在线访问系统
评论 / 社交系统
```

---

## 2. 技术路线一句话

```text
用 Next.js + TypeScript + Tailwind 建立静态优先的世界骨架，
用 Markdown / MDX 与 JSON 定义内容和世界协议，
用本地搜索与低光灯塔保证无 AI 也能运行，
为未来 AI、创世台、私密档案和年度册预留接口。
```

---

## 3. V1 技术目标

V1 不是为了技术炫技，而是为了让“世界骨架”可靠成立。

技术目标：

- 页面可静态部署
- 数据可读、可校验、可导出
- 内容可以从 Markdown / MDX 进入世界
- Node / Area / Path / Relation / WorldEvent 可稳定表达
- public / private 在构建层隔离
- 无 AI 时完整可用
- 后续可接 AI、数据库、创世台
- 移动端可用
- 开发复杂度可控

---

## 4. 技术栈明细

## 4.1 Next.js

用途：

- App Router 页面组织
- 静态生成
- 路由管理
- 元信息 / SEO
- 后续可扩展 API Route 或 Server Actions

选择原因：

- 适合内容站和产品型网站
- 静态 / 动态能力兼具
- 可先静态，后续逐渐扩展
- 生态成熟
- 适配 Vercel / Cloudflare Pages

在 V1 中承担：

```text
src/app/page.tsx
src/app/atlas/page.tsx
src/app/node/[slug]/page.tsx
src/app/archive/page.tsx
src/app/timeline/page.tsx
src/app/paths/page.tsx
src/app/ask/page.tsx
```

不在 V1 中承担：

- 完整后端
- 多用户权限
- 实时协作
- 数据库写入后台

---

## 4.2 React

用途：

- 组件化构建世界 UI
- 复用 NodeCard、AreaCard、WorldShell 等组件
- 支撑交互状态

选择原因：

- 与 Next.js 原生配合
- 组件生态成熟
- 适合构建长期演进的设计系统

V1 核心组件：

```text
WorldShell
CompassNav
WorldMap
AreaCard
NodeCard
NodePassport
ArchiveView
TimeRiver
PathViewer
LighthouseStatus
```

---

## 4.3 TypeScript

用途：

- 定义世界协议
- 降低数据模型变更风险
- 强化 Node / Area / Path / Relation 的字段约束
- 为后续规则引擎和 AI 接口提供类型基础

选择原因：

- 古月浮屿是长期系统，不是一次性页面
- 世界对象需要清晰结构
- public/private 隔离需要严谨校验
- 后续 AI / 导出 / 创世台都依赖稳定类型

关键文件：

```text
src/lib/types.ts
src/lib/nodes.ts
src/lib/areas.ts
src/lib/paths.ts
src/lib/relations.ts
src/lib/world-events.ts
src/lib/visibility.ts
```

---

## 4.4 Tailwind CSS

用途：

- 快速建立统一视觉系统
- 支撑响应式布局
- 实现纸感、柔光、留白、卡片、夜间模式
- 避免早期样式文件膨胀

选择原因：

- 适合快速搭建 V1
- 适合设计系统约束
- 易维护
- 不阻碍后续抽象组件库

使用原则：

- 保持类名克制
- 重要组件可提炼为可复用 class
- 不为了视觉炫技写复杂样式
- 阅读页优先可读性

---

## 4.5 Framer Motion

用途：

- 轻量动效
- 页面入场
- 卡片 hover
- 节点点亮
- 时间河轻微流动
- 地图展开

选择原因：

- React 生态成熟
- 可控、声明式
- 适合温柔克制的动效

V1 使用边界：

允许：

- 柔和入场
- 轻微浮动
- 点亮反馈
- 展开 / 收起
- 卡片 hover

不允许：

- 强制长开场动画
- 满屏高强度粒子
- 阅读页强动效
- 移动端复杂动效
- 影响首屏性能

---

## 4.6 MDX / Markdown

用途：

- 保存文章正文
- 保存世界宣言
- 保存项目说明
- 保存灵感节点
- 保存文档型内容
- 保持内容可迁移

选择原因：

- 长期可读
- 不绑定平台
- 易导出
- 易版本管理
- 适合技术文章和世界文档

推荐目录：

```text
content/
  manifesto/
  articles/
  projects/
  fragments/
  memory/
```

V1 原则：

- 内容正文用 Markdown / MDX
- 元数据主要放入 `data/nodes.json`
- 或在后续支持 frontmatter
- public 内容可进入静态构建
- private 内容不进入公开构建

---

## 4.7 JSON 数据协议

用途：

- 定义世界结构
- 定义 Node、Area、Path、Relation、WorldEvent
- 支撑静态构建
- 支撑搜索、地图、时间河、路径

选择原因：

- 简单
- 可读
- 可校验
- 可迁移
- 便于版本管理
- V1 不需要数据库也能运行

V1 数据文件：

```text
data/
  areas.json
  nodes.json
  relations.json
  paths.json
  world-events.json
  world-state.json
  rules.json
  permissions.json
```

---

## 4.8 Fuse.js / Pagefind

用途：

- 本地搜索
- 档案馆搜索
- Ask 低光模式搜索入口
- 无 AI 时可查找内容

### 4.8.1 Fuse.js

适合：

- 数据量小到中等
- 直接在前端搜索 JSON
- 快速实现
- 灵活筛选

### 4.8.2 Pagefind

适合：

- 内容量增长后
- 静态站全文搜索
- 更好的性能和索引体验

### 4.8.3 V1 建议

V1 初期可先用 Fuse.js。  
内容量增长后再切 Pagefind。

冻结策略：

```text
搜索接口抽象为 src/lib/search.ts
底层可以先 Fuse.js，后续替换 Pagefind。
```

---

## 4.9 Vercel / Cloudflare Pages

用途：

- 静态部署
- 自动构建
- 公开访问
- CDN

选择原因：

- 部署简单
- 与 Next.js 兼容
- 适合静态优先
- 后续可扩展 Serverless 能力

V1 推荐：

- 首选 Vercel
- 备选 Cloudflare Pages
- 可保留静态导出能力

---

## 5. V1 不选这些技术的原因

## 5.1 暂不选数据库

不选：

- PostgreSQL
- MySQL
- MongoDB
- Supabase
- Prisma 后台写入

原因：

- V1 重点是骨架验证
- 静态 JSON 足够
- 数据库会过早引入权限、后台、迁移复杂度
- 私密内容风险变高
- 不利于快速启动

后续：

- V2 / V3 可引入 SQLite / PostgreSQL
- 创世台需要在线编辑时再引入数据库
- 但核心内容仍应可导出为 Markdown / JSON

---

## 5.2 暂不选复杂 CMS

不选：

- Strapi
- Sanity
- Contentful
- Payload CMS
- Directus

原因：

- 当前是个人数字世界，不是团队 CMS
- 过早 CMS 化会让世界协议被 CMS 模型绑架
- 管理后台不是 V1 核心
- Markdown / JSON 更轻、更可控

后续：

- V2 创世台可自研轻后台
- 或接 Git-based CMS
- 但不能牺牲世界协议

---

## 5.3 暂不做完整 AI RAG

不做：

- 向量数据库
- 全量 embedding
- 完整语义问答
- 多模型路由
- AI 自动写入

原因：

- AI 不是生命层
- V1 必须无 AI 可运行
- RAG 会增加权限风险
- 私密内容边界尚未上线
- 需要先有稳定 Node / Area / Visibility

后续：

- V3 接入 AI 灯塔
- AI 只读授权内容
- AI 输出进入草案
- AI 不直接发布
- AI 不读取 vault

---

## 5.4 暂不做 Three.js 3D 宇宙

不做：

- 完整 3D 星图
- 复杂宇宙场景
- 多尺度 3D 浏览
- 游戏式世界入口

原因：

- V1 目标是骨架，不是沉浸式展示
- 3D 容易拖慢移动端
- 容易让世界变成炫技
- 阅读体验会受影响
- 内容还没足够支撑 3D

后续：

- V6 可探索 Canvas / 2.5D / 轻量 Three.js
- 但必须建立在稳定内容和数据之上

---

## 5.5 暂不做多用户权限系统

不做：

- 登录系统
- family / partner 在线访问
- vault 在线加密访问
- 多角色 ACL

原因：

- V1 公开世界核心版不需要
- 权限模型先在数据层预留
- 真正私密在线访问必须非常谨慎
- 不能为了功能提前暴露隐私风险

后续：

- V4 私密深层阶段再实现
- 先物理隔离，再在线权限

---

## 6. 推荐项目结构

```text
guyue-floating-world/
  docs/
    00-overview/
    01-world/
    02-product/
    03-design/
    04-content/
    05-engineering/
    06-privacy-ai/
    07-roadmap/
    08-future/

  src/
    app/
      page.tsx
      atlas/page.tsx
      timeline/page.tsx
      archive/page.tsx
      paths/page.tsx
      ask/page.tsx
      about/page.tsx
      manifesto/page.tsx
      node/[slug]/page.tsx

    components/
      world/
      node/
      timeline/
      archive/
      paths/
      common/

    lib/
      types.ts
      nodes.ts
      areas.ts
      relations.ts
      paths.ts
      world-events.ts
      visibility.ts
      search.ts
      rules.ts

  content/
    manifesto/
    articles/
    projects/
    fragments/
    memory/

  data/
    areas.json
    nodes.json
    relations.json
    paths.json
    world-events.json
    world-state.json
    rules.json
    permissions.json

  scripts/
    validate-world-data.ts
    build-search-index.ts
    check-public-build.ts
```

---

## 7. 初始化命令建议

```bash
npx create-next-app@latest guyue-floating-world \
  --ts \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

进入项目：

```bash
cd guyue-floating-world
```

安装基础依赖：

```bash
npm install framer-motion clsx tailwind-merge lucide-react fuse.js
```

可选依赖：

```bash
npm install gray-matter reading-time zod
```

说明：

- `gray-matter`：如使用 Markdown frontmatter
- `reading-time`：文章阅读时间
- `zod`：数据校验
- `fuse.js`：V1 本地搜索

---

## 8. 技术演进路径

### V1

```text
Next.js + TS + Tailwind + MDX/JSON + Fuse.js + 静态部署
```

目标：

- 世界骨架成立
- public 内容可访问
- 无 AI 可运行

### V2

增加：

- 创世台
- 收集箱
- 规则引擎
- 快照
- 轻后台

可能引入：

- SQLite
- Git-based CMS
- 本地写入脚本

### V3

增加：

- AI 灯塔
- 语义搜索
- AI 草案区
- 隐私检查
- 摘要 / 标签 / 关系建议

可能引入：

- AI API
- Embedding
- Vector index
- Serverless route

### V4

增加：

- 私密档案
- 家庭 / 孩子 / partner 权限
- vault
- 时间胶囊

可能引入：

- Auth
- 加密导出
- 私密数据物理隔离

### V5

增加：

- 年度册
- 展览
- 导出传承
- PDF / HTML 生成

可能引入：

- PDF renderer
- 静态展览生成器
- 导出任务脚本

### V6

增加：

- Canvas 星图
- 2.5D 地图
- 声音层
- 高级沉浸体验

可能引入：

- Canvas
- Three.js
- Web Audio

---

## 9. 技术栈变更规则

V1 开发中，不应随意变更以下内容：

- Next.js
- TypeScript
- Tailwind
- Markdown / JSON 作为核心数据基础
- public/private 构建隔离
- 无 AI 可运行原则

如要变更，必须回答：

1. 是否让 V1 更简单？
2. 是否破坏静态优先？
3. 是否增加隐私风险？
4. 是否让无 AI 模式失效？
5. 是否让数据更难导出？
6. 是否让第一阶段变复杂？
7. 是否服务于世界初衷？

不能通过这 7 问，不应变更。

---

## 10. 技术栈最终原则

```text
技术栈不是为了炫技，
而是为了让世界长期存在。
```

```text
V1 要轻，
骨架要稳，
数据要清，
边界要硬，
未来要能接上。
```

```text
世界看起来可以像诗，
但运行起来必须像系统。
```
