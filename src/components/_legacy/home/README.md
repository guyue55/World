# src/components/_legacy/home

> 2026-07-08 归档：主线主页 `ProductHome` 已完全替代该目录，5 个组件在全项目内无引用。

## 归档清单

| 组件 | 原用途 | 归档原因 |
|---|---|---|
| FeaturedNodeGrid | 主页精选节点网格（英文 eyebrow `REPRESENTATIVE NODES`） | 被 ProductHome 取代 |
| HomeHero | 主页首屏 hero | 被 ProductHome 取代 |
| HomePathRail | 主页路径推荐（英文 eyebrow `GUIDED PATHS`） | 被 ProductHome 取代 |
| HomeStatusSummary | 主页世界状态摘要 | 被 ProductHome 取代 |
| HomeWorldRhythm | 主页世界节奏（英文 eyebrow `WORLD RHYTHM`） | 被 ProductHome 取代 |

归档同步把它们依赖的 `SectionHeader` 迁移到 `src/components/_legacy/layout/`，保持"归档区自洽"，未来若需还原，直接 `git mv` 回原位置即可。
