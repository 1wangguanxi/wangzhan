// Recovered from the public process.html; editable React server view.
import { CaseGallery, SchoolGallery } from "@/features/gallery";
import { Accordion, FaqTabs, FaqCount, FaqProvider } from "@/features/faq";
import { ContactForm } from "@/features/contact";
import { Counter } from "@/components/counter";
import { ReviewList } from "@/features/reviews";
import type { Catalog } from "@zhiyu/content";
export default function View({ catalog }: { catalog: Catalog }) {
  return (
    <FaqProvider>
      <main>
        <section className="hero">
          <div
            className="hero__deco hero__deco--circle1"
            aria-hidden="true"
          ></div>
          <div
            className="hero__deco hero__deco--circle2"
            aria-hidden="true"
          ></div>
          <div className="hero__deco hero__deco--ring" aria-hidden="true"></div>
          <div className="container">
            <div className="hero__content">
              <p className="hero__badge">
                <span className="dot" aria-hidden="true"></span>
                {"流程简单透明 · 主动推进不打扰"}
              </p>
              <h1>
                {"六步走完，"}
                <span className="hl">{"全程有人跟"}</span>
              </h1>
              <p className="hero__sub">
                {
                  "大部分事情我们来做，你只在关键节点配合——该实习实习、该找工作找工作，不用天天守着论文。这是我们六年摸索出来的成熟模式，既保证质量，又不耽误你时间。"
                }
              </p>
            </div>
          </div>
        </section>

        <section
          className="section section--gray pstep-overview"
          aria-label="流程总览"
        >
          <div className="container">
            <nav className="ptimeline reveal" aria-label="流程步骤快速导航">
              <ol className="ptimeline__list">
                <li className="ptimeline__item">
                  <a
                    className="ptimeline__node"
                    data-spy="step-1"
                    href="#step-1"
                  >
                    <span className="ptimeline__num" aria-hidden="true">
                      {"1"}
                    </span>
                    <span className="ptimeline__label">{"咨询沟通"}</span>
                    <span className="ptimeline__time">{"当天"}</span>
                  </a>
                </li>
                <li className="ptimeline__item">
                  <a
                    className="ptimeline__node"
                    data-spy="step-2"
                    href="#step-2"
                  >
                    <span className="ptimeline__num" aria-hidden="true">
                      {"2"}
                    </span>
                    <span className="ptimeline__label">{"下单建档"}</span>
                    <span className="ptimeline__time">{"当天"}</span>
                  </a>
                </li>
                <li className="ptimeline__item">
                  <a
                    className="ptimeline__node"
                    data-spy="step-3"
                    href="#step-3"
                  >
                    <span className="ptimeline__num" aria-hidden="true">
                      {"3"}
                    </span>
                    <span className="ptimeline__label">{"开题大纲"}</span>
                    <span className="ptimeline__time">{"3-5 天"}</span>
                  </a>
                </li>
                <li className="ptimeline__item">
                  <a
                    className="ptimeline__node"
                    data-spy="step-4"
                    href="#step-4"
                  >
                    <span className="ptimeline__num" aria-hidden="true">
                      {"4"}
                    </span>
                    <span className="ptimeline__label">{"初稿交付"}</span>
                    <span className="ptimeline__time">{"5-10 天"}</span>
                  </a>
                </li>
                <li className="ptimeline__item">
                  <a
                    className="ptimeline__node"
                    data-spy="step-5"
                    href="#step-5"
                  >
                    <span className="ptimeline__num" aria-hidden="true">
                      {"5"}
                    </span>
                    <span className="ptimeline__label">{"修改定稿"}</span>
                    <span className="ptimeline__time">{"每轮 2 天"}</span>
                  </a>
                </li>
                <li className="ptimeline__item">
                  <a
                    className="ptimeline__node"
                    data-spy="step-6"
                    href="#step-6"
                  >
                    <span className="ptimeline__num" aria-hidden="true">
                      {"6"}
                    </span>
                    <span className="ptimeline__label">{"答辩辅导"}</span>
                    <span className="ptimeline__time">{"1 天"}</span>
                  </a>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section className="section" id="steps" aria-label="六步流程详解">
          <div className="container">
            <section
              className="pstep reveal"
              id="step-1"
              aria-labelledby="step-1-title"
            >
              <div className="pstep__head">
                <span className="pstep__bignum" aria-hidden="true">
                  {"01"}
                </span>
                <div className="pstep__titlebox">
                  <h2 id="step-1-title">
                    <span className="pstep__tag">{"第1步"}</span>
                    {"咨询沟通"}
                  </h2>
                  <p className="pstep__subtitle">
                    {"先把情况说清楚，我们给你评估"}
                  </p>
                </div>
                <span className="pstep__time">
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-clock"></use>
                  </svg>
                  {"预计：当天"}
                </span>
              </div>
              <p className="pstep__desc">
                {
                  "扫宣传单上的联系码加好友，把你的专业、学校要求、截止时间告诉我们。辅导老师评估题目难度和工作量，当天就能给你出方案和报价。咨询不收费、不催单，觉得合适再下单。"
                }
              </p>
              <div className="pstep__cols">
                <div className="pstep__col pstep__col--you">
                  <h3>
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-users"></use>
                    </svg>
                    {"你需要做什么"}
                  </h3>
                  <ul className="plist">
                    <li>
                      {"扫宣传单上的联系码加好友，说明你的专业和学校要求"}
                    </li>
                    <li>{"说清楚题目方向（有题目发题目，没题目我们推荐）"}</li>
                    <li>{"告诉截止时间和学校的特殊要求（查重率、字数等）"}</li>
                  </ul>
                </div>
                <div className="pstep__col pstep__col--we">
                  <h3>
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-headset"></use>
                    </svg>
                    {"我们会做什么"}
                  </h3>
                  <ul className="plist">
                    <li>{"评估题目难度、工作量和大致周期"}</li>
                    <li>{"当天给出服务方案和实在报价，没有隐形消费"}</li>
                    <li>{"解答你关于流程、规则的所有疑问"}</li>
                  </ul>
                </div>
              </div>
              <div className="pstep__deliver">
                <span className="pstep__deliver-label">{"交付物"}</span>
                <span className="chip">{"辅导方案"}</span>
                <span className="chip">{"报价"}</span>
              </div>
            </section>

            <section
              className="pstep reveal"
              id="step-2"
              aria-labelledby="step-2-title"
            >
              <div className="pstep__head">
                <span className="pstep__bignum" aria-hidden="true">
                  {"02"}
                </span>
                <div className="pstep__titlebox">
                  <h2 id="step-2-title">
                    <span className="pstep__tag">{"第2步"}</span>
                    {"下单建档"}
                  </h2>
                  <p className="pstep__subtitle">
                    {"资料一次给全，后面少返工"}
                  </p>
                </div>
                <span className="pstep__time">
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-clock"></use>
                  </svg>
                  {"预计：当天"}
                </span>
              </div>
              <p className="pstep__desc">
                {
                  "确认合作后填好下单表格，把所有要求一次性、认真填好，付定金（一般总价 50%）。我们当天建专属服务群——就你、前端咨询顾问、辅导老师三个人，并分配对口专业的辅导老师正式开工。"
                }
              </p>
              <div className="pstep__cols">
                <div className="pstep__col pstep__col--you">
                  <h3>
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-users"></use>
                    </svg>
                    {"你需要做什么"}
                  </h3>
                  <ul className="plist">
                    <li>
                      {
                        "认真填下单表格，要求一次性说清楚（漏一个小要求都可能让思路跑偏）"
                      }
                    </li>
                    <li>
                      {"付定金（一般总价 50%），付款截图发群里方便确认到账"}
                    </li>
                    <li>
                      {
                        "把学校模板、导师要求等资料发过来，已有的开题/大纲也全部发"
                      }
                    </li>
                  </ul>
                </div>
                <div className="pstep__col pstep__col--we">
                  <h3>
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-headset"></use>
                    </svg>
                    {"我们会做什么"}
                  </h3>
                  <ul className="plist">
                    <li>
                      {"建专属服务群，所有服务相关的事都在群里说、有记录可查"}
                    </li>
                    <li>{"按你的专业分配对口辅导老师，建立订单档案"}</li>
                    <li>{"核对你发的资料，缺什么第一时间提醒你补"}</li>
                  </ul>
                </div>
              </div>
              <div className="pstep__note">
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-doc"></use>
                </svg>
                <p>
                  <strong>{"这些资料请一次给全："}</strong>
                  {
                    "学校格式要求（字体字号页边距行距页眉页脚参考文献格式）、开题报告模板、任务书模板（学校要的话）、导师要求（任何要求、批注、修改意见，截图或文件）。"
                  }
                </p>
              </div>
              <div className="pstep__deliver">
                <span className="pstep__deliver-label">{"交付物"}</span>
                <span className="chip">{"专属服务群"}</span>
                <span className="chip">{"订单档案"}</span>
              </div>
            </section>

            <section
              className="pstep reveal"
              id="step-3"
              aria-labelledby="step-3-title"
            >
              <div className="pstep__head">
                <span className="pstep__bignum" aria-hidden="true">
                  {"03"}
                </span>
                <div className="pstep__titlebox">
                  <h2 id="step-3-title">
                    <span className="pstep__tag">{"第3步"}</span>
                    {"开题大纲"}
                  </h2>
                  <p className="pstep__subtitle">
                    {"方向定准了，后面正文才顺"}
                  </p>
                </div>
                <span className="pstep__time">
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-clock"></use>
                  </svg>
                  {"预计：开题 2-3 天 + 大纲 1-2 天"}
                </span>
              </div>
              <p className="pstep__desc">
                {
                  "辅导老师按学校模板做开题报告和任务书（开题默认 2000 字左右），再把章节大纲搭到三级标题，每章写什么都列清楚。这两个大节点我们会主动在群里 @ 你确认——一句经验：开题不建议做太难，做难了后面正文受罪的是自己。"
                }
              </p>
              <div className="pstep__cols">
                <div className="pstep__col pstep__col--you">
                  <h3>
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-users"></use>
                    </svg>
                    {"你需要做什么"}
                  </h3>
                  <ul className="plist">
                    <li>{"确认开题报告和大纲，建议先给导师看一眼再确认"}</li>
                    <li>
                      {
                        "遵守 48 小时反馈规则：有问题 48 小时内提，没问题我们自动往下走"
                      }
                    </li>
                    <li>
                      {
                        "导师有新意见当天转到群里告诉我们，别压着不说——晚到一天，排期就晚一天"
                      }
                    </li>
                  </ul>
                </div>
                <div className="pstep__col pstep__col--we">
                  <h3>
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-headset"></use>
                    </svg>
                    {"我们会做什么"}
                  </h3>
                  <ul className="plist">
                    <li>
                      {"按学校模板做开题报告和任务书，内容完整、格式规范"}
                    </li>
                    <li>{"推荐难度适中、好写好过的方向，不给你挖坑"}</li>
                    <li>
                      {"搭三级标题大纲，每章写作要点列清楚，确认后作为正文依据"}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pstep__deliver">
                <span className="pstep__deliver-label">{"交付物"}</span>
                <span className="chip">{"开题报告"}</span>
                <span className="chip">{"任务书"}</span>
                <span className="chip">{"三级大纲"}</span>
              </div>
            </section>

            <section
              className="pstep reveal"
              id="step-4"
              aria-labelledby="step-4-title"
            >
              <div className="pstep__head">
                <span className="pstep__bignum" aria-hidden="true">
                  {"04"}
                </span>
                <div className="pstep__titlebox">
                  <h2 id="step-4-title">
                    <span className="pstep__tag">{"第4步"}</span>
                    {"初稿交付"}
                  </h2>
                  <p className="pstep__subtitle">
                    {"按大纲进行全文写作辅导，三道审核后交付"}
                  </p>
                </div>
                <span className="pstep__time">
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-clock"></use>
                  </svg>
                  {"预计：5-10 天"}
                </span>
              </div>
              <p className="pstep__desc">
                {
                  "按确认好的大纲进行全文写作辅导，5-10 天交付（看字数和专业难度）。每篇初稿都经过辅导老师自审、交叉审核、主理人抽检三道关卡。初稿先发带水印版本给你核对内容和质量，确认后付尾款，完整无水印文件开放下载。"
                }
              </p>
              <div className="pstep__cols">
                <div className="pstep__col pstep__col--you">
                  <h3>
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-users"></use>
                    </svg>
                    {"你需要做什么"}
                  </h3>
                  <ul className="plist">
                    <li>{"认真核对水印版初稿的内容和质量"}</li>
                    <li>{"确认初稿后付尾款（剩 50%），截图发群里"}</li>
                    <li>
                      {
                        "核对时自己有想法，先逐条记下来整理好，下一步统一提；导师的意见则随时发群里，不用等"
                      }
                    </li>
                  </ul>
                </div>
                <div className="pstep__col pstep__col--we">
                  <h3>
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-headset"></use>
                    </svg>
                    {"我们会做什么"}
                  </h3>
                  <ul className="plist">
                    <li>
                      {
                        "按大纲进行全文写作辅导，内容充实、逻辑通顺、符合学术规范"
                      }
                    </li>
                    <li>{"三级审核把关后，在群里主动找你确认初稿"}</li>
                    <li>
                      {"尾款到账后，完整无水印文件上传共享文件夹随时下载"}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pstep__note pstep__note--warn">
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-lock"></use>
                </svg>
                <p>
                  <strong>{"一条红线提前说："}</strong>
                  {
                    "没收到尾款，我们不会发完整无水印文件，也不会继续提供修改服务。我们已经花了大量时间精力完成初稿，尾款是对这份劳动的基本保障——这也是行业里保护双方的做法，请你理解。"
                  }
                </p>
              </div>
              <div className="pstep__deliver">
                <span className="pstep__deliver-label">{"交付物"}</span>
                <span className="chip">{"初稿（水印版核对）"}</span>
                <span className="chip">{"尾款后无水印完整文件"}</span>
              </div>
            </section>

            <section
              className="pstep reveal"
              id="step-5"
              aria-labelledby="step-5-title"
            >
              <div className="pstep__head">
                <span className="pstep__bignum" aria-hidden="true">
                  {"05"}
                </span>
                <div className="pstep__titlebox">
                  <h2 id="step-5-title">
                    <span className="pstep__tag">{"第5步"}</span>
                    {"修改定稿"}
                  </h2>
                  <p className="pstep__subtitle">
                    {"按意见改到位，降重排版一次搞定"}
                  </p>
                </div>
                <span className="pstep__time">
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-clock"></use>
                  </svg>
                  {"预计：每轮 2 天"}
                </span>
              </div>
              <p className="pstep__desc">
                {
                  "建议先把初稿给导师看，等导师提意见了再让我们改——最终是导师审核，导师意见才最权威。收到你完整的修改意见后 2 天内改完一轮，平均 3 轮内能搞定；之后查重降重、格式排版，交付定稿。"
                }
              </p>
              <div className="pstep__cols">
                <div className="pstep__col pstep__col--you">
                  <h3>
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-users"></use>
                    </svg>
                    {"你需要做什么"}
                  </h3>
                  <ul className="plist">
                    <li>
                      {
                        "整理修改意见：按序号标好（第 1 条、第 2 条……），写清位置（第X章第X节第X段）和具体内容"
                      }
                    </li>
                    <li>
                      {"导师的批注直接发 Word 源文件或截图，我们按批注改"}
                    </li>
                    <li>
                      {
                        "同一轮的修改意见建议一次性列完再发——今天说一点、明天说一点，每轮都要重新排期，反而拖慢进度"
                      }
                    </li>
                  </ul>
                </div>
                <div className="pstep__col pstep__col--we">
                  <h3>
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-headset"></use>
                    </svg>
                    {"我们会做什么"}
                  </h3>
                  <ul className="plist">
                    <li>{"按意见修改，每轮附修改说明，历史版本存档可查"}</li>
                    <li>{"定稿后免费降重 1 次，人工改写到学校要求以下"}</li>
                    <li>{"按学校要求全面格式排版，交付定稿和查重报告"}</li>
                  </ul>
                </div>
              </div>
              <div className="pstep__note">
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-check-circle"></use>
                </svg>
                <p>
                  <strong>{"免费修改 4 个条件："}</strong>
                  {
                    "① 在已确认的大纲、开题、初稿范围内，不是新增内容；② 是我们的问题（内容错了、逻辑不通、格式不对、错别字）；③ 单轮修改量不超过全文 20%；④ 初稿交付后 3 轮修改以内。超出这些（换题、加章节、导师全新要求等）属于新需求，先评估工作量再沟通费用，你同意了我们才改。"
                  }
                </p>
              </div>
              <div className="pstep__deliver">
                <span className="pstep__deliver-label">{"交付物"}</span>
                <span className="chip">{"定稿"}</span>
                <span className="chip">{"查重报告"}</span>
              </div>
            </section>

            <section
              className="pstep reveal"
              id="step-6"
              aria-labelledby="step-6-title"
            >
              <div className="pstep__head">
                <span className="pstep__bignum" aria-hidden="true">
                  {"06"}
                </span>
                <div className="pstep__titlebox">
                  <h2 id="step-6-title">
                    <span className="pstep__tag">{"第6步"}</span>
                    {"答辩辅导"}
                  </h2>
                  <p className="pstep__subtitle">
                    {"问题提前预判，上场心里有底"}
                  </p>
                </div>
                <span className="pstep__time">
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-clock"></use>
                  </svg>
                  {"预计：1 天"}
                </span>
              </div>
              <p className="pstep__desc">
                {
                  "终稿完成后答辩辅导免费跟上，直到你答辩结束。答辩是你自己上场，我们帮你把可能的问题都预判到、回答思路理顺，再免费模拟演练一次，让你上场不慌。"
                }
              </p>
              <div className="pstep__cols">
                <div className="pstep__col pstep__col--you">
                  <h3>
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-users"></use>
                    </svg>
                    {"你需要做什么"}
                  </h3>
                  <ul className="plist">
                    <li>{"抽时间熟悉论文内容，这是答辩的底气"}</li>
                    <li>{"参加 1 次免费模拟答辩，把演练当成正式答辩来对待"}</li>
                    <li>{"论文内容有疑问随时在群里问，售后到答辩结束"}</li>
                  </ul>
                </div>
                <div className="pstep__col pstep__col--we">
                  <h3>
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-headset"></use>
                    </svg>
                    {"我们会做什么"}
                  </h3>
                  <ul className="plist">
                    <li>
                      {
                        "PPT 框架建议：章节结构、每页重点、时间分配（完整 PPT 制作另收费）"
                      }
                    </li>
                    <li>{"预判 10-15 个答辩老师可能问的问题，附回答思路"}</li>
                    <li>{"答辩话术指导：开场、救场、回应挑刺、结束致谢"}</li>
                    <li>{"免费模拟答辩 1 次，我们当老师问你问题帮你演练"}</li>
                  </ul>
                </div>
              </div>
              <div className="pstep__deliver">
                <span className="pstep__deliver-label">{"交付物"}</span>
                <span className="chip">{"答辩问题清单"}</span>
                <span className="chip">{"PPT 框架"}</span>
              </div>
            </section>
          </div>
        </section>

        <section className="section peak-section" id="peak">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-tag section-tag--accent">
                {"旺季提醒"}
              </span>
              <h2>{"每年2月15日—5月20日是旺季"}</h2>
              <p className="section-desc">
                {
                  "这时候单特别多，修改需求也集中。规则提前说清楚，建议你尽早下单。"
                }
              </p>
            </div>
            <div className="peak-grid reveal-group">
              <div className="peak-card reveal">
                <span className="peak-card__icon">
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-refresh"></use>
                  </svg>
                </span>
                <h3>{"3 轮原则"}</h3>
                <p>
                  {
                    "一般从初稿到终稿，平均 3 轮修改内能搞定（含 3 轮）。3 轮以内的问题按正常流程免费改；超过 3 轮的修改每轮都要花更多时间精力，旺季里时间没法保证，我们尽量安排。"
                  }
                </p>
              </div>
              <div className="peak-card reveal">
                <span className="peak-card__icon">
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-clock"></use>
                  </svg>
                </span>
                <h3>{"旺季时效"}</h3>
                <p>
                  {
                    "旺季期间修改稿尽量按每轮 2 天改完，最迟不超过 3 天，不做绝对保证；白天消息按顺序当天回，晚上 8 点截止当天的售后登记。非旺季（5 月 21 日—次年 2 月 14 日）所有修改每轮 2 天内搞定，旺季里没改完的也一并处理完。"
                  }
                </p>
              </div>
              <div className="peak-card reveal">
                <span className="peak-card__icon">
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-check-circle"></use>
                  </svg>
                </span>
                <h3>{"给你的建议"}</h3>
                <p>
                  {
                    "前 3 轮把所有问题一次性提完、改到位，别挤到后面。最重要的是尽早下单，别卡着截止日期才来——给自己留足修改时间，比什么都稳。"
                  }
                </p>
              </div>
            </div>
            <p style={{ marginTop: "24px", textAlign: "center" }}>
              <button
                type="button"
                className="btn btn--accent btn--lg"
                data-open-modal="qrcode-modal"
              >
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-chat"></use>
                </svg>
                {"现在扫码下单，避开 5 月修改高峰"}
              </button>
            </p>
          </div>
        </section>

        <section className="section cta-section" id="contact">
          <div
            className="hero__deco hero__deco--circle1"
            aria-hidden="true"
          ></div>
          <div className="container">
            <div className="cta-inner">
              <div className="reveal">
                <h2>{"扫宣传单联系码，当天就出方案和报价"}</h2>
                <p>
                  {
                    "把专业、学校要求、截止时间告诉我们，剩下的按流程一步步来。工作时间每天 9:00 到 22:00，消息 2 小时内肯定回，咨询不收费、不催单。"
                  }
                </p>
                <p style={{ marginTop: "16px" }}>
                  <button
                    type="button"
                    className="btn btn--accent btn--lg"
                    data-open-modal="qrcode-modal"
                  >
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-chat"></use>
                    </svg>
                    {"\n                免费获取方案和报价\n              "}
                  </button>
                </p>
              </div>
              <div className="cta-qrcode-box reveal">
                <img
                  src="/images/zhiyu-qrcode.png"
                  alt="知瑜网络自媒体账号整合展示二维码"
                  width="160"
                  height="160"
                  loading="lazy"
                />
                <span>{"自媒体账号整合展示 · 欢迎关注"}</span>
                <span
                  style={{
                    display: "block",
                    fontSize: ".82rem",
                    opacity: ".9",
                    marginTop: "6px",
                  }}
                >
                  {"咨询、下单请扫宣传单（宣传页）上的联系二维码"}
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </FaqProvider>
  );
}
