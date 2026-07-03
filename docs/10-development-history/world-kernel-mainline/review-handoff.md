# Review Handoff

This branch contains one code refactor and supporting kernel boundary documents.

Code refactor:

```text
WorldShell -> WorldRuntimeStack
```

Review focus:

```text
1. WorldShell should remain small.
2. Existing runtime projection order should remain stable.
3. Permissions remain data/runtime controlled.
4. No release-ready claim is introduced.
```
