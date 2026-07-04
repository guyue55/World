# R7 质量门禁

R7 每个阶段完成后必须执行：

```bash
npm run check:r7-world-evolution:stage-0X
npm run lint
```

最终门禁：

```bash
npm run check:json
npm run check:repo
npm run check:r7-world-evolution:all
npm run check:r7-world-evolution:boundary
npm run lint
npm run typecheck
npm run build
npm run audit:report
```
