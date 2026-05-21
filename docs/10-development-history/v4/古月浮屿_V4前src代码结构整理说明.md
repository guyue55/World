# 古月浮屿｜V4 前 src 代码结构整理说明

## 业内专业处理方式

```text
不建议长期在 src/ 下继续扩 src/lib/v1、src/lib/v2、src/lib/v3、src/lib/v4。
更专业的做法是：按业务域 / feature / bounded context 切分。
版本号只保留在 API 路由、协议版本、迁移层、兼容层。
```

## 本轮整理结论

```text
采用 features / platform / shared 分层。
旧路径保留 re-export 兼容。
V4 新代码禁止进入 src/lib/v4。
V4 新业务能力应进入 src/features/v4-*。
```

## 新结构

```text
src/
  app/
  components/
  features/
    platform-v2/
    platform-v2-1/
    intelligent-world-v3/
    v3-concept/
    pre-v4-gate/
  platform/
    server/
      v2/
  shared/
  lib/       # 兼容层 + 待迁移历史模块
  server/    # 兼容层
```

## 已迁移

```text
src/lib/v2             -> src/features/platform-v2
src/lib/v2-1           -> src/features/platform-v2-1
src/lib/v3             -> src/features/intelligent-world-v3
src/lib/v3-concept     -> src/features/v3-concept
src/lib/pre-v4         -> src/features/pre-v4-gate
src/server/v2          -> src/platform/server/v2
```

## 已保留兼容

```text
src/lib/v2/*
src/lib/v2-1/*
src/lib/v3/*
src/lib/v3-concept/*
src/lib/pre-v4/*
src/server/v2/*
```

这些旧路径现在作为 re-export 兼容层存在，避免一次性改坏已有页面、脚本和 API 路由。

## 新增命令

```bash
npm run check:pre-v4:src-structure
```

## 检查结果

```text
JSON parse check passed.
Static structure logic check passed.
Import path migration scan passed.
Static lint risk scan passed.
Basic format check on changed files passed.
Real command npm run check:pre-v4:src-structure: blocked-or-failed
```

## 后续规则

```text
V4 不新建 src/lib/v4。
V4 协作能力：src/features/v4-collaboration
V4 插件能力：src/features/v4-plugin-ecosystem
V4 宇宙工作台：src/features/v4-universe-workbench
V4 发布网络：src/features/v4-publishing-network
V4 治理安全：src/features/v4-governance
跨版本共享类型/工具：src/shared
服务端平台能力：src/platform/server
```

## 本轮未打包

```text
没有要求无需打包。
```

## 变更文件数

```text
57
```
