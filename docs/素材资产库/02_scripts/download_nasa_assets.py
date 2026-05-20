#!/usr/bin/env python3
"""
Download NASA Image and Video Library assets for the Guyue visual material library.
Usage:
  python download_nasa_assets.py --out ../assets/raw/nasa --limit 8
"""
from __future__ import annotations
import argparse, json, os, re, time
from pathlib import Path
from urllib.parse import urlencode
import requests

QUERIES = [
    "milky way galaxy panorama", "nebula Hubble Webb", "planet Jupiter Saturn Mars Earth",
    "star field deep space", "moon starry sky", "star trails time lapse", "spectral lines stars",
    "Earth from space night lights"
]
API = "https://images-api.nasa.gov"

def safe_name(s: str) -> str:
    return re.sub(r"[^a-zA-Z0-9._-]+", "_", s).strip("_")[:120]

def best_asset_url(nasa_id: str, media_type: str) -> str | None:
    r = requests.get(f"{API}/asset/{nasa_id}", timeout=30)
    r.raise_for_status()
    items = r.json().get("collection", {}).get("items", [])
    hrefs = [i.get("href") for i in items if i.get("href")]
    if media_type == "image":
        for suffix in ["~orig", "~large", "~medium"]:
            for h in hrefs:
                if suffix in h and h.lower().split("?")[0].endswith((".jpg", ".jpeg", ".png", ".tif", ".tiff")):
                    return h
        for h in hrefs:
            if h.lower().split("?")[0].endswith((".jpg", ".jpeg", ".png")):
                return h
    if media_type == "video":
        for h in hrefs:
            if h.lower().split("?")[0].endswith((".mp4", ".mov")):
                return h
    return None

def download(url: str, path: Path):
    path.parent.mkdir(parents=True, exist_ok=True)
    with requests.get(url, stream=True, timeout=120) as r:
        r.raise_for_status()
        with open(path, "wb") as f:
            for chunk in r.iter_content(1024 * 1024):
                if chunk: f.write(chunk)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="assets/raw/nasa")
    ap.add_argument("--limit", type=int, default=8)
    args = ap.parse_args()
    out = Path(args.out)
    records = []
    for q in QUERIES:
        for media_type in ["image", "video"]:
            params = {"q": q, "media_type": media_type, "page_size": args.limit}
            res = requests.get(f"{API}/search?{urlencode(params)}", timeout=30)
            res.raise_for_status()
            items = res.json().get("collection", {}).get("items", [])
            for item in items[:args.limit]:
                data = (item.get("data") or [{}])[0]
                nasa_id = data.get("nasa_id")
                if not nasa_id: continue
                try:
                    asset_url = best_asset_url(nasa_id, media_type)
                    if not asset_url: continue
                    ext = os.path.splitext(asset_url.split("?")[0])[1] or (".mp4" if media_type == "video" else ".jpg")
                    filename = f"{safe_name(q)}__{safe_name(nasa_id)}{ext}"
                    target = out / media_type / filename
                    download(asset_url, target)
                    records.append({"query": q, "media_type": media_type, "nasa_id": nasa_id, "title": data.get("title"), "date_created": data.get("date_created"), "download_url": asset_url, "local_path": str(target), "source": "NASA"})
                    time.sleep(0.2)
                except Exception as e:
                    records.append({"query": q, "media_type": media_type, "nasa_id": nasa_id, "error": str(e), "source": "NASA"})
    (out / "nasa_download_manifest.json").write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8")

if __name__ == "__main__":
    main()
