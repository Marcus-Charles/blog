/* ==========================================================================
   post.js —— 文章详情页渲染
   依赖：js/config.js、data/posts.js、js/main.js
   ========================================================================== */

(function () {
  'use strict';

  var all = (window.posts || []).slice();

  /** 按日期倒序，用于上一篇/下一篇的计算 */
  function sorted() {
    return all.slice().sort(function (a, b) {
      return String(b.date).localeCompare(String(a.date));
    });
  }

  function findPost(id) {
    for (var i = 0; i < all.length; i++) {
      if (all[i].id === id) return all[i];
    }
    return null;
  }

  /** 渲染 404 状态 */
  function renderNotFound() {
    var main = document.getElementById('main');
    if (!main) return;
    setPageTitle('文章不存在');
    main.innerHTML =
      '<div class="empty-state" style="margin-top:48px">' +
        '<h2 style="margin-bottom:8px">找不到这篇文章</h2>' +
        '<p>可能是链接拼错了，或者这篇文章已经被我删掉了。</p>' +
        '<p style="margin-top:16px"><a href="' + escapeHtml(siteUrl('posts.html')) +
        '">← 返回文章列表</a></p>' +
      '</div>';
  }

  function render(post) {
    setPageTitle(post.title);

    // --- 页头区 ---
    var header = document.getElementById('post-header');
    if (header) {
      var tags = (post.tags || []).map(function (t) {
        return '<a class="tag" href="' +
          escapeHtml(siteUrl('posts.html?tag=' + encodeURIComponent(t))) + '">' +
          escapeHtml(t) + '</a>';
      }).join('');

      header.innerHTML =
        '<a class="back-link" href="' + escapeHtml(siteUrl('posts.html')) + '">' +
          icon('arrowLeft', 15) + '<span>全部文章</span>' +
        '</a>' +
        '<h1 class="post-header__title">' + escapeHtml(post.title) + '</h1>' +
        '<div class="post-header__meta">' +
          '<time datetime="' + escapeHtml(post.date) + '">' + escapeHtml(formatDate(post.date)) + '</time>' +
          '<span aria-hidden="true">·</span>' +
          '<span>约 ' + (post.readingTime || 5) + ' 分钟读完</span>' +
          (tags ? '<span aria-hidden="true">·</span>' + tags : '') +
        '</div>';
    }

    // --- 正文 ---
    var body = document.getElementById('post-body');
    if (body) {
      // post.content 是站主自己写的 HTML 片段，直接注入
      body.innerHTML = post.content || '<p>这篇文章还没有内容。</p>';
    }

    // --- 底部：标签 + 上下篇 ---
    var footer = document.getElementById('post-footer');
    if (footer) {
      var list = sorted();
      var idx = list.findIndex(function (p) { return p.id === post.id; });
      var newer = idx > 0 ? list[idx - 1] : null;                   // 更新的一篇
      var older = idx < list.length - 1 ? list[idx + 1] : null;     // 更早的一篇

      var navHtml = '';
      if (newer || older) {
        navHtml = '<nav class="post-nav" aria-label="相邻文章">' +
          (older
            ? '<a class="post-nav__item" href="' +
              escapeHtml(siteUrl('post.html?id=' + encodeURIComponent(older.id))) + '">' +
              '<span class="post-nav__label">← 上一篇</span>' +
              '<span class="post-nav__title">' + escapeHtml(older.title) + '</span></a>'
            : '<span></span>') +
          (newer
            ? '<a class="post-nav__item post-nav__item--next" href="' +
              escapeHtml(siteUrl('post.html?id=' + encodeURIComponent(newer.id))) + '">' +
              '<span class="post-nav__label">下一篇 →</span>' +
              '<span class="post-nav__title">' + escapeHtml(newer.title) + '</span></a>'
            : '<span></span>') +
        '</nav>';
      }

      footer.innerHTML =
        '<div class="post-footer__tags">' +
          (post.tags || []).map(function (t) {
            return '<a class="tag" href="' +
              escapeHtml(siteUrl('posts.html?tag=' + encodeURIComponent(t))) + '">' +
              escapeHtml(t) + '</a>';
          }).join('') +
        '</div>' +
        '<span class="read-time">最后更新于 ' + escapeHtml(formatDate(post.date)) + '</span>' +
        navHtml;
    }

    // --- 更新文档元信息（SEO / 分享） ---
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', post.excerpt || '');
  }

  window.__onBoot = function () {
    // 以正文容器为标记：不存在说明不是详情页（或页面结构被改过）
    var body = document.getElementById('post-body');
    if (!body) return;

    var id = getParam('id');
    var post = id ? findPost(id) : null;

    if (!post) {
      renderNotFound();
      return;
    }
    render(post);
  };
})();
