# WorldOS / 古月浮屿 执行计划

> 制定日期：2026-07-08
> 基线文档：`docs/00-overview/worldos-future-roadmap-2026-07-07.md`
> 当前分支：`codex/visual-overlay-qa`
> 当前状态：`productionLive: false` / 门禁全绿 / 52 公开节点

---

## 总览

本执行计划将规划文档的 6 个 Phase 拆解为 **42 个可执行任务**，每个任务包含：步骤、验收标准、涉及文件、门禁命令、预估工时和前置依赖。

### 依赖关系

```
Phase 1 (上线准备) ──────────────────────────────────────┐
                                                         │
Phase 2 (内容深耕) ──────────────┐                       │
                                  ├──> M2 内容成熟         │
Phase 4 (移动端验收) ────────────┘                       │
                                                         │
Phase 3 (脚本瘦身) ──────────────────────> M3 脚本收束    │
                                                         │
Phase 5 (AI 灯塔) ───────────────────────> M5 灯塔点亮    │
                                                         │
Phase 6 (传承就绪) ───────────────────────> M6 传承就绪    │
                                                         │
                                                         v
                                              M1 真实上线 (P0)
```

### 工时估算

| Phase | 任务数 | 预估工时 | 可并行 |
|---|---|---|---|
| Phase 1: 上线准备 | 9 | 16-24h | 串行为主 |
| Phase 2: 内容深耕 | 8 | 持续 | 与 Phase 4 并行 |
| Phase 3: 脚本瘦身 | 7 | 12-16h | 独立 |
| Phase 4: 移动端验收 | 7 | 10-14h | 与 Phase 2 并行 |
| Phase 5: AI 灯塔 | 7 | 14-18h | Phase 1 完成后 |
| Phase 6: 传承就绪 | 4 | 8-12h | 随时启动 |

### 执行原则

1. **每完成一个任务必须跑 `npm run check:daily`**
2. **每完成一个 Phase 必须跑 `npm run release:local-rc`**
3. **Git 提交格式：`xxx(xxx): 中文xxx`**
4. **不引入新依赖除非该任务明确要求**
5. **不动 `_legacy/` 目录中的代码**
6. **所有内容用中文撰写**

---

## Phase 1: 上线准备（RC9）

**目标**：完成 `productionLive: true` 所需的全部外部验证
**前置条件**：域名已购买、部署平台账号已注册
**预估工时**：16-24h


### T1.1 部署平台选型与配置

**步骤**：
1. 对比 Vercel / Netlify / Cloudflare Pages 三者的免费额度、构建限制和 Next.js 15 兼容性
2. 选定平台后，更新 `vercel.json` 或新建 `netlify.toml` / `wrangler.toml`
3. 确认 `buildCommand` 指向 `npm run build`，`outputDirectory` 指向 `.next`
4. 确认 `installCommand` 使用 `npm ci` 而非 `npm install`
5. 设置生产环境变量（参照 `.env.example`）：`NEXT_PUBLIC_SITE_URL`、`NEXT_PUBLIC_WORLD_NAME`、`GUYUE_OWNER_TOKEN`、`AI_PUBLIC_CONTEXT_ONLY=true`
6. 连接 Git 仓库，配置自动部署

**涉及文件**：`vercel.json` / `netlify.toml`、`.env.example`、`.github/workflows/ci.yml`

**验收标准**：
- 推送到 `main` 分支后自动触发部署
- Preview 部署 URL 可访问
- `NEXT_PUBLIC_SITE_URL` 指向真实域名
- 部署日志无错误

**门禁**：`npm run check:lint-env`（验证环境变量配置完整）

**工时**：2-3h

---

### T1.2 域名与 HTTPS 配置

**步骤**：
1. 在部署平台添加自定义域名
2. 在域名 DNS 配置 CNAME 或 A 记录指向部署平台
3. 等待 DNS 生效（通常 10-30 分钟）
4. 在部署平台启用 HTTPS（平台自动签发 Let's Encrypt 证书）
5. 验证 HTTPS 证书有效性：`curl -vI https://你的域名` 确认 200 + 证书链完整
6. 更新 `NEXT_PUBLIC_SITE_URL` 为 `https://你的域名`
7. 更新 `src/app/sitemap.ts` 和 `src/app/robots.ts` 中的域名引用

**涉及文件**：`.env.example`、`src/app/sitemap.ts`、`src/app/robots.ts`、`src/lib/metadata.ts`

**验收标准**：
- `https://你的域名` 返回 200
- HTTPS 证书有效期 > 30 天
- `sitemap.xml` 中的 URL 使用 `https://` 前缀
- `robots.txt` 中的 sitemap 引用使用真实域名

**门禁**：`npm run check:routes` + 手动验证 `curl -sI https://你的域名/sitemap.xml`

**工时**：1-2h

---

### T1.3 线上 Smoke Test

**步骤**：
1. 新建脚本 `scripts/smoke-online.mjs`，复用 `smoke:runtime-local` 的逻辑但目标 URL 改为线上
2. 对所有 10 条公开路由执行 HTTP 请求，验证状态码 200
3. 验证每条路由的 HTML 中包含预期的 H1 标题
4. 验证 `/api/` 路由的权限拦截（private 路由返回 307 重定向）
5. 验证 `/node/[slug]` 的 52 个节点页面均可访问
6. 验证 `/sitemap.xml` 和 `/robots.txt` 可访问
7. 验证 legacy 重定向（`/world` -> 308 -> `/atlas` 等）

**涉及文件**：新建 `scripts/smoke-online.mjs`、`package.json`（新增 `smoke:online` 脚本）

**验收标准**：
- 10 条公开路由全部返回 200
- 52 个节点页面全部返回 200
- legacy 路由返回 308 重定向
- private 路由返回 307 重定向
- smoke 报告输出到 `docs/90-archive/reports/`

**门禁**：`npm run smoke:online`

**前置依赖**：T1.1、T1.2

**工时**：3-4h

---

### T1.4 Web Vitals 快照采集

**步骤**：
1. 安装 `@lhci/cli` 作为 devDependency（或使用 `npx`）
2. 新建 `.lighthouserc.json`，配置目标 URL 和采集项
3. 对首页、Atlas、节点详情页、路径页执行 Lighthouse 审计
4. 采集指标：LCP、CLS、INP、TBT、FID
5. 对比性能预算（LCP < 2.5s, CLS < 0.1, INP < 200ms）
6. 将快照保存到 `docs/90-archive/reports/lighthouse-snapshot-*.json`
7. 如果指标不达标，记录到 Phase 4 的待修复列表

**涉及文件**：新建 `.lighthouserc.json`、`package.json`（新增 `lighthouse:snapshot` 脚本）

**验收标准**：
- Lighthouse 报告生成且可读
- 首页 LCP < 2.5s（如不达标，转入 Phase 4）
- CLS < 0.1
- 报告存档到 `docs/90-archive/reports/`

**前置依赖**：T1.1、T1.2

**工时**：2-3h

---

### T1.5 可访问性快照

**步骤**：
1. 使用 Lighthouse Accessibility 评分或 `@axe-core/cli`
2. 对所有 10 条公开路由执行可访问性审计
3. 检查项：对比度、alt 文本、aria 标签、键盘导航、焦点可见性
4. 将快照保存到 `docs/90-archive/reports/accessibility-snapshot-*.json`
5. 如果评分 < 90，记录到待修复列表
6. 验证 `prefers-reduced-motion` 支持是否存在

**涉及文件**：新建 `scripts/check-accessibility.mjs`、`package.json`（新增 `check:a11y` 脚本）

**验收标准**：
- 可访问性报告生成
- 所有公开路由 Accessibility 评分 >= 90
- `prefers-reduced-motion` 支持已实现
- 报告存档

**前置依赖**：T1.1、T1.2

**工时**：2-3h

---

### T1.6 回滚演练

**步骤**：
1. 在部署平台记录当前部署版本（commit SHA）
2. 推送一个小改动（如修改首页文案），触发新部署
3. 确认新部署生效
4. 在部署平台执行回滚到上一版本
5. 确认回滚后页面恢复到旧版本
6. 记录回滚操作步骤和耗时
7. 将回滚演练记录保存到 `docs/90-archive/reports/rollback-drill-*.json`

**涉及文件**：`docs/90-archive/reports/rollback-drill-*.json`

**验收标准**：
- 回滚操作成功
- 回滚后页面内容恢复
- 回滚步骤文档化
- 回滚耗时 < 5 分钟

**前置依赖**：T1.1、T1.2、T1.3

**工时**：1-2h

---

### T1.7 外部证据台账填写

**步骤**：
1. 打开 `data/world-kernel/worldos-1-external-evidence-template-v1.json`
2. 填写 `preview.url` 和 `production.url` 为真实 URL
3. 填写 `preview.deployedAt` 和 `production.deployedAt`
4. 将 `smokeStatus` 从 `"pending"` 改为 `"passed"`
5. 附上 smoke 报告路径
6. 填写 `httpsStatus` 为 `"valid"`
7. 填写 `qualityEvidence.webVitals` 为实际数值
8. 填写 `qualityEvidence.accessibility` 为实际评分
9. 填写 `qualityEvidence.mobileReview` 为实际审查结果
10. 填写 `qualityEvidence.privacyReview` 为 `"passed"`

**涉及文件**：`data/world-kernel/worldos-1-external-evidence-template-v1.json`

**验收标准**：
- 证据台账所有字段已填写真实数据
- 无 `"pending"` 残留
- `npm run evidence:worldos-external-template` 通过

**前置依赖**：T1.3、T1.4、T1.5、T1.6

**工时**：1h

---

### T1.8 人工签收

**步骤**：
1. 新建签收清单 `docs/90-archive/reports/release-signoff-rc9.md`
2. 清单包含：公开路由可访问、HTTPS 有效、smoke 通过、Web Vitals 达标、可访问性达标、回滚演练通过、私密路由被拦截
3. 逐项确认并签名（可使用 git commit 作为签收记录）
4. 在证据台账中填写 `manualSignoff.ownerAccepted: true`、`acceptedAt`

**涉及文件**：`docs/90-archive/reports/release-signoff-rc9.md`、`data/world-kernel/worldos-1-external-evidence-template-v1.json`

**验收标准**：
- 签收清单所有项已确认
- 证据台账 `ownerAccepted: true`
- Git commit 记录签收

**前置依赖**：T1.7

**工时**：0.5h

---

### T1.9 翻转生产状态

**步骤**：
1. 找到所有 `productionLive: false` 的位置（`data/world-kernel/` 下的多个 JSON 契约）
2. 确认所有 K5-external 阻断项已清零
3. 将 `productionLive` 改为 `true`
4. 将 `releaseReady` 改为 `true`
5. 将 `cleanProductionReady` 改为 `true`
6. 运行全部门禁确认无报错
7. 新建 RC9 审计报告 `data/world-kernel/worldos-1-rc9-production-live-v1.json`
8. 更新 `README.md` 的工程状态段落
9. Git 提交：`feat(release): WorldOS 1.0 RC9 真实上线，productionLive: true`

**涉及文件**：`data/world-kernel/` 下相关契约、`README.md`、新建 RC9 审计 JSON

**验收标准**：
- `npm run check:product-release` 通过且 `productionLive: true`
- `npm run check:release` 全部通过
- `npm run release:local-rc` 全部通过
- README 工程状态已更新

**门禁**：`npm run check:release` + `npm run release:local-rc`

**前置依赖**：T1.8

**工时**：2-3h

---

## Phase 2: 内容深耕

**目标**：公开世界从"可走"升级为"值得停留"
**前置条件**：Phase 1 完成或并行推进
**预估工时**：持续


### T2.1 核心节点扩写

**步骤**：
1. 读取 `data/world-kernel/worldos-local-content-growth-contract-v1.json` 的 `coreReadableSlugs`（8 个）
2. 对每个核心节点，读取现有 `contentPath` 文件
3. 扩写正文到 3000+ 字符，至少 4 个二级标题
4. 确保扩写内容与节点 summary、worldTitle 和 areaId 一致
5. 保持世界语言风格：诗意 + 现实解释并存
6. 所有内容用中文撰写

**涉及文件**：`content/manifesto/world-manifesto.md`、`content/articles/personal-digital-universe-definition.md`、`content/articles/world-space-layer.md`、`content/articles/ai-lighthouse-boundary.md`、`content/memory/memory-lake-first-light.md`、`content/articles/feishu-mcp-adk-agent.md`、`content/articles/gemini-cli-skills-agent-workflow.md`、`content/articles/world-data-guardian.md`

**验收标准**：
- 8 个核心节点正文均 >= 3000 字符
- 每个节点 >= 4 个 `##` 二级标题
- 内容包含中文
- `npm run check:local-content-growth` 通过

**门禁**：`npm run check:local-content-growth` + `npm run check:content`

**工时**：4-6h

---

### T2.2 技术星域节点补全

**步骤**：
1. 识别技术星域（tech area）中正文不足 600 字符的节点
2. 对每个节点补充完整排查步骤、代码示例和经验总结
3. Docker 节点：补充 `docker system df`、`docker system prune`、虚拟磁盘回收的完整命令
4. RustDesk 节点：补充 hbbs/hbbr 容器配置、端口检查、防火墙放行的完整步骤
5. Kavita 节点：补充目录扫描、编码识别、EPUB 转换、去重的完整管线
6. Codex 节点：补充 `responses` vs `chat completions`、`wire_api` 配置、错误排查表

**涉及文件**：`content/articles/docker-disk-cleanup.md`、`content/articles/rustdesk-relay-network-notes.md`、`content/articles/kavita-reader-txt-epub-pipeline.md`、`content/articles/codex-cli-custom-provider-routing.md`、`content/articles/cli-tools-agent-integration.md`

**验收标准**：
- 技术星域所有节点正文 >= 600 字符
- 每个技术节点包含至少 1 个代码块
- `npm run check:content` 通过

**门禁**：`npm run check:content`

**工时**：3-4h

---

### T2.3 新增公开节点（52 -> 80+）

**步骤**：
1. 从以下方向规划 28+ 个新节点：
   - 技术星域：Codex Skills 工作流、Claude Code 集成、MCP 协议实践、Headless 浏览器自动化、Vercel 部署经验
   - 产品工坊：WorldOS 导出工具、内容迁移脚本、世界索引生成器
   - 创世原点：世界协议文档、世界审计方法、世界健康度指标
   - 时间线：RC9 上线记录、每月修复日志、季度回望
   - 灵感云层：联邦化设想、世界互操作协议、AI 边界进化方向
   - 记忆湖：更多脱敏生活片刻种子
2. 为每个新节点在 `data/domains/experience/nodes.json` 中添加节点条目
3. 为每个新节点创建 `contentPath` 指向的 Markdown 文件（>= 400 字符）
4. 确保每个新节点有：id、slug、title、worldTitle、summary（>= 18 字符）、areaId、contentPath、visibility: public、lifeStage、tags、featured

**涉及文件**：`data/domains/experience/nodes.json`、`content/` 下新建 28+ 个 `.md` 文件

**验收标准**：
- 公开节点数 >= 80
- 所有新节点正文 >= 400 字符
- 所有新节点有 summary >= 18 字符
- 所有新节点有 worldTitle
- `npm run check:worldos-content-density` 通过

**门禁**：`npm run check:worldos-content-density` + `npm run check:content-life`

**工时**：8-12h（可分多轮修复日完成）

---

### T2.4 路径扩展（13 -> 15+）

**步骤**：
1. 审查现有 13 条路径，确认每条路径至少 4 个节点
2. 新增 2+ 条跨区域路径：
   - `tech-to-life`：从技术探索到生活记忆的路径
   - `world-architecture`：世界架构与设计公理的深潜路径
3. 为每条新路径在 `data/domains/experience/paths.json` 中添加条目
4. 确保路径的 `nodeSlugs` 引用的 slug 在 `nodes.json` 中存在且为 public
5. 设置 `estimatedMinutes >= 5`、`description >= 18 字符`

**涉及文件**：`data/domains/experience/paths.json`

**验收标准**：
- 公开路径数 >= 15
- 每条路径 >= 4 个节点 slug
- 所有引用的 slug 存在且为 public
- `npm run check:content-life` 通过

**门禁**：`npm run check:content-life`

**工时**：2-3h

---

### T2.5 关系星线加密（82 -> 120+）

**步骤**：
1. 读取 `data/core/relations.json`
2. 识别没有任何关系的节点（孤立节点）
3. 为每个孤立节点至少添加 2 条关系
4. 为现有节点之间补充主题关联、派生关联和引用关联
5. 每条新关系必须有：id、from、to、type、strength、source、reviewed、note
6. 强关系（strength >= 0.8）必须有 note 说明

**涉及文件**：`data/core/relations.json`

**验收标准**：
- 关系数 >= 120
- 每个公开节点至少有 1 条关系
- 所有 from/to 引用存在的节点 id
- 所有强关系有 note
- 所有强关系 reviewed: true
- `npm run check:content-life` 通过

**门禁**：`npm run check:content-life`

**工时**：3-4h

---

### T2.6 世界事件补充（21 -> 30+）

**步骤**：
1. 读取 `data/core/world-events.json`
2. 新增 9+ 个世界事件：
   - RC9 上线事件
   - 内容密度门禁提升事件
   - 移动端验收完成事件
   - 每月修复日事件
   - 每月月报事件
3. 每个事件有：id、type、title、date、description、nodeIds、areaIds、visibility、actor
4. 确保事件引用的 nodeIds 和 areaIds 存在

**涉及文件**：`data/core/world-events.json`

**验收标准**：
- 世界事件数 >= 30
- 所有事件引用存在的节点和区域
- `npm run check:content-life` 通过

**门禁**：`npm run check:content-life`

**工时**：2h

---

### T2.7 内容密度门禁提升

**步骤**：
1. 确认所有 80+ 公开节点正文 >= 400 字符
2. 修改 `data/world-kernel/worldos-content-life-contract-v1.json` 的 `minPublicNodeContentCharacters` 从 300 改为 400
3. 运行门禁确认无报错

**涉及文件**：`data/world-kernel/worldos-content-life-contract-v1.json`

**验收标准**：
- `minPublicNodeContentCharacters: 400`
- `npm run check:worldos-content-density` 通过
- `npm run check:content` 通过

**前置依赖**：T2.3（所有新节点 >= 400 字符）

**门禁**：`npm run check:content`

**工时**：0.5h

---

### T2.8 区域代表节点更新

**步骤**：
1. 读取 `data/world-kernel/worldos-local-content-growth-contract-v1.json` 的 `areaRepresentativeSlugs`
2. 确认 8 个一级区域的代表节点仍然合适
3. 如果新增了更好的代表节点，更新 `areaRepresentativeSlugs`
4. 确保代表节点正文 >= 600 字符、有 2+ 二级标题、包含中文
5. 确保代表节点在公开路径中

**涉及文件**：`data/world-kernel/worldos-local-content-growth-contract-v1.json`

**验收标准**：
- 8 个一级区域都有代表节点
- 代表节点正文 >= 600 字符
- 代表节点在公开路径中
- `npm run check:local-content-growth` 通过

**门禁**：`npm run check:local-content-growth`

**工时**：1h

---

## Phase 3: 脚本瘦身

**目标**：从 254 个脚本收束到 200 以内
**前置条件**：无（可独立推进）
**预估工时**：12-16h


### T3.1 脚本审计与分类

**步骤**：
1. 新建 `scripts/audit-scripts.mjs`，扫描 `scripts/` 目录下所有 `.ts` 和 `.mjs` 文件
2. 对每个脚本，检查是否被 `package.json` 的 scripts 引用
3. 分类为：active（被引用）、legacy（R1-R8 阶段脚本）、orphan（从未被引用）
4. 输出审计报告到 `docs/90-archive/reports/script-audit-*.json`
5. 统计各类脚本数量

**涉及文件**：新建 `scripts/audit-scripts.mjs`、`package.json`（新增 `audit:scripts` 脚本）

**验收标准**：
- 审计报告生成
- 每个脚本有分类标签
- orphan 脚本列表清晰

**门禁**：`npm run audit:scripts`

**工时**：2-3h

---

### T3.2 Legacy 脚本归档

**步骤**：
1. 根据 T3.1 审计报告，识别所有 legacy 脚本
2. 创建 `scripts/_legacy/` 目录（如不存在）
3. 将 legacy 脚本移动到 `scripts/_legacy/`，保持文件名不变
4. 更新 `data/world-kernel/worldos-script-legacy-registry-v1.json` 中的路径引用
5. 更新 `package.json` 中引用了这些脚本的 npm scripts（改为 `scripts/_legacy/` 路径或移除）
6. 确认 `check:worldos-script-legacy-registry` 仍然通过

**涉及文件**：`scripts/_legacy/`、`data/world-kernel/worldos-script-legacy-registry-v1.json`、`package.json`

**验收标准**：
- legacy 脚本全部在 `scripts/_legacy/` 目录
- `npm run check:scripts` 通过
- `npm run check:worldos-script-legacy-registry` 通过
- `npm run check:daily` 通过

**门禁**：`npm run check:daily`

**前置依赖**：T3.1

**工时**：3-4h

---

### T3.3 孤儿脚本清理

**步骤**：
1. 根据 T3.1 审计报告，识别所有 orphan 脚本
2. 逐个确认 orphan 脚本确实未被任何 npm script、CI workflow 或其他脚本引用
3. 确认无误后删除 orphan 脚本
4. 从 `data/world-kernel/worldos-script-legacy-registry-v1.json` 中移除已删除的条目
5. 更新 `scriptCounts` 统计

**涉及文件**：删除的 orphan 脚本、`data/world-kernel/worldos-script-legacy-registry-v1.json`

**验收标准**：
- orphan 脚本已删除
- `npm run check:scripts` 通过
- `npm run check:daily` 通过
- 脚本总数减少

**门禁**：`npm run check:daily`

**前置依赖**：T3.1

**工时**：2h

---

### T3.4 合并同类检查脚本

**步骤**：
1. 识别功能重叠的检查脚本（如多个 `check-phase-*` 脚本）
2. 将重叠的检查逻辑合并为统一入口脚本
3. 保留原有脚本名作为别名指向新脚本（或更新 `package.json` 的 scripts 指向）
4. 确保合并后的脚本输出与合并前一致
5. 更新 `data/world-kernel/worldos-maintenance-command-spine-v1.json`

**涉及文件**：被合并的脚本、`package.json`、`data/world-kernel/worldos-maintenance-command-spine-v1.json`

**验收标准**：
- 被合并的脚本数量减少
- `npm run check:daily` 通过
- `npm run check:maintenance-command-spine` 通过
- 命令脊柱注册表已更新

**门禁**：`npm run check:daily` + `npm run check:maintenance-command-spine`

**前置依赖**：T3.2、T3.3

**工时**：3-4h

---

### T3.5 脚本用途注释

**步骤**：
1. 遍历 `scripts/` 目录下所有保留的 `.ts` 和 `.mjs` 文件
2. 检查文件头部是否有用途注释（`// 用途：xxx` 或 `// @description xxx`）
3. 为缺少注释的脚本添加一行用途注释
4. 注释用中文撰写

**涉及文件**：`scripts/` 下所有保留脚本

**验收标准**：
- 每个保留脚本有用途注释
- 注释为中文
- `npm run check:daily` 通过

**门禁**：`npm run check:daily`

**前置依赖**：T3.4

**工时**：2h

---

### T3.6 CI 精简

**步骤**：
1. 审查 `.github/workflows/` 目录
2. 保留 `ci.yml`（PR 检查）和 `release-gate.yml`（发布门禁）
3. 移除不再需要的 workflow 文件
4. 确认 `ci.yml` 的 job 包含：`check:release`、`check:worldos-rc`、`evidence:kernel-local`
5. 确认 `release-gate.yml` 的 job 包含：`lint`、`typecheck`、`check:world-core`、`build`
6. 移除冗余的 step

**涉及文件**：`.github/workflows/ci.yml`、`.github/workflows/release-gate.yml`

**验收标准**：
- CI workflow 数量 <= 2
- CI 运行时间不增加
- 所有必要的检查项保留

**门禁**：推送后 CI 运行通过

**工时**：1h

---

### T3.7 脚本瘦身验收

**步骤**：
1. 统计最终脚本总数
2. 确认 <= 200
3. 确认日常入口 <= 10 个命令
4. 更新 `data/world-kernel/worldos-script-legacy-registry-v1.json` 的 `scriptCounts`
5. 更新规划文档的成功指标

**涉及文件**：`data/world-kernel/worldos-script-legacy-registry-v1.json`

**验收标准**：
- 总脚本数 <= 200
- `npm run check:scripts` 通过
- `npm run check:daily` 通过
- `npm run release:local-rc` 通过

**门禁**：`npm run release:local-rc`

**前置依赖**：T3.5、T3.6

**工时**：1h

---

## Phase 4: 移动端验收

**目标**：掌心里的浮屿
**前置条件**：无（可与 Phase 2 并行）
**预估工时**：10-14h


### T4.1 移动端问题审查

**步骤**：
1. 启动 dev server：`npm run dev`
2. 用 Chrome DevTools 移动模拟器（iPhone SE / Pixel 5）访问所有 10 条公开路由
3. 对每条路由检查：
   - 首屏是否说明"这里是什么"
   - 主要入口是否可单手点击
   - 节点正文是否可读无遮挡
   - 横向是否有溢出（`overflow-x: hidden` 不是解决方案，要找到根因）
   - 动效是否影响阅读
4. 记录所有问题到 `docs/90-archive/reports/mobile-audit-*.md`
5. 按严重程度排序

**涉及文件**：`docs/90-archive/reports/mobile-audit-*.md`

**验收标准**：
- 所有 10 条公开路由已审查
- 问题清单按严重程度排序
- 每个问题有截图或描述

**门禁**：无（人工审查）

**工时**：2h

---

### T4.2 横向溢出全局修复

**步骤**：
1. 根据 T4.1 的问题清单，找到所有横向溢出点
2. 常见原因：固定宽度元素、`whitespace-nowrap`、表格、代码块、图片
3. 修复方式：
   - 代码块添加 `overflow-x: auto`
   - 图片添加 `max-width: 100%`
   - 表格添加 `overflow-x: auto` 包裹层
   - 固定宽度改为 `max-width` + `width: 100%`
4. 在 `src/app/globals.css` 添加全局防护：`body { overflow-x: hidden; }`（仅作为兜底，不作为解决方案）
5. 逐个修复并验证

**涉及文件**：`src/app/globals.css`、各组件的 Tailwind class

**验收标准**：
- 所有公开路由在 iPhone SE（375px）宽度下无横向溢出
- `npm run check:daily` 通过

**门禁**：`npm run check:daily`

**前置依赖**：T4.1

**工时**：2-3h

---

### T4.3 首页移动端优化

**步骤**：
1. 审查 `src/components/product/ProductHome.tsx`
2. 移动端首屏只展示 3 个核心入口（世界地图、时间流、8 分钟路径）
3. 其他入口收起到"更多"折叠面板
4. 动效在移动端降级：`framer-motion` 的动画时长减半或禁用
5. 确认 `prefers-reduced-motion` 媒体查询生效
6. 首屏内容在 375px 宽度下不出现滚动即可见核心信息

**涉及文件**：`src/components/product/ProductHome.tsx`、`src/components/product/ProductJourneyDock.tsx`

**验收标准**：
- 首屏 375px 宽度下展示 3 个核心入口
- 动效在 `prefers-reduced-motion` 下降级
- `npm run check:daily` 通过
- `npm run build` 通过

**门禁**：`npm run check:daily` + `npm run build`

**前置依赖**：T4.2

**工时**：2-3h

---

### T4.4 Atlas 移动端适配

**步骤**：
1. 审查 `src/app/atlas/page.tsx` 和 `src/components/atlas/` 下的组件
2. 移动端将星座图（`AtlasLiveConstellation`）退回为列表视图
3. 区域卡片从 4 列网格改为 1 列
4. `AtlasMap` 在移动端用简化版本或隐藏
5. `AtlasStarLines` 在移动端用列表展示
6. `AtlasFallbackList` 在移动端默认展开（因为它是最低光模式的 fallback）

**涉及文件**：`src/app/atlas/page.tsx`、`src/components/atlas/AtlasLiveConstellation.tsx`、`src/components/atlas/AtlasMap.tsx`、`src/components/world/AreaNodeCluster.tsx`

**验收标准**：
- Atlas 在 375px 宽度下无溢出
- 区域信息可读
- 节点列表可浏览
- `npm run check:daily` 通过

**门禁**：`npm run check:daily`

**前置依赖**：T4.2

**工时**：2h

---

### T4.5 节点阅读页移动端优化

**步骤**：
1. 审查 `src/app/node/[slug]/page.tsx`
2. 移动端将右侧 aside（NodePassport、ReadingToc）收起为底部抽屉
3. 正文字号在移动端适配（`text-base` 或 `text-[15px]`）
4. `NodeRelationRail` 在移动端改为垂直列表
5. `ReadingComfortBar` 在移动端简化或隐藏
6. `Breadcrumbs` 在移动端只显示最后一级
7. 确认正文阅读无遮挡

**涉及文件**：`src/app/node/[slug]/page.tsx`、`src/components/node/NodePassport.tsx`、`src/components/node/NodeRelationRail.tsx`、`src/components/reading/ReadingToc.tsx`、`src/components/reading/ReadingComfortBar.tsx`

**验收标准**：
- 节点页在 375px 宽度下正文可读无遮挡
- 侧栏内容在移动端可达（底部抽屉或折叠）
- `npm run check:daily` 通过

**门禁**：`npm run check:daily`

**前置依赖**：T4.2

**工时**：2-3h

---

### T4.6 路径页移动端优化

**步骤**：
1. 审查 `src/app/paths/[id]/page.tsx`
2. 路径步骤导航在移动端改为底部固定栏
3. 步骤卡片在移动端单列展示
4. `ProductRouteGuide` 在移动端简化
5. 确认路径导航可单手操作

**涉及文件**：`src/app/paths/[id]/page.tsx`、`src/components/product/ProductRouteGuide.tsx`

**验收标准**：
- 路径页在 375px 宽度下步骤可浏览
- 底部导航可单手点击
- `npm run check:daily` 通过

**门禁**：`npm run check:daily`

**前置依赖**：T4.2

**工时**：1-2h

---

### T4.7 移动端验收报告

**步骤**：
1. 用真实手机或 Chrome 移动模拟器重新审查所有 10 条公开路由
2. 采集移动端 Lighthouse 性能数据
3. 确认首屏 LCP < 3s（4G 模拟）
4. 确认无横向溢出
5. 确认单手可达主要入口
6. 确认节点阅读无遮挡
7. 生成验收报告到 `docs/90-archive/reports/mobile-acceptance-*.md`

**涉及文件**：`docs/90-archive/reports/mobile-acceptance-*.md`

**验收标准**：
- 所有公开路由通过移动端验收标准
- 移动端 LCP < 3s
- 验收报告存档
- `npm run check:daily` 通过

**门禁**：`npm run check:daily` + 人工验收

**前置依赖**：T4.3、T4.4、T4.5、T4.6

**工时**：1h

---

## Phase 5: AI 灯塔

**目标**：AI 从低光模式升级为真实导览
**前置条件**：Phase 1 完成（需要线上环境测试 AI）
**预估工时**：14-18h


### T5.1 AI Provider 选型

**步骤**：
1. 评估候选 provider：
   - OpenAI（gpt-4o-mini，成本低，质量好）
   - Anthropic（claude-3-haiku，中文好，安全）
   - 本地模型（Ollama + qwen2，无 API 成本，但需要本地算力）
2. 评估维度：中文质量、API 成本、响应速度、降级策略、隐私边界
3. 选定 provider 后，在 `.env.example` 中补充对应的 API Key 占位符
4. 确认 `AI_PUBLIC_CONTEXT_ONLY=true` 约束在所有 AI 路由生效

**涉及文件**：`.env.example`、`data/world-kernel/worldos-ai-provider-boundary-contract-v1.json`

**验收标准**：
- 选型文档记录到 `docs/30-assets/ai-provider-selection.md`
- `.env.example` 有对应 API Key 占位符
- `npm run check:ai-provider-boundary` 通过

**门禁**：`npm run check:ai-provider-boundary`

**工时**：1-2h

---

### T5.2 公开索引 API 端点

**步骤**：
1. 新建 `src/app/api/lighthouse/search/route.ts`
2. 该端点调用 `getPublicWorldObjectIndex()` 获取公开数据（已过滤私密内容）
3. 接收查询参数 `q`，使用 Fuse.js 在公开节点中进行全文搜索
4. 返回 JSON：`{ results: [{ id, slug, title, summary, href, score }] }`
5. 添加请求频率限制（简单实现：内存计数，每 IP 每分钟 10 次）
6. 确认该端点在 `data/world-kernel/worldos-api-boundary-registry-v1.json` 中注册为 `public-read`

**涉及文件**：新建 `src/app/api/lighthouse/search/route.ts`、`data/world-kernel/worldos-api-boundary-registry-v1.json`

**验收标准**：
- `GET /api/lighthouse/search?q=世界` 返回 JSON 搜索结果
- 搜索结果只包含 public 节点
- API 边界注册表已更新
- `npm run check:api-boundary` 通过

**门禁**：`npm run check:api-boundary`

**前置依赖**：T5.1

**工时**：2-3h

---

### T5.3 路径推荐引擎

**步骤**：
1. 新建 `src/lib/lighthouse-recommend.ts`
2. 基于公开节点、路径和关系生成推荐
3. 推荐逻辑：
   - 如果访客在节点页：推荐同区域 + 有关联的节点
   - 如果访客在路径页：推荐下一条路径
   - 如果访客在首页：推荐 8 分钟路径和核心节点
4. 推荐结果格式：`{ recommendations: [{ type, node, reason }] }`
5. 所有推荐只使用 public 数据

**涉及文件**：新建 `src/lib/lighthouse-recommend.ts`

**验收标准**：
- 推荐函数返回正确格式
- 推荐结果只包含 public 节点
- 推荐有 reason 说明
- `npm run typecheck` 通过

**门禁**：`npm run typecheck`

**前置依赖**：T5.2

**工时**：2-3h

---

### T5.4 AI 问答能力

**步骤**：
1. 新建 `src/app/api/lighthouse/ask/route.ts`
2. 接收 POST 请求：`{ question: string }`
3. 构建系统 prompt：只使用 `getPublicWorldObjectIndex()` 的数据作为上下文
4. 调用选定的 AI provider API
5. 返回：`{ answer: string, sources: [{ slug, title, href }] }`
6. 实现 5 秒超时
7. 实现错误降级：AI 不可用时返回静态搜索结果
8. 添加频率限制（每 IP 每分钟 5 次）

**涉及文件**：新建 `src/app/api/lighthouse/ask/route.ts`、`src/lib/ai-provider.ts`

**验收标准**：
- `POST /api/lighthouse/ask` 返回回答和来源
- AI 不可用时降级为搜索结果
- 超时返回友好错误
- 频率限制生效
- `npm run check:api-boundary` 通过

**门禁**：`npm run check:api-boundary`

**前置依赖**：T5.2、T5.3

**工时**：3-4h

---

### T5.5 低光降级实现

**步骤**：
1. 新建 `src/lib/ai-availability.ts`
2. 检查 `OPENAI_API_KEY`（或选定 provider 的 key）是否存在
3. 检查 AI 端点是否可达（简单的健康检查请求）
4. 导出 `isLighthouseAvailable(): boolean` 和 `getLighthouseMode(): 'full' | 'low-light'`
5. 在 `/ask` 页面根据模式切换展示：
   - `full` 模式：展示搜索框 + AI 问答
   - `low-light` 模式：展示静态推荐 + 预设问答
6. 确认无 AI 时世界仍完整可用

**涉及文件**：新建 `src/lib/ai-availability.ts`、`src/app/ask/page.tsx`、`src/components/ask/PublicLighthouseConsole.tsx`

**验收标准**：
- 无 API Key 时自动进入低光模式
- 低光模式展示静态推荐
- `npm run typecheck` 通过
- `npm run build` 通过

**门禁**：`npm run check:daily`

**前置依赖**：T5.4

**工时**：2h

---

### T5.6 AI 上下文契约门禁

**步骤**：
1. 更新 `src/lib/ai-boundary.ts`，新增对 AI API 路由的边界检查
2. 验证 AI API 路由只读取 `getPublicWorldObjectIndex()` 的数据
3. 验证 AI API 路由不导入私密数据模块
4. 新建或更新 `scripts/check-public-ai-context-contract.mjs`
5. 在 `package.json` 中添加 `check:public-ai-context-contract` 脚本
6. 将该检查纳入 `check:boundary` 命令链

**涉及文件**：`src/lib/ai-boundary.ts`、新建 `scripts/check-public-ai-context-contract.mjs`、`package.json`

**验收标准**：
- `npm run check:public-ai-context-contract` 通过
- 该检查已纳入 `check:boundary`
- `npm run check:boundary` 通过

**门禁**：`npm run check:boundary`

**前置依赖**：T5.5

**工时**：2h

---

### T5.7 成本控制与缓存

**步骤**：
1. 在 AI API 路由中实现响应缓存（相同问题 5 分钟内返回缓存结果）
2. 使用简单的内存 Map 作为缓存（个人世界不需要 Redis）
3. 设置每日请求上限（如 100 次/天，超出后进入低光模式）
4. 在 `src/app/status/page.tsx` 展示 AI 灯塔状态（可用/低光/限额）
5. 记录 AI 请求日志到 `docs/90-archive/reports/ai-usage-*.log`

**涉及文件**：`src/app/api/lighthouse/ask/route.ts`、`src/app/status/page.tsx`

**验收标准**：
- 相同问题 5 分钟内返回缓存
- 超出日限额后进入低光模式
- 状态页展示 AI 灯塔状态
- `npm run check:daily` 通过

**门禁**：`npm run check:daily`

**前置依赖**：T5.6

**工时**：2h

---

## Phase 6: 传承就绪

**目标**：世界可导出、可回望、可传承
**前置条件**：无（可随时启动）
**预估工时**：8-12h


### T6.1 导出管线

**步骤**：
1. 新建 `scripts/export-world.mjs`
2. 导出内容：
   - `content/` 目录所有 Markdown 文件
   - `data/domains/experience/` 的 JSON 数据
   - `data/core/relations.json` 和 `data/core/world-events.json`
   - `public/covers/` 和 `public/` 下的静态资源
3. 导出格式：zip 包，内部目录结构保持与仓库一致
4. 导出排除：`_legacy/`、`node_modules/`、`.next/`、`.git/`
5. 在 `package.json` 添加 `export:world` 脚本
6. 导出文件名包含日期：`worldos-export-YYYY-MM-DD.zip`

**涉及文件**：新建 `scripts/export-world.mjs`、`package.json`

**验收标准**：
- `npm run export:world` 生成 zip 文件
- zip 文件包含所有公开内容
- zip 文件不包含 `_legacy/` 和 `node_modules/`
- 文件名包含日期

**门禁**：手动验证导出包

**工时**：2-3h

---

### T6.2 导出验证

**步骤**：
1. 将导出的 zip 解压到临时目录
2. 用 `python3 -m http.server` 在临时目录启动静态服务
3. 验证 Markdown 文件可读
4. 验证 JSON 文件可解析
5. 验证封面图片存在
6. 验证导出包无外部依赖（不需要 node_modules 即可阅读）
7. 记录验证结果

**涉及文件**：`docs/90-archive/reports/export-verification-*.md`

**验收标准**：
- 导出包在纯静态环境可打开
- 所有 Markdown 可读
- 所有 JSON 可解析
- 无外部依赖

**门禁**：手动验证

**前置依赖**：T6.1

**工时**：1h

---

### T6.3 内容出生证明全覆盖

**步骤**：
1. 读取 `data/domains/experience/nodes.json`
2. 检查每个节点是否有 `source` 字段（manual / chat / upload / import / github / ai-assisted / system）
3. 检查每个节点是否有 `reviewed` 字段
4. 为缺少这些字段的节点补充
5. 根据 `source` 字段的值，可能需要补充 `originalInput` 或 `generatedBy`
6. 运行门禁确认

**涉及文件**：`data/domains/experience/nodes.json`

**验收标准**：
- 所有节点有 `source` 字段
- 所有节点有 `reviewed` 字段
- `npm run check:content` 通过

**门禁**：`npm run check:content`

**工时**：1-2h

---

### T6.4 传承协议文档

**步骤**：
1. 新建 `docs/00-overview/world-inheritance-protocol.md`
2. 文档内容：
   - 世界的数字资产清单（域名、代码、内容、数据、媒体）
   - 如果我不在了，这个世界怎么处理
   - 导出包的打开方式
   - 域名续费提醒
   - 隐私数据的销毁指引
   - 公开内容的保留许可
3. 用中文撰写
4. 保持与世界语言风格一致

**涉及文件**：新建 `docs/00-overview/world-inheritance-protocol.md`

**验收标准**：
- 文档完成
- 涵盖数字资产清单
- 涵盖应急处理方案
- 中文撰写

**门禁**：无（文档任务）

**工时**：1-2h

---

## 交叉关注点

### Git 工作流

| 动作 | 规则 |
|---|---|
| 分支 | 在 `codex/` 前缀分支上开发，PR 合并到 `main` |
| 提交格式 | `xxx(xxx): 中文xxx` |
| 提交频率 | 每完成一个任务提交一次 |
| 门禁提交 | 每完成一个 Phase 跑 `release:local-rc` 并提交审计报告 |

### 测试策略

| 层级 | 方式 | 频率 |
|---|---|---|
| 类型安全 | `npm run typecheck` | 每次提交 |
| 代码规范 | `npm run lint` | 每次提交 |
| 日常门禁 | `npm run check:daily` | 每次提交 |
| 边界门禁 | `npm run check:boundary` | 涉及 API/脚本/权限时 |
| 发布候选 | `npm run release:local-rc` | 每完成一个 Phase |
| 线上 smoke | `npm run smoke:online` | Phase 1 完成后 |

### 回滚策略

| 场景 | 回滚方式 |
|---|---|
| 内容错误 | Git revert，重新部署 |
| 门禁失败 | 修复后重新提交，不回滚 |
| 线上故障 | 部署平台一键回滚到上一版本 |
| AI 超预算 | 自动进入低光模式，不需要回滚 |
| 私密泄漏 | 立即下线，审查 middleware 和构建产物 |

### Definition of Done（每个 Phase）

每个 Phase 完成时必须满足：

1. `npm run check:daily` 全绿
2. `npm run release:local-rc` 全绿
3. Phase 涉及的所有任务验收标准已满足
4. Git 提交记录清晰
5. 如果涉及内容变更，`npm run check:content` 全绿
6. 如果涉及边界变更，`npm run check:boundary` 全绿
7. 更新规划文档的进展快照

---

## 任务依赖总表

| 任务 | 前置依赖 | Phase | 里程碑 |
|---|---|---|---|
| T1.1 部署平台选型 | 无 | 1 | M1 |
| T1.2 域名与 HTTPS | T1.1 | 1 | M1 |
| T1.3 线上 Smoke | T1.1, T1.2 | 1 | M1 |
| T1.4 Web Vitals | T1.1, T1.2 | 1 | M1 |
| T1.5 可访问性 | T1.1, T1.2 | 1 | M1 |
| T1.6 回滚演练 | T1.3 | 1 | M1 |
| T1.7 证据台账 | T1.3, T1.4, T1.5, T1.6 | 1 | M1 |
| T1.8 人工签收 | T1.7 | 1 | M1 |
| T1.9 翻转状态 | T1.8 | 1 | M1 |
| T2.1 核心节点扩写 | 无 | 2 | M2 |
| T2.2 技术节点补全 | 无 | 2 | M2 |
| T2.3 新增节点 | 无 | 2 | M2 |
| T2.4 路径扩展 | T2.3 | 2 | M2 |
| T2.5 关系加密 | T2.3 | 2 | M2 |
| T2.6 事件补充 | T2.3 | 2 | M2 |
| T2.7 门禁提升 | T2.3 | 2 | M2 |
| T2.8 代表节点更新 | T2.1, T2.3 | 2 | M2 |
| T3.1 脚本审计 | 无 | 3 | M3 |
| T3.2 Legacy 归档 | T3.1 | 3 | M3 |
| T3.3 孤儿清理 | T3.1 | 3 | M3 |
| T3.4 合并脚本 | T3.2, T3.3 | 3 | M3 |
| T3.5 用途注释 | T3.4 | 3 | M3 |
| T3.6 CI 精简 | 无 | 3 | M3 |
| T3.7 瘦身验收 | T3.5, T3.6 | 3 | M3 |
| T4.1 移动端审查 | 无 | 4 | M4 |
| T4.2 溢出修复 | T4.1 | 4 | M4 |
| T4.3 首页优化 | T4.2 | 4 | M4 |
| T4.4 Atlas 适配 | T4.2 | 4 | M4 |
| T4.5 节点页优化 | T4.2 | 4 | M4 |
| T4.6 路径页优化 | T4.2 | 4 | M4 |
| T4.7 验收报告 | T4.3-T4.6 | 4 | M4 |
| T5.1 AI 选型 | 无 | 5 | M5 |
| T5.2 搜索 API | T5.1 | 5 | M5 |
| T5.3 推荐引擎 | T5.2 | 5 | M5 |
| T5.4 AI 问答 | T5.2, T5.3 | 5 | M5 |
| T5.5 低光降级 | T5.4 | 5 | M5 |
| T5.6 契约门禁 | T5.5 | 5 | M5 |
| T5.7 成本控制 | T5.6 | 5 | M5 |
| T6.1 导出管线 | 无 | 6 | M6 |
| T6.2 导出验证 | T6.1 | 6 | M6 |
| T6.3 出生证明 | 无 | 6 | M6 |
| T6.4 传承协议 | 无 | 6 | M6 |

---

## 建议执行顺序

### 第一波（Week 1-2）：上线 + 内容基础

```
T1.1 -> T1.2 -> T1.3 + T1.4 + T1.5 (并行) -> T1.6 -> T1.7 -> T1.8 -> T1.9
T2.1 (并行)
T3.1 (并行)
```

### 第二波（Week 3-4）：内容深耕 + 移动端

```
T2.2 -> T2.3 -> T2.4 + T2.5 + T2.6 (并行) -> T2.7 -> T2.8
T4.1 -> T4.2 -> T4.3 + T4.4 + T4.5 + T4.6 (并行) -> T4.7
```

### 第三波（Week 5-6）：脚本瘦身 + AI 灯塔

```
T3.2 -> T3.3 -> T3.4 -> T3.5 + T3.6 (并行) -> T3.7
T5.1 -> T5.2 -> T5.3 -> T5.4 -> T5.5 -> T5.6 -> T5.7
```

### 第四波（Week 7+）：传承就绪

```
T6.1 -> T6.2
T6.3 (并行)
T6.4 (并行)
```

---

## 附录：现有基础设施映射

| 基础设施 | 位置 | 在本计划中的用途 |
|---|---|---|
| 路由边界 | `src/lib/product-routes.ts` + `middleware.ts` | T1.3 验证线上拦截 |
| API 边界注册表 | `data/world-kernel/worldos-api-boundary-registry-v1.json` | T5.2/T5.4 注册新 API |
| 内容密度门禁 | `scripts/check-worldos-content-density.mjs` | T2.7 提升阈值 |
| 内容增长契约 | `data/world-kernel/worldos-local-content-growth-contract-v1.json` | T2.1/T2.8 验证核心节点 |
| 脚本 legacy 注册表 | `data/world-kernel/worldos-script-legacy-registry-v1.json` | T3.2/T3.3 更新 |
| 维护命令脊柱 | `data/world-kernel/worldos-maintenance-command-spine-v1.json` | T3.4 更新 |
| 外部证据模板 | `data/world-kernel/worldos-1-external-evidence-template-v1.json` | T1.7 填写真实数据 |
| 公开世界索引 | `src/lib/public-world-objects.ts` | T5.2/T5.3 AI 只读数据源 |
| AI 边界策略 | `src/lib/ai-boundary.ts` + `data/domains/ai/ai-boundary-policy.json` | T5.6 验证 AI 只读公开 |
| 导出契约 | `src/lib/export-contract.ts` + `data/core/export-contract.json` | T6.1 导出管线基础 |
| 灯塔推荐 | `src/lib/lighthouse.ts` | T5.3 推荐引擎基础 |
| 维护命令 | `npm run check:daily / check:boundary / release:local-rc` | 每个任务的验证手段 |
