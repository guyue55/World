# 古月浮屿｜V1 项目骨架第二批实现说明

> 本文件说明本次新增/修改的 V1 第二批项目骨架文件。

## 本次完成

- 节点页接入 Markdown 正文读取
- 新增 `MarkdownContent` 与 `CodeBlock`
- 新增 Path 详情页 `/paths/[id]`
- PathCard 链接到路径详情
- 新增 404 雾区页面
- 新增无权限页面 `/forbidden`
- 新增移动端底部导航
- 新增 Breadcrumbs / EmptyState
- 为首批节点补充 Markdown 正文
- `data/nodes.json` 补齐更多 `contentPath`

## 当前能力

现在一个节点可以同时拥有：

```text
数据护照
Markdown 正文
所属区域
生命周期
路径归属
Backlinks / ForwardLinks
档案馆搜索入口
```

## 下一步建议

继续推进：

- Path 页面展示当前路径进度
- Atlas 视觉地图进一步增强
- 真实 MDX 管线与 Shiki 高亮
- SEO metadata
- sitemap / robots
- 图片与封面系统
- 移动端视觉细节
