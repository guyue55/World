# WorldOS M11 场景迁移叙事化执行计划

## 1. 目标

页面跳转必须升级为场景迁移。用户要能感到自己从一个空间离开，经过预告，抵达另一个空间。

## 2. 迁移语法

| 阶段 | 体验目标 |
| --- | --- |
| source | 来源仍可识别 |
| leaving | 当前场景轻微收束 |
| preview | 目标场景颜色、纹理或关键词出现 |
| arriving | 目标内容先可读 |
| settled | 出口和下一步明确 |
| reduced | 只保留文本和轻量状态 |

## 3. 执行项

- [ ] 审计当前 `SceneTransitionShell` 是否只是 cue + fade。
- [ ] 引入轻量迁移编舞注册表，不新增重型依赖。
- [ ] 为核心路线定义语义：Home->Atlas、Atlas->Node、Node->Paths、Paths->Timeline、Timeline->Archive、任意->Home。
- [ ] 增加来源残影和目标预告，但不固定遮挡正文。
- [ ] reduced-motion 只保留状态文本和轻量淡入。
- [ ] 浏览器后退仍能理解当前位置。
- [ ] Scene QA 增加迁移证据，不仅检查 cue 存在。

## 4. 验收标准

- [ ] 人工体验量表“迁移连续性”核心路线不低于 2。
- [ ] desktop / mobile / reduced-motion 无白屏、无遮挡。
- [ ] `npm run check:scene-transition` 通过。
- [ ] `npm run check:scene-qa` 通过。
- [ ] `npm run release:local-rc` 通过。

## 5. 边界

- 不阻塞导航。
- 不把核心内容放到动画结束后才出现。
- 不同时让 GSAP 和 Framer Motion 控制同一 DOM 属性。

