# WorldOS CLI 伴侣

WorldOS CLI 伴侣是一个尚未开工的构想：把 World 项目的常用维护动作封装成一个 world 命令，让创作者无须记忆 npm 脚本名。

## 命令草图

world status 输出当日指标；world new node <slug> 交互式创建节点；world check 跑 check:daily；world release 跑 release:local-rc；world backup 触发备份。

## 为什么不直接用 npm

npm 脚本已经足够，但命名冗长、上下文切换成本高。CLI 伴侣把最常用的 5 个动作压缩到 5 秒内，进一步降低维护门槛。

## 与终端优先的关系

它是终端优先日常里的高频入口，也是 WorldOS Engine 的最外层封装。开工时机预计在 Phase 14 技术收束之后。

## 立项前的两个问题

一是命名：world 还是 wos 还是 gy？取决于是否与其他 CLI 冲突。二是分发：先本地 alias，再 npm 全局包，再考虑 brew tap。两个问题都不影响立项，但决定第一版的边界。
