/* ==========================================================================
   home.js —— 首页：渲染最新文章 + 统计信息
   依赖：js/config.js、data/posts.js、js/main.js
   ========================================================================== */

(function () {
  'use strict';

  var all = (window.posts || []).slice();

  function sorted() {
    return all.slice().sort(function (a, b) {
      return String(b.date).localeCompare(String(a.date));
    });
  }

  /** 首页只展示最近 4 篇 */
  var HOME_LIMIT = 4;

  function postCardHtml(post) {
    var tags = (post.tags || []).slice(0, 2).map(function (t) {
      return '<a class="tag" href="' +
        escapeHtml(siteUrl('posts.html?tag=' + encodeURIComponent(t))) + '">' +
        escapeHtml(t) + '</a>';
    }).join('');

    return '' +
      '<li>' +
        '<article class="post-card">' +
          '<div class="post-card__meta">' +
            '<time datetime="' + escapeHtml(post.date) + '">' + escapeHtml(formatDate(post.date)) + '</time>' +
          '</div>' +
          '<h3 class="post-card__title">' +
            '<a class="post-card__link" href="' +
              escapeHtml(siteUrl('post.html?id=' + encodeURIComponent(post.id))) + '">' +
              escapeHtml(post.title) +
            '</a>' +
          '</h3>' +
          '<p class="post-card__excerpt">' + escapeHtml(post.excerpt) + '</p>' +
          '<div class="post-card__footer">' +
            tags +
            '<span class="read-time">约 ' + (post.readingTime || 5) + ' 分钟</span>' +
          '</div>' +
        '</article>' +
      '</li>';
  }

  function renderHero() {
    var titleEl = document.getElementById('hero-title');
    var textEl = document.getElementById('hero-text');
    var bioEl = document.getElementById('hero-bio');
    var avatarEl = document.getElementById('hero-avatar');

    // 头像跟配置走，改 config.js 的 authorAvatar 即可全局生效
    if (avatarEl && window.siteConfig.authorAvatar) {
      avatarEl.setAttribute('src', siteUrl(window.siteConfig.authorAvatar));
    }
    if (titleEl) {
      // {name} 占位符替换为作者名，转义后再替换，避免注入
      var safeName = escapeHtml(window.siteConfig.author || '');
      titleEl.innerHTML = escapeHtml(window.siteConfig.heroTitle || '')
        .replace('{name}', '<em>' + safeName + '</em>');
    }
    if (textEl) textEl.textContent = window.siteConfig.heroText || '';
    if (bioEl) bioEl.textContent = window.siteConfig.authorBio || '';
  }

  function renderStats() {
    var slot = document.getElementById('hero-stats');
    if (!slot) return;

    var tags = {};
    all.forEach(function (p) {
      (p.tags || []).forEach(function (t) { tags[t] = true; });
    });

    slot.innerHTML =
      '<span><strong>' + all.length + '</strong> 篇文章</span>' +
      '<span><strong>' + Object.keys(tags).length + '</strong> 个标签</span>';
  }

  function renderLatest() {
    var slot = document.getElementById('latest-posts');
    if (!slot) return;

    var latest = sorted().slice(0, HOME_LIMIT);
    slot.innerHTML = latest.length
      ? latest.map(postCardHtml).join('')
      : '<li><div class="empty-state">还没有文章，去 <code>data/posts.js</code> 里加一篇吧。</div></li>';
  }

  window.__onBoot = function () {
    if (!document.getElementById('hero-title')) return;   // 非首页
    renderHero();
    renderStats();
    renderLatest();
  };
})();
