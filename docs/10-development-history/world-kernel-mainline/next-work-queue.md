# Next Work Queue

## P0

```text
1. Wire check-world-kernel-mainline into package.json.
2. Split the long world-core gate into core, runtime, release, and legacy groups.
3. Keep strict focused on lint, typecheck, and core checks.
4. Add a production build repair track for clean Next build exit.
```

## P1

```text
1. Group WorldRuntimeStack into ambient, transition, navigation, object, quest, and utility layers.
2. Reduce always-mounted runtime projection components.
3. Move route facts back into data/domain files.
4. Add a route-aware runtime config so every projection layer does not need to infer route independently.
```

## P2

```text
1. Keep Chinese-first user experience.
2. Keep world language, but every world term needs a plain explanation.
3. Check mobile entry, compass, timeline, node page, and lighthouse first.
4. Keep reduced-motion available.
```

## P3

```text
1. Frontend controls presentation only, not data authority.
2. Only public and semiPublic can enter public index.
3. private, family, partner, vault, sealed, and silent must stay out of public build.
4. Public AI context can read public index only.
```
