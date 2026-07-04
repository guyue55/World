# V10｜质量门禁

## 阶段门禁

每个阶段必须执行：

```bash
npm run check:v10-intelligent-world:stage-0X
npm run lint
```

## 最终门禁

```bash
npm run check:json
npm run check:repo
npm run check:v10-intelligent-world:all
npm run check:v10-intelligent-world:boundary
npm run lint
npm run typecheck
npm run audit:report
npm run build
```

## 不可放宽项

- AI 不得自动公开、删除、覆盖原文或读取 vault。
- 演化规则只能建议，不能自动执行。
- 生产上线、cleanProductionReady、releaseReady 在未取得真实外部证据前必须为 false。
