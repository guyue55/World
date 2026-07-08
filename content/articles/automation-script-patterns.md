# 自动化脚本模式

从手动重复到自动执行，是工程师的必经之路。

## 定时任务

### cron 表达式

```bash
# 每天凌晨 3 点执行
0 3 * * * /path/to/script.sh

# 每周一上午 9 点
0 9 * * 1 /path/to/script.sh
```

### systemd timer

systemd timer 比 cron 更强大，支持依赖管理和错误重试：

```ini
[Unit]
Description=Daily backup

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target
```

## 幂等设计

自动化脚本必须是幂等的——执行多次和执行一次效果相同。关键是在执行前检查状态。

## 日志和告警

脚本要记录执行日志，失败时要有告警机制。简单的方案是输出到文件 + 邮件通知。
