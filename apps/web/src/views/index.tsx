// Recovered from the public index.html; editable React server view.
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
          <div className="hero__deco hero__deco--dots" aria-hidden="true"></div>
          <div className="container">
            <div className="hero__content">
              <p className="hero__badge">
                <span className="dot" aria-hidden="true"></span>
                {"2020年成立 · 六年口碑公司"}
              </p>
              <h1>
                {"毕业论文辅导，"}
                <span className="hl">{"六年专注"}</span>
                {"，帮你顺利毕业"}
              </h1>
              <p className="hero__sub">
                {
                  "从选题到答辩全程跟进，40人专业团队每年承接5000单以上，辅导后通过率95%以上。少走弯路、少熬夜，论文这事儿交给我们一起搞定。"
                }
              </p>
              <div className="hero__actions">
                <a className="btn btn--accent btn--lg" href="/cases.html">
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-check-circle"></use>
                  </svg>
                  {"\n              看 138 个真实案例\n            "}
                </a>
                <a className="btn btn--outline btn--lg" href="#services">
                  {"\n              看看 8 项服务怎么帮我\n              "}
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-arrow-right"></use>
                  </svg>
                </a>
              </div>
            </div>

            <div className="hero__stats reveal">
              <div className="stat-item">
                <div className="stat-num">
                  <Counter target={6} suffix="" className="num" />
                  <span className="stat-suffix">{"年"}</span>
                </div>
                <div className="stat-label">{"行业经验"}</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">
                  <Counter target={40} suffix="" className="num" />
                  <span className="stat-suffix">{"+"}</span>
                </div>
                <div className="stat-label">{"专业团队"}</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">
                  <Counter target={5000} suffix="" className="num" />
                  <span className="stat-suffix">{"+"}</span>
                </div>
                <div className="stat-label">{"年服务单量"}</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">
                  <Counter target={95} suffix="" className="num" />
                  <span className="stat-suffix">{"%"}</span>
                </div>
                <div className="stat-label">{"辅导后学员通过率"}</div>
              </div>
            </div>
            <p
              style={{
                marginTop: "12px",
                fontSize: ".8125rem",
                color: "var(--c-text-3)",
                textAlign: "center",
              }}
            >
              {
                "注：通过率指辅导学员完成修改跟进后的答辩通过情况，2020年以来累计。"
              }
            </p>
          </div>
        </section>

        <section className="section" id="services">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-tag">{"我们能帮你做什么"}</span>
              <h2>{"从选题到答辩，一站式论文辅导"}</h2>
              <p className="section-desc">
                {"帮你把论文从无到有弄出来、弄规范、弄到位，每个环节都有人跟。"}
              </p>
            </div>
            <div className="services-grid reveal-group">
              <article className="service-card reveal">
                <span className="service-card__icon">
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-target"></use>
                  </svg>
                </span>
                <h3>{"选题指导"}</h3>
                <p>
                  {
                    "根据专业和导师要求，推荐好写好过的题目，避免选太难写不下去。"
                  }
                </p>
                <a className="card-link" href="/services.html#topic">
                  {"看怎么选出好写好过的题"}
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-arrow-right"></use>
                  </svg>
                </a>
              </article>

              <article className="service-card reveal">
                <span className="service-card__icon">
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-doc"></use>
                  </svg>
                </span>
                <h3>{"开题报告"}</h3>
                <p>
                  {
                    "按学校模板制作，研究背景、意义、方法、进度安排，一次性搞定。"
                  }
                </p>
                <a className="card-link" href="/services.html#proposal">
                  {"看开题怎么 2-3 天搞定"}
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-arrow-right"></use>
                  </svg>
                </a>
              </article>

              <article className="service-card reveal">
                <span className="service-card__icon">
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-tree"></use>
                  </svg>
                </span>
                <h3>{"大纲搭建"}</h3>
                <p>
                  {"详细到三级标题，每章写什么都列清楚，后面正文按框架来。"}
                </p>
                <a className="card-link" href="/services.html#outline">
                  {"看三级大纲细到什么程度"}
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-arrow-right"></use>
                  </svg>
                </a>
              </article>

              <article className="service-card reveal">
                <span className="service-card__icon">
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-pen"></use>
                  </svg>
                </span>
                <h3>{"正文辅导"}</h3>
                <p>
                  {
                    "按大纲进行全文写作辅导，内容充实逻辑通顺，符合专业要求和学术规范。"
                  }
                </p>
                <a className="card-link" href="/services.html#writing">
                  {"看初稿多久交付、怎么审"}
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-arrow-right"></use>
                  </svg>
                </a>
              </article>

              <article className="service-card reveal">
                <span className="service-card__icon">
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-refresh"></use>
                  </svg>
                </span>
                <h3>{"修改润色"}</h3>
                <p>{"根据导师意见修改，小问题免费调，大改另行沟通。"}</p>
                <a className="card-link" href="/services.html#revise">
                  {"看哪些修改免费、哪些加钱"}
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-arrow-right"></use>
                  </svg>
                </a>
              </article>

              <article className="service-card reveal">
                <span className="service-card__icon">
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-shield"></use>
                  </svg>
                </span>
                <h3>{"查重降重"}</h3>
                <p>
                  {
                    "定稿后免费降重1次，人工改写不是机器替换，降到学校要求以下。"
                  }
                </p>
                <a className="card-link" href="/services.html#plagiarism">
                  {"看怎么降到学校要求以下"}
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-arrow-right"></use>
                  </svg>
                </a>
              </article>

              <article className="service-card reveal">
                <span className="service-card__icon">
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-layout"></use>
                  </svg>
                </span>
                <h3>{"格式排版"}</h3>
                <p>
                  {
                    "按学校要求全面排版，封面、目录、页眉页脚、参考文献，一次到位。"
                  }
                </p>
                <a className="card-link" href="/services.html#format">
                  {"看排版一次到位包含什么"}
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-arrow-right"></use>
                  </svg>
                </a>
              </article>

              <article className="service-card reveal">
                <span className="service-card__icon">
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-present"></use>
                  </svg>
                </span>
                <h3>{"答辩准备"}</h3>
                <p>{"PPT框架建议、常见问题预判、回答思路、答辩技巧。"}</p>
                <a className="card-link" href="/services.html#defense">
                  {"看答辩怎么提前演练"}
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-arrow-right"></use>
                  </svg>
                </a>
              </article>
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
                {"不确定选哪项？扫宣传单联系码免费评估"}
              </button>
            </p>
          </div>
        </section>

        <section className="section section--gray" id="process">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-tag">{"流程简单透明"}</span>
              <h2>{"六步搞定毕业论文"}</h2>
              <p className="section-desc">
                {"大部分事情我们来推进，你只需要在关键节点配合一下就行。"}
              </p>
            </div>
            <ol className="process-list">
              <li className="process-step reveal">
                <span className="process-step__num" aria-hidden="true">
                  {"1"}
                </span>
                <div className="process-step__body">
                  <h3>
                    <span className="step-tag">{"第1步"}</span>
                    {"咨询沟通"}
                  </h3>
                  <p>{"扫宣传单上的联系码加好友说情况，我们评估出方案。"}</p>
                </div>
              </li>
              <li className="process-step reveal">
                <span className="process-step__num" aria-hidden="true">
                  {"2"}
                </span>
                <div className="process-step__body">
                  <h3>
                    <span className="step-tag">{"第2步"}</span>
                    {"下单建档"}
                  </h3>
                  <p>{"确认内容和价格付定金，建专属服务群。"}</p>
                </div>
              </li>
              <li className="process-step reveal">
                <span className="process-step__num" aria-hidden="true">
                  {"3"}
                </span>
                <div className="process-step__body">
                  <h3>
                    <span className="step-tag">{"第3步"}</span>
                    {"开题大纲"}
                  </h3>
                  <p>{"辅导老师做开题和大纲，你确认后写正文。"}</p>
                </div>
              </li>
              <li className="process-step reveal">
                <span className="process-step__num" aria-hidden="true">
                  {"4"}
                </span>
                <div className="process-step__body">
                  <h3>
                    <span className="step-tag">{"第4步"}</span>
                    {"初稿交付"}
                  </h3>
                  <p>
                    {"全文写作辅导，初稿发你核对，确认初稿付尾款给完整文件。"}
                  </p>
                </div>
              </li>
              <li className="process-step reveal">
                <span className="process-step__num" aria-hidden="true">
                  {"5"}
                </span>
                <div className="process-step__body">
                  <h3>
                    <span className="step-tag">{"第5步"}</span>
                    {"修改定稿"}
                  </h3>
                  <p>{"按导师意见修改＋查重降重＋排版到定稿。"}</p>
                </div>
              </li>
              <li className="process-step reveal">
                <span className="process-step__num" aria-hidden="true">
                  {"6"}
                </span>
                <div className="process-step__body">
                  <h3>
                    <span className="step-tag">{"第6步"}</span>
                    {"答辩辅导"}
                  </h3>
                  <p>{"答辩PPT框架＋问题预判＋回答思路。"}</p>
                </div>
              </li>
            </ol>
            <p style={{ marginTop: "24px", textAlign: "center" }}>
              <a className="btn btn--outline" href="/process.html">
                {"看每一步的交付物和时效"}
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-arrow-right"></use>
                </svg>
              </a>
            </p>
          </div>
        </section>

        <section className="section" id="advantages">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-tag">{"为什么选我们"}</span>
              <h2>{"六年口碑，靠的是实打实的做法"}</h2>
              <p className="section-desc">
                {"我们的客户很大一部分是老客户推荐来的，一届一届学生口口相传。"}
              </p>
            </div>
            <div className="adv-grid reveal-group">
              <div className="adv-card reveal">
                <div className="adv-card__head">
                  <span className="adv-card__icon">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-users"></use>
                    </svg>
                  </span>
                  <h3>{"40人专业团队"}</h3>
                </div>
                <p>
                  {
                    "前端客服10人以上、后端辅导老师20人以上、质量审核5人以上，前端后端分工明确。师傅带徒弟管理，长期稳定合作，质量统一。"
                  }
                </p>
              </div>
              <div className="adv-card reveal">
                <div className="adv-card__head">
                  <span className="adv-card__icon">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-audit"></use>
                    </svg>
                  </span>
                  <h3>{"三级审核制度"}</h3>
                </div>
                <p>
                  {
                    "每篇论文交付前，都要经过辅导老师自审、交叉审核、主理人抽检三道关卡。审核团队独立于写作团队，保证审核的客观和严格——对你来说就一句话：你收到的每一篇，都是过完这三道关的。"
                  }
                </p>
              </div>
              <div className="adv-card reveal">
                <div className="adv-card__head">
                  <span className="adv-card__icon">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-headset"></use>
                    </svg>
                  </span>
                  <h3>{"全程跟进"}</h3>
                </div>
                <p>
                  {
                    "从开题到答辩结束全程跟进，不是交完稿就不管了。专属服务群主动同步进度，每天9点到22点，消息2小时内肯定回。"
                  }
                </p>
              </div>
              <div className="adv-card reveal">
                <div className="adv-card__head">
                  <span className="adv-card__icon">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-tool"></use>
                    </svg>
                  </span>
                  <h3>{"工科专业对口"}</h3>
                </div>
                <p>
                  {
                    "辅导老师以工科为主（机械、土木、计算机、电子、化工等），也覆盖文科、理科、艺术类。每位老师都有多年论文辅导经验，不是临时找的兼职。"
                  }
                </p>
              </div>
              <div className="adv-card reveal">
                <div className="adv-card__head">
                  <span className="adv-card__icon">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-tag"></use>
                    </svg>
                  </span>
                  <h3>{"价格实在"}</h3>
                </div>
                <p>
                  {
                    "我们不是层层转包的大机构，没有层层溢价。价格实在，没有隐形消费，定金尾款分阶段付，每一分钱花在哪都清清楚楚。"
                  }
                </p>
              </div>
              <div className="adv-card reveal">
                <div className="adv-card__head">
                  <span className="adv-card__icon">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-lock"></use>
                    </svg>
                  </span>
                  <h3>{"严格保密"}</h3>
                </div>
                <p>
                  {
                    "客户信息和论文内容严格保密，不会泄露给任何第三方，不会公开发表，也不会作为案例展示（除非你书面同意）。"
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--gray" id="cases">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-tag">{"成功案例"}</span>
              <h2>{"138 个真实辅导案例，覆盖七大类专业"}</h2>
              <p className="section-desc">
                {
                  "单片机 / PLC / 机械 / 计算机 / 仿真建模 / 土木 / 艺术设计七大类全覆盖，以下为部分脱敏原创案例展示。"
                }
              </p>
            </div>
            <div className="cases-grid reveal-group">
              <article className="case-card reveal">
                <img
                  className="img-fill"
                  src="/images/cases/mcu/mcu-02_t.webp"
                  alt="STM32水质检测系统（辅导案例截图，已脱敏）"
                  loading="lazy"
                />
                <div className="case-card__body">
                  <div className="case-card__tags">
                    <span className="tag">{"单片机·电气"}</span>
                    <span className="tag tag--accent">{"实物＋仿真"}</span>
                  </div>
                  <h3>{"STM32水质检测系统"}</h3>
                  <p>{"实物设计＋论文一站式辅导"}</p>
                  <span className="case-card__result">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-check-circle"></use>
                    </svg>
                    {"真实辅导案例"}
                  </span>
                </div>
              </article>
              <article className="case-card reveal">
                <img
                  className="img-fill"
                  src="/images/cases/plc/plc-01_t.webp"
                  alt="四层电梯PLC控制系统（辅导案例截图，已脱敏）"
                  loading="lazy"
                />
                <div className="case-card__body">
                  <div className="case-card__tags">
                    <span className="tag">{"PLC·工控"}</span>
                    <span className="tag tag--accent">{"博途仿真"}</span>
                  </div>
                  <h3>{"四层电梯PLC控制系统"}</h3>
                  <p>{"程序＋HMI仿真＋论文辅导"}</p>
                  <span className="case-card__result">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-check-circle"></use>
                    </svg>
                    {"真实辅导案例"}
                  </span>
                </div>
              </article>
              <article className="case-card reveal">
                <img
                  className="img-fill"
                  src="/images/cases/mech/mech-43_t.webp"
                  alt="二级减速器设计（辅导案例截图，已脱敏）"
                  loading="lazy"
                />
                <div className="case-card__body">
                  <div className="case-card__tags">
                    <span className="tag">{"机械"}</span>
                    <span className="tag tag--accent">{"三维＋计算"}</span>
                  </div>
                  <h3>{"二级减速器设计"}</h3>
                  <p>{"结构设计＋计算书＋出图辅导"}</p>
                  <span className="case-card__result">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-check-circle"></use>
                    </svg>
                    {"真实辅导案例"}
                  </span>
                </div>
              </article>
              <article className="case-card reveal">
                <img
                  className="img-fill"
                  src="/images/cases/cs/cs-13-zhiyu_t.webp"
                  alt="个人健康管理系统（辅导案例截图，已脱敏）"
                  loading="lazy"
                />
                <div className="case-card__body">
                  <div className="case-card__tags">
                    <span className="tag">{"计算机"}</span>
                    <span className="tag tag--accent">{"Web系统"}</span>
                  </div>
                  <h3>{"个人健康管理系统"}</h3>
                  <p>{"系统设计＋开发＋论文辅导"}</p>
                  <span className="case-card__result">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-check-circle"></use>
                    </svg>
                    {"真实辅导案例"}
                  </span>
                </div>
              </article>
              <article className="case-card reveal">
                <img
                  className="img-fill"
                  src="/images/cases/civil/civil-06_t.webp"
                  alt="宿舍楼立面与剖面设计（辅导案例截图，已脱敏）"
                  loading="lazy"
                />
                <div className="case-card__body">
                  <div className="case-card__tags">
                    <span className="tag">{"土木"}</span>
                    <span className="tag tag--accent">{"建筑方案"}</span>
                  </div>
                  <h3>{"宿舍楼立面与剖面设计"}</h3>
                  <p>{"方案设计＋计算书辅导"}</p>
                  <span className="case-card__result">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-check-circle"></use>
                    </svg>
                    {"真实辅导案例"}
                  </span>
                </div>
              </article>
              <article className="case-card reveal">
                <img
                  className="img-fill"
                  src="/images/cases/art/art-08b_t.webp"
                  alt="「庐山云雾」茶品牌设计（辅导案例截图，已脱敏）"
                  loading="lazy"
                />
                <div className="case-card__body">
                  <div className="case-card__tags">
                    <span className="tag">{"艺术设计"}</span>
                    <span className="tag tag--accent">{"品牌VI"}</span>
                  </div>
                  <h3>{"「庐山云雾」茶品牌设计"}</h3>
                  <p>{"视觉设计＋设计说明辅导"}</p>
                  <span className="case-card__result">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-check-circle"></use>
                    </svg>
                    {"真实辅导案例"}
                  </span>
                </div>
              </article>
            </div>
            <p style={{ marginTop: "24px", textAlign: "center" }}>
              <a className="btn btn--outline" href="/cases.html">
                {"查看全部 138 个案例，找找你的专业"}
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-arrow-right"></use>
                </svg>
              </a>
            </p>
          </div>
        </section>

        <section className="section" id="schools-teaser">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-tag">{"合作院校"}</span>
              <h2>{"业务覆盖全国 100+ 院校"}</h2>
              <p className="section-desc">
                {
                  "承接大量院校毕业设计辅导，仅展示部分合作院校封面，大量案例因客户隐私不予展示。"
                }
              </p>
            </div>
            <div className="ix-schools-grid reveal-group">
              <img
                className="reveal"
                src="/images/schools/s-023_t.webp"
                alt="合作院校封面"
                loading="lazy"
              />
              <img
                className="reveal"
                src="/images/schools/s-029_t.webp"
                alt="合作院校封面"
                loading="lazy"
              />
              <img
                className="reveal"
                src="/images/schools/s-037_t.webp"
                alt="合作院校封面"
                loading="lazy"
              />
              <img
                className="reveal"
                src="/images/schools/s-051_t.webp"
                alt="合作院校封面"
                loading="lazy"
              />
              <img
                className="reveal"
                src="/images/schools/s-096_t.webp"
                alt="合作院校封面"
                loading="lazy"
              />
              <img
                className="reveal"
                src="/images/schools/s-109_t.webp"
                alt="合作院校封面"
                loading="lazy"
              />
              <img
                className="reveal"
                src="/images/schools/s-117_t.webp"
                alt="合作院校封面"
                loading="lazy"
              />
              <img
                className="reveal"
                src="/images/schools/s-202_t.webp"
                alt="合作院校封面"
                loading="lazy"
              />
            </div>
            <p className="ix-schools-more reveal">
              <a className="btn btn--outline" href="/cases.html#schools">
                {"查看全部合作院校 →"}
              </a>
            </p>
          </div>
        </section>

        <section className="section" id="reviews">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-tag">{"学员怎么说"}</span>
              <h2>{"口碑是一届一届传下来的"}</h2>
              <p className="section-desc">
                {
                  "这六年能做下来，靠的不是广告，是一届一届学生的口口相传。以下三条为脱敏示例评价，展示典型的辅导过程。"
                }
              </p>
            </div>
            <div className="reviews-scroll">
              <article className="review-card reveal">
                <div className="review-card__quote">
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-quote"></use>
                  </svg>
                </div>
                <p className="review-card__text">
                  {
                    "一开始选题卡了半个月，顾问当天就给了三个方向，导师一次就过了。后面初稿到降重都在群里推进，我基本没操心，答辩问的问题也提前预判到了。"
                  }
                </p>
                <div className="review-card__user">
                  <span className="avatar-placeholder" aria-hidden="true">
                    {"王"}
                  </span>
                  <div>
                    <div className="user-name">{"王同学"}</div>
                    <div className="user-info">{"某学院 · 机械专业"}</div>
                  </div>
                </div>
              </article>

              <article className="review-card reveal">
                <div className="review-card__quote">
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-quote"></use>
                  </svg>
                </div>
                <p className="review-card__text">
                  {
                    "导师改要求改了三回，每次都是当天转到群里，修改两天内就回来了。查重最后降到8%，学校要求15%以下，稳稳过了。群里回复很快，不会找不到人。"
                  }
                </p>
                <div className="review-card__user">
                  <span className="avatar-placeholder" aria-hidden="true">
                    {"李"}
                  </span>
                  <div>
                    <div className="user-name">{"李同学"}</div>
                    <div className="user-info">{"某民办本科 · 计算机专业"}</div>
                  </div>
                </div>
              </article>

              <article className="review-card reveal">
                <div className="review-card__quote">
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-quote"></use>
                  </svg>
                </div>
                <p className="review-card__text">
                  {
                    "实习太忙根本没时间写，从开题到定稿全程跟着走，关键节点群里@我确认一下就行。答辩前还给做了一次模拟答辩，上场一点不慌，顺利毕业。"
                  }
                </p>
                <div className="review-card__user">
                  <span className="avatar-placeholder" aria-hidden="true">
                    {"张"}
                  </span>
                  <div>
                    <div className="user-name">{"张同学"}</div>
                    <div className="user-info">
                      {"某独立学院 · 土木工程专业"}
                    </div>
                  </div>
                </div>
              </article>
            </div>
            <p style={{ marginTop: "24px", textAlign: "center" }}>
              <a href="/reviews.html" style={{ fontWeight: "600" }}>
                {"更多真实好评 →"}
              </a>
            </p>
          </div>
        </section>

        <section className="section section--blue" id="faq">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-tag">{"常见问题"}</span>
              <h2>{"你最关心的几个问题"}</h2>
              <p className="section-desc">
                {"提前说清楚，后面少误会。更多问题可以扫码直接问。"}
              </p>
            </div>
            <div className="faq-list reveal">
              <Accordion
                category=""
                question={
                  <>{"\n              论文是你们全包吗？\n              "}</>
                }
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                不是全包。我们做的是毕业论文/设计辅导服务，包括选题建议、开题报告指导、大纲搭建、正文写作思路辅导、修改建议、格式规范优化、查重降重辅导、答辩准备指导。说白了就是帮你把论文从无到有弄出来、弄规范、弄到位，所有内容都是辅导性质，最终论文是你自己的。\n              "
                  }
                </div>
              </Accordion>
              <Accordion
                category=""
                question={
                  <>{"\n              能保证通过吗？\n              "}</>
                }
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                我们不画饼、不乱承诺，说「百分百保证通过」的都是骗你的，最终能不能通过受很多因素影响。我们能保证的是内容和格式做到符合学校要求，帮你准备答辩问题和回答思路，只要你自己上点心、答辩别太紧张，通过没问题。往年我们辅导的学员通过率在95%以上。\n              "
                  }
                </div>
              </Accordion>
              <Accordion
                category=""
                question={<>{"\n              价格怎么算？\n              "}</>}
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                价格按专业、字数、难度和时间评估，扫宣传单上的联系码咨询后我们会根据你的具体情况出方案和报价。费用分定金和尾款：下单时付定金（一般总价50%），初稿确认后付尾款（剩50%）。我们没有大机构的层层溢价，价格实在，没有隐形消费。\n              "
                  }
                </div>
              </Accordion>
              <Accordion
                category=""
                question={<>{"\n              多久能写完？\n              "}</>}
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                正常情况下：开题/任务书2-3天，大纲框架1-2天，初稿写作辅导5-10天（看字数和专业难度），修改稿每轮2天，终稿排版1-2天，查重降重1-2天，答辩辅导1天。实际时间受反馈速度、导师要求等影响，建议你早点下单，别卡着截止日期才来，留足修改时间。\n              "
                  }
                </div>
              </Accordion>
            </div>
            <div className="faq-more reveal">
              <a className="btn btn--outline" href="/faq.html">
                {"\n            还有 20 个问题，一次看完\n            "}
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-arrow-right"></use>
                </svg>
              </a>
            </div>
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
                <h2>{"案例、资料都已上架，欢迎慢慢看"}</h2>
                <p>
                  {
                    "本站是宣传展示站，客户案例和资料会持续更新。想评估题目、要同专业案例，扫你手上宣传单（宣传页）的联系二维码，当天出方案和报价。"
                  }
                </p>
                <p style={{ marginTop: "16px" }}>
                  <button
                    type="button"
                    className="btn btn--accent btn--lg"
                    data-open-modal="qrcode-modal"
                  >
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-users"></use>
                    </svg>
                    {"\n                关注我们的自媒体\n              "}
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
