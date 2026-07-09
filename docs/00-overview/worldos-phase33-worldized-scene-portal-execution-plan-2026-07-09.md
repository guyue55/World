# WorldOS Phase 33 世界化场景门户执行计划

> 日期：2026-07-09  
> 范围：localhost / LAN IP，本阶段不考虑外部 Preview / Production。  
> 背景：Phase 26-32 已完成场景运行时、转场、空气层、旅程记忆和 Scene QA，但实际观感仍偏“博客骨架”。  
> 核心目标：用轻量统一的场景门户，让访问者第一眼感到“进入世界/宇宙”，同时保持性能、中文优先和后续可扩展。

## 设计原则

- 不新增重型依赖，不做全站 3D 重写。
- 不复制多套页面 Hero，统一为 `SceneWorldPortal`。
- 场景差异通过同一数据结构驱动：视觉语义、对象、行动、状态。
- 动效只使用 transform / opacity，并尊重 reduced-motion。
- 静态博客能力保留，但退到档案/阅读层；动态世界成为入口层。
- 权限仍由后端控制，前端只展示公开场景与公开路径。

## 本阶段范围

- 首页 Gateway：从博客首页改为“进入世界”的首屏门户。
- Atlas：星图穹顶门户。
- Timeline：时间河门户。
- Archive：档案馆门户。
- Paths：星路入口门户。
- Scene QA：新增门户存在性与场景类型证据。

## 非目标

- 不接入外部 Preview / Production。
- 不引入 Three.js 或大型图像资产。
- 不改私密/owner 权限逻辑。
- 不重写全部内容卡片与正文阅读系统。
- 不追求炫技动效，优先清晰、轻量、可维护。

## 执行项

- [x] 1. 分析现有首页与场景页，确认“骨架感”来自 Hero/卡片式页面结构而非缺少门禁。
- [x] 2. 制定 Phase 33 执行计划文档。
- [x] 3. 新增统一 `SceneWorldPortal` 组件，支持 Gateway / Atlas / Timeline / Archive / Paths 五类场景。
- [x] 4. 将首页首屏替换为世界入口门户，并保留主 CTA、首次进入仪式、动态状态卡、Journey Memory。
- [x] 5. 将 Atlas / Timeline / Archive / Paths 接入统一场景门户，形成不同场景开场。
- [x] 6. 升级 Scene QA：LAN DOM 指标、报告、检查器必须验证 `scene-world-portal` 与场景类型。
- [x] 7. 运行检查：`check:scene-qa`、`check:mainline`、`check:daily`、`check:strict`、`release:local-rc`。
- [x] 8. 多轮深度复核：源码扫描、权限扫描、产物扫描、截图证据、计划勾选、工作树状态。
- [x] 9. 中文 commit 提交：`feat(scene): 建立世界化场景门户`。

## 验收标准

- [x] 首页首屏不再是普通博客 Hero，而是明确的“进入世界”场景。
- [x] Atlas / Timeline / Archive / Paths 首屏有不同场景语义和视觉行为。
- [x] `SceneWorldPortal` 是唯一新增场景门户组件，不出现多套重复 Hero 实现。
- [x] 动效尊重 reduced-motion，不使用 layout-heavy 动画属性。
- [x] Scene QA 能在 desktop 和 mobile reduced-motion 中证明门户存在。
- [x] `check:daily`、`check:strict`、`release:local-rc` 通过。
- [x] 工作树提交后干净。

## 风险控制

- 首屏 CTA 与移动导航不得被遮挡。
- 首页 `home-primary-cta`、`dynamic-world-status-card`、首次进入仪式继续可被 LAN RC 识别。
- 新组件只读取公开 props，不读取私密层。
- 不扩大 bundle 到不可控范围，保持轻量 SVG/CSS/GSAP 动效。
