# Docker 与本地阅读环境排查

这个节点记录本地工具、容器、阅读器和文件转换中的排查经验。

它包括几类常见问题：

- Docker Desktop 空间未释放。
- Kavita 不支持 TXT，需要先转 EPUB。
- 小说目录多层嵌套导致扫描识别异常。
- 编码、重复文件、系列命名会影响归档质量。

这些问题看似琐碎，但都可以进入技术星域，成为未来自动化整理脚本和世界档案管线的一部分。

## 排查方法

Docker 空间问题通常用 `docker system df` 查看占用分布，用 `docker system prune` 清理无用镜像和容器。但真正棘手的是 Docker Desktop 在 macOS 上的虚拟磁盘文件只增不减，需要手动回收。阅读器兼容性问题则需要在转换时就测试目标设备，不能只看转换工具是否报错。这类排查经验的价值在于：下次遇到同样问题时，不用从零开始。

## Docker 空间回收命令

```bash
# 查看磁盘占用分布
docker system df

# 清理无用镜像、容器、网络和构建缓存
docker system prune -a --volumes

# macOS 虚拟磁盘回收（Docker Desktop 独有）
# 先在 Docker Desktop 设置中点击 "Clean / Purge data"
# 如果不够，删除虚拟磁盘文件让其重建
rm ~/Library/Containers/com.docker.docker/Data/vms/0/data/Docker.raw
```

`docker system prune -a` 会删除所有未被容器引用的镜像，`--volumes` 还会删除未被使用的卷。执行前要确认没有正在使用的容器依赖这些镜像。macOS 上的虚拟磁盘文件删除后重启 Docker Desktop 会自动重建，但所有本地镜像和容器都会丢失，需要提前 push 或 export。
