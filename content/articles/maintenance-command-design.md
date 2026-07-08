# 维护命令设计

维护命令脊柱 (maintenance-command-spine) 是 WorldOS 的"神经中枢"：一组按频率分层的门禁、备份、审计命令，让创作者不必记忆一堆脚本名。

## 分层

日常层：check:daily。边界层：check:boundary-full。发布层：release:local-rc。备份层：backup:daily / backup:full。

## 命名纪律

所有命令用动词开头，避免"xxx:xxx"式的名词命名。命令名不超过 25 字符，便于终端补全。

## 与 CLI 伴侣的关系

脊柱是 npm 层的骨架，CLI 伴侣是脊柱之上的封装。有了脊柱，任何前端命令都只是脊柱的调用者。

## 与 npm 的关系

脊柱不换语言：全部走 npm scripts，避免引入 Makefile 或 shell 脚本。npm 已经足够，多一层就多一份维护。

## 复审频率

每季度整理一次，删除不再用的命令，让脊柱保持精瘦。
