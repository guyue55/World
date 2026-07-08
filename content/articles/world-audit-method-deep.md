# 世界审计方法深化

世界需要定期体检。这份文档定义了一套完整的审计方法论。

## 审计维度

1. **内容密度**：每个公开节点正文 >= 400 字符
2. **关系密度**：每个节点至少有 1 条关系
3. **路径覆盖**：每个一级区域至少在 1 条公开路径中
4. **事件连续性**：世界事件覆盖每个月
5. **权限边界**：私密内容不泄漏到公开层
6. **脚本治理**：活跃脚本 <= 200，legacy 归档不动

## 审计工具

```bash
npm run check:daily        # 日常门禁
npm run check:boundary     # 边界门禁
npm run check:cross-references  # 交叉引用验证
npm run audit:content-freshness  # 新鲜度审计
```

## 审计频率

- 每周修复日：跑 `check:daily`
- 每月月报：跑 `check:boundary` + 新鲜度审计
- 每季季报：跑 `release:local-rc` + 全面审计
