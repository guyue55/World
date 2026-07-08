# Git 进阶技巧集

Git 不只是 commit 和 push。掌握进阶技巧能让版本控制更加得心应手。

## rebase 优雅合并

```bash
# 将 feature 分支变基到 main
git checkout feature
git rebase main

# 交互式 rebase 合并提交
git rebase -i HEAD~3
```

## cherry-pick 摘樱桃

从其他分支挑选特定提交：

```bash
git cherry-pick <commit-hash>
```

## bisect 二分查找

当引入了 bug 但不知道是哪个提交时：

```bash
git bisect start
git bisect bad          # 标记当前为坏
git bisect good <hash>  # 标记某个好版本
# Git 会自动切换到中间提交，测试后标记 good/bad
```

## stash 暂存

```bash
git stash        # 暂存当前修改
git stash pop    # 恢复暂存的修改
git stash list   # 查看暂存列表
```
