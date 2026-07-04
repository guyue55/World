# WorldOS 主线代码地图

RC3 将代码分为四层：

1. **正式主线**：`src/app` 的公开产品页、`src/components/product`、`src/components/world`、`src/lib/world-kernel-*`。
2. **公开数据协议**：`data/domains/experience`、`data/core/relations.json`、`data/core/world-events.json`。
3. **治理门禁**：`scripts/check-worldos-*`、`scripts/check-world-kernel-*`、`scripts/run-worldos-*`。
4. **历史参考**：V/R/R8 阶段页、旧动态 runtime、阶段性脚本，只能通过边界策略保留，不能回到公开入口。

这个地图不是为了删除历史，而是为了让未来开发知道：哪里是道路，哪里是遗迹，哪里只是旧星群。
