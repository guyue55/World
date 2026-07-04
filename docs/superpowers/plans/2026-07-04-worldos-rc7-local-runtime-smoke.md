# Superpowers Plan｜WorldOS 1.0 RC7 本地运行时 HTTP Smoke

## 适用技能

```text
using-superpowers
writing-plans
executing-plans
systematic-debugging
verification-before-completion
finishing-a-development-branch
```

## 目标

在暂时不能真实外部部署的前提下，继续推进可验证证据：启动本地 production server，执行真实 HTTP smoke，验证核心公开路由、静态资源、SEO、redirect、guard 和 404。

## 执行计划

1. 建立本地运行时 smoke 注册表。
2. 编写 `next start` HTTP smoke runner。
3. 编写静态门禁，防止注册表、脚本、文档和生产状态漂移。
4. 接入 `check:mainline`、`check:boundary` 与 `check:rc:full`。
5. 更新 README / CONTRIBUTING / 审计报告。
6. 复跑门禁、提交 git、打包。

## 边界

```text
不新增公开功能。
不改变 productionLive / releaseReady / cleanProductionReady。
不把本地 smoke 伪装成真实线上证据。
```
