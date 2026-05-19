# 古月浮屿｜V1 项目骨架第三批实现说明

> 本文件说明本次新增/修改的 V1 第三批项目骨架文件。

## 本次完成

- 新增站点配置 `src/lib/site.ts`
- 新增统一 SEO metadata 工具 `src/lib/metadata.ts`
- 新增 `sitemap.ts`
- 新增 `robots.ts`
- 为主要页面补充 metadata
- Atlas 增强为视觉空间地图
- 新增 AreaNodeCluster 区域节点集群
- 新增 PathProgress 路径进度
- 节点页新增 NodeCover
- 路径详情页改为双栏结构并展示路径进度

## 当前能力

V1 已进一步具备：

```text
可被搜索引擎理解
有 sitemap / robots
地图更像世界空间，而不是分类页
路径有阅读进度感
节点有视觉封面位
主要页面有独立 metadata
```

## 下一步建议

继续推进：

- 图片资产与 OG 图
- 真实 Shiki 代码高亮管线
- Mermaid 文档渲染方案
- sitemap 中按实际 updatedAt 增强
- RSS / Atom
- JSON-LD 结构化数据
- PWA / 离线缓存候选
