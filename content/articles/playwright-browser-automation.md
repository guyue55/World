# Headless 浏览器自动化

Playwright 承担 WorldOS 的浏览器验收：从首页到 100 多个节点页、20 条路径页，全部由脚本一次跑通并截图。

## 已有覆盖

desktop 20 张、mobile-reduced-motion 4 张，共 24 张关键页面。截图存 `docs/90-archive/reports/worldos-local-lan-rc/`，作为 release:local-rc 的证据链。

## 一个技巧

给每个截图页加 500ms 静置等 GSAP 入场收官，再截图。否则会截到半启动的动效帧，看起来像 bug。

## 与 motion-grammar-rulebook 的关系

动效有语法，截图就是那份语法在浏览器里的兑现证据。若截图崩坏，往往是动效超出了 800ms 预算。

## 与 CI 的关系

Playwright 不上 CI，只在本地跑。原因是个人世界节奏慢，每周日跑一次足够。CI 化的开销大于收益。
