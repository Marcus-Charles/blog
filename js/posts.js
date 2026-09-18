/* ==========================================================================
   posts.js —— 文章列表、筛选、分页、搜索
   依赖：js/config.js、data/posts.js、js/main.js
   ========================================================================== */

(function () {
  'use strict';

  var cfg  = window.siteConfig || {};
  var all  = (window.posts || []).slice();

  var state = {
    tag: getParam('tag') || '',
    keyword: (getParam('q') || '').trim(),
    page: Math.max(1, parseInt(getParam('page'), 10) || 1)
  };

  /** 按日期倒序 */
  function sorted(list) {
    return list.slice().sort(function (a, b) {
      return String(b.date).localeCompare(String(a.date));
    });
  }

  /** 收集所有标签及其文章数 */
  function collectTags(list) {
    var map = {};
    list.forEach(function (p) {
      (p.tags || []).forEach(function (t) {
        map[t] = (map[t] || 0) + 1;
      });
    });
    return Object.keys(map)
      .map(function (name) { return { name: name, count: map[name] }; })
      .sort(function (a, b) { return b.count - a.count; });
  }

  /** 应用筛选条件 */
  function filtered() {
    var list = sorted(all);

    if (state.tag) {
      list = list.filter(function (p) {
        return (p.tags || []).indexOf(state.tag) !== -1;
      });
    }

    if (state.keyword) {
      var kw = state.keyword.toLowerCase();
      list = list.filter(function (p) {
        return (p.title + ' ' + p.excerpt + ' ' + (p.tags || []).join(' '))
          .toLowerCase().indexOf(kw) !== -1;
      });
    }

    return list;
  }

  /* ------------------------------------------------------------------------
     渲染
     ------------------------------------------------------------------------ */

  function postCardHtml(post) {
    var tags = (post.tags || []).slice(0, 3).map(function (t) {
      return '<a class="tag" href="' + escapeHtml(siteUrl('posts.html?tag=' + encodeURIComponent(t))) +
        '">' + escapeHtml(t) + '</a>';
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

  function renderFilters() {
    var bar = document.getElementById('filter-bar');
    if (!bar) return;

    var tags = collectTags(all);
    var html = '<button class="filter-btn" type="button" data-tag="" aria-pressed="' +
      (state.tag === '' ? 'true' : 'false') + '">全部 (' + all.length + ')</button>';

    html += tags.map(function (t) {
      return '<button class="filter-btn" type="button" data-tag="' + escapeHtml(t.name) +
        '" aria-pressed="' + (state.tag === t.name ? 'true' : 'false') + '">' +
        escapeHtml(t.name) + ' (' + t.count + ')</button>';
    }).join('');

    bar.innerHTML = html;

    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      state.tag = btn.getAttribute('data-tag');
      state.page = 1;
      syncUrl();
      render();
    });
  }

  function renderList() {
    var list = document.getElementById('post-list');
    var count = document.getElementById('result-count');
    if (!list) return;

    var data = filtered();
    var perPage = cfg.postsPerPage || 6;
    var totalPages = Math.max(1, Math.ceil(data.length / perPage));

    // 页码越界时回退到最后一页
    if (state.page > totalPages) state.page = totalPages;

    var start = (state.page - 1) * perPage;
    var pageItems = data.slice(start, start + perPage);

    if (count) {
      count.textContent = state.keyword
        ? '搜索“' + state.keyword + '”找到 ' + data.length + ' 篇文章'
        : (state.tag ? '「' + state.tag + '」共 ' + data.length + ' 篇' : '共 ' + data.length + ' 篇文章');
    }

    list.innerHTML = pageItems.length
      ? pageItems.map(postCardHtml).join('')
      : '<li><div class="empty-state">什么也没找到。换个关键词，或者<a href="' +
        escapeHtml(siteUrl('posts.html')) + '">看全部文章</a>。</div></li>';

    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    var nav = document.getElementById('pagination');
    if (!nav) return;

    if (totalPages <= 1) {
      nav.innerHTML = '';
      return;
    }

    var html = '<button type="button" data-page="' + (state.page - 1) + '"' +
      (state.page === 1 ? ' disabled' : '') + '>上一页</button>';

    for (var i = 1; i <= totalPages; i++) {
      html += '<button type="button" data-page="' + i + '"' +
        (i === state.page ? ' aria-current="page"' : '') + '>' + i + '</button>';
    }

    html += '<button type="button" data-page="' + (state.page + 1) + '"' +
      (state.page === totalPages ? ' disabled' : '') + '>下一页</button>';

    nav.innerHTML = html;

    // 用 onclick 赋值（而非 addEventListener），避免每次渲染叠加重复监听器
    nav.onclick = function (e) {
      var btn = e.target.closest('button[data-page]');
      if (!btn || btn.disabled) return;
      state.page = parseInt(btn.getAttribute('data-page'), 10);
      syncUrl();
      render();
      // 翻页后滚回列表顶部
      var top = document.getElementById('post-list');
      if (top) top.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
  }

  /** 把当前筛选状态写回地址栏，便于分享与刷新保持状态 */
  function syncUrl() {
    var params = new URLSearchParams();
    if (state.tag) params.set('tag', state.tag);
    if (state.keyword) params.set('q', state.keyword);
    if (state.page > 1) params.set('page', String(state.page));

    var qs = params.toString();
    var base = window.location.pathname.split('/').pop() || 'posts.html';
    history.replaceState(null, '', base + (qs ? '?' + qs : ''));
  }

  function render() {
    renderList();
    // 同步筛选按钮的按下状态
    Array.prototype.forEach.call(
      document.querySelectorAll('.filter-btn'),
      function (btn) {
        btn.setAttribute('aria-pressed',
          String(btn.getAttribute('data-tag') === state.tag));
      }
    );
  }

  /* ------------------------------------------------------------------------
     搜索框
     ------------------------------------------------------------------------ */
  function initSearch() {
    var form = document.getElementById('search-form');
    var input = document.getElementById('search-input');
    if (!form || !input) return;

    input.value = state.keyword;

    form.addEventListener('submit', function (e) {
      e.preventDefault();                    // 阻止表单默认提交（会刷新页面）
      state.keyword = input.value.trim();
      state.page = 1;
      syncUrl();
      render();
    });

    // 清空按钮
    var clear = document.getElementById('search-clear');
    if (clear) {
      clear.hidden = !state.keyword;
      clear.addEventListener('click', function () {
        input.value = '';
        state.keyword = '';
        state.page = 1;
        clear.hidden = true;
        syncUrl();
        render();
        input.focus();
      });
    }
  }

  /* ------------------------------------------------------------------------
     启动
     ------------------------------------------------------------------------ */
  window.__onBoot = function () {
    if (!document.getElementById('post-list')) return;

    if (state.keyword) setPageTitle('搜索：' + state.keyword);
    else if (state.tag) setPageTitle('标签：' + state.tag);
    else setPageTitle('全部文章');

    renderFilters();
    initSearch();
    renderList();
  };
})();
