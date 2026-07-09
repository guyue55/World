# ADR-0007 高级可视化候选策略

## 状态

Proposed

## 背景

WorldOS 终局目标需要更强的 Atlas、Timeline 和局部空间表现，但当前阶段仍必须避免为了“宇宙感”过早引入重型依赖。

## 决策

高级可视化采用候选制：

| 技术 | 默认状态 | 允许进入条件 |
| --- | --- | --- |
| SVG / CSS | 默认优先 | 节点量可控、交互简单 |
| Canvas | 优先候选 | 节点多、连续动画多 |
| D3 / d3-force | 条件候选 | 需要力导向或复杂布局 |
| Three.js / R3F | 后期候选 | 局部空间必须 3D 才成立 |
| PixiJS | 条件候选 | 2D WebGL 舞台收益明显 |

## 不采用

- 不做全站 3D 核心。
- 不为了背景效果引入 WebGL。
- 不在没有 ADR 和性能预算时增加重依赖。

## 验收

- 原型前后截图 / 录屏可见收益。
- `build:production-ci` 和 `check:mainline` 通过。
- bundle / runtime artifact 未超预算。
- reduced-motion / low-performance fallback 存在。

## 来源

- Three.js：https://threejs.org/docs/
- React Three Fiber performance：https://r3f.docs.pmnd.rs/advanced/scaling-performance
- D3 force：https://d3js.org/d3-force
- PixiJS：https://pixijs.com/

