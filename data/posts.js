/* ==========================================================================
   posts —— 文章数据
   --------------------------------------------------------------------------
   新增一篇文章 = 在数组最前面加一个对象。
   字段说明：
     id         唯一标识（英文短横线命名，用于生成 post.html?id=xxx 链接）
     title      标题
     date       发布日期，格式 YYYY-MM-DD（列表按此排序）
     tags       标签数组
     excerpt    摘要，显示在文章列表卡片上，建议 40-80 字
     cover      封面图路径，没有就留空字符串
     readingTime 预计阅读分钟数（手填即可）
     content    正文，用 HTML 片段。支持 <h2> <h3> <p> <ul> <ol> <blockquote>
                <pre><code> <img> <a> <strong> <em>
   ========================================================================== */

window.posts = [
{
    "id": "test",
    "title": "test",
    "date": "2026-09-19",
    "tags": [],
    "excerpt": "111",
    "cover": "",
    "readingTime": 5,
    "content": "<h3>测试</h3>\n<p>111 <img src=\"assets/posts/img-20260919-161553.jpg\" alt=\"OIP-C\" loading=\"lazy\"> <img src=\"assets/posts/img-20260919-161815.jpg\" alt=\"1\" loading=\"lazy\"></p>"
  },
{
    "id": "1",
    "title": "1",
    "date": "2026-09-19",
    "tags": [
      "1"
    ],
    "excerpt": "1",
    "cover": "",
    "readingTime": 5,
    "content": "<p>1<img src=\"assets/posts/img-20260919-154726.jpg\" alt=\"OIP-C\" loading=\"lazy\"></p>"
  },
{
    "id": "韦根论文逻辑",
    "title": "韦根论文逻辑",
    "date": "2026-09-19",
    "tags": [
      "韦根",
      "小论文"
    ],
    "excerpt": "I. Introduction II. Operating Principle and System Architect…",
    "cover": "",
    "readingTime": 5,
    "content": "<h3>I. Introduction</h3>\n<h3>II. Operating Principle and System Architecture</h3>\n<p>A. System Architecture B. Wiegand-Based Sensing Principle C. Dual-Use Wiegand Pulse</p>\n<h3>III. Wiegand-Based Rotational Sensing and Energy Harvesting</h3>\n<p>A. Wiegand Pulse Characteristics B. Rotational Speed–Pulse Frequency Relationship C. Pulse Energy and Harvested Power</p>\n<h3>IV. Ultra-Low-Power Rotational Speed Measurement Circuit</h3>\n<p>A. RPM Measurement Method B. Circuit Design C. Low-Power Operation D. Measurement Error Analysis</p>\n<h3>V. Self-Powered Wireless Sensing System</h3>\n<p>A. Energy Storage and Management B. Hysteretic Power Control C. BLE Communication D. System Energy Budget</p>\n<h3>VI. Experimental Results and Discussion</h3>\n<p>A. Experimental Setup B. RPM Measurement Performance C. Power Consumption D. Energy Harvesting Performance E. Self-Powered Wireless Operation F. Comparison With Existing Methods</p>\n<h3>VII. Conclusion</h3>"
  },
  {
    id: 'css-modern-layout',
    title: '现代 CSS 布局：Flexbox 与 Grid 该怎么选',
    date: '2026-09-05',
    tags: ['前端', 'CSS'],
    excerpt: 'Flexbox 是一维的，Grid 是二维的——这句话人人都说过，但真正决定选型的往往是另一个问题：内容的尺寸由谁决定。',
    cover: '',
    readingTime: 8,
    content: `
      <p>每次同事问我"这里该用 Flex 还是 Grid"，我都会先反问一个问题：<strong>是先有格子还是先有内容？</strong></p>

      <h2>判断标准不是维度，是控制权的方向</h2>
      <p>"一维用 Flex、二维用 Grid"这个说法没错，但它不解决实际选择困难。更实用的判断是按控制权划分：</p>
      <ul>
        <li><strong>内容决定尺寸 → 用 Flexbox。</strong>内容的多少决定容器怎么排，容器只是被动响应。</li>
        <li><strong>容器决定尺寸 → 用 Grid。</strong>你先定义好网格轨道，再把内容塞进去。</li>
      </ul>

      <h2>一个常见的选错场景</h2>
      <p>导航栏的 logo + 菜单 + 搜索框，很多人第一反应是写三个 Flex 子项。但如果菜单项数量会变、搜索框宽度要固定，用 Grid 更省事：</p>

      <pre><code>.header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.5rem;
}</code></pre>

      <p>左中右三段结构一次说清，不需要给任何子元素写 <code>flex: 1</code>，也不会因为中间内容变长把右侧挤走。</p>

      <h2>两者混用才是常态</h2>
      <p>真实的页面几乎不会只用一种。外层用 Grid 划分页面骨架，每个区域内层用 Flexbox 排列内容，这是最舒服的组合：</p>

      <pre><code>.page {
  display: grid;
  grid-template-rows: auto 1fr auto;  /* 头 / 主体 / 脚 */
  min-height: 100dvh;                 /* 注意是 dvh 不是 vh */
}

.card__actions {
  display: flex;                      /* 卡片内部用 Flex */
  justify-content: flex-end;
  gap: 0.5rem;
}</code></pre>

      <h2>两个容易踩的坑</h2>
      <ol>
        <li><strong>移动端全屏高度用 100dvh。</strong>在 iOS Safari 上 <code>100vh</code> 会比可视区域高，因为地址栏的高度没被算进去，导致内容被裁掉。</li>
        <li><strong>Grid 的 fr 和 auto 别混着乱用。</strong><code>1fr auto 1fr</code> 中间自适应没问题；但 <code>auto 1fr auto</code> 里如果两侧内容很长，中间会被压到零宽，因为 auto 的优先级高于 fr。</li>
      </ol>

      <p>说到底，选择标准只有一个：<em>你想让容器控制内容，还是让内容控制容器。</em>想清楚这个，写起来就不会纠结。</p>
    `
  },

  {
    id: 'reading-notes-slow-thinking',
    title: '《思考，快与慢》读书笔记：系统 1 的十种错觉',
    date: '2026-08-28',
    tags: ['阅读', '认知'],
    excerpt: '卡尼曼把大脑分成快慢两套系统。真正让我不安的不是"人会犯错"，而是那些错误在发生时，我总会觉得自己非常理性。',
    cover: '',
    readingTime: 12,
    content: `
      <p>这本书买了三年，前两次都停在第五章。这次用每天早上半小时的固定时间读完，反而顺畅。可能是终于承认自己需要它。</p>

      <h2>不是两套系统，是一套系统的两种模式</h2>
      <p>书里把认知分成系统 1（快、自动、不费力）和系统 2（慢、受控、耗能）。但更准确的理解是：系统 1 一直在运行，系统 2 平时偷懒，只在遇到意外时才被叫醒。</p>
      <p>问题就在这——大部分错误的判断，系统 1 已经替你做完了，系统 2 甚至不知道有过一次决策。</p>

      <h2>几个我会反复犯的错觉</h2>

      <h3>1. 光环效应</h3>
      <p>先知道结论，再去找理由。读一篇观点合意的文章，我会觉得它的论证也很有力——其实我只是在核对立场。</p>

      <h3>2. 可得性偏差</h3>
      <p>最近频繁看到的事情，会被高估发生概率。这就是为什么刷完一天坏消息会觉得世界要完了。</p>

      <h3>3. 锚定效应</h3>
      <p>第一个看到的数字会成为参照。商品原价标 1999，现价 999，你会觉得便宜——即使这个商品本来就值 899。</p>

      <h3>4. 回归均值被误读成因果</h3>
      <p>表现极差的下一步通常变好，不是因为你干预了，而是因为它本来就该回归。这个错觉支撑了大量无效的管理动作。</p>

      <h2>最有用的一条建议</h2>
      <blockquote>在你做出重要判断前，先问自己：如果我现在知道这个判断是错的，我会怎么解释它？</blockquote>
      <p>这个方法书里没有直接写，但它是整本书的推论。强迫自己给反面留出解释空间，是少数能实际对抗系统 1 的操作。</p>

      <h2>读完之后的改变</h2>
      <p>说实话不大。我知道这些偏差的名字了，但下次遇到时仍然会中招。唯一的区别是，事后能更快意识到——这可能就是这本书能给的全部价值了。</p>
    `
  },

  {
    id: 'git-commit-convention',
    title: '团队协作里的 Git 提交规范，到底值不值得推',
    date: '2026-08-15',
    tags: ['工程实践', 'Git'],
    excerpt: '推行 Conventional Commits 三个月后，团队一半人觉得有用，另一半觉得是负担。这篇记录我们最后保留了什么、放弃了什么。',
    cover: '',
    readingTime: 7,
    content: `
      <p>年初我在团队里推了一次提交规范。三个月后复盘，结论比预想的复杂：规范本身没问题，但强推的方式错了。</p>

      <h2>最开始推的方案</h2>
      <p>标准的 Conventional Commits，配合 Commitlint 做 commit-msg 钩子校验：</p>
      <pre><code>feat(login): 支持手机号验证码登录
fix(cart): 修复优惠券重复计算
docs: 补充分支策略说明</code></pre>
      <p>理想很美好，能自动生成 CHANGELOG、能按类型筛选、能让 history 更好读。</p>

      <h2>三个月后的真实数据</h2>
      <ul>
        <li>提交信息格式合规率：<strong>从 100% 掉到 78%</strong>（有人开始用 <code>--no-verify</code> 跳过钩子）</li>
        <li>CHANGELOG 自动生成：<strong>保留了</strong>，但产品同学从来没看过</li>
        <li>代码审查效率：<strong>基本没变化</strong></li>
        <li>团队怨气：<strong>明显上升</strong>，主要来自被钩子打断流程的时刻</li>
      </ul>

      <h2>问题在哪</h2>
      <p>我们把规范当成了纪律问题，但它其实是沟通问题。<strong>当一条规则需要强制工具才能落地，说明它没解决大家的真实痛点。</strong></p>
      <p>真正被浪费的不是那几秒钟打字时间，而是：提交被拒绝、重写、再提交的过程打断了开发的心流。对刚 clone 项目的新人尤其劝退。</p>

      <h2>最后保留了什么</h2>
      <ol>
        <li><strong>取消 commit-msg 钩子的强制校验</strong>，改成 PR 模板里的一句提醒。</li>
        <li><strong>只强制一条规则</strong>：提交信息首行不超过 50 字，且描述"做了什么"而不是"改了哪个文件"。</li>
        <li><strong>保留类型前缀</strong>，但不校验格式——写 <code>feat:</code> 还是 <code>[功能]</code> 都行，只要团队看得懂。</li>
        <li><strong>CHANGELOG 只从 PR 标题生成</strong>，不再从 commit 抽取。</li>
      </ol>

      <h2>如果重来一次</h2>
      <p>我会先只推第二条规则，跑两个月看效果，再决定要不要加别的。规范应该是被需求推着长出来的，不是一次性设计出来的。</p>
    `
  },

  {
    id: 'web-performance-checklist',
    title: '静态站点性能优化：我常用的 12 项检查清单',
    date: '2026-07-30',
    tags: ['前端', '性能'],
    excerpt: '这份清单来自三个线上项目的调优记录。按投入产出比排序，前五项通常能拿到八成收益。',
    cover: '',
    readingTime: 9,
    content: `
      <p>每次上线前我会过一遍这份清单。它不追求完整，只收录实际改动过、且能看到量化收益的项。</p>

      <h2>第一梯队：改一处，收益立竿见影</h2>
      <ol>
        <li><strong>图片带宽高属性。</strong>没有显式尺寸的图片会造成布局偏移，直接拉高 CLS。顺便加上 <code>loading="lazy"</code>。</li>
        <li><strong>用现代图片格式。</strong>同样画质下 WebP 通常比 JPEG 小 25%–35%，AVIF 更小但编码慢，视场景取舍。</li>
        <li><strong>字体只加载用到的字重和字符集。</strong>中文站点尤其要注意，全量字体动辄几 MB。</li>
        <li><strong>关键 CSS 内联，其余异步加载。</strong>减少首屏的阻塞请求。</li>
        <li><strong>给静态资源加长缓存。</strong>文件名带内容哈希，配合一年期的 <code>Cache-Control</code>。</li>
      </ol>

      <h2>第二梯队：需要一点改造</h2>
      <ol start="6">
        <li><strong>预连接关键域名。</strong><code>&lt;link rel="preconnect"&gt;</code> 省掉 DNS 与 TLS 握手时间。</li>
        <li><strong>首屏图片加 <code>fetchpriority="high"</code>。</strong>明确告诉浏览器谁最重要。</li>
        <li><strong>去掉未使用的第三方脚本。</strong>一个埋点 SDK 常常比整个页面还重。</li>
        <li><strong>延迟加载非首屏组件。</strong>用原生 <code>IntersectionObserver</code> 就够，不必上库。</li>
      </ol>

      <h2>第三梯队：结构性优化</h2>
      <ol start="10">
        <li><strong>用 CDN 就近分发。</strong>静态资源交给 CDN，源站只处理动态请求。</li>
        <li><strong>开启 Brotli 压缩。</strong>比 gzip 通常再小 15%–20%。</li>
        <li><strong>定期跑 Lighthouse 并留存报告。</strong>不做基线对比的优化都是自我感觉良好。</li>
      </ol>

      <h2>一个提醒</h2>
      <p>不要一次性全做。每次改一项，记录改动前后的 LCP 与 CLS。否则你无法知道哪一项起了作用——也无法在出问题时定位是哪一项搞的。</p>
    `
  },

  {
    id: 'slow-productivity',
    title: '慢下来真的更高效吗：一份实验记录',
    date: '2026-07-18',
    tags: ['随笔', '效率'],
    excerpt: '我用六周时间对比了"任务清单驱动"和"时间块驱动"两种工作方式，记录了一些不太符合预期的结果。',
    cover: '',
    readingTime: 6,
    content: `
      <p>起因是发现自己每天都很忙，但周末回想起来想不起做了什么。于是做了个粗糙但认真的实验。</p>

      <h2>实验设计</h2>
      <ul>
        <li><strong>第 1–3 周：清单驱动。</strong>每天早上列 8–10 条待办，完成就划掉。</li>
        <li><strong>第 4–6 周：时间块驱动。</strong>只安排 3 个 90 分钟的时间块，每块只做一件事。</li>
        <li>两组都记录：完成任务数、主观疲惫度、晚上是否还能思考。</li>
      </ul>

      <h2>结果</h2>
      <p>完成任务数：清单组明显更高，平均每天 7.2 项；时间块组只有 3.1 项。</p>
      <p>但质量差异很大。清单组完成的大多是"回邮件""改文案"这类可中断的碎活；时间块组产生了三份能拿出去讨论的方案，这在实验之前三个月都没有出现。</p>
      <p>主观疲惫度：时间块组更高。连续 90 分钟不切窗口，对注意力是真实的消耗。</p>
      <p>晚上状态：时间块组更好。因为深度工作在一段时间内结束了，晚上不会有"还有六件事没做"的悬空感。</p>

      <h2>我最后的选择</h2>
      <p>两者混用，但按内容分配：</p>
      <ol>
        <li><strong>上午一个 90 分钟时间块</strong>，只做需要连续思考的事，不看消息。</li>
        <li><strong>下午用清单</strong>处理沟通和杂事，这些事本来就该被打断。</li>
        <li><strong>每天清单上限 5 条</strong>，写不下就说明今天安排不合理。</li>
      </ol>

      <h2>一个反直觉的发现</h2>
      <p>"慢"没有让我完成更多事，它让我完成了<em>更值钱</em>的事。这两件事在日程表上看不出区别，但季度回顾时差得很远。</p>
    `
  },

  {
    id: 'css-custom-properties',
    title: 'CSS 自定义属性：不只是变量，是运行时 API',
    date: '2026-07-02',
    tags: ['前端', 'CSS'],
    excerpt: '把 CSS 变量当成 Sass 变量来用，只发挥了它两成能力。它真正的价值在于能在运行时被 JavaScript 读写，并且遵循级联规则。',
    cover: '',
    readingTime: 8,
    content: `
      <p>很多人从 Sass 迁移到 CSS 自定义属性时，只是把 <code>$color</code> 换成了 <code>var(--color)</code>。这样能用，但浪费了它最有意思的部分。</p>

      <h2>关键差异：级联</h2>
      <p>Sass 变量在编译期就被替换掉了，作用域是静态的。CSS 自定义属性是运行时的，遵循级联——这意味着你可以在局部覆盖它：</p>
      <pre><code>.card {
  --accent: #2563eb;
  border-top: 3px solid var(--accent);
}

.card--danger {
  --accent: #dc2626;   /* 只改一个变量，整块样式跟着变 */
}</code></pre>
      <p>不需要为新变体重写任何其他规则。</p>

      <h2>配合 calc() 做派生值</h2>
      <p>变量可以参与计算，这让设计令牌体系变得很轻：</p>
      <pre><code>:root {
  --space-unit: 8px;
  --space-sm: calc(var(--space-unit) * 0.5);
  --space-md: var(--space-unit);
  --space-lg: calc(var(--space-unit) * 3);
}</code></pre>
      <p>注意 <code>calc()</code> 里运算符两侧<strong>必须有空格</strong>，<code>calc(8px*0.5)</code> 是无效的。</p>

      <h2>用 JS 读写变量</h2>
      <p>这是 Sass 做不到的部分。设置值要用 <code>setProperty</code>，读取时要 <code>getPropertyValue</code> 并 <code>trim()</code>：</p>
      <pre><code>const root = document.documentElement;

// 写入（不需要带 var()）
root.style.setProperty('--accent', '#10b981');

// 读取（会带前后空格，必须 trim）
const current = getComputedStyle(root)
  .getPropertyValue('--accent')
  .trim();</code></pre>

      <h2>一个实用场景：主题切换</h2>
      <p>把颜色全部定义成变量后，深色模式只需要覆盖一层：</p>
      <pre><code>:root {
  --bg: #ffffff;
  --text: #1f2937;
}

[data-theme="dark"] {
  --bg: #0f172a;
  --text: #e5e7eb;
}

body {
  background: var(--bg);
  color: var(--text);
}</code></pre>
      <p>切换主题时只改 <code>data-theme</code> 属性，加个 <code>transition</code> 就能平滑过渡，不需要重新计算任何东西。</p>

      <h2>注意点</h2>
      <ul>
        <li>自定义属性<strong>不会</strong>被压缩工具优化，别把超长字符串塞进去。</li>
        <li>在 <code>var()</code> 里做嵌套计算时要留意浏览器兼容，必要时提供回退值：<code>var(--x, 16px)</code>。</li>
        <li>变量名大小写敏感，<code>--Color</code> 和 <code>--color</code> 是两个东西。</li>
      </ul>
    `
  },

  {
    id: 'hello-world-is-hard',
    title: '最难写的永远是第一句话',
    date: '2026-06-20',
    tags: ['随笔'],
    excerpt: '开了三年博客，草稿箱里有 27 篇开头。这篇想聊聊写作启动成本这件事，以及我找到的一个笨办法。',
    cover: '',
    readingTime: 4,
    content: `
      <p>我的草稿箱里有 27 个文件，每个都只有标题和一两段开头。</p>

      <h2>开头难在哪</h2>
      <p>难在你还没开始写，就已经在预设它的读者。<em>别人会不会觉得这太浅？这个论点是不是早有人说过？我配写这个题目吗？</em></p>
      <p>这些问题的共同点：它们都关于"我"，而不是关于"这件事"。写作本该是把注意力放在事情上，但开头这一步总把你拉回到对自己的审视里。</p>

      <h2>一个笨办法</h2>
      <p>我现在会先写结尾。</p>
      <p>具体做法是：在动手前用一句话写下"我希望读者读完后知道什么"。这句话通常很长很啰嗦，写完就知道文章的主干在哪了。然后倒着往前找论据，最后才写开头。</p>
      <p>开头之所以难，是因为它同时要承担"抓住注意力"和"预告全文"两个任务。把它放到最后写，你已经在全文语境里了，写起来会轻松很多。</p>

      <h2>另一个原则</h2>
      <blockquote>初稿不用给任何人看，所以它可以很烂。</blockquote>
      <p>我过去的问题是把初稿当成品要求。现在的流程是：初稿写完不读，放一晚，第二天当成别人的文章来改。这个距离感很有用——你会更愿意删掉那些其实没必要的段落。</p>

      <p>这篇文章写了 20 分钟。前面 27 篇的开头，加起来大概花了三个小时。差别只在于这次我先想好了结尾。</p>
    `
  }
];
