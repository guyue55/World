# 古月浮屿｜V1 静态资源与缓存策略

> 阶段：V1
> 性质：资源治理和静态生成策略
> 目标：让资源丰富但不阻塞入口，让生成物可删除后重建。

## 1. 文件

```text
data/static-asset-policy.json
data/cache-strategy.json
```

## 2. 资源策略

```text
hero-image
decorative-image
icon
json-index
markdown-body
future-visual-asset
```

## 3. 缓存策略

```text
content-json
public-index
world-manifest
rss
sitemap
markdown
future-search-index
```

## 4. 规则

```text
首页不因装饰图片阻塞世界入口。
公共索引只包含公开投影摘要。
私密层不得生成公开缓存。
生成物必须可删除后重建。
未来大型资源必须登记 provider 与 fallback。
```
