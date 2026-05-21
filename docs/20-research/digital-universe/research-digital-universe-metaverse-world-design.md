# 古月浮屿｜数字宇宙、元宇宙与虚拟世界设计调研

> 阶段：V1 开发前研究补充  
> 性质：数字宇宙 / 元宇宙 / 虚拟世界 / 数字孪生 / 空间体验调研  
> 目标：系统补足“数字宇宙、宇宙设计、元宇宙、虚拟世界、数字世界”相关资料，提炼可用于古月浮屿的世界设计原则。  
> 结论先行：**古月浮屿不应在 V1 变成 3D 元宇宙项目；它应吸收元宇宙和虚拟世界设计中的“空间结构、持久性、身份、入口、存在感、互操作、治理、可达性”，用于强化个人数字世界的骨架。**

---

## 1. 本轮调研范围

本轮调研补充覆盖：

1. Metaverse / 元宇宙概念
2. Virtual Worlds / 虚拟世界设计
3. Digital Universe / 数字宇宙
4. Digital Twin / 数字孪生
5. Spatial Web / 空间 Web
6. WebXR / 浏览器虚拟世界
7. Open Source Metaverse / 开源元宇宙平台
8. 3D 世界与 2.5D 世界体验
9. 虚拟世界治理、身份、持久性、互操作
10. 对古月浮屿 V1/V2/V6 的设计启发

---

## 2. 关键结论

### 2.1 不要把“宇宙”误解成“必须 3D”

元宇宙和虚拟世界资料经常强调：

- 沉浸
- 持久空间
- 身份
- 交互
- 多人
- 实时
- 跨设备
- 互操作
- 经济系统
- 3D 场景

但古月浮屿的目标不是造一个公共多人 3D 社交空间。

古月浮屿的“宇宙”更接近：

```text
一个个人内容、记忆、项目、时间、关系与 AI 协作共同存在的数字世界。
```

因此，V1 应吸收的是：

- 空间感
- 世界地图
- 区域结构
- 节点位置
- 世界事件
- 持久存在
- 身份和权限
- 入口体验
- 可返回路径
- 治理规则
- 数据可导出

而不是：

- 多人实时在线
- VR 头显
- 完整 3D 场景
- 虚拟经济
- NFT 资产
- 游戏式 Avatar
- 实时语音房间

---

## 3. 元宇宙设计启发

## 3.1 持久性 Persistence

元宇宙与虚拟世界的核心之一是“世界持续存在”。

对古月浮屿的启发：

```text
世界不能只像一组页面。
它应当有状态、有历史、有生长、有低光。
```

对应设计：

- WorldState
- WorldEvent
- Timeline
- Snapshot
- LifeStage
- Archive
- Dormant / Silent

### V1 动作

- `world-state.json` 必须存在
- `world-events.json` 必须驱动时间河
- 节点更新不只是更新时间，而是世界事件
- 首页显示最近发生，而不是简单最新文章

---

## 3.2 空间性 Spatiality

虚拟世界强调空间组织，而不是纯列表。

对古月浮屿的启发：

```text
内容需要被安放在空间中。
```

对应设计：

- Area
- Atlas
- Node position / area
- Path
- Map
- Region description

### V1 动作

- Atlas 不只是分类页
- Area 必须有世界名和现实名
- 首页应让用户感到“进入一个地方”
- Archive 作为现实列表，Atlas 作为空间视图

---

## 3.3 身份 Identity

元宇宙通常强调 Avatar 和身份。

古月浮屿不需要游戏 Avatar，但需要“世界主人身份”。

对应设计：

- About Guyue
- Creator identity
- AI 不是主人
- 访客身份
- 深潜者身份
- 未来自己 / 家人 / 孩子作为未来角色

### V1 动作

- About 页面不能只是简历
- 应解释“古月是谁、为什么建这个世界、旅人如何进入”
- AI 灯塔文案必须避免喧宾夺主

---

## 3.4 临场感 Presence

虚拟世界追求“我在那里”。

古月浮屿可以通过轻量方式建立临场感：

- 一张书桌连接星河
- 主区域地图
- 时间河
- 柔光与纸感
- 节点像纸页
- 记忆湖像光影
- AI 灯塔像远方的光

### V1 动作

- 首页第一屏必须有世界入口感
- 地图页面必须有“我现在位于哪里”
- 节点页必须有面包屑 / 当前位置
- 错误页要像走到雾区，而不是普通 404

---

## 3.5 互操作 Interoperability

元宇宙资料反复强调不同平台、空间、资产之间的互通。

古月浮屿的对应不是跨平台 Avatar，而是：

```text
内容和数据可迁移、可导出、可重建。
```

对应设计：

- Markdown
- JSON
- manifest.json
- content/
- data/
- media/
- export packs
- public/private build separation

### V1 动作

- 不把核心内容锁死在数据库
- 不引入不可导出的专有 CMS
- 保持 Markdown / JSON
- 为导出和迁移保留 manifest 思路

---

## 3.6 治理 Governance

开放虚拟世界需要规则和治理。

古月浮屿虽然是个人世界，也需要治理：

- 世界宪章
- 世界规则
- AI 守则
- 权限边界
- 发布守门
- 删除 / 封存 / 归档
- private / vault / silent

### V1 动作

- 发布前守门规则必须进入脚本或检查清单
- public/private 不是 UI 开关，而是构建边界
- AI 生成内容未审核不可 public
- 404 / 无权限不能泄露私密标题

---

## 3.7 可达性 Accessibility

元宇宙常见问题是门槛高、设备依赖强。

古月浮屿的原则应相反：

```text
低门槛进入，高深度探索。
```

V1 不应依赖：

- VR
- 高性能 3D
- 专用设备
- 重型交互

V1 应支持：

- 桌面浏览
- 手机浏览
- 静态页面
- 键盘和阅读
- 低动效模式

---

## 4. 虚拟世界设计原则提炼

## 4.1 世界不是背景，而是规则系统

虚拟世界的“世界”不是一张背景图，而是：

- 空间
- 规则
- 角色
- 事件
- 状态
- 互动
- 历史

古月浮屿对应：

```text
Area + Node + Relation + Path + WorldEvent + Permission + Rule
```

## 4.2 地图比菜单更重要

传统网站用菜单。  
世界用地图。

但地图不能复杂到无法使用。

V1 地图策略：

```text
主区域卡片地图
  ↓
区域详情
  ↓
精选节点
  ↓
节点详情
```

不做：

```text
一上来就是复杂星图
```

## 4.3 事件让世界活着

如果没有事件，世界像静态展板。

V1 时间河要记录：

- 世界观形成
- 节点创建
- 节点发布
- 区域点亮
- 法则确立
- 内容归档
- AI 草案采纳
- 快照生成

## 4.4 入口决定世界气质

元宇宙常有“出生点 / 大厅 / 门户”。

古月浮屿入口是：

```text
创世原点 / 首页 / 一张书桌连接星河
```

首页不是内容列表，而是世界大厅。

## 4.5 深处必须可返回

虚拟世界容易迷路。

古月浮屿必须每个页面都提供：

- 当前位置
- 返回地图
- 打开档案馆
- 搜索
- 下一条路径

---

## 5. 数字孪生启发

## 5.1 数字孪生是什么

数字孪生强调现实对象或系统的数字表示，并可随现实变化更新。

古月浮屿不是工业数字孪生，但可以吸收：

```text
现实生活 / 技术项目 / 创作过程
在数字世界中有一个对应投影。
```

### 对应关系

| 现实 | 古月浮屿数字投影 |
|---|---|
| 一篇技术排查 | 技术星域 Node |
| 一个项目 | 产品工坊装置 |
| 一段生活照片 | 记忆湖光片 |
| 一次世界决策 | WorldEvent |
| 一段关系 | Relation |
| 一次年度回望 | 年度世界册 |
| 一条隐私边界 | Permission / Rule |

## 5.2 启发

古月浮屿可以被视为：

```text
个人人生与创作系统的低维数字孪生。
```

但它不是实时传感器系统，而是：

```text
记录、整理、解释、回望和传承系统。
```

## 5.3 V1 动作

- 每个节点保留 source
- 每个节点可关联现实来源
- 每个世界事件保留 actor
- 不把想象层和事实层混淆
- layer 字段保留 fact / interpretation / imagination

---

## 6. 开源元宇宙平台调研

## 6.1 OpenSimulator

启发：

- 开源多用户 3D 世界服务器
- 可创建虚拟环境
- 可通过多种客户端访问
- Hypergrid 概念体现跨世界访问

可借鉴：

- “世界可以被独立托管”
- “世界可以有自己的服务器 / 数据”
- “跨世界访问”对应未来路径和导出

不采纳：

- V1 不做多用户 3D 服务器
- 不引入 OpenSimulator

---

## 6.2 Vircadia / Overte / High Fidelity 系

启发：

- 开源虚拟世界
- 社交 3D 空间
- Avatar / 音频 / 多用户
- 自由开放元宇宙倾向

可借鉴：

- 开放、可自托管
- 空间感
- 用户拥有世界

不采纳：

- V1 不做实时社交
- 不做 Avatar
- 不做语音空间
- 不做 3D 世界引擎

---

## 6.3 Webaverse

启发：

- 浏览器中的开放 metaverse / game engine
- 基于 Web 技术
- 资产、场景、实时世界

可借鉴：

- Web 技术可以承载轻量世界体验
- 未来 V6 可探索浏览器内 3D / 2.5D

不采纳：

- V1 不做 Web3 / NFT
- 不做 game engine
- 不做虚拟资产经济

---

## 6.4 JanusWeb

启发：

- Web 变成 3D 空间
- 浏览器访问虚拟世界
- 链接成为空间入口

可借鉴：

```text
链接不仅是 URL，也可以是世界之间的门。
```

古月浮屿对应：

- Path
- Atlas
- Node relation
- Random drift
- Portal-like links

不采纳：

- V1 不做 3D browser
- 不做实时协作 VR

---

## 6.5 Babylon.js / A-Frame / WebXR

启发：

- Web 标准可构建 3D / XR
- 未来可用轻量 WebXR 或 2.5D 场景

不采纳：

- V1 不引入
- V6 再作为高级体验候选

---

## 7. 对古月浮屿的设计补强

## 7.1 增加“世界空间层”概念

建议在世界规则中明确：

```text
古月浮屿有两种导航：
1. 空间导航：Atlas / Area / Map
2. 现实导航：Archive / Search / Tags
```

对应：

```text
世界地图负责沉浸。
档案馆负责效率。
```

## 7.2 增加“世界入口 / 门户”概念

首页不仅是首页，而是 Portal。

建议命名：

```text
创世原点
```

首页承担：

- 出生点
- 世界大厅
- 主路径入口
- 世界状态
- 最近发生
- 进入地图

## 7.3 增加“世界坐标”轻字段

V1 不做 3D，但可预留轻量坐标。

不建议硬上 x/y/z。  
建议先使用语义坐标：

```ts
type WorldCoordinate = {
  areaId: string
  zone?: string
  order?: number
  depth?: 'surface' | 'middle' | 'deep'
}
```

但 V1 不一定写入 Schema，可作为后续预留。

## 7.4 强化“深度”概念

古月浮屿的深度不是 z 轴，而是权限和认知深度。

建议定义：

```text
surface：公开可见表层
middle：需要路径理解的中层
deep：私密、家庭、孩子、时间胶囊等深层
vault：保险箱
```

对应：

- public
- semiPublic
- private
- vault

## 7.5 增加“世界季节 / 状态”

已有 WorldState：

```ts
mode
season
dayPhase
aiStatus
```

建议 V1 保留，首页轻量展示：

```text
当前世界：低光生长中
```

或：

```text
当前季节：春｜一些种子正在发芽
```

## 7.6 增加“世界法则可视化”

不要只把规则写在文档里。  
未来可以在 Manifesto 页面展示：

- AI 是灯塔，不是太阳
- 公开层不是完整世界
- 入口清澈，深处浩瀚
- 世界为生活服务

V1 可以先做文本卡片。

## 7.7 增加“世界门槛控制”

借鉴元宇宙高门槛的问题，古月浮屿应设计：

```text
低门槛入口
中层探索
深层回望
```

V1 首页不要塞太多术语。

---

## 8. 对 V1 技术路线的影响

本轮调研不改变 V1 技术栈。

继续：

```text
Next.js + TypeScript + Tailwind + MDX/JSON + Zod + Fuse.js + 静态部署
```

不新增：

- WebXR
- A-Frame
- Babylon.js
- Three.js
- OpenSimulator
- Vircadia
- Webaverse
- JanusWeb

但建议新增未来候选：

```text
V6 高级体验候选：
- Canvas 星图
- React Force Graph
- Babylon.js / Three.js
- A-Frame / WebXR
- Web Audio
```

---

## 9. 对 V1 文档和设计的改进建议

建议后续增量修改：

### 9.1 `v1-skeleton-freeze.md`

补充：

```text
V1 是低沉浸数字世界，不是 3D 元宇宙。
空间感通过 Area / Atlas / Path / WorldEvent 表达。
```

### 9.2 `v1-world-skeleton-architecture.md`

补充：

```text
World Space Layer
Navigation Layer
Projection Layer
Governance Layer
```

### 9.3 `v1-copywriting-freeze.md`

补充“门户 / 出生点 / 当前世界状态”文案。

### 9.4 `v1-schema-final.md`

暂不新增坐标字段。  
后续可考虑：

```ts
worldCoordinate?: {
  areaId: string
  zone?: string
  order?: number
  depth?: 'surface' | 'middle' | 'deep'
}
```

### 9.5 `v1-build-board.md`

补充：

```text
[ ] 首页展示 WorldState
[ ] Atlas 显示空间层级
[ ] NodePage 显示当前位置
[ ] Manifesto 展示世界法则卡片
```

---

## 10. V1 可执行改进动作

立即加入 P1：

```text
[ ] 首页增加“当前世界状态”模块
[ ] Atlas 强化空间导航而非分类页
[ ] Archive 明确作为现实导航
[ ] NodePage 增加“你位于哪里”
[ ] Manifesto 增加“世界法则卡片”
[ ] Ask 低光增加“世界入口推荐”
```

加入 P2：

```text
[ ] 首页轻量 Portal 入场效果
[ ] AreaCard 增加 depth / surface 文案
[ ] Timeline 区分世界事件与内容更新
[ ] 设计“随机漂流”入口
```

暂不加入：

```text
[ ] 3D 世界
[ ] Avatar
[ ] 多人在线
[ ] WebXR
[ ] 虚拟资产
[ ] 空间语音
```

---

## 11. 古月浮屿自己的“数字宇宙定义”

建议在世界宪章或产品总览中加入：

```text
古月浮屿所说的数字宇宙，
不是公共多人 3D 元宇宙，
也不是虚拟经济空间。

它是一个个人数字世界：

以内容为星体，
以区域为空间，
以关系为星线，
以时间为河流，
以权限为边界，
以规则为自然法则，
以 AI 为灯塔，
以导出和传承为未来根系。
```

---

## 12. 设计原则：从元宇宙吸收，但不被元宇宙绑架

### 12.1 吸收

- 持久性
- 空间性
- 入口感
- 身份
- 临场感
- 世界规则
- 互操作
- 可达性
- 治理
- 多层深度

### 12.2 不吸收

- 过早 3D
- 过早 VR
- 过早 Avatar
- 过早多人社交
- 过早虚拟经济
- 过早资产交易
- 过早沉浸式游戏化

---

## 13. 未来 V6 方向预留

V6 可做：

```text
2.5D 浮岛地图
Canvas 星图
时间河可视化
记忆湖光片墙
技术星域关系图
AI 灯塔光束导览
Web Audio 氛围层
可选 WebXR 观星台
```

但前提：

- V1 骨架稳定
- V2 创世台可维护
- V3 AI 边界清晰
- V4 私密层安全
- V5 导出与回望成熟

---

## 14. 本轮调研最终判断

```text
古月浮屿需要“宇宙感”，
但不需要在 V1 成为“元宇宙平台”。
```

```text
宇宙感首先来自：
空间结构、时间流动、节点关系、法则边界、入口仪式和长期存在。
```

```text
3D 只是可能的未来表现，
不是世界成立的前提。
```

---

## 15. 参考来源

### 元宇宙 / 虚拟世界 / 数字孪生

- Interaction Design Foundation｜What is the Metaverse?  
  https://www.interaction-design.org/literature/topics/metaverse

- IBM｜What Is a Digital Twin?  
  https://www.ibm.com/think/topics/digital-twin

- Asian Development Bank｜Digital Twin Framework: A Practical Guide  
  https://www.adb.org/sites/default/files/publication/1051191/digital-twin-framework-guide.pdf

- Metaverse: A Vision, Architectural Elements, and Future Directions  
  https://clouds.cis.unimelb.edu.au/papers/Metaverse.pdf

- The Metaverse Is Geospatial: A System Model Architecture  
  https://www.mdpi.com/2220-9964/14/3/126

- Design Principles for Virtual Worlds  
  https://www.jstor.org/stable/23042803

### 开源元宇宙 / 虚拟世界平台

- OpenSimulator  
  https://www.opensimulator.org/

- Vircadia  
  https://vircadia.com/

- Vircadia GitHub / Open Metaverse references  
  https://github.com/forestbeasts/vircadia

- JanusWeb Guide  
  https://janusvr.github.io/guide/

- Webaverse GitHub  
  https://github.com/webaverse-studios/webaverse

- Babylon.js Metaverse Engine  
  https://www.babylonjs.com/metaverse/

- Awesome WebXR  
  https://github.com/msub2/awesome-webxr

- Awesome Metaverse  
  https://github.com/m3-org/awesome-metaverse

### WebXR / 空间 Web

- An Open, Cross-Platform, Web-Based Metaverse Using WebXR and A-Frame  
  https://arxiv.org/html/2408.13520v1
