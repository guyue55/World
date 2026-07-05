# WorldOS 1.0 RC8｜本地局域网 RC 验收

## 定位

RC8 不新增公开功能，也不改变生产状态。它把当前可接受的部署边界明确为：

```text
本机启动 production server，同一局域网内通过局域网 IP 访问。
```

这比只访问 `localhost` 更接近真实使用场景：手机、平板或另一台电脑可以通过同网 IP 打开公开世界；同时仍保持“未上线生产”的诚实状态。

## 验收内容

```text
1. next start 绑定 0.0.0.0。
2. 自动识别本机非内网回环 IPv4。
3. 通过 http://<局域网 IP>:<端口> 检查公开路由、静态 JSON、robots、sitemap。
4. 验证 legacy redirect 和私密/内部入口 guard。
5. 使用真实浏览器运行时检查桌面与移动端低动效视口。
6. 记录正文长度、H1、body 可见性、console/page error、网络失败、横向溢出和截图。
```

## 新增命令

```bash
npm run check:lan-local
npm run smoke:lan-local
```

`check:lan-local` 是静态门禁，验证注册表、脚本、命令和文档口径。

`smoke:lan-local` 是真实验收，会启动本地 production server，并通过局域网 IP 与浏览器运行时生成证据报告。

## 真实状态

```text
productionLive: false
releaseReady: false
cleanProductionReady: false
```

本地局域网 RC 只能证明同网访问、本地 production server 和浏览器渲染可用；它不替代真实外部 Preview / Production URL、HTTPS、Web Vitals、人工签收和回滚演练。
