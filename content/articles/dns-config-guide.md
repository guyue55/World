# DNS 配置与排障指南

DNS 是互联网的电话簿。当你在浏览器输入一个域名，DNS 负责把它翻译成 IP 地址。

## 常用 DNS 服务器

| 服务商 | 主 DNS | 备 DNS |
|---|---|---|
| 阿里 | 223.5.5.5 | 223.6.6.6 |
| 腾讯 | 119.29.29.29 | 119.28.28.28 |
| Google | 8.8.8.8 | 8.8.4.4 |
| Cloudflare | 1.1.1.1 | 1.0.0.1 |

## 排障命令

```bash
# 查询域名解析
nslookup example.com

# 指定 DNS 服务器查询
nslookup example.com 8.8.8.8

# 清除本地 DNS 缓存（macOS）
sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder
```

## 常见问题

DNS 污染是最常见的问题。解决方案包括使用 DoH（DNS over HTTPS）或 DoT（DNS over TLS）。在路由器层面配置透明 DNS 可以保护全屋设备。
