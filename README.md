# 个人博客

纯静态个人博客，零依赖、零构建步骤。手写 HTML + CSS + 原生 JavaScript。

## 目录结构

```
my-blog/
├── index.html          首页：Hero + 最新文章
├── posts.html          文章列表：标签筛选、搜索、分页
├── post.html           文章详情：post.html?id=文章id
├── about.html          关于我
├── 404.html            404 页面（GitHub Pages 会自动使用）
├── robots.txt          搜索引擎抓取规则
├── sitemap.xml         站点地图
├── css/
│   └── style.css       全站样式（设计令牌 + 组件 + 响应式）
├── js/
│   ├── config.js       ★ 站点配置（改这里就够了）
│   ├── main.js         主题切换、导航/页脚渲染、工具函数
│   ├── home.js         首页逻辑
│   ├── posts.js        列表逻辑（筛选/搜索/分页）
│   ├── post.js         详情页逻辑
│   └── about.js        关于页逻辑
├── data/
│   └── posts.js        ★ 文章数据（在这里写文章）
└── assets/
    └── avatar.svg      默认头像
```

## 本地预览

**不要直接双击 HTML 文件**——某些浏览器对 `file://` 协议下的脚本有限制。用本地服务器：

```bash
# 方式一：Python（推荐，系统自带）
cd my-blog
python -m http.server 8000

# 方式二：Node.js
npx serve my-blog

# 方式三：VS Code
# 安装 Live Server 插件，右键 index.html → Open with Live Server
```

然后访问 http://localhost:8000

## 改配置

打开 `js/config.js`，里面每一项都有中文注释。最常改的几项：

| 配置项 | 说明 |
|---|---|
| `siteName` | 站点名称，显示在页头和浏览器标签 |
| `author` | 作者名，首页标题和页脚会用到 |
| `siteDescription` | 站点描述，用于搜索引擎 |
| `basePath` | 部署在子路径时填写，如 `'/my-blog'`；用户站点或自定义域名留空 |
| `siteUrl` | 部署后的正式地址 |
| `nav` | 导航菜单项 |
| `social` | 社交链接（GitHub / X / 邮箱 / RSS） |

## 写文章

打开 `data/posts.js`，在数组最前面加一个对象：

```js
{
  id: 'my-new-post',              // 唯一英文标识，会成为 URL 的一部分
  title: '文章标题',
  date: '2026-09-18',             // YYYY-MM-DD
  tags: ['前端', 'CSS'],
  excerpt: '显示在列表卡片上的摘要，40-80 字最合适。',
  cover: '',
  readingTime: 6,
  content: `
    <p>正文段落。</p>
    <h2>小标题</h2>
    <p>支持 <strong>加粗</strong>、<code>行内代码</code>、<a href="#">链接</a>。</p>
    <ul><li>列表项</li></ul>
    <blockquote>引用</blockquote>
    <pre><code>代码块</code></pre>
  `
}
```

正文用 HTML 片段书写，可用标签：`<p> <h2> <h3> <ul> <ol> <li> <blockquote> <pre><code> <img> <a> <strong> <em> <hr>`

## 功能特性

- **深色模式**：首次跟随系统，之后记住用户选择，无白屏闪烁
- **标签筛选**：自动从文章数据中收集标签
- **搜索**：标题 + 摘要 + 标签的模糊匹配
- **分页**：每页文章数在 `config.js` 里配置
- **响应式**：移动端汉堡菜单，桌面端横向导航
- **无障碍**：键盘导航、焦点可见、语义化标签、ARIA、减少动效支持
- **SEO**：语义化结构、Open Graph、canonical、站点地图
- **打印样式**：文章可直接打印，链接地址会显示出来

## 部署

见同目录下的 `DEPLOY.md`（GitHub Pages 完整步骤）。

## 自定义域名后要做的事

1. 修改 `js/config.js` 里的 `siteUrl`
2. 修改 `robots.txt` 里的 Sitemap 地址
3. 修改 `sitemap.xml` 里的所有 URL

## 许可

个人使用随意。文章内容版权归作者所有。
