/* ==========================================================================
   siteConfig —— 全站唯一配置入口
   --------------------------------------------------------------------------
   【你只需要改这个文件】
   站点名称、作者、简介、导航、社交链接全部集中在这里。
   改完后刷新浏览器即可生效，不需要动其他文件。
   ========================================================================== */

window.siteConfig = {
  /* ---------- 基本信息 ---------- */
  siteName: '白露记事',
  siteTagline: '记录技术、阅读与生活的碎片',
  siteDescription: '一个关于前端开发、读书笔记与日常思考的个人博客。',
  author: '你的名字',          // 改成你自己的名字
  authorBio: '前端工程师 / 长期主义者 / 业余读书人',
  authorAvatar: 'assets/avatar.svg',
  // 在 GitHub Pages 的项目站点下部署时，如果是 https://用户名.github.io/仓库名/，
  // 这里写 '/仓库名'；如果是 https://用户名.github.io/ 这种用户站点，保持空字符串。
  // 使用自定义域名时也保持空字符串。
  basePath: '',
  // 部署后的正式地址，用于 SEO 的 canonical 与 sitemap，末尾不要带斜杠
  siteUrl: 'https://yourname.github.io',

  /* ---------- 备案号（中国大陆服务器才需要，留空则不显示） ---------- */
  icp: '',

  /* ---------- 导航 ---------- */
  nav: [
    { label: '首页',     href: 'index.html' },
    { label: '文章',     href: 'posts.html' },
    { label: '关于我',   href: 'about.html' }
  ],

  /* ---------- 社交链接 ---------- */
  // icon 可选值：github / twitter / mail / rss
  social: [
    { icon: 'github',  label: 'GitHub', href: 'https://github.com/yourname' },
    { icon: 'twitter', label: 'X',      href: 'https://x.com/yourname' },
    { icon: 'mail',    label: '邮箱',   href: 'mailto:you@example.com' },
    { icon: 'rss',     label: 'RSS',    href: 'rss.xml' }
  ],

  /* ---------- 首页文案 ---------- */
  heroTitle: '你好，我是 {name}',
  heroText: '在这里记录我写过的代码、读过的书，以及一些还没想清楚的问题。更新很慢，但都是真话。',

  /* ---------- 页脚 ---------- */
  footerNote: '用 HTML、CSS 和一点点 JavaScript 手写而成。',

  /* ---------- 每页文章数量（文章列表分页用） ---------- */
  postsPerPage: 6
};
