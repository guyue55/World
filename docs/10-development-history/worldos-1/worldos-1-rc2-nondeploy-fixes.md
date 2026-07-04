# WorldOS 1.0 RC2｜非部署问题修复线

## 背景

当前暂时不方便运行和部署真实外部环境，因此本轮不推进 `productionLive=true`，也不伪造 Preview / Production 证据。

本轮专门处理上一轮从代码、功能和项目角度分析出的本地可解决问题：

- 公开内容密度偏低。
- 关系网络厚度偏低。
- 首页和公开路径反迷路说明不足。
- 区域说明还不够自解释。
- 内容质量没有进入 RC 门禁。
- 历史阶段线仍需被 release gate 约束。

## 完成内容

### 1. 真实内容密度补强

公开节点从 15 个提升到 38 个，并补充正文内容。

新增内容覆盖：

- 技术星域：Gemini CLI、Codex CLI、RustDesk、Kavita / EPUB、Docker 等。
- 产品工坊：WorldOS 引擎、AI 网站检测 Demo、AI 小说工作台、月帧阁、右键助手。
- 世界规则：世界设计公理、三层真相、渐进揭示、公开/私密边界、内容出生证明。
- 生活记忆：窗边的光、旅行远方坐标。
- 时间流：世界修复日、世界月报。

### 2. 关系与路径补强

关系数量提升到 39 条，并为强关系补充解释，避免星线只有连接没有语义。

新增路径包括：

- 8 分钟抵达古月浮屿。
- WorldOS 1.0 RC 经验路径。
- 创世台维护路径。
- 产品工坊代表路径。
- 公开生活记忆边界路径。

### 3. 反迷路与区域自解释

首页新增：

- 反迷路罗盘。
- 世界密度。
- 公开层不是完整世界说明。

区域页新增：

- 无 AI 时如何运行。
- AI 可增强什么。

每个公开页面继续遵守：我在哪里、这里是什么、能去哪、如何回去。

### 4. 新增长期门禁

新增命令：

```bash
npm run check:worldos-content-density
npm run check:worldos-public-experience
```

并接入：

```bash
npm run check:release:rc
```

这保证后续不会重新退回“漂亮空壳”或“只有本地构建、不检查内容质量”的状态。

## 仍未完成

仍需保留：

```text
productionLive: false
releaseReady: false
cleanProductionReady: false
```

原因：真实外部 Preview / Production URL、线上 smoke、HTTPS、Web Vitals、可访问性快照、人工签收和真实回滚演练仍未完成。

## 当前判断

RC2 比 RC1 更适合作为“暂不部署时的继续开发基线”：它不再只是候选发布壳，而是补充了更真实的公开内容、路径、关系、反迷路设计和内容门禁。
