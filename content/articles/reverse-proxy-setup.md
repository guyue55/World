# 反向代理配置实战

反向代理是流量调度站。它接收外部请求，然后转发到内部服务。

## Nginx 基础配置

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Caddy 自动 HTTPS

Caddy 的优势是自动申请和续期 HTTPS 证书：

```Caddyfile
example.com {
    reverse_proxy 127.0.0.1:3000
}
```

## 常见坑点

1. WebSocket 需要额外配置 `Upgrade` 和 `Connection` 头
2. 大文件上传需要调整 `client_max_body_size`
3. 超时时间要根据后端响应速度调整
4. 日志格式要统一，方便排查问题
