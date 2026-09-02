# 开通云同步（Supabase，免费）

本应用的「云同步」用 Supabase 做云端存储，实现多设备共享同一份工时数据，无需自建账号系统。只需在 supabase.com 开个项目、建一张表，把两串字符填进页面即可。

## 第 1 步：新建 Supabase 项目

1. 打开 <https://supabase.com> → 右上角 **Start your project**（用 GitHub 登录最方便）。
2. 点 **New project**：
   - Name：随意，如 `work-hour`
   - Database Password：记一下（本地用不到，但创建时要填）
   - Region：选离你近的（如 Singapore）
3. 等约 1 分钟初始化完成。

## 第 2 步：建数据表

1. 左侧菜单 → **SQL Editor** → **New query**。
2. 把下面整段粘贴进去，**Run**（执行）：

```sql
create table work_data (
  sync_code text primary key,
  payload   jsonb not null,
  updated_at timestamptz default now()
);

alter table work_data enable row level security;

-- 允许匿名（前端直连）按同步码读写自己的数据
create policy "anon all by code"
  on work_data
  for all
  to anon
  using (true)
  with check (true);
```

> 说明：`sync_code` 是主键，每个同步码对应一行，存你全部的工时记录（JSON）。

## 第 3 步：拿到 URL 和 Anon Key

1. 左侧菜单 → **Settings → API**。
2. 复制两项：
   - **Project URL**：形如 `https://xxxx.supabase.co`
   - **anon public key**：一长串 `eyJhbGci...`（注意是 `anon public`，不是 service_role）

## 第 4 步：填进工时助手

1. 打开已部署的工时助手页面 → 底部「规则」页 → **开启云同步**（或点右上角 ☁ 图标）。
2. 填入：
   - Supabase 项目 URL
   - Anon Key
   - 同步码：点「随机」生成一串（这就是你的"轻账号"，换设备用同一串）
3. 点 **保存并开启同步**。状态灯变绿 ✓ 即成功。

## 换设备 / 重装

在新手机打开同一链接 → 开启云同步 → 填**同样的 Supabase URL、Anon Key、同步码** → 数据自动拉取。

## 安全提示

- `anon key` 设计为可暴露在前端，靠上面的 RLS 策略保护，**可以放心填进页面**。
- 同步码相当于你的密码：知道它的人能读写你的数据。请用页面「随机」生成的长串，不要设成 `123456` 这类易猜值。
- 这不是银行级安全方案，适合个人日常使用。如需更强隔离，可在 RLS 里加入对请求头的校验（进阶，可另行咨询）。
- 云端只存工时打卡时间，不含其他隐私信息。
