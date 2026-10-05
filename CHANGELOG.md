# Changelog

本文件记录 jiojio-brand-design 的所有重要变更。格式遵循 [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/)，版本号遵循 [Semantic Versioning](https://semver.org/)。

## [Unreleased]

## [2.0.0] - 2026-10-05

首个 release，没有 baseline tag，对比基线为 Initial commit `152069e`（`git diff --stat 152069e 633fe9c` 的结果是 `29 files changed, 4164 insertions(+), 1 deletion(-)`）。详见 [`docs/releases/v2.0.0-release.html`](docs/releases/v2.0.0-release.html)。

### Added

- 设计系统本体（`2d50f27`，2026-04-27）：`index.html` + `logo-final.html` + `src/` 下 14 个 jsx，合计 3,928 行；12 个 tab 分 4 组（Brand 01-02 / Foundations 03-07 / UI 08-10 / UX 11-12）；三层令牌 primitive → semantic → component，可导出 W3C DTCG JSON 与 CSS 变量。
- 公开版 README（`0cd12f9`、`7235ea2`）：中英设计语言摘要、11 张截图、tab 索引、品牌基础值、文件地图，中文摘要独立成段。
- MIT 许可（`a729106`）：`LICENSE` 与 README License 节；jiojio 名称、`jio` 字标、吉 印章为品牌资产，不在许可范围内。
- 发布物：`docs/releases/`（版本流程、模板、v2.0.0 三件套）、本 CHANGELOG、README 的「一图看懂」Mermaid 图。

### Changed

- README 从内部口径重写为面向公开读者的版本（`0cd12f9`）；删去指向个人账号的旧 clone URL。

### Fixed

- 7 个页面（06-12）的页头编号与分组和侧栏不一致（例：Components 页头 `07 · UI`，侧栏是 08），已逐一对齐（`0cd12f9`）。
- `logo-final.html` 顶部的死链 `← back to lab`（指向不存在的 `logo-lab-v6.html`）改为指向 `index.html#logo`（`0cd12f9`）。

### Security

- 转 public 前的隐私审计（逐文件加全历史扫描，无密钥、路径、真人信息）发现两项并处理：两个早期 commit 的作者邮箱改为 GitHub noreply 地址（`git filter-repo --mailmap`），旧 README 里的个人账号 clone URL 改为组织地址（`--replace-text`）；两项均全史重写并 force push。遗留：重写前的旧 commit SHA 仍可按 URL 访问，需向 GitHub support 申请清除；账号未开启邮箱隐私，GitHub 服务端生成的 merge commit 会再次带出邮箱。

[Unreleased]: https://github.com/jiojio-lab/jiojio-brand-design/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/jiojio-lab/jiojio-brand-design/releases/tag/v2.0.0
