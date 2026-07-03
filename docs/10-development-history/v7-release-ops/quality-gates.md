# V7｜质量门禁

阶段门禁：每阶段必须运行对应 `check:v7-release:stage-0X` 与 `lint`。

最终门禁：

```text
npm run check:json
npm run check:repo
npm run check:v7-release:all
npm run check:v7-release:privacy-boundary
npm run lint
npm run typecheck
npm run build
npm run audit:report
```

如果 build 在当前环境超时，只能标记为 compile/check 完成，不能标记 clean production-ready。
