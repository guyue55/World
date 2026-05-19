# 古月浮屿｜V1 第三十一批真实执行证据交接说明

> 本文件说明第三十一批变更：把第一阶段完成所需的真实执行证据、构建失败处置、性能实测记录和浏览器 QA 记录纳入骨架。

## 本次重点

第三十一批解决：

```text
真实执行证据台账
构建失败处置手册
性能实测记录模板
浏览器 QA 记录模板
阶段门禁证据回写入口
真实证据检查脚本
```

## 新增数据

```text
data/real-execution-evidence-ledger.json
data/build-failure-playbook.json
data/performance-measurement-records.json
data/browser-qa-records.json
```

## 新增代码

```text
src/lib/real-evidence.ts
src/components/world/RealEvidencePanel.tsx
```

## 新增脚本

```text
scripts/check-real-evidence.ts
scripts/print-real-evidence.ts
```

## 新增命令

```bash
npm run check:real-evidence
npm run real-evidence:print
```

## 阶段判断

第一阶段仍然不能宣布完成，但已经具备“如何收集完成证据”的完整入口。

## 核心判断

```text
真实执行结果必须被记录，
不能停留在口头通过。
```
