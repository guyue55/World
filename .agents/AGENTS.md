# WorldOS Development Guidelines

The following rules must be strictly followed when developing in this project:

1. **主线清晰，严禁污染 (Mainline Clarity, No Pollution)**:
   - 项目中保留了大量以 `v*`, `r*`, `phase-*` 命名的废弃/历史组件，这是为了“历史参考”。
   - 新功能开发必须在公开主线上进行。
   - 严禁让 Legacy 代码回流。

2. **私密权限不可硬编码在前端 (No Hardcoded Frontend Permissions)**:
   - 任何需要隐藏的私密内容、家庭档案等，必须由 Server 或 Middleware 拦截。
   - 不能仅靠前端 UI (如 CSS `display: none` 或前端判断) 隐藏。

3. **遵循 CLI 门禁体系 (Follow CLI Gatekeeping)**:
   - 虽然 `next.config.ts` 中为了加速把 `ignoreDuringBuilds` 设为了 `true`，但在提交代码前，必须保证通过 `npm run typecheck`, `npm run lint` 以及 `npm run check:product-release` 门禁。

4. **不要无脑加功能，以“收束”为主 (Consolidation over Expansion)**:
   - 现阶段的主旋律是梳理 API 边界、治理现有海量的脚本，以及提升公开节点/内容的可读性。
   - 避免开启新一轮“造轮子”，不要随意添加不必要的新功能。

5. **必须遵守 Superpowers 规范 (Superpowers Driven Development)**:
   - 任何涉及代码开发的任务，**必须**使用 `/superpowers` 技能集合及流程（如规划、测试驱动、检查边界等）。

6. **遵守最佳实践与代码质量 (Best Practices & High Cohesion)**:
   - 实践高内聚、低耦合、模块化、页面化等。
   - 降低门槛、提高体验、优先使用中文。

7. **Git 提交规范 (Git Commit Convention)**:
   - 每次有变更必须及时提交 Git。
   - 提交信息必须包含中文注释。
   - Commit 格式：`xxx(xxx): 中文xxx` (例如 `feat(user): 添加用户登录功能`)。
