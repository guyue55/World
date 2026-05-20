#!/usr/bin/env python3
"""
Pexels photo/video downloader template.
Requires: export PEXELS_API_KEY=your_key
Usage:
  python pexels_download_template.py --out ../assets/raw/pexels --limit 8
"""
from __future__ import annotations
import argparse, json, os, re, time
from pathlib import Path
from urllib.parse import urlparse
import requests

QUERIES = [
    "milky way mountains", "waterfall mist slow motion", "mountain cabin garden",
    "flower petals dew close up", "river reflection milky way", "spring flowers mountain valley",
    "summer green forest valley", "autumn forest mountain valley", "winter snow forest valley"
]

def safe_name(s: str) -> str:
    return re.sub(r"[^a-zA-Z0-9._-]+", "_", s).strip("_")[:120]

def download(url: str, path: Path):
    path.parent.mkdir(parents=True, exist_ok=True)
    with requests.get(url, stream=True, timeout=120) as r:
        r.raise_for_status()
        with open(path, "wb") as f:
            for chunk in r.iter_content(1024 * 1024):
                if chunk: f.write(chunk)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="assets/raw/pexels")
    ap.add_argument("--limit", type=int, default=8)
    args = ap.parse_args()
    key = os.getenv("PEXELS_API_KEY")
    if not key:
        raise SystemExit("Missing PEXELS_API_KEY")
    headers = {"Authorization": key}
    out = Path(args.out)
    records = []
    for q in QUERIES:
        for endpoint, kind in [("https://api.pexels.com/v1/search", "image"), ("https://api.pexels.com/videos/search", "video")]:
            r = requests.get(endpoint, params={"query": q, "per_page": args.limit}, headers=headers, timeout=30)
            r.raise_for_status()
            data = r.json()
            items = data.get("photos") if kind == "image" else data.get("videos")
            for item in items or []:
                if kind == "image":
                    url = item.get("src", {}).get("original") or item.get("src", {}).get("large2x")
                    creator = item.get("photographer")
                    page = item.get("url")
                else:
                    files = sorted(item.get("video_files", []), key=lambda f: (f.get("width") or 0) * (f.get("height") or 0), reverse=True)
                    url = files[0].get("link") if files else None
                    creator = None
                    page = item.get("url")
                if not url: continue
                ext = os.path.splitext(urlparse(url).path)[1] or (".mp4" if kind == "video" else ".jpg")
                target = out / kind / f"{safe_name(q)}__pexels_{item.get('id')}{ext}"
                try:
                    download(url, target)
                    status = "downloaded"
                except Exception as e:
                    status = f"failed: {e}"
                records.append({"query": q, "kind": kind, "source": "Pexels", "id": item.get("id"), "creator": creator, "page_url": page, "download_url": url, "local_path": str(target), "status": status})
                time.sleep(0.2)
    (out / "pexels_download_manifest.json").write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8")

if __name__ == "__main__":
    main()
