# Release Note Draft

This branch is not a product feature release. It is a structural consolidation step.

## What changed

```text
WorldShell now delegates all R8 projection layers to WorldRuntimeStack.
World Kernel boundary is documented.
A mainline kernel check script is added.
Check-group split is proposed, not yet applied.
```

## What did not change

```text
No route changes.
No permission policy changes.
No production-ready claim.
No new V/R expansion line.
No public/private data movement.
```

## Validation note

Connector-based work cannot run local npm commands. The branch includes the check script and documentation; actual CI or local command validation must happen after checkout.
