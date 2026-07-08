# 局域网访问指南

> 本文档说明如何在本地和局域网内访问古月浮屿（WorldOS）。

## 一、本地访问

### 1.1 开发模式

```bash
npm run dev
```

默认在 `http://localhost:3000` 启动。适合开发调试，支持热更新。

### 1.2 生产模式

```bash
npm run build
npm run start
```

默认在 `http://localhost:3000` 启动生产构建。适合验证真实用户体验。

### 1.3 本地运行时 Smoke 测试

```bash
npm run smoke:runtime-local
```

该命令会自动构建并启动生产服务器（端口 4317），对 10 条公开路由执行 HTTP 200 检查，然后关闭服务器。

## 二、局域网访问

### 2.1 启动局域网生产服务器

```bash
npm run smoke:lan-local
```

该命令会：
1. 绑定 `0.0.0.0:4320` 启动生产服务器
2. 自动检测局域网 IP
3. 通过局域网 IP 执行 HTTP smoke 测试
4. 启动 Chrome 浏览器执行页面渲染验证
5. 生成截图和审计报告

### 2.2 手动启动局域网访问

如果只需要局域网访问，不需要 smoke 测试：

```bash
npm run build
npx next start -H 0.0.0.0 -p 3000
```

然后在同一局域网内的设备上访问 `http://你的电脑IP:3000`。

### 2.3 查找局域网 IP

```bash
# macOS
ipconfig getifaddr en0

# Linux
hostname -I | awk '{print $1}'
```

### 2.4 防火墙放行

**macOS**：系统会自动弹出防火墙询问，选择"允许"。

**Linux（ufw）**：
```bash
sudo ufw allow 3000/tcp
```

### 2.5 手机访问

1. 确保手机和电脑在同一 WiFi 网络
2. 在手机浏览器输入 `http://你的电脑IP:3000`
3. 如果使用 smoke:lan-local，端口是 4320

## 三、验证命令

| 命令 | 用途 |
|---|---|
| `npm run check:runtime-local` | 验证本地 smoke 注册表完整性 |
| `npm run check:lan-local` | 验证局域网 RC 注册表完整性 |
| `npm run smoke:runtime-local` | 执行本地 HTTP smoke 测试 |
| `npm run smoke:lan-local` | 执行局域网 HTTP + 浏览器 smoke 测试 |
| `npm run check:daily` | 日常门禁全检 |

## 四、注意事项

- 局域网访问不需要域名和 HTTPS，适合家庭和办公室内网使用
- 如果路由器支持 UPnP，可以在路由器管理界面将端口映射到公网（不推荐，有安全风险）
- `smoke:lan-local` 需要本机安装 Chrome 浏览器
- 生产构建产物在 `.next/` 目录，大小约 102MB
