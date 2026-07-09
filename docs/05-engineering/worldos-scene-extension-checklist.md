# WorldOS 场景扩展清单

## 适用范围

新增场景、扩展场景人格、加入转场、增加动态效果、调整氛围或声景时使用本清单。

## 必改位置

- 场景注册：`data/domains/experience/scene-registry.json`
- 场景人格：`data/domains/experience/scene-personality-registry.json`
- 转场编排：`data/domains/experience/scene-transition-registry.json`
- 环境氛围：`data/domains/experience/ambient-environment-registry.json`
- 声景策略：`data/domains/experience/sensory-audio-registry.json`
- 视觉 QA：`data/domains/experience/scene-qa-checklist.json`
- 组件实现：`src/components/world` 或对应页面模块

## 操作步骤

1. 先写清场景是什么空间，不先写动画。
2. 定义入口、移动、抵达、返回、继续探索。
3. 确认 reduced-motion 与 compact-motion 降级。
4. 确认移动端首屏 H1、主 CTA、导航、核心状态不被遮挡。
5. 更新检查脚本或 QA checklist。
6. 跑场景与 RC 检查。

```bash
npm run check:scene-runtime
npm run check:scene-transition
npm run check:scene-personality
npm run check:ambient-environment
npm run check:scene-qa
npm run check:human-experience
```

## 禁止项

- 新增只有视觉效果、没有场景语义的组件。
- 在页面里复制一套独立动效逻辑，绕开统一 registry。
- 引入重型图形或音频依赖但没有 ADR。
- 动效挡住内容、按钮、导航或阅读正文。

## 验收

访客不读项目背景，也能看出 Atlas 像地图、Timeline 像时间河、Archive 像档案馆、Paths 像旅程、Node 像地点。若仍像普通卡片列表，不能算完成。
