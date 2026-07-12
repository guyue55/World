# 小说书库与 TXT 转 EPUB 流水线

TXT 小说归档的难点通常不在单个文件，而在整个目录和命名体系。

这个节点记录：

- 多层目录扫描策略。
- TXT 编码识别与替换策略。
- 重复文件与系列文件的处理。
- 转换为 EPUB 后的阅读器兼容性。
- Kavita、Reader 等方案的边界。

它属于技术星域，也与档案馆相连：内容要能被长期保存和重新打开。

## 为什么不只是转格式

转 EPUB 只是最表层的动作。真正的问题是：几百本小说散落在多层目录中，编码混杂（GBK、UTF-8、Big5），命名不统一（简体、繁体、卷号、别名），重复文件大量存在。如果不先做扫描、去重和标准化，转出来的 EPUB 会把这些问题原封不动带进阅读器。这个节点的价值在于记录完整管线的思路，而不只是一个转换命令。

## 转换管线命令示例

```bash
# 批量扫描目录结构，识别编码
find /books -name "*.txt" -exec file -i {} \; | grep -v utf-8

# GBK 转 UTF-8（单文件）
iconv -f GBK -t UTF-8 input.txt > output.txt

# TXT 转 EPUB（使用 pandoc）
pandoc input.txt -o output.epub --metadata title="书名"

# 批量去重（按文件内容 MD5）
find /books -name "*.txt" -exec md5sum {} \; | sort | uniq -d -w 32
```

编码问题是转换管线的第一道关。中文 TXT 文件经常混用 GBK、UTF-8 和 Big5 三种编码。`file -i` 可以快速识别大部分文件的编码，但有误判。更可靠的方式是用 `chardet`（Python 库）做二次确认。转 EPUB 后要在实际阅读器上测试目录跳转、字体渲染和章节分割，不能只看文件能否打开。

## 跨平台与含空格路径

批处理不要使用会按空白拆分文件名的命令替换。macOS 可用 `shasum -a 256`，Linux 可用 `sha256sum`；相同哈希只标记重复候选，删除前仍需核对文件大小与内容。
