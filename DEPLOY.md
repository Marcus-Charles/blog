# 部署到 GitHub Pages：完整步骤

GitHub Pages 对静态站点永久免费，支持 HTTPS 和自定义域名。下面从零开始走一遍。

---

## 前置检查

- 有一个 GitHub 账号（没有就去 https://github.com/signup 注册）
- 本机装了 Git。检查一下：

```bash
git --version
```

没装的话去 https://git-scm.com/downloads 下载安装。

先在终端里配置一次身份（只需一次）：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱@example.com"
```

> 建议用 GitHub 账号绑定的邮箱，这样提交会正确归属到你。

---

## 第 0 步：决定仓库名

这一步决定你的博客最终地址，**改起来麻烦，先想清楚**。

| 仓库名 | 访问地址 | 适用场景 |
|---|---|---|
| `你的用户名.github.io` | `https://你的用户名.github.io` | **推荐**。根路径站点，`basePath` 填 `''` |
| `blog`（或任意名字） | `https://你的用户名.github.io/blog` | 项目站点，`basePath` 必须填 `'/blog'` |

> ⚠️ **最常见的翻车点**：用项目站点（第二种）却没改 `basePath`，结果 CSS 和 JS 全部 404，页面变成一片白底黑字。
> 对应地，打开 `js/config.js` 把 `basePath: ''` 改成 `basePath: '/blog'`（仓库名叫什么就写什么）。

下面以仓库名 `my-blog`（项目站点）为例演示，如果你选用户站点，把所有 `/my-blog` 去掉即可。

---

## 第 1 步：创建 GitHub 仓库

1. 登录 GitHub，右上角 **+** → **New repository**
2. **Repository name** 填 `my-blog`
3. 可见性选 **Public**
   > 私有仓库要用 Pages 需要付费账号，免费账号必须是 Public。
4. **不要**勾选 "Add a README file"、".gitignore"、"license"——保持空仓库，否则第一次 push 会冲突
5. 点 **Create repository**

创建后页面会显示一段命令，先放一边，下面要用。

---

## 第 2 步：初始化本地 Git 仓库

在项目目录（`my-blog` 文件夹）里打开终端：

- **Windows**：在文件夹地址栏输入 `cmd` 回车，或在 VS Code 里 `Ctrl + \`` 打开终端
- **macOS**：右键文件夹 → 服务 → 新建位于文件夹位置的终端窗口

然后依次执行：

```bash
# 1. 初始化仓库
git init

# 2. 指定主分支名为 main（GitHub 的默认分支名）
git branch -M main

# 3. 添加所有文件
git add .

# 4. 提交
git commit -m "chore: 初始化博客站点"

# 5. 关联远程仓库（把下面的 URL 换成你自己的）
git remote add origin https://github.com/你的用户名/my-blog.git

# 6. 推送
git push -u origin main
```

**第 6 步会让你登录**。GitHub 已经不支持密码验证，需要 Personal Access Token：

1. GitHub → 右上角头像 → **Settings** → 左侧最下 **Developer settings**
2. **Personal access tokens** → **Tokens (classic)** → **Generate new token (classic)**
3. Note 随便填（如 `blog-deploy`），Expiration 选 `90 days` 或 `No expiration`
4. 勾选 **repo** 这一整个大项
5. 生成后**立刻复制** token（只显示一次）
6. 回到终端，用户名填 GitHub 用户名，密码位置**粘贴 token**

> Token 就是密码，不要提交到仓库里，也不要发给别人。想省事可以装 GitHub CLI（`gh auth login`）或用 SSH key，配置一次以后就不用再输。

推送成功后刷新 GitHub 页面，能看到所有文件。

---

## 第 3 步：开启 Pages

1. 进入仓库 → 顶部 **Settings**
2. 左侧栏找到 **Pages**（在 "Code and automation" 分组下）
3. **Source** 选 **Deploy from a branch**
4. **Branch** 选 `main`，文件夹选 `/ (root)`
   > 选 `/ (root)` 是因为 `index.html` 在仓库根目录。
5. 点 **Save**

保存后页面顶部会出现提示，说站点正在构建。**等 1–3 分钟**，然后刷新这个设置页，会显示：

```
Your site is live at https://你的用户名.github.io/my-blog/
```

点进去就能看到你的博客了。

---

## 第 4 步：验证部署

按顺序检查这几项：

- [ ] 首页能打开，样式正常（不是白底黑字）
- [ ] 点"文章"能进列表页
- [ ] 点任意文章标题能进详情页
- [ ] 点"关于我"能打开
- [ ] 右上角主题按钮能切换深浅色
- [ ] 手机浏览器打开，导航是汉堡菜单
- [ ] 打开浏览器控制台（F12），Console 没有红色报错

**如果样式全丢了**（页面能打开但很丑）→ 99% 是 `basePath` 没配。回到 `js/config.js` 改成 `'/my-blog'`，然后：

```bash
git add .
git commit -m "fix: 修正 basePath 以适配项目站点"
git push
```

**如果打开是 404** → 检查第 3 步的分支是不是 `main`、文件夹是不是 `/ (root)`。另外第一次部署偶尔要等 5 分钟。

---

## 第 5 步：设置自定义域名（可选）

如果你有自己的域名：

### 5.1 在仓库里加 CNAME

在项目根目录新建一个文件，名字就叫 `CNAME`（**没有扩展名**），内容只有一行：

```
blog.yourdomain.com
```

不要带 `https://`，不要带斜杠。

```bash
git add CNAME
git commit -m "chore: 添加自定义域名配置"
git push
```

### 5.2 配置 DNS

去你的域名服务商（阿里云、腾讯云、Cloudflare、Namecheap 等）添加解析记录：

| 主机记录 | 记录类型 | 记录值 |
|---|---|---|
| `blog`（子域名） | CNAME | `你的用户名.github.io` |
| `@`（根域名） | A | `185.199.108.153` |
| `@`（根域名） | A | `185.199.109.153` |
| `@`（根域名） | A | `185.199.110.153` |
| `@`（根域名） | A | `185.199.111.153` |

> 这四个 IP 是 GitHub Pages 的官方地址。子域名用 CNAME 就够，根域名必须用 A 记录（因为 DNS 规范不允许根域名用 CNAME）。

DNS 生效需要几分钟到几小时，可以用 `nslookup blog.yourdomain.com` 检查。

### 5.3 回 GitHub 填域名并开 HTTPS

1. 仓库 → Settings → Pages → **Custom domain** 填入 `blog.yourdomain.com` → Save
2. 等 DNS 检查通过（显示绿色勾）
3. 勾选 **Enforce HTTPS**

> HTTPS 证书是 GitHub 自动签发的，可能需要等几分钟到 24 小时。证书没签发前 "Enforce HTTPS" 是灰色不可点的，等一下再来。

### 5.4 别忘了改这两处

自定义域名生效后，把项目里三处占位地址换成真实域名：

1. `js/config.js` → `siteUrl: 'https://blog.yourdomain.com'`，同时把 `basePath` 改回 `''`
2. `robots.txt` → Sitemap 那一行
3. `sitemap.xml` → 所有 `<loc>` 里的 URL

---

## 第 6 步：以后的日常更新

写文章的流程：

```bash
# 1. 编辑 data/posts.js，加一篇文章
# 2. 本地预览确认
python -m http.server 8000

# 3. 提交
git add .
git commit -m "post: 新增文章《文章标题》"
git push
```

推送后 1–2 分钟，线上自动更新。可以在仓库的 **Actions** 标签页看到部署进度。

---

## 常见问题

**Q：推送后线上没变化？**
A：先看 Actions 标签页，确认部署任务成功了。如果成功但页面还是旧的，强制刷新浏览器（`Ctrl + Shift + R` / `Cmd + Shift + R`）。GitHub Pages 有 CDN 缓存，偶尔延迟几分钟。

**Q：`git push` 报 `rejected - non-fast-forward`？**
A：远程仓库有你本地没有的提交（通常是创建仓库时勾了 README）。执行：
```bash
git pull origin main --rebase
git push
```

**Q：中文文件名或中文文章标题乱码？**
A：确保所有文件都是 UTF-8 编码，且 HTML 里有 `<meta charset="UTF-8">`（模板里已有）。

**Q：想用 Jekyll 但构建失败了？**
A：本项目不是 Jekyll 站点，不需要构建。如果 GitHub 尝试跑 Jekyll，在根目录加一个空文件 `.nojekyll` 即可禁用。
```bash
touch .nojekyll
git add .nojekyll && git commit -m "chore: 禁用 Jekyll 构建" && git push
```

**Q：怎么回滚到上一个版本？**
```bash
# 查看提交历史，找到要回退到的 commit 短哈希
git log --oneline

# 方式一：新建一次反向提交（推荐，历史完整）
git revert <commit-hash>
git push

# 方式二：强制回退（会重写历史，仅自己一个人开发时用）
git reset --hard <commit-hash>
git push --force-with-lease
```

**Q：能不能不暴露真实姓名/邮箱？**
A：`git config user.email` 用 GitHub 提供的匿名邮箱（Settings → Emails → Keep my email addresses private，格式形如 `12345678+用户名@users.noreply.github.com`），这样提交记录里不会出现真实邮箱。

---

## 部署检查清单

上线前照着过一遍：

- [ ] `js/config.js` 里 `siteName`、`author`、`siteUrl` 都改成了自己的
- [ ] `basePath` 与仓库类型匹配（用户站点填 `''`，项目站点填 `'/仓库名'`）
- [ ] 示例文章已删除或替换成自己的内容
- [ ] `about.html` 里的 `ABOUT` 对象（在 `js/about.js`）改成了自己的信息
- [ ] 本地 `python -m http.server` 预览无异常
- [ ] 推送后在手机上实测一遍
- [ ] 自定义域名场景：`CNAME` 文件 + DNS 解析 + Enforce HTTPS 都已完成
