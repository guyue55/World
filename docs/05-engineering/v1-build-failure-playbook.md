# 古月浮屿｜V1 构建失败处置手册

> 阶段：V1
> 性质：真实构建失败恢复路径
> 目标：把构建失败转化为可修复任务，而不是临时绕过守门。

## 1. 文件

```text
data/build-failure-playbook.json
```

## 2. 失败类型

```text
dependency-install-fail
eslint-fail
typecheck-fail
world-core-fail
next-build-fail
preview-fail
performance-fail
visual-qa-fail
```

## 3. 处理原则

```text
先定位失败类型，再修复。
不要为了通过构建删除守门脚本。
不要为了通过 lint 牺牲模块边界。
失败修复后必须补 CHECK_REPORT。
```

## 4. 核心判断

```text
构建失败不是中断，
而是把隐性风险变成可修复任务。
```
