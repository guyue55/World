# 古月浮屿｜数据世界/宇宙真实素材库

本包是“数据世界 / 宇宙视觉套图”重构的素材采集工作区。

## 当前完成内容

- 已归档原始 9 张 SVG 套图：`00_original_suite/`
- 已建立外部真实素材源策略：`01_external_manifest/source_policy.md`
- 已建立按九张套图拆解的素材查询表：`01_external_manifest/asset_queries.csv`
- 已建立机器可读采集清单：`01_external_manifest/asset_manifest.json`
- 已建立九图素材映射：`05_scene_mapping/scene_material_mapping.md`
- 已提供下载脚本：
  - `02_scripts/download_nasa_assets.py`
  - `02_scripts/download_wikimedia_assets.py`
  - `02_scripts/pexels_download_template.py`
- 已记录当前下载失败原因：`04_download_logs/download_attempt.log`

## 当前限制

本次执行环境对外部域名解析失败，无法直接把 NASA/Wikimedia/Pexels 等外部二进制图片、视频批量下载到本地。因此本包当前为“可复现采集索引 + 下载脚本 + 原始套图归档”，外部素材二进制需要在可联网本地环境继续执行脚本获取。

## 建议本地执行顺序

```bash
cd guyue_material_library
python 02_scripts/download_nasa_assets.py --out assets/raw/nasa --limit 8
python 02_scripts/download_wikimedia_assets.py --out assets/raw/wikimedia --limit 6
export PEXELS_API_KEY=你的_Pexels_API_Key
python 02_scripts/pexels_download_template.py --out assets/raw/pexels --limit 8
```

## 视觉使用原则

- 不使用明显 AI 图、游戏图、卡通图作为真实素材。
- 每个外部素材必须保留来源、作者、许可、原始链接。
- 视觉重构优先：近景真实材质 + 宏大宇宙/自然尺度 + 克制数据秩序。
