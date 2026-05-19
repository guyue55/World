# 古月浮屿｜V1 项目骨架实现说明

> 本文件说明本次新增的 V1 项目骨架代码与数据文件。

## 本次完成

- Next.js / TypeScript / Tailwind 项目基础配置
- V1 主要页面路由
- 世界外壳与基础组件
- Node / Area / Path / WorldEvent 数据读取层
- Zod Schema
- Fuse.js 本地搜索封装
- Backlinks / ForwardLinks 数据函数
- validate-world-data 构建前校验脚本
- check-public-build 公开构建守门脚本
- V1 首批真实节点、区域、路径、世界事件数据

## 重要说明

这是第一阶段骨架，不是完整最终产品。

V1 当前完成的是：

```text
内容可以进入
节点可以存在
区域可以容纳
关系可以连接
路径可以引导
时间可以记录
权限可以守门
AI 可以低光
未来可以扩展
```

## 安装与运行

```bash
npm install
npm run validate:world
npm run check:public
npm run dev
```

## 下一步

建议继续完善：

- MDX 正文渲染
- NodePage 真实 Markdown 内容读取
- Path 详情页
- Atlas 视觉地图
- 移动端细节
- 404 / 无权限状态页
- Shiki 代码高亮管线
- Mermaid 文档渲染策略
