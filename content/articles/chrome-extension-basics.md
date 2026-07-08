# Chrome 扩展开发基础

Manifest V3 时代，Chrome 扩展开发有了新的规则。

## 项目结构

```text
my-extension/
  manifest.json
  background.js
  content.js
  popup.html
  icons/
```

## manifest.json 核心字段

```json
{
  "manifest_version": 3,
  "name": "我的扩展",
  "version": "1.0",
  "permissions": ["storage", "activeTab"],
  "action": { "default_popup": "popup.html" },
  "background": { "service_worker": "background.js" }
}
```

## 关键变化

V3 相比 V2 的主要变化：Service Worker 替代 Background Page、API 权限更严格、远程代码执行被禁止。

## 调试方法

在 `chrome://extensions` 开启开发者模式，加载未打包扩展，然后使用 Chrome DevTools 调试。
