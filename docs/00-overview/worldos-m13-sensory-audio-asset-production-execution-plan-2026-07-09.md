# WorldOS M13 感官、音频与资产生产执行计划

## 1. 目标

让 WorldOS 的氛围、声音、音乐和视觉资产从“规格存在”进入“可运行、可控制、可降级、可授权”的生产状态。

## 2. 执行项

| 项 | 操作 | 验收 |
| --- | --- | --- |
| 氛围状态接入 | 将 `sceneId`、`dayPeriod`、`season`、`aiStatus`、`motionPreference`、`sensoryPreference` 映射到统一氛围层 | 各场景氛围不同，但正文不被遮挡 |
| 音频 opt-in | 建立全局声音开关、音量、关闭记忆 | 首访无声音，用户主动开启后才加载 |
| 场景声景 | 为 Home、Atlas、Timeline、Archive、Paths、Lighthouse 定义短音效或轻环境音 | 每个声音有场景理由，不影响阅读 |
| 资产清单 | 建立图片、纹理、音频、字体、来源、授权、体积清单 | 无未知来源资产 |
| 懒加载 | 音频和重资产按场景加载 | 首页不因音频增加首屏负担 |
| 降级 | reduced-motion 与 reduced-sensory 下关闭强动效和声音 | 弱设备仍可完整浏览 |
| 预算 | 对照性能与资产预算压缩、拆分或移除资产 | 新资产不突破预算 |

## 3. 技术路线

1. 默认使用 CSS / SVG / HTMLAudio / Web Audio API。
2. 管理复杂循环、多格式或 sprite 时才评估 Howler.js。
3. 明确需要程序化声景时才评估 Tone.js。
4. 不默认引入全站 Canvas / WebGL 音画系统。

## 4. 检查命令

- `npm run check:ambient-environment`
- `npm run check:performance-budget`
- `npm run check:reduced-motion`
- `npm run check:scene-qa`
- `npm run check:mainline`
- `npm run release:local-rc`

## 5. 人工验收

- 首次访问没有声音。
- 声音开启入口清晰，关闭入口更清晰。
- 移动端加载速度没有明显下降。
- 关闭声音后世界仍成立。
- 音效像空间反馈，不像装饰噪声。

## 6. 边界

- 不自动播放音乐。
- 不引入无授权音频。
- 不用大背景素材掩盖内容空洞。
- 不用强闪烁和强运动制造刺激。

