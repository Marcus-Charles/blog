/* ==========================================================================
   about.js —— 关于页：技能标签、时间线、联系方式
   ========================================================================== */

(function () {
  'use strict';

  var cfg = window.siteConfig || {};

  /* ------------------------------------------------------------------------
     在这里填写你自己的信息 —— 改完刷新即可生效
     ------------------------------------------------------------------------ */
  var ABOUT = {
    bio: [
      '你好，我是这个站的主人。白天写代码，晚上读点书，偶尔把想清楚的事情写下来。',
      '这个博客从 2026 年开始更新。它的目标不是流量，而是把我那些散落在各处的笔记整理成能被人读懂的东西。如果你在这里看到了有用的内容，那很好；如果觉得写得不对，欢迎写信告诉我。'
    ],
    skills: ['HTML / CSS', 'JavaScript', 'React', 'Node.js', 'Git', '性能优化'],
    timeline: [
      { year: '2026', text: '重新开始写博客，把笔记从本地搬到线上。' },
      { year: '2024', text: '转向前端基础设施方向，开始关注构建与性能。' },
      { year: '2021', text: '进入互联网行业，从写下第一行业务代码算起。' },
      { year: '2018', text: '大学里第一次用 HTML 做了个个人主页，那时觉得很有意思。' }
    ],
    now: [
      '正在读：《思考，快与慢》（第三遍了）',
      '正在学：Rust 的所有权模型',
      '正在做：把这个博客的写作流程再简化一点'
    ]
  };

  function render() {
    var bioEl = document.getElementById('about-bio');
    if (bioEl) {
      bioEl.innerHTML = ABOUT.bio.map(function (p) {
        return '<p>' + escapeHtml(p) + '</p>';
      }).join('');
    }

    var nameEl = document.getElementById('about-name');
    if (nameEl) nameEl.textContent = cfg.author || '';

    var roleEl = document.getElementById('about-role');
    if (roleEl) roleEl.textContent = cfg.authorBio || '';

    var avatarEl = document.getElementById('about-avatar');
    if (avatarEl) avatarEl.setAttribute('src', siteUrl(cfg.authorAvatar || 'assets/avatar.svg'));

    var skillsEl = document.getElementById('about-skills');
    if (skillsEl) {
      skillsEl.innerHTML = ABOUT.skills.map(function (s) {
        return '<span class="tag">' + escapeHtml(s) + '</span>';
      }).join('');
    }

    var timelineEl = document.getElementById('about-timeline');
    if (timelineEl) {
      timelineEl.innerHTML = ABOUT.timeline.map(function (item) {
        return '<li style="margin-bottom:12px">' +
          '<strong style="display:inline-block;min-width:52px;color:var(--accent)">' +
          escapeHtml(item.year) + '</strong> ' + escapeHtml(item.text) + '</li>';
      }).join('');
    }

    var nowEl = document.getElementById('about-now');
    if (nowEl) {
      nowEl.innerHTML = ABOUT.now.map(function (s) {
        return '<li>' + escapeHtml(s) + '</li>';
      }).join('');
    }

    var contactEl = document.getElementById('about-contact');
    if (contactEl) {
      contactEl.innerHTML = (cfg.social || []).map(function (s) {
        return '<li><a href="' + escapeHtml(siteUrl(s.href)) + '"' +
          (/^https?:/.test(s.href) ? ' target="_blank" rel="noopener noreferrer"' : '') +
          '>' + escapeHtml(s.label) + '</a></li>';
      }).join('');
    }
  }

  window.__onBoot = function () {
    if (!document.getElementById('about-bio')) return;   // 非关于页
    setPageTitle('关于我');
    render();
  };
})();
