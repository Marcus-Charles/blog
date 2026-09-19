/* ==========================================================================
   photos —— 照片墙数据
   --------------------------------------------------------------------------
   【换成你自己的照片，只需要两步】
   1. 把图片放进 assets/photos/ 目录（建议先把宽度压到 1600px 以内，单张 < 400KB）
   2. 改下面的 src / alt / caption

   字段说明：
     src      图片路径，例如 'assets/photos/photo-1.jpg'
     alt      替代文字。屏幕阅读器读它，图片加载失败也显示它。要写清楚画面内容
     caption  鼠标悬停/图片下方显示的说明，可以不写
     date     拍摄时间或归类标签，随便写，例如 '2026-09' 或 '杭州'

   顺序 = 展示顺序，想调整前后位置直接调换这几行的顺序。
   ========================================================================== */

window.photos = [
  {
    src: 'assets/photos/photo-1.svg',
    alt: '占位照片 1',
    caption: '把这里换成你的照片说明',
    date: '2026-09'
  },
  {
    src: 'assets/photos/photo-2.svg',
    alt: '占位照片 2',
    caption: '换成你自己的照片后，记得同步改 alt 文字',
    date: '2026-09'
  },
  {
    src: 'assets/photos/photo-3.svg',
    alt: '占位照片 3',
    caption: 'caption 不写也行，留空字符串即可',
    date: '2026-08'
  },
  {
    src: 'assets/photos/photo-4.svg',
    alt: '占位照片 4',
    caption: '',
    date: '2026-08'
  },
  {
    src: 'assets/photos/photo-5.svg',
    alt: '占位照片 5',
    caption: '',
    date: '2026-07'
  },
  {
    src: 'assets/photos/photo-6.svg',
    alt: '占位照片 6',
    caption: '',
    date: '2026-07'
  }
];
