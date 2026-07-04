# V9｜质量门禁

每阶段完成后必须执行阶段检查与 lint。最终执行：

```bash
npm run check:json
npm run check:repo
npm run check:v9-service-platform:all
npm run check:v9-service-platform:boundary
npm run lint
npm run typecheck
npm run build
npm run audit:report
```

`productionLive=false`、`serviceLive=false`、`releaseReady=false` 是 V9 的硬边界。
