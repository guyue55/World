# WorldOS 导出工具设计

导出工具是传承协议 (Phase 6) 的技术兑现。它把 nodes.json、relations.json、events.json 与所有 content markdown 打成一个可离线阅读的 zip。

## 导出格式

默认 Markdown + JSON 双份。Markdown 便于人类翻阅，JSON 便于后续导入其他系统。附带一份 birth-certificate.txt 作为元信息。

## 触发时机

每季度一次自动导出，落到 owner-only 备份目录。世界宣言更新时手动触发一次。若创作者不在，接手人可用 zip 独立重建阅读环境。

## 与传承约定的关系

导出工具是传承约定的执行器。约定说"世界能被交接"，导出工具说"这里就是交接包"。

## 使用体验

第一次跑导出用了 12 秒，第二次用了 2 秒（缓存命中）。速度不是关键，可靠是关键。导出包必须能被独立打开，即使没有 WorldOS 环境。
