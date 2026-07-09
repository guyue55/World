# WorldOS M23 感官音频资产生产规范

> [!IMPORTANT]
> M23 的目标是让音乐、氛围、视觉、交互同属一个世界，同时保证默认安静、可控、可降级。

## 1. 目标

- 场景声景可选开启。
- 每个核心场景有轻量音频人格。
- 音频资产有来源、授权、大小、时长。
- 音频关闭后体验仍完整。

对应支柱：S5 统一世界观、S8 真实可信。

## 2. 音频原则

| 原则 | 要求 |
| --- | --- |
| 默认静音 | 不自动播放 |
| 用户主动 | 点击后才创建 / 恢复 AudioContext |
| 可关闭 | 任意页面能关闭 |
| 可降级 | reduced-sensory 下隐藏或静音 |
| 有授权 | 每个资产记录来源和 license |
| 有预算 | 控制体积和懒加载 |

参考：

- https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices
- https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay
- https://howlerjs.com/
- https://tonejs.github.io/

## 3. 场景声景

| 场景 | 声景方向 |
| --- | --- |
| Home | 低频开门、纸页、远光 |
| Atlas | 轻微星线、空间脉冲 |
| Timeline | 水流、涟漪、时间钟点 |
| Archive | 纸页、木架、低声回响 |
| Paths | 脚步、路标、短提示 |
| Lighthouse | 灯塔脉冲、方向提示 |

## 4. 实施步骤

1. 建立资产 manifest。
2. 先用原生 Web Audio / HTMLAudio 试点。
3. 复杂后才评估 Howler / Tone。
4. 加音量、静音、场景切换停止。
5. 跑移动端和 reduced-sensory 验收。

## 5. 验收

- 默认无声。
- 用户可关闭。
- 移动端不遮挡、不明显卡顿。
- 资产来源清楚。

