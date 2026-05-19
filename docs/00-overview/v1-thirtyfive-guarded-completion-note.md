# 古月浮屿｜V1 第三十五批阶段完成状态转换守卫说明

> 本文件说明第三十五批变更：在最终关闭报告之后，增加受保护的阶段完成状态转换流程。

## 新增命令

```bash
npm run stage:complete
npm run check:stage-completion-transition
npm run stage-completion:print
```

## 阶段判断

第一阶段仍不能宣布完成。此批只允许在真实证据 complete 后更新状态。

## 核心判断

```text
阶段状态只能由完整证据推动，
不能由人工感觉推动。
```
