/* ==========================================================================
   photos.js —— 照片墙 + 点击看大图（灯箱）
   ========================================================================== */

(function () {
  'use strict';

  var list = (window.photos || []).slice();
  var current = 0;            // 当前大图索引
  var lastFocused = null;     // 打开灯箱前的焦点元素，关闭后还回去

  /* 按拍摄时间（date 字段）倒序排列；同日保持原顺序（稳定排序） */
  list.forEach(function (p, i) { p.__i = i; });
  list.sort(function (a, b) {
    var da = (a.date || '').replace(/-/g, '');
    var db = (b.date || '').replace(/-/g, '');
    if (da === db) return a.__i - b.__i;
    return db < da ? -1 : 1; // 日期新在前
  });

  /* 时间分格：取「年-月」做分组键 */
  function groupKey(p) { return (p.date || '').slice(0, 7); }   // YYYY-MM
  function groupLabel(key) {
    if (!key) return '未注明时间';
    var y = key.slice(0, 4), m = key.slice(5, 7);
    return y + ' 年 ' + (m ? (Number(m) + ' 月') : '');
  }

  /* ------------------------------------------------------------------------
     渲染照片墙
     ------------------------------------------------------------------------ */
  function render() {
    var grid = document.getElementById('photo-grid');
    var countEl = document.getElementById('photo-count');
    var emptyEl = document.getElementById('photo-empty');
    if (!grid) return;

    if (countEl) {
      countEl.textContent = list.length ? '共 ' + list.length + ' 张 · 按时间分组 · 点击任意一张看大图' : '';
    }
    if (emptyEl) emptyEl.hidden = list.length > 0;
    if (!list.length) return;

    // 按「年-月」分格：每个月一行标题，下面跟着当月照片
    var html = '';
    var lastKey = '__init__';
    list.forEach(function (p, i) {
      var key = groupKey(p);
      if (key !== lastKey) {
        var cnt = 0;
        for (var k = 0; k < list.length; k++) if (groupKey(list[k]) === key) cnt++;
        html += '<li class="photo-group-header"><h2>' + escapeHtml(groupLabel(key)) +
                '</h2><span class="photo-group-count">' + cnt + ' 张</span></li>';
        lastKey = key;
      }
      html += '<li class="photo-card">' +
        '<button type="button" class="photo-card__btn" data-index="' + i + '"' +
        ' aria-label="查看大图：' + escapeHtml(p.alt || ('照片 ' + (i + 1))) + '">' +
          '<img src="' + escapeHtml(siteUrl(p.src)) + '"' +
          ' alt="' + escapeHtml(p.alt || '') + '"' +
          ' loading="lazy" decoding="async">' +
          (p.caption
            ? '<span class="photo-card__meta"><span class="photo-card__caption">' +
              escapeHtml(p.caption) + '</span></span>'
            : '') +
        '</button>' +
      '</li>';
    });
    grid.innerHTML = html;

    // 用 onclick 赋值而不是 addEventListener：重复渲染也不会叠加热监听器
    Array.prototype.forEach.call(grid.querySelectorAll('.photo-card__btn'), function (btn) {
      btn.onclick = function () {
        openLightbox(Number(btn.getAttribute('data-index')));
      };
    });
  }

  /* ------------------------------------------------------------------------
     灯箱：打开 / 关闭 / 切换
     ------------------------------------------------------------------------ */
  function openLightbox(index) {
    var box = document.getElementById('lightbox');
    if (!box || !list.length) return;

    lastFocused = document.activeElement;
    current = index;
    box.hidden = false;
    // 防止背景滚动
    document.body.style.overflow = 'hidden';
    showPhoto();

    var closeBtn = document.getElementById('lightbox-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    var box = document.getElementById('lightbox');
    if (!box || box.hidden) return;
    box.hidden = true;
    document.body.style.overflow = '';
    var img = document.getElementById('lightbox-img');
    if (img) { img.src = ''; img.alt = ''; }
    // 焦点还给原来那张照片的按钮，键盘用户不会丢失位置
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  function showPhoto() {
    var p = list[current];
    if (!p) return;
    var img = document.getElementById('lightbox-img');
    var cap = document.getElementById('lightbox-caption');
    if (img) {
      img.src = siteUrl(p.src);
      img.alt = p.alt || '';
    }
    if (cap) {
      var parts = [];
      if (p.caption) parts.push(p.caption);
      if (p.date) parts.push(p.date);
      parts.push(current + 1 + ' / ' + list.length);
      cap.textContent = parts.join(' · ');
    }
  }

  function step(delta) {
    if (!list.length) return;
    current = (current + delta + list.length) % list.length;   // 循环到底自动回头
    showPhoto();
  }

  function initLightbox() {
    var box = document.getElementById('lightbox');
    if (!box) return;

    var closeBtn = document.getElementById('lightbox-close');
    var prevBtn = document.getElementById('lightbox-prev');
    var nextBtn = document.getElementById('lightbox-next');

    if (closeBtn) closeBtn.onclick = closeLightbox;
    if (prevBtn) prevBtn.onclick = function () { step(-1); };
    if (nextBtn) nextBtn.onclick = function () { step(1); };

    // 点背景关闭（点在图片或按钮上不算）
    box.onclick = function (e) {
      if (e.target === box) closeLightbox();
    };

    // 键盘：Esc 关闭，左右箭头切换
    document.addEventListener('keydown', function (e) {
      if (box.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); closeLightbox(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    });

    if (list.length < 2) {
      if (prevBtn) prevBtn.hidden = true;
      if (nextBtn) nextBtn.hidden = true;
    }
  }

  /* ------------------------------------------------------------------------
     启动
     ------------------------------------------------------------------------ */
  window.__onBoot = function () {
    if (!document.getElementById('photo-grid')) return;   // 非照片页
    setPageTitle('照片');
    render();
    initLightbox();
  };
})();
