# 古月浮屿｜V1 项目骨架第四批实现说明

> 本文件说明本次新增/修改的 V1 第四批项目骨架文件，并记录检查结果。

## 本次完成

- 新增 RSS 生成工具 `src/lib/rss.ts`
- 新增 RSS 路由 `src/app/rss.xml/route.ts`
- 新增 JSON-LD 结构化数据组件
- 新增站点级 JSON-LD
- 新增节点文章 JSON-LD
- 新增项目完整性检查脚本
- 新增基础格式检查脚本
- `package.json` 增加 `check` / `check:integrity` / `check:format`

## 新增命令

```bash
npm run check:integrity
npm run check:format
npm run check
```

## 本次环境检查说明

在当前生成环境中，未执行 `npm install`，因此无法运行完整 Next.js lint / build。
本次使用了以下替代检查：

- JSON 解析检查
- `data/*.json` 引用完整性检查
- `contentPath` 文件存在性检查
- TypeScript / TSX 语法解析检查
- 基础格式检查：行尾换行、尾随空格、Tab、JSON 格式

完整 lint 建议在本地安装依赖后执行：

```bash
npm install
npm run check
npm run lint
npm run build
```
