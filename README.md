# 月度平均工时计算器

纯静态、零依赖的移动端工时管理工具。每天录入上下班打卡时间，自动计算当月平均工时与达标风险。

## 功能

- 当日平均工时 vs 目标（≥8h/天），环形进度可视化
- 今日快速打卡 + 任意日期补录
- 每月每日工时明细、达标/未达标状态
- 补工时助手：自动估算还需补多少小时、建议下班时间
- 月份切换抽屉（仅选年月）

## 计算规则

- 标准班次 08:30–18:00，午休 1.5h 不计 → 满勤 8h
- 弹性打卡：08:30–09:30 到岗不算迟到，但晚于 08:30 的分钟从当日工时扣减（可用加班补回）
- 下班宽限：18:00–18:30 不计工时，18:30 之后才算加班
- 达标判定：总工时 ÷ 出勤天数 ≥ 8h

核心计算见 `work-hour-calc.js`（含单元测试，可 `node work-hour-calc.js` 验证）。

## 本地预览

```bash
cd 本目录
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000/index.html
```

## 部署到 GitHub Pages（获得稳定公开链接）

方式一：交给 WorkBuddy 自动部署
1. 在 CodeBuddy 设置 → 连接器 中授权 GitHub
2. 回来告诉 WorkBuddy「部署」，它会自动建仓库 + 开启 Pages

方式二：自己部署（需本地已 `gh auth login`）
```bash
# 1. 在 GitHub 新建空仓库（如 work-hour-tracker），然后：
git init
git add index.html work-hour-calc.js README.md
git commit -m "init work hour tracker"
git branch -M main
git remote add origin https://github.com/你的用户名/work-hour-tracker.git
git push -u origin main
# 2. 仓库 Settings → Pages → Source 选 main 分支 /(root)
# 3. 访问 https://你的用户名.github.io/work-hour-tracker/
```

## 分享给朋友 / 手机安装

- **分享链接**：把 Pages 链接（如 `https://你的用户名.github.io/work-hour-tracker/`）发给朋友即可。
- **手机「安装」成 App**：
  - iOS：Safari 打开链接 → 点底部「分享」→「添加到主屏幕」→ 桌面上出现图标，点击即全屏打开。
  - Android：Chrome 打开链接 → 右上菜单 →「安装应用」/「添加到主屏幕」。
- **离线可用（进阶 PWA）**：再加 `manifest.json` + `service-worker.js`（需托管在 HTTPS，GitHub Pages 满足），即可断网使用。如需此增强，让 WorkBuddy 帮你生成。
