# Contributing

## Branch Flow

- `main` keeps stable local-engineering-ready code.
- Use feature branches for all changes.
- Every change must pass:

```bash
npm run lint
npm run typecheck
npm run check:experience
npm run build
```

## Documentation Rules

- Development-before-code documents go under `docs/00-*` to `docs/03-*`.
- Version development records go under `docs/10-development-history/`.
- Research goes under `docs/20-research/`.
- Do not mix design/source documents with version execution logs.
