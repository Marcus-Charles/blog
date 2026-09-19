/* ==========================================================================
   about.js —— 关于页：技能标签、时间线、联系方式
   ========================================================================== */

(function () {
  'use strict';

  var cfg = window.siteConfig || {};

  /* ------------------------------------------------------------------------
     在这里填写你自己的信息 —— 改完刷新即可生效
     ------------------------------------------------------------------------ */
  // 下面这些内容随便改；某一块不想放，把数组清空即可（页面会自动隐藏那一块）
  var ABOUT = {
    bio: [
      '你好，我是 Marcus，一名前端工程师，现在在杭州。白天写代码，晚上读点书，偶尔把想清楚的事情写下来。',
      '这个博客用来放技术笔记、读书记录和一些还没想清楚的问题。更新可能不快，但都是自己真想写的东西。觉得哪里写得不对，或者想聊点什么，发邮件给我就行。'
    ],
    skills: ['HTML / CSS', 'JavaScript', 'React', 'Node.js', 'Git', '性能优化'],
    // 换成你自己的经历；不想要这一块就把数组清空（[]）
    timeline: [
      { year: '2026', text: '搭了这个博客，重新开始写东西。' }
    ],
    now: [
      '在杭州做前端开发',
      '把这个博客的写作流程再理顺一点'
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

    // 数组为空就整块隐藏，页面上不会剩下孤零零的标题
    function toggle(sectionId, titleId, list) {
      var titleEl = document.getElementById(titleId);
      var sectionEl = document.getElementById(sectionId);
      if (titleEl) titleEl.style.display = list.length ? '' : 'none';
      if (sectionEl) sectionEl.style.display = list.length ? '' : 'none';
    }

    var skillsEl = document.getElementById('about-skills');
    if (skillsEl) {
      skillsEl.innerHTML = ABOUT.skills.map(function (s) {
        return '<span class="tag">' + escapeHtml(s) + '</span>';
      }).join('');
    }
    toggle('about-skills', 'about-skills-title', ABOUT.skills);

    var timelineEl = document.getElementById('about-timeline');
    if (timelineEl) {
      timelineEl.innerHTML = ABOUT.timeline.map(function (item) {
        return '<li style="margin-bottom:12px">' +
          '<strong style="display:inline-block;min-width:52px;color:var(--accent)">' +
          escapeHtml(item.year) + '</strong> ' + escapeHtml(item.text) + '</li>';
      }).join('');
    }
    toggle('about-timeline', 'about-timeline-title', ABOUT.timeline);

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
