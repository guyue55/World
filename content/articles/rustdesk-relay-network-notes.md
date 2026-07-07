# RustDesk 中继与网络排查记录

这个节点保存 RustDesk 自建中继相关经验。

关键点包括：

- hbbs / hbbr 依赖端口、UDP、TCP 与防火墙策略共同工作。
- Docker 网络与宿主机 firewalld / iptables 会互相影响。
- 如果关闭代理后远控立刻断开，需要判断是否仍依赖代理链路。
- 客户端选项如禁用 UDP、P2P 打洞、代理设置，要结合真实网络路径验证。

它不是最终教程，而是一个可继续补充的排查节点。

## 典型排查路径

先确认 hbbs 和 hbbr 容器都在运行，端口未被占用。然后检查防火墙是否放行了对应端口。如果客户端能连接但立刻断开，检查 UDP 是否被阻断。如果关闭代理后断开，说明连接依赖代理转发而非直连。每一步都用 `docker logs` 和客户端日志交叉验证，不靠猜。这种排查方法本身比解决单个问题更有价值。

## 容器配置与端口检查

```bash
# hbbs（ID 注册服务）和 hbbr（中继服务）的 Docker 配置
docker run -d --name hbbs -p 21115:21115 -p 21116:21116 \
  -p 21116:21116/udp -p 21118:21118 \
  rustdesk/rustdesk-server hbbs

docker run -d --name hbbr -p 21117:21117 -p 21119:21119 \
  rustdesk/rustdesk-server hbbr

# 检查容器运行状态和端口监听
docker ps --filter name=hbbs --filter name=hbbr
docker logs hbbs --tail 20
docker logs hbbr --tail 20

# 防火墙放行（firewalld）
firewall-cmd --permanent --add-port=21115-21119/tcp
firewall-cmd --permanent --add-port=21116/udp
firewall-cmd --reload
```

hbbs 需要放行 21115（NAT 类型测试）、21116（ID 注册）和 21116/udp（心跳）。hbbr 需要放行 21117（中继）。21118 和 21119 用于加密连接。如果客户端能连接但秒断，首先检查 UDP 21116 是否被防火墙或运营商阻断——这是最常见的问题。
