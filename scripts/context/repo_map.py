#!/usr/bin/env python3
"""Generate a compact repository map for agent context loading."""

from __future__ import annotations

import argparse
import ast
import json
import os
import re
import subprocess
from collections import defaultdict
from datetime import datetime
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Sequence, Tuple


ROOT = Path.cwd()
PROJECT = ROOT.name
DEFAULT_OUTPUT = ROOT / "tmp" / f"{PROJECT}-repo-map.md"
DEFAULT_JSON_OUTPUT = ROOT / "tmp" / f"{PROJECT}-repo-map.json"
MAX_BYTES = 512 * 1024
MAX_SYMBOLS_PER_FILE = 80

SKIP_DIRS = {
    ".git",
    ".hg",
    ".svn",
    ".next",
    ".nuxt",
    ".cache",
    ".pytest_cache",
    ".mypy_cache",
    ".ruff_cache",
    ".turbo",
    ".vercel",
    ".netlify",
    ".venv",
    "venv",
    "env",
    "node_modules",
    "dist",
    "build",
    "out",
    "coverage",
    "__pycache__",
    "tmp",
}

SKIP_SUFFIXES = {
    ".7z",
    ".a",
    ".avif",
    ".bak",
    ".bin",
    ".bmp",
    ".bz2",
    ".class",
    ".db",
    ".dmg",
    ".doc",
    ".docx",
    ".DS_Store",
    ".eot",
    ".exe",
    ".gif",
    ".gz",
    ".ico",
    ".jar",
    ".jpeg",
    ".jpg",
    ".key",
    ".lockb",
    ".log",
    ".mov",
    ".mp3",
    ".mp4",
    ".otf",
    ".pdf",
    ".pem",
    ".pkl",
    ".png",
    ".pyc",
    ".pyo",
    ".rar",
    ".sqlite",
    ".sqlite3",
    ".tar",
    ".tgz",
    ".tsbuildinfo",
    ".ttf",
    ".wasm",
    ".webm",
    ".webp",
    ".woff",
    ".woff2",
    ".xls",
    ".xlsx",
    ".zip",
}

SKIP_NAMES = {
    ".env",
    ".env.local",
    ".env.development",
    ".env.production",
    ".env.test",
    "package-lock.json",
    "pnpm-lock.yaml",
    "yarn.lock",
}

SECRET_NAME_RE = re.compile(
    r"(^|[-_.])(secret|secrets|token|tokens|credential|credentials|private|id_rsa|cert|certificate|backup|dump)([-_.]|$)",
    re.IGNORECASE,
)

JS_SYMBOL_RE = re.compile(
    r"""
    ^\s*
    (?:
      export\s+(?:default\s+)?(?:
        async\s+function\s+(?P<export_function>[A-Za-z_$][\w$]*)|
        function\s+(?P<export_function2>[A-Za-z_$][\w$]*)|
        class\s+(?P<export_class>[A-Za-z_$][\w$]*)|
        (?:const|let|var)\s+(?P<export_const>[A-Za-z_$][\w$]*)|
        (?:interface|type|enum)\s+(?P<export_type>[A-Za-z_$][\w$]*)
      )
      |
      (?P<async>async\s+)?function\s+(?P<function>[A-Za-z_$][\w$]*)|
      class\s+(?P<class>[A-Za-z_$][\w$]*)|
      (?:const|let|var)\s+(?P<const>[A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?(?:\([^)]*\)|[A-Za-z_$][\w$]*)\s*=?>
    )
    """,
    re.VERBOSE,
)


def run_git_ls_files() -> Optional[List[Path]]:
    try:
        result = subprocess.run(
            ["git", "ls-files", "-z"],
            cwd=str(ROOT),
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
    except (OSError, subprocess.CalledProcessError):
        return None
    paths = [Path(item) for item in result.stdout.decode("utf-8", "replace").split("\0") if item]
    return paths


def walk_files() -> List[Path]:
    files: List[Path] = []
    for current, dirnames, filenames in os.walk(ROOT):
        current_path = Path(current)
        rel_dir = current_path.relative_to(ROOT)
        dirnames[:] = [name for name in dirnames if not should_skip_dir(rel_dir / name)]
        for filename in filenames:
            files.append((rel_dir / filename) if rel_dir != Path(".") else Path(filename))
    return files


def should_skip_dir(path: Path) -> bool:
    return any(part in SKIP_DIRS for part in path.parts)


def should_skip_file(path: Path) -> Tuple[bool, str]:
    if should_skip_dir(path.parent):
        return True, "ignored directory"
    name = path.name
    lower_name = name.lower()
    suffix = path.suffix.lower()
    if lower_name.startswith(".env"):
        return True, "environment file"
    if name in SKIP_NAMES:
        return True, "lock or sensitive file"
    if suffix in {item.lower() for item in SKIP_SUFFIXES}:
        return True, "binary or generated suffix"
    if SECRET_NAME_RE.search(name):
        return True, "sensitive-looking filename"
    full_path = ROOT / path
    try:
        stat = full_path.stat()
    except OSError:
        return True, "unreadable"
    if stat.st_size > MAX_BYTES:
        return True, f"large file > {MAX_BYTES} bytes"
    if is_probably_binary(full_path):
        return True, "binary content"
    return False, ""


def is_probably_binary(path: Path) -> bool:
    try:
        chunk = path.read_bytes()[:4096]
    except OSError:
        return True
    return b"\0" in chunk


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="replace")


def python_symbols(path: Path) -> List[Dict[str, object]]:
    try:
        tree = ast.parse(read_text(ROOT / path))
    except SyntaxError:
        return []
    symbols: List[Dict[str, object]] = []
    for node in ast.walk(tree):
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef)):
            kind = "class" if isinstance(node, ast.ClassDef) else "function"
            symbols.append({"kind": kind, "name": node.name, "line": node.lineno})
    return sorted(symbols, key=lambda item: int(item["line"]))[:MAX_SYMBOLS_PER_FILE]


def js_symbols(path: Path) -> List[Dict[str, object]]:
    symbols: List[Dict[str, object]] = []
    try:
        lines = read_text(ROOT / path).splitlines()
    except OSError:
        return symbols
    for index, line in enumerate(lines, start=1):
        match = JS_SYMBOL_RE.match(line)
        if not match:
            continue
        groups = match.groupdict()
        name = next((value for value in groups.values() if value and not value.strip().endswith(" ")), None)
        if not name or name == "async":
            continue
        if groups.get("export_class") or groups.get("class"):
            kind = "class"
        elif groups.get("export_type"):
            kind = "type"
        elif groups.get("export_const") or groups.get("const"):
            kind = "const"
        else:
            kind = "function"
        symbols.append({"kind": kind, "name": name, "line": index})
        if len(symbols) >= MAX_SYMBOLS_PER_FILE:
            break
    return symbols


def extract_symbols(path: Path) -> List[Dict[str, object]]:
    suffix = path.suffix.lower()
    if suffix == ".py":
        return python_symbols(path)
    if suffix in {".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs"}:
        return js_symbols(path)
    return []


def collect_files() -> Tuple[str, List[Path], Dict[str, int]]:
    source = "git ls-files"
    paths = run_git_ls_files()
    if paths is None:
        source = "filesystem walk"
        paths = walk_files()
    skipped: Dict[str, int] = defaultdict(int)
    kept: List[Path] = []
    for path in sorted(paths, key=lambda item: str(item)):
        skip, reason = should_skip_file(path)
        if skip:
            skipped[reason] += 1
            continue
        kept.append(path)
    return source, kept, dict(sorted(skipped.items()))


def build_map() -> Dict[str, object]:
    source, files, skipped = collect_files()
    entries = []
    extension_counts: Dict[str, int] = defaultdict(int)
    for path in files:
        suffix = path.suffix.lower() or "[none]"
        extension_counts[suffix] += 1
        entries.append(
            {
                "path": str(path),
                "size": (ROOT / path).stat().st_size,
                "symbols": extract_symbols(path),
            }
        )
    return {
        "project": PROJECT,
        "root": str(ROOT),
        "generated_at": datetime.now().isoformat(timespec="seconds"),
        "file_source": source,
        "file_count": len(entries),
        "extension_counts": dict(sorted(extension_counts.items(), key=lambda item: (-item[1], item[0]))),
        "skipped": skipped,
        "files": entries,
    }


def render_markdown(data: Dict[str, object]) -> str:
    lines = [
        f"# {data['project']} Repo Map",
        "",
        f"- Root: `{data['root']}`",
        f"- Generated: `{data['generated_at']}`",
        f"- File source: `{data['file_source']}`",
        f"- Included files: `{data['file_count']}`",
        "",
        "## Extension Summary",
        "",
    ]
    for suffix, count in data["extension_counts"].items():  # type: ignore[index, union-attr]
        lines.append(f"- `{suffix}`: {count}")
    lines.extend(["", "## Skipped Summary", ""])
    skipped = data["skipped"]  # type: ignore[assignment]
    if skipped:
        for reason, count in skipped.items():  # type: ignore[union-attr]
            lines.append(f"- {reason}: {count}")
    else:
        lines.append("- None")
    lines.extend(["", "## Files", ""])
    current_dir = None
    for entry in data["files"]:  # type: ignore[index, union-attr]
        path = entry["path"]
        directory = str(Path(path).parent)
        if directory != current_dir:
            current_dir = directory
            lines.extend(["", f"### `{directory}`", ""])
        lines.append(f"- `{path}` ({entry['size']} bytes)")
        for symbol in entry["symbols"]:
            lines.append(f"  - L{symbol['line']} `{symbol['kind']}` `{symbol['name']}`")
    lines.append("")
    return "\n".join(lines)


def parse_args(argv: Optional[Sequence[str]] = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate a compact repository map.")
    parser.add_argument("--output", default=str(DEFAULT_OUTPUT), help="Markdown output path.")
    parser.add_argument("--json", action="store_true", help="Also write JSON output.")
    parser.add_argument("--json-output", default=str(DEFAULT_JSON_OUTPUT), help="JSON output path.")
    return parser.parse_args(argv)


def main(argv: Optional[Sequence[str]] = None) -> int:
    args = parse_args(argv)
    data = build_map()
    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(render_markdown(data), encoding="utf-8")
    print(f"Wrote {output}")
    if args.json:
        json_output = Path(args.json_output)
        json_output.parent.mkdir(parents=True, exist_ok=True)
        json_output.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"Wrote {json_output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
