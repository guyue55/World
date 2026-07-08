# Tailwind 响应式设计

Tailwind 的响应式是原子级：sm/md/lg/xl 断点直接写在 class 里，避免 CSS 变量与媒体查询散落。

## WorldOS 的用法

默认 mobile-first：先写手机视图，再用 md: 加桌面差异。字体尺寸用 clamp() 少量补充，避免过度依赖断点。

## 一个决定

弃用 xl 与 2xl。绝大多数 4K 显示器上，md 与 lg 已经覆盖了阅读舒适宽度。少一层断点，就少一份维护成本。

## 与 motion-grammar-rulebook 的关系

响应式与动效是两个独立维度：动效跟设备偏好走（prefers-reduced-motion），布局跟屏幕宽度走。两者不交叉判断，代码更清晰。

## 与设计系统的关系

Tailwind 是原子层，设计系统是语义层。语义层用 CSS 变量与自定义主题拼装出来，避免直接暴露 Tailwind class 到组件外。
