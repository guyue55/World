# 古月浮屿｜V1 世界骨架阶段验收清单

> 用途：判断本阶段是否可以进入 V1 产品化和内容种子阶段。

## 1. 数据骨架

- [ ] core objects 已注册
- [ ] schema version 已注册
- [ ] visibility 边界已定义
- [ ] lifecycle policy 已定义
- [ ] world event contract 已定义
- [ ] spatial protocol 已定义
- [ ] ontology 已定义
- [ ] extension registry 已定义

## 2. 运行时骨架

- [ ] world-core 可聚合
- [ ] world-kernel 可评估
- [ ] public index 可生成
- [ ] projection contract 可检查
- [ ] AI boundary 可检查
- [ ] extension registry 可检查
- [ ] foundation gate 可检查

## 3. 文档骨架

- [ ] 内核文档完整
- [ ] 协议文档完整
- [ ] 边界文档完整
- [ ] 未来扩展文档完整
- [ ] ADR 已建立
- [ ] 术语表已建立
- [ ] 运行手册已建立

## 4. 命令

```bash
npm run check:world-core
npm run check:foundation
npm run check:docs
npm run kernel:report
```

## 5. 验收判断

```text
如果以上通过，
世界骨架阶段可以进入 V1 产品化阶段。
```
