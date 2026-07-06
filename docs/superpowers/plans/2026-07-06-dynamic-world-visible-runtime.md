# 2026-07-06 Dynamic World Visible Runtime Plan

## Goal

Make the public homepage visibly feel like a living world rather than a static blog shell, while keeping the current WorldOS boundaries:

- Data comes from server-built public world surfaces.
- Frontend visibility is not permission control.
- Motion remains subtle, readable, mobile-safe, and reduced-motion compatible.
- No R8 or legacy dynamic universe components are promoted into the mainline routes.

## Current Finding

The public app already has:

- `WorldRuntimeProvider` with global runtime state and ambient motion.
- `WorldLiveMapPanel` inside the homepage hero.
- `ProductDynamicWorldGuide` after the hero.
- `check:dynamic-world` to guard mainline dynamic surface contracts.

But the first viewport still reads as a static editorial/blog homepage because the runtime signal is mostly atmospheric and the route map is a small side panel. The page does not clearly expose: "this world has live routes, changing status, route pulses, and a current runtime state."

## Scope

### 1. Add A First-Viewport Runtime Signal

Create a mainline component:

- `src/components/world/WorldPulseConstellation.tsx`

It should:

- Consume `HomeDynamicWorldSurface`.
- Consume `useWorldRuntime`.
- Render route pulses from `surface.routes`.
- Highlight the server-selected `surface.primaryHref`.
- Show simple public metrics derived from public surface counts.
- Support reduced motion by disabling looping movement.

### 2. Integrate Into Homepage Hero

Modify:

- `src/components/product/ProductHome.tsx`

Place `WorldPulseConstellation` in the hero side panel above or near `WorldLiveMapPanel`, so the first viewport contains an explicit dynamic world signal.

### 3. Extend Dynamic Surface Guard

Modify:

- `scripts/check-public-dynamic-world-surfaces.mjs`

Guard that:

- The new component exists.
- It consumes `public-world-surfaces`.
- It consumes `useWorldRuntime`.
- It uses `surface.routes`, `surface.entryPoints`, `surface.primaryHref`.
- `ProductHome` renders `WorldPulseConstellation`.
- Reduced motion is considered.

## Verification

Run:

```bash
npm run check:dynamic-world
npm run lint
npm run typecheck
npm run check:boundary
```

If the change affects screenshots or runtime behavior enough to need RC evidence, run:

```bash
npm run release:local-rc
```

## Commit

Use:

```text
feat(world): 增强动态世界可见性
```
