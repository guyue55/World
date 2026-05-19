# 古月浮屿｜V1 AI 边界契约

> 阶段：V1
> 性质：AI 权限、索引与发布边界
> 目标：确保 AI 是灯塔，不是太阳。

## 1. 边界文件

```text
data/ai-boundary-policy.json
```

它定义：

- AI 允许做什么
- AI 禁止做什么
- 各 visibility 的 AI 访问能力
- AI 草案与审核规则

## 2. AI 可以做

```text
summarize public nodes
suggest tags for reviewed public content
suggest relations as unreviewed candidates
guide users through public paths
explain public world rules
generate drafts marked as ai.generated=true
```

## 3. AI 禁止做

```text
read vault/sealed/silent content
publish content automatically
change visibility automatically
delete or overwrite original content
index private/family/partner/vault/sealed/silent content
treat imagination as fact
create public AI content without review
```

## 4. 执行命令

```bash
npm run check:ai-boundary
```

## 5. 最终原则

```text
AI 可以照亮路径，
但不能越过边界。
```
