# WorldOS Visual Overlay QA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 修复本地局域网 RC 截图中固定浮层遮挡移动端和桌面端内容的问题，并把遮挡检查纳入可重复验收。

**Architecture:** 保持现有 `WorldShell`、移动导航、运行态浮层和 LAN RC 脚本边界。页面组件负责体验呈现，RC 脚本负责浏览器运行时证据，权限仍由后端/服务端 guard 与现有 API 边界脚本控制。

**Tech Stack:** Next.js App Router、React、Tailwind CSS、原生 Chrome DevTools Protocol LAN RC 脚本、npm scripts。

## Global Constraints

- 目前只要求本地部署和局域网 IP 访问，使用 `npm run start`/现有 `smoke:lan-local` 验证。
- 遵守高内聚、低耦合、模块化、页面化。
- 中文优先，降低门槛，提高体验。
- 后端控制权限，前端只控制体现；本次不把权限事实硬编码到前端。
- 必须检查边界：`build`、`lint`、`typecheck`、`check:boundary`、`smoke:lan-local`。
- 提交格式：`xxx(xxx): 中文xxx`。

---

## File Structure

- Modify: `src/components/navigation/MobileRouteNav.tsx`
  - 负责移动端主导航展示。将固定底部大胶囊改为不遮挡首屏语义内容的紧凑顶部/安全区导航。
- Modify: `src/components/world/WorldShell.tsx`
  - 负责全局壳层、footer、移动导航挂载和主内容底部安全距离。
- Modify: `src/components/world/WorldRuntimeProvider.tsx`
  - 负责运行态浮层。收敛桌面断点和位置，避免压主内容。
- Modify: `src/components/product/ProductJourneyDock.tsx`
  - 负责旅程和模式浮层。降低桌面干扰，避免和运行态浮层共同挤压内容。
- Modify: `scripts/run-worldos-local-lan-rc.mjs`
  - 负责 LAN RC 浏览器证据。新增固定浮层与可读内容交叠的 DOM 几何检查。
- Evidence updated by verification:
  - `docs/90-archive/reports/worldos-local-lan-rc-report.json`
  - `docs/90-archive/reports/worldos-local-lan-rc/*.png`
  - `docs/90-archive/reports/worldos-local-runtime-smoke-report.json`
  - `docs/90-archive/reports/npm-audit-report.json`
  - `docs/90-archive/reports/worldos-external-evidence-template.json`
  - `public/world-index.json`

## Task 1: 移动端导航不遮挡内容

**Files:**
- Modify: `src/components/navigation/MobileRouteNav.tsx`
- Modify: `src/components/world/WorldShell.tsx`

**Interfaces:**
- Consumes: `getNavigationItems()` and `isNavigationItemActive(pathname, item)` from `@/lib/navigation`.
- Produces: `<MobileRouteNav />` remains the same public component with no new props.

- [ ] **Step 1: Move mobile navigation away from bottom content**

Change `MobileRouteNav` to render as a sticky top navigation inside normal document flow. Keep labels Chinese and keep `aria-current`.

Expected implementation shape:

```tsx
<nav
  aria-label="移动端主导航"
  className="sticky top-0 z-40 mx-auto w-[min(100%-1rem,36rem)] rounded-b-[1.25rem] border-x border-b border-ink/10 bg-paper/94 px-2 py-2 shadow-soft backdrop-blur-xl md:hidden"
>
  <div className="grid grid-cols-5 gap-1 text-center text-xs">
    ...
  </div>
</nav>
```

- [ ] **Step 2: Keep shell spacing simple**

Remove unnecessary mobile bottom padding from `WorldShell` because navigation is no longer fixed at the viewport bottom.

Expected implementation shape:

```tsx
<div className="min-h-screen">
```

- [ ] **Step 3: Verify locally**

Run:

```bash
npm run lint
```

Expected: exit code 0.

## Task 2: 桌面浮层降低主内容干扰

**Files:**
- Modify: `src/components/world/WorldRuntimeProvider.tsx`
- Modify: `src/components/product/ProductJourneyDock.tsx`

**Interfaces:**
- Consumes: existing runtime context and journey local storage behavior.
- Produces: same components and same user-facing actions.

- [ ] **Step 1: Make runtime dock less invasive**

Keep the runtime dock desktop-only but move it to wider screens and make it pointer-friendly without covering common content columns.

Expected implementation shape:

```tsx
className="fixed bottom-6 left-6 z-30 hidden w-[18rem] rounded-[1.25rem] ... 2xl:block"
```

- [ ] **Step 2: Make journey dock less invasive**

Keep journey dock visible only on extra-wide screens and move it closer to the edge.

Expected implementation shape:

```tsx
className="fixed bottom-6 right-6 z-30 hidden max-w-[300px] ... 2xl:block"
```

- [ ] **Step 3: Verify locally**

Run:

```bash
npm run typecheck
```

Expected: exit code 0.

## Task 3: LAN RC 增加遮挡防回归

**Files:**
- Modify: `scripts/run-worldos-local-lan-rc.mjs`

**Interfaces:**
- Consumes: existing `registry.browser.viewports` and `registry.browserRoutes`.
- Produces: each browser check gains `fixedOverlayIssues: Array<{ overlay: string, content: string, overlapRatio: number }>` and fails when fixed/sticky overlays cover meaningful text blocks.

- [ ] **Step 1: Add geometry-based overlay check**

Inside the browser `Runtime.evaluate` expression, collect fixed or sticky visible elements and meaningful text blocks, then report overlaps above a conservative threshold.

Expected behavior:

```js
fixedOverlayIssues: []
```

for passing pages. A page fails when fixed/sticky UI covers a heading, paragraph, link, button, article, section, or main text block by more than the threshold.

- [ ] **Step 2: Wire failure criteria**

Extend `passed` with:

```js
&& metrics.fixedOverlayIssues.length === 0
```

and include the issue count in failure output.

- [ ] **Step 3: Verify the check with LAN smoke**

Run:

```bash
npm run smoke:lan-local
```

Expected: exit code 0 and fresh screenshots where mobile content is not hidden under bottom navigation.

## Task 4: Full verification and commit

**Files:**
- Modified source files from Tasks 1-3.
- Generated evidence files from verification commands.

**Interfaces:**
- Consumes: all prior tasks.
- Produces: one git commit with Chinese conventional-style message.

- [ ] **Step 1: Run full local gate**

Run:

```bash
npm run lint
npm run typecheck
npm run check:boundary
npm run check:rc:full
```

Expected: all commands exit code 0. `npm audit` may still report 2 moderate vulnerabilities through `audit:report`; that is recorded risk, not a local RC blocker.

- [ ] **Step 2: Inspect evidence and git diff**

Run:

```bash
git diff --stat
git status --short
```

Expected: only planned source, plan, generated evidence, and screenshot files changed.

- [ ] **Step 3: Commit**

Run:

```bash
git add docs/superpowers/plans/2026-07-06-visual-overlay-qa.md src/components/navigation/MobileRouteNav.tsx src/components/world/WorldShell.tsx src/components/world/WorldRuntimeProvider.tsx src/components/product/ProductJourneyDock.tsx scripts/run-worldos-local-lan-rc.mjs docs/90-archive/reports public/world-index.json
git commit -m "fix(ui): 修复浮层遮挡体验"
```

Expected: commit succeeds.

## Self-Review

- Spec coverage: 覆盖移动端遮挡、桌面浮层、LAN RC 防回归、局域网本地验收、权限边界检查和中文 commit。
- Placeholder scan: 无 TBD/TODO/implement later。
- Type consistency: 组件接口不变，LAN RC 报告字段新增在 `metrics` 内，不破坏现有消费者。
