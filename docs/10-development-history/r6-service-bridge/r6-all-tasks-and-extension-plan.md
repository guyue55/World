# R6｜服务化最小闭环：全任务与扩展任务规划

R6 的目标不是引入沉重后端，而是让古月浮屿从静态世界、创世台和 AI 灯塔，进入最小服务化闭环。

## 阶段 1：服务边界、身份与 Owner-only 地基
- 定义 owner / visitor / ai-lighthouse 角色。
- 默认拒绝所有未声明能力。
- 所有私密、vault、家庭、孩子和真实地址内容默认不进入公开服务。

## 阶段 2：API 合约、存储端口与最小数据写入路径
- 定义 service-health、nodes、audit、export-jobs API 合约。
- 以端口方式描述 nodeRepository、auditRepository、exportRepository。
- R6 只落 read-safe skeleton，不在未完成 owner auth 前开放真实写入。

## 阶段 3：审计日志、操作队列与导出任务闭环
- 建立不可变审计事件模型。
- 建立 AI 建议、节点草稿、导出任务进入操作队列的方式。
- 建立公开导出与 owner-only 导出边界。

## 阶段 4：服务边界硬化、质量门禁与 R7 交接
- 建立服务隐私边界检查。
- 建立 R6 聚合检查与构建产物验证。
- 交接 R7 长期运行与世界自演化。

## 扩展任务
- Owner-only 认证接入预留。
- SQLite / Supabase / 文件仓储适配预留。
- 创世台真实保存入口预留。
- AI 审批队列服务化预留。
- 月度导出、年度世界册和长期档案包预留。
