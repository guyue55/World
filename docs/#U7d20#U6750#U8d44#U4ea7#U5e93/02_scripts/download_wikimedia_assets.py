#!/usr/bin/env python3
"""
Download Wikimedia Commons image/video candidates and preserve license metadata.
Usage:
  python download_wikimedia_assets.py --out ../assets/raw/wikimedia --limit 6
"""
from __future__ import annotations
import argparse, json, os, re, time
from pathlib import Path
from urllib.parse import urlparse
import requests

API = "https://commons.wikimedia.org/w/api.php"
QUERIES = [
    "mountain cloud sea sunrise", "stone arch ruins wide angle", "brass astrolabe compass telescope",
    "baroque library interior", "cliff rock waterfall moss", "botanical garden greenhouse glass dome",
    "stone bridge clock tower river night", "large telescope brass close up", "tree rings bark close up"
]

def safe_name(s: str) -> str:
    return re.sub(r"[^a-zA-Z0-9._-]+", "_", s).strip("_")[:140]

def search(query: str, limit: int):
    params = {
        "action": "query", "format": "json", "generator": "search", "gsrnamespace": 6,
        "gsrsearch": query, "gsrlimit": limit, "prop": "imageinfo",
        "iiprop": "url|mime|size|extmetadata"
    }
    r = requests.get(API, params=params, timeout=30)
    r.raise_for_status()
    pages = r.json().get("query", {}).get("pages", {})
    return list(pages.values())

def download(url: str, path: Path):
    path.parent.mkdir(parents=True, exist_ok=True)
    with requests.get(url, stream=True, timeout=120, headers={"User-Agent":"GuyueMaterialCollector/1.0"}) as r:
        r.raise_for_status()
        with open(path, "wb") as f:
            for chunk in r.iter_content(1024 * 1024):
                if chunk: f.write(chunk)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="assets/raw/wikimedia")
    ap.add_argument("--limit", type=int, default=6)
    args = ap.parse_args()
    out = Path(args.out)
    records = []
    for q in QUERIES:
        for page in search(q, args.limit):
            info = (page.get("imageinfo") or [{}])[0]
            url = info.get("url")
            if not url: continue
            meta = info.get("extmetadata", {})
            license_short = meta.get("LicenseShortName", {}).get("value")
            usage_terms = meta.get("UsageTerms", {}).get("value")
            artist = meta.get("Artist", {}).get("value")
            credit = meta.get("Credit", {}).get("value") or meta.get("ObjectName", {}).get("value")
            mime = info.get("mime") or ""
            kind = "video" if mime.startswith("video/") else "image"
            ext = os.path.splitext(urlparse(url).path)[1] or ".bin"
            filename = f"{safe_name(q)}__{safe_name(page.get('title','file'))}{ext}"
            target = out / kind / filename
            try:
                download(url, target)
                status = "downloaded"
            except Exception as e:
                status = f"failed: {e}"
            records.append({
                "query": q, "title": page.get("title"), "source": "Wikimedia Commons", "kind": kind,
                "mime": mime, "license": license_short, "usage_terms": usage_terms,
                "artist": artist, "credit": credit, "download_url": url, "local_path": str(target), "status": status
            })
            time.sleep(0.2)
    (out / "wikimedia_download_manifest.json").write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8")

if __name__ == "__main__":
    main()
