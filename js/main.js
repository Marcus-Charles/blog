/* ==========================================================================
   main.js —— 全站通用逻辑
   职责：主题切换、导航渲染、页头滚动、移动端菜单、工具函数
   依赖：js/config.js（必须在它之后加载）
   ========================================================================== */

(function () {
  'use strict';

  var cfg = window.siteConfig || {};

  /* ------------------------------------------------------------------------
     工具函数
     ------------------------------------------------------------------------ */

  /** 安全转义 HTML，防止文章标题/摘要里的特殊字符破坏结构 */
  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  window.escapeHtml = escapeHtml;

  /**
   * 解析 basePath，统一成 "前缀无尾斜杠" 形式。
   * 会自动校验：只有当当前页面地址确实跑在这个前缀下时才启用，
   * 否则回退到根路径。这样同一份代码既能部署在 /blog/ 子路径（GitHub Pages 项目站点），
   * 也能部署在域名根目录（自定义域名 / 用户站点），不用改配置。
   */
  var CFG_BASE = String(cfg.basePath || '').replace(/\/+$/, '');
  var BASE = (CFG_BASE !== '' && window.location.pathname.indexOf(CFG_BASE + '/') === 0)
    ? CFG_BASE
    : '';

  /** 给站内相对路径拼接 basePath */
  function url(path) {
    if (/^(https?:)?\/\//.test(path) || /^(mailto:|tel:|#)/.test(path)) return path;
    return BASE + '/' + String(path).replace(/^\/+/, '');
  }
  window.siteUrl = url;

  /** 格式化日期：2026-09-12 → 2026 年 9 月 12 日 */
  function formatDate(iso) {
    var parts = String(iso || '').split('-');
    if (parts.length !== 3) return iso || '';
    return parts[0] + ' 年 ' + Number(parts[1]) + ' 月 ' + Number(parts[2]) + ' 日';
  }
  window.formatDate = formatDate;

  /** 读取 URL 查询参数 */
  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }
  window.getParam = getParam;

  /* ------------------------------------------------------------------------
     图标库（内联 SVG，避免额外请求）
     ------------------------------------------------------------------------ */
  var ICONS = {
    github: '<path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.23 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/>',
    twitter: '<path d="M18.9 2h3.3l-7.2 8.2L23.5 22h-6.6l-5.2-6.8L5.8 22H2.5l7.7-8.8L1 2h6.8l4.7 6.2L18.9 2zm-1.2 18h1.8L7.4 3.9H5.5L17.7 20z"/>',
    mail: '<path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13zm2.7-.5 7.3 6.1L19.3 5H4.7zM20 6.9l-7.4 6.2a1.5 1.5 0 0 1-1.9 0L3.3 6.9V18.5a1.2 1.2 0 0 0 1.2 1.2h15a1.2 1.2 0 0 0 1.2-1.2V6.9z"/>',
    rss: '<path d="M5.5 20a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM3 9.8v2.9c4.7 0 8.5 3.8 8.5 8.5h2.9C14.4 15.1 9.1 9.8 3 9.8zM3 3v2.9C11.2 5.9 17.9 12.6 17.9 20.8H20.8C20.8 10.9 12.9 3 3 3z"/>',
    sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 1.5v3M12 19.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1.5 12h3M19.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/>',
    moon: '<path d="M21 13.2A9.1 9.1 0 0 1 10.8 3a9.1 9.1 0 1 0 10.2 10.2z"/>',
    menu: '<path d="M3.5 7h17M3.5 12h17M3.5 17h17" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" fill="none"/>',
    arrowLeft: '<path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
  };

  function icon(name, size) {
    var path = ICONS[name];
    if (!path) return '';
    var isStroke = name === 'sun' || name === 'menu' || name === 'arrowLeft';
    return '<svg viewBox="0 0 24 24" width="' + (size || 17) + '" height="' + (size || 17) +
      '" aria-hidden="true"' + (isStroke ? '' : ' fill="currentColor"') + '>' + path + '</svg>';
  }
  window.icon = icon;

  /* ------------------------------------------------------------------------
     主题切换
     优先级：localStorage > 系统偏好。首次访问跟随系统，之后记住用户选择。
     ------------------------------------------------------------------------ */
  var THEME_KEY = 'blog-theme';

  function getPreferredTheme() {
    var saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* 隐私模式忽略 */ }
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#12120f' : '#fdfdfc');
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      var next = theme === 'dark' ? '浅色' : '深色';
      btn.setAttribute('aria-label', '切换到' + next + '模式');
      btn.setAttribute('title', '切换到' + next + '模式');
    }
  }

  // 尽早应用，避免首屏闪白（此脚本放在 head 之后的 body 底部，配合内联预置脚本）
  applyTheme(getPreferredTheme());

  function initThemeToggle() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* 忽略 */ }
    });
    // 用户没手动选过时，跟随系统变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      var saved = null;
      try { saved = localStorage.getItem(THEME_KEY); } catch (err) { /* 忽略 */ }
      if (!saved) applyTheme(e.matches ? 'dark' : 'light');
    });
  }

  /* ------------------------------------------------------------------------
     页头：品牌、导航、社交按钮、主题按钮
     ------------------------------------------------------------------------ */

  /** 当前页面文件名，用于高亮导航 */
  function currentPage() {
    var file = window.location.pathname.split('/').pop();
    return file === '' ? 'index.html' : file;
  }

  function renderHeader() {
    var slot = document.getElementById('site-header');
    if (!slot) return;

    var page = currentPage();

    var navHtml = (cfg.nav || []).map(function (item) {
      var isCurrent = item.href === page ||
        // 文章详情页也高亮"文章"
        (page === 'post.html' && item.href === 'posts.html');
      return '<li><a class="nav__link" href="' + escapeHtml(url(item.href)) + '"' +
        (isCurrent ? ' aria-current="page"' : '') + '>' + escapeHtml(item.label) + '</a></li>';
    }).join('');

    var socialHtml = (cfg.social || []).map(function (s) {
      return '<li><a href="' + escapeHtml(url(s.href)) + '" aria-label="' + escapeHtml(s.label) +
        '" title="' + escapeHtml(s.label) + '"' +
        (/^https?:/.test(s.href) ? ' target="_blank" rel="noopener noreferrer"' : '') +
        '>' + icon(s.icon) + '</a></li>';
    }).join('');

    slot.className = 'site-header';
    slot.innerHTML =
      '<div class="site-header__inner">' +
        '<a class="brand" href="' + escapeHtml(url('index.html')) + '">' +
          '<span class="brand__mark" aria-hidden="true">' + escapeHtml((cfg.siteName || 'B').charAt(0)) + '</span>' +
          '<span>' + escapeHtml(cfg.siteName || '我的博客') + '</span>' +
        '</a>' +
        '<nav class="nav" id="site-nav" aria-label="主导航">' +
          '<ul class="nav__list">' + navHtml +
            '<li class="nav-social" aria-hidden="false"><ul class="social-list" style="margin-left:8px">' + socialHtml + '</ul></li>' +
          '</ul>' +
        '</nav>' +
        '<div class="header-actions" style="margin-left:auto">' +
          '<button class="icon-btn" id="theme-toggle" type="button" aria-label="切换主题">' +
            '<span class="icon-sun">' + icon('sun') + '</span>' +
            '<span class="icon-moon">' + icon('moon') + '</span>' +
          '</button>' +
          '<button class="icon-btn nav-toggle" id="nav-toggle" type="button" aria-label="打开菜单" aria-expanded="false" aria-controls="site-nav">' +
            icon('menu') +
          '</button>' +
        '</div>' +
      '</div>';

    // 导航在移动端是弹出层，社交图标放进去会挤，小屏隐藏
    var socialWrap = slot.querySelector('.nav-social');
    if (socialWrap) socialWrap.classList.add('nav-social--inline');

    initThemeToggle();
    initMobileNav();
    initScrollShadow();
  }

  function initMobileNav() {
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
    });

    // 点击导航项后自动收起
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Esc 关闭
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  function initScrollShadow() {
    var header = document.getElementById('site-header');
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 4);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------------
     页脚
     ------------------------------------------------------------------------ */
  function renderFooter() {
    var slot = document.getElementById('site-footer');
    if (!slot) return;

    var year = new Date().getFullYear();
    var icp = cfg.icp
      ? '<p><a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">' +
        escapeHtml(cfg.icp) + '</a></p>'
      : '';

    slot.className = 'site-footer';
    slot.innerHTML =
      '<div class="site-footer__inner">' +
        '<p>&copy; ' + year + ' ' + escapeHtml(cfg.author || cfg.siteName || '') +
          ' &middot; ' + escapeHtml(cfg.footerNote || '') + '</p>' +
        icp +
      '</div>';
  }

  /* ------------------------------------------------------------------------
     文档标题与 meta 同步
     ------------------------------------------------------------------------ */
  function setPageTitle(title) {
    document.title = title
      ? title + ' · ' + (cfg.siteName || '')
      : (cfg.siteName || '') + (cfg.siteTagline ? ' · ' + cfg.siteTagline : '');
  }
  window.setPageTitle = setPageTitle;

  /* ------------------------------------------------------------------------
     启动
     ------------------------------------------------------------------------ */
  function boot() {
    renderHeader();
    renderFooter();
    // 各页面脚本通过 window.__onBoot 注册自己的初始化逻辑
    if (typeof window.__onBoot === 'function') {
      window.__onBoot();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
