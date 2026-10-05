# Releases · 发布记录

本目录存放 jiojio-brand-design 每个版本的发布物。每个版本三件：

| 文件 | 给谁看 | 讲什么 |
|---|---|---|
| `vX.Y.Z-release.html` | 项目相关但不写代码的人，以及三个月后的自己 | 九段账目：元数据 / 一句话 diff / 名词解释 / 变更总表 / 逐项四问 / 评审 / 验证时间线 / 决策点 / 追溯 |
| `vX.Y.Z-brief-slide.html` | 第一次接触本项目的人 | 9 页左右的全屏翻页简报：先对齐名词，再讲背景与变更 |
| `vX.Y.Z-release-notes.md` | GitHub Release 页面的正文 | 摘要、验证命令、遗留、回滚方式 |

两个 HTML 都是单文件、零外链、双击即可打开，会作为 Release assets 单独下载，所以不引用任何相对路径的图片或外部字体。

## 版本流程

1. **定版**：用 `git log` 找到上一个 release tag 以来的全部变更，按 semver 定版本号。MAJOR = 设计语言或结构级变更，MINOR = 一批功能性变更，PATCH = 单点小修。首个 release（v2.0.0）没有 baseline tag，以 Initial commit 为对比基线。
2. **写三件套**：从 `templates/` 起笔，写 `vX.Y.Z-release.html`、`vX.Y.Z-brief-slide.html`、`vX.Y.Z-release-notes.md`。所有数字（文件数、行数、SHA、日期、tab 数）用 `git log` / `git diff --stat` / `wc -l` 核对，不凭记忆。
3. **刷新 README 与 CHANGELOG**：README 的「一图看懂」是 Mermaid 图，随版本检查是否仍符合 `src/app.jsx` 的 TABS；CHANGELOG 按 Keep a Changelog 补本版条目。
4. **查验**：用无头 Chrome 逐页截图（brief-slide 每页一张，release 页整页），再把两个 HTML 单独拷到空目录打开一次，确认没有裂图和外链。
5. **评审**：cross-model 评审结论回填到 release.html 的 06 段与 notes。
6. **打 tag + 建 Release**：`gh release create vX.Y.Z`，assets 挂两个 HTML 与源码 zip；tag SHA 与 zip 的 SHA-256 回填到 notes 与本表。

回滚：本仓库是静态文档仓库，没有部署对象和数据库。回滚 = checkout 上一个 tag，或对问题 commit 做 `git revert`。

## 模板

`templates/release.html` 与 `templates/brief-slide.html` 是本仓库的骨架，已换成本仓库自己的设计语言：

- 配色取 Paper `#FAF8F2` 与 Fawn `#A07E58`，墨阶 `#16140F` / `#6B675C` / `#9B978B` / `#C2BFB2`；语义色 ok / warn / risk 各自带一个更深的 `*-ink` 变体，只用于 11 到 12px 的小号文字，保证对比度。
- 字体只用本地栈（系统无衬线 + 系统等宽），不引 Google Fonts 或 CDN。
- 顶栏 tile 用「吉」字。数字、路径、版本号一律等宽加 `tnum`。
- 遵守设计系统自己的禁令：无 emoji、无感叹号、无渐变、投影模糊不超过 16px、单界面不超过 3 种字重。

brief-slide 支持 `#p1` 到 `#pN` 锚点直达，键盘上下左右、PageUp/PageDown、空格翻页，Home/End 跳首末页。

## 版本索引

| 版本 | 日期 | 状态 | 类型 | release 页面 | brief-slide | notes |
|---|---|---|---|---|---|---|
| v2.0.0 | 2026-10-05 | tag 已打，Release 创建中，发布物 PR 待合并 | 首发：设计系统本体 + 公开化收口 | [release](v2.0.0-release.html) | [brief](v2.0.0-brief-slide.html) | [notes](v2.0.0-release-notes.md) |
