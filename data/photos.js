/* ==========================================================================
   photos —— 照片墙数据（已按拍摄时间分组）
   --------------------------------------------------------------------------
   【加一张照片，两步】
   1. 把图片放进 assets/photos/（建议宽度 <= 1600px、单张 < 400KB）
   2. 在下面数组照葫芦画瓢加一条，填好 date（格式 YYYY-MM-DD）：
        { src: 'assets/photos/xxx.jpg', alt: '画面内容', caption: '说明', date: '2026-09' }
   alt 写清画面内容（屏幕阅读器靠它）；caption/date 不想写就留空字符串。
   页面会按 date 的「年-月」自动分格，同月内按日期倒序。
   ========================================================================== */

window.photos = [
  {
    src: 'assets/photos/img-02.jpg',
    alt: '照片',
    caption: '',
    date: '2026-06-25'
  },
  {
    src: 'assets/photos/img-04.jpg',
    alt: '照片',
    caption: '',
    date: '2026-06-25'
  },
  {
    src: 'assets/photos/img-09.jpg',
    alt: '照片',
    caption: '',
    date: '2026-06-25'
  },
  {
    src: 'assets/photos/img-16.jpg',
    alt: '照片',
    caption: '',
    date: '2026-06-25'
  },
  {
    src: 'assets/photos/img-17.jpg',
    alt: '照片',
    caption: '',
    date: '2026-06-25'
  },
  {
    src: 'assets/photos/img-18.jpg',
    alt: '照片',
    caption: '',
    date: '2026-06-25'
  },
  {
    src: 'assets/photos/img-21.jpg',
    alt: '照片',
    caption: '',
    date: '2026-06-25'
  },
  {
    src: 'assets/photos/img-22.jpg',
    alt: '照片',
    caption: '',
    date: '2026-06-25'
  },
  {
    src: 'assets/photos/img-01.jpg',
    alt: '照片',
    caption: '',
    date: '2025-06-24'
  },
  {
    src: 'assets/photos/img-03.jpg',
    alt: '照片',
    caption: '',
    date: '2026-05-25'
  },
  {
    src: 'assets/photos/img-05.jpg',
    alt: '照片',
    caption: '',
    date: '2025-01-24'
  },
  {
    src: 'assets/photos/img-06.jpg',
    alt: '照片',
    caption: '',
    date: '2026-05-25'
  },
  {
    src: 'assets/photos/img-07.jpg',
    alt: '照片',
    caption: '',
    date: '2024-11-24'
  },
  {
    src: 'assets/photos/img-08.jpg',
    alt: '照片',
    caption: '',
    date: '2026-05-25'
  },
  {
    src: 'assets/photos/img-10.jpg',
    alt: '照片',
    caption: '',
    date: '2026-06-24'
  },
  {
    src: 'assets/photos/img-19.jpg',
    alt: '照片',
    caption: '',
    date: '2025-06-24'
  },
  {
    src: 'assets/photos/img-20.jpg',
    alt: '照片',
    caption: '',
    date: '2026-06-24'
  },
  {
    src: 'assets/photos/img-11.jpg',
    alt: '照片',
    caption: '',
    date: '2026-06-11'
  },
  {
    src: 'assets/photos/img-14.jpg',
    alt: '照片',
    caption: '',
    date: '2026-06-01'
  },
  {
    src: 'assets/photos/img-13.jpg',
    alt: '照片',
    caption: '',
    date: '2026-02-01'
  },
  {
    src: 'assets/photos/img-12.jpg',
    alt: '照片',
    caption: '',
    date: '2026-01-18'
  },
  {
    src: 'assets/photos/img-15.jpg',
    alt: '照片',
    caption: '',
    date: '2026-06-16'
  }
];
