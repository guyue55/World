# 古月浮屿｜V1 第一阶段退出标准

> 阶段：V1
> 性质：阶段退出守门
> 目标：避免“感觉差不多了”，用清晰标准判断第一阶段能否收口。

## 1. 退出标准文件

```text
data/phase-one-exit-criteria.json
```

## 2. 必须通过

```text
npm run check:world-core
npm run build
npm run typecheck
npm run check:routes
npm run check:public
核心页面 PC/移动端视觉和交互检查
核心页面 Lighthouse 或等价性能检查
预览部署检查
```

## 3. 可以延后

```text
完整 AI RAG
完整后台 CMS
完整私密档案在线访问
2.5D/3D/WebXR
完整搜索服务
评论/社交系统
大量真实内容填充
年度册/展览/时间胶囊正式实现
```

## 4. 最终原则

```text
第一阶段可退出的标志：
不是宇宙已完整，
而是宇宙地基已经能承载未来。
```
