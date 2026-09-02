# 部署到 GitHub Pages（一次性）

1. 电脑浏览器登录 GitHub → 右上角 `+` → **New repository**，仓库名如 `work-hour-tracker`，选 **Public**。
2. 把本压缩包内的 7 个文件解压，上传到仓库**根目录**（含 `LOCAL.md`、`CLOUD.md` 说明文档，可不上传但建议保留）：
   - `index.html`
   - `manifest.webmanifest`
   - `service-worker.js`
   - `jsqr.js`
   - `icon-192.png`
   - `icon-512.png`
3. 仓库页 **Settings → Pages** → **Source** 选 `Deploy from a branch` → 分支选 `main`（或 `master`）/ 目录选 `/(root)` → **Save**。
4. 等 1–2 分钟，访问 `https://你的用户名.github.io/work-hour-tracker/`。
5. **手机**用浏览器打开该链接 → 菜单 **「添加到主屏幕」** → 点开即全屏无地址栏的 App，断网也能用。

## 说明
- 这是纯静态 PWA，无需后端、无需安装依赖。
- 工时数据存在**每台设备浏览器本地**（localStorage）。设备之间可通过「规则」页的**本地同步**（二维码 / 粘贴导入码）互传，无需服务器；换手机或清缓存会丢，重要月份请截图备份。需要多设备自动实时同步才用 `CLOUD.md` 的云端方案。
- 改版后：更新文件上传到 GitHub，同时把 `service-worker.js` 顶部的缓存名（当前 `wht-pwa-v4`）每次递增（`v5`、`v6`…）。浏览器只在 service-worker.js 本身有变化时才会刷新缓存，只改 `index.html` 老用户看不到更新。
