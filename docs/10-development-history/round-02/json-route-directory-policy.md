# JSON Route Directory Policy

## Decision

`src/app/world-index.json/` and `src/app/world-manifest.json/` are intentional Next App Router route directories.

They expose:

```text
/world-index.json
/world-manifest.json
```

## Rule

Repository JSON scanners must parse only files ending with `.json`. Directories ending with `.json` are allowed only when they are listed as intentional route directories.

## Current Allowlist

```text
src/app/world-index.json
src/app/world-manifest.json
```

## Reason

Renaming these directories would break the public API paths. The correct fix is to make audit tooling file-aware and route-directory-aware.
