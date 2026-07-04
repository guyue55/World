# R1｜质量门禁

R1 每个阶段完成后必须执行：

```bash
npm run check:r1-production:stage-0X
npm run lint
```

最终聚合门禁：

```bash
npm run check:json
npm run check:repo
npm run check:r1-production:all
npm run check:r1-production:boundary
npm run lint
npm run typecheck
npm run build
npm run audit:report
```

外部证据仍需在真实部署环境完成：

- Preview URL smoke test
- Production URL smoke test
- Manual release signoff
- Rollback rehearsal
