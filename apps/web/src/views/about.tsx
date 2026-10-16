// Recovered from the public about.html; editable React server view.
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
        <section className="hero about-hero">
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
                {"关于我们 · 2020年至今"}
              </p>
              <h1>
                {"六年专注，靠的是"}
                <span className="hl">{"一届一届学生口口相传"}</span>
              </h1>
              <p className="hero__sub">
                {
                  "从几个研究生学长学姐课余帮忙，到40人专业团队、每年5000单以上。这六年我们只做一件事：让学生少走弯路、少熬夜、顺顺利利毕业。"
                }
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="story">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-tag">{"品牌故事"}</span>
              <h2>{"从课余帮忙，到正规公司"}</h2>
              <p className="section-desc">
                {"六年时间，我们见证也陪伴了一届又一届学生的毕业季。"}
              </p>
            </div>
            <div className="story-wrap">
              <div className="story-text reveal">
                <p>
                  {"知瑜网络，是一家"}
                  <strong>{"专注大学生毕业论文/设计辅导"}</strong>
                  {"的公司。"}
                </p>
                <p>
                  {"说起来，我们最早是2020年开始做这行的。那时候还是"}
                  <strong>{"几个研究生学长学姐"}</strong>
                  {
                    "，利用课余时间帮身边的学弟学妹看看论文、改改格式、讲讲思路。后来找的人越来越多，就慢慢做成了一个正式的公司。到现在六年了，我们"
                  }
                  <strong>{"每年承接的毕业论文/设计辅导订单超过5000单"}</strong>
                  {
                    "，服务过的本科生遍布全国各地，二本、民办、独立学院、一本都有，工科、文科、理科、艺术类都接过。"
                  }
                </p>
                <p>
                  {
                    "这六年里，我们见过太多学生被毕业论文折腾得焦头烂额——导师要求变来变去、时间永远不够用、写了改改了写、到最后查重还可能出问题。我们做这行的初衷很简单："
                  }
                  <strong>{"让学生少走弯路、少熬夜、顺顺利利毕业"}</strong>
                  {"。"}
                </p>
              </div>

              <ol className="timeline reveal">
                <li className="timeline__item">
                  <span className="timeline__year">{"2020"}</span>
                  <div className="timeline__body">
                    <h3>{"课余起步，成立公司"}</h3>
                    <p>
                      {
                        "几个研究生学长学姐利用课余时间，帮身边的学弟学妹看论文、改格式、讲思路；找来的学生越来越多，当年就注册成立了正式的公司。"
                      }
                    </p>
                  </div>
                </li>
                <li className="timeline__item">
                  <span className="timeline__year">{"2023"}</span>
                  <div className="timeline__body">
                    <h3>{"40人团队＋三级审核"}</h3>
                    <p>
                      {
                        "组建40人以上专业团队，前端后端分工明确，确立自审、交叉审核、主理人抽检三级审核制度。"
                      }
                    </p>
                  </div>
                </li>
                <li className="timeline__item">
                  <span className="timeline__year">{"2025"}</span>
                  <div className="timeline__body">
                    <h3>{"每年5000单以上"}</h3>
                    <p>
                      {
                        "每年承接辅导订单超过5000单，服务学生遍布全国，工科为主，文科、理科、艺术类全覆盖。"
                      }
                    </p>
                  </div>
                </li>
                <li className="timeline__item timeline__item--now">
                  <span className="timeline__year">{"2026"}</span>
                  <div className="timeline__body">
                    <h3>{"服务说明 V4.0 发布"}</h3>
                    <p>
                      {
                        "六年服务经验沉淀成 V4.0 版服务说明，流程更透明，辅导后学员通过率稳定在95%以上。"
                      }
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section className="section section--blue" id="stats">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-tag">{"数字里的知瑜"}</span>
              <h2>{"六年，一组踏实的数字"}</h2>
            </div>
            <div className="about-stats-grid reveal">
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
                  <span className="num">{"数万"}</span>
                </div>
                <div className="stat-label">{"累计服务学生"}</div>
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
                "注：「数万」为2020年以来累计服务学生数；通过率指辅导学员完成修改跟进后的答辩通过情况。"
              }
            </p>
          </div>
        </section>

        <section className="section" id="team">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-tag">{"我们的团队"}</span>
              <h2>{"40人专业团队，前端后端分工明确"}</h2>
              <p className="section-desc">
                {
                  "我们不是层层转包的大机构，也不是几个人的小作坊。六年发展，管理规范，质量统一。"
                }
              </p>
            </div>
            <div className="team-grid reveal-group">
              <article className="team-card reveal">
                <img
                  className="img-fill"
                  src="/images/team-manage.webp"
                  alt="管理团队照片"
                  loading="lazy"
                />
                <div className="team-card__body">
                  <div className="team-card__head">
                    <h3>{"管理团队"}</h3>
                    <span className="tag tag--accent">{"主理人＋运营"}</span>
                  </div>
                  <p>
                    {
                      "主理人负责整体运营、质量把控、疑难订单把关、客户纠纷处理，每一篇论文最终交付前都会抽检。另有运营负责人负责排班、调度、进度跟踪，确保每一个订单都有人跟、不超时。"
                    }
                  </p>
                </div>
              </article>

              <article className="team-card reveal">
                <img
                  className="img-fill"
                  src="/images/team-service.webp"
                  alt="客服团队照片"
                  loading="lazy"
                />
                <div className="team-card__body">
                  <div className="team-card__head">
                    <h3>{"前端咨询与客服团队"}</h3>
                    <span className="tag tag--accent">{"10人+"}</span>
                  </div>
                  <p>
                    {
                      "负责接单咨询、客户关系维护、售后问题首接、客诉处理。你有任何问题先找前端顾问，需要专业处理的再拉辅导老师。客服团队经过专业培训，熟悉全流程规则，不会出现找不到人的情况。"
                    }
                  </p>
                </div>
              </article>

              <article className="team-card reveal">
                <img
                  className="img-fill"
                  src="/images/team-tutor.webp"
                  alt="辅导老师团队照片"
                  loading="lazy"
                />
                <div className="team-card__body">
                  <div className="team-card__head">
                    <h3>{"后端辅导老师团队"}</h3>
                    <span className="tag tag--accent">{"20人+"}</span>
                  </div>
                  <p>
                    {
                      "分别负责不同专业方向，工科为主（机械、土木、计算机、电子、化工等），也覆盖文科、理科、艺术类。每位老师都经过严格筛选、有多年辅导经验，同时跟进的订单数量有上限，保证做好每一篇。"
                    }
                  </p>
                </div>
              </article>

              <article className="team-card reveal">
                <img
                  className="img-fill"
                  src="/images/team-audit.webp"
                  alt="审核团队照片"
                  loading="lazy"
                />
                <div className="team-card__body">
                  <div className="team-card__head">
                    <h3>{"质量审核团队"}</h3>
                    <span className="tag tag--accent">{"5人+"}</span>
                  </div>
                  <p>
                    {
                      "负责三级审核中的交叉审核和最终抽检。每一篇论文交付前，都要经过辅导老师自审、交叉审核、主理人抽检三道关卡。审核团队独立于写作团队，保证审核的客观性和严格性。"
                    }
                  </p>
                </div>
              </article>

              <article className="team-card reveal">
                <img
                  className="img-fill"
                  src="/images/team-parttime.webp"
                  alt="兼职老师工作照"
                  loading="lazy"
                />
                <div className="team-card__body">
                  <div className="team-card__head">
                    <h3>{"兼职设计师和辅导助理"}</h3>
                    <span className="tag tag--accent">{"10人+"}</span>
                  </div>
                  <p>
                    {
                      "旺季的时候会有10位以上长期合作的兼职老师帮忙，都是经过考核的，质量有保障。兼职老师只负责辅助工作，核心内容由全职辅导老师把控。"
                    }
                  </p>
                </div>
              </article>
            </div>

            <div className="team-note reveal">
              <h3>
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-users"></use>
                </svg>
                {"管理模式：师傅带徒弟"}
              </h3>
              <p>
                {
                  "我们的管理模式是「师傅带徒弟」——每位新加入的辅导老师，都会由资深老师带一段时间，熟悉我们的标准和流程后才能独立接单。这样保证了每一篇论文的质量都在同一水平线上，不会出现有的老师做得好、有的老师做得差的情况。"
                }
              </p>
            </div>
          </div>
        </section>

        <section className="section section--gray" id="office">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-tag">{"办公环境"}</span>
              <h2>{"正规公司，每天都在线"}</h2>
              <p className="section-desc">
                {
                  "前端客服10人以上坐班，每天9:00-22:00在线，答辩旺季延长到24:00——你的消息2小时内肯定有人回。"
                }
              </p>
            </div>
            <div className="office-grid reveal-group">
              <img
                className="img-fill reveal"
                src="/images/office-01.webp"
                alt="办公环境照片1"
                loading="lazy"
              />

              <img
                className="img-fill reveal"
                src="/images/office-02.webp"
                alt="办公环境照片2"
                loading="lazy"
              />

              <img
                className="img-fill reveal"
                src="/images/office-03.webp"
                alt="办公环境照片3"
                loading="lazy"
              />

              <img
                className="img-fill reveal"
                src="/images/office-04.webp"
                alt="办公环境照片4"
                loading="lazy"
              />
            </div>

            <div className="ab-office-mini reveal-group">
              <img
                className="reveal"
                src="/images/office/o-009.webp"
                alt="知瑜网络工作室环境实拍"
                loading="lazy"
              />
              <img
                className="reveal"
                src="/images/office/o-004.webp"
                alt="知瑜网络工作室环境实拍"
                loading="lazy"
              />
              <img
                className="reveal"
                src="/images/office/o-007.webp"
                alt="知瑜网络工作室环境实拍"
                loading="lazy"
              />
              <img
                className="reveal"
                src="/images/office/o-001.webp"
                alt="知瑜网络工作室环境实拍"
                loading="lazy"
              />
              <img
                className="reveal"
                src="/images/office/o-002.webp"
                alt="知瑜网络工作室环境实拍"
                loading="lazy"
              />
              <img
                className="reveal"
                src="/images/office/o-003.webp"
                alt="知瑜网络工作室环境实拍"
                loading="lazy"
              />
              <img
                className="reveal"
                src="/images/office/o-005.webp"
                alt="知瑜网络工作室环境实拍"
                loading="lazy"
              />
              <img
                className="reveal"
                src="/images/office/o-006.webp"
                alt="知瑜网络工作室环境实拍"
                loading="lazy"
              />
              <img
                className="reveal"
                src="/images/office/o-008.webp"
                alt="知瑜网络工作室环境实拍"
                loading="lazy"
              />
            </div>

            <figure className="ab-ship-figure reveal">
              <img
                src="/images/cases/mcu/mcu-11.webp"
                alt="待交付的单片机实物作品"
                loading="lazy"
              />
              <figcaption>{"待交付的单片机实物作品，按编号打包"}</figcaption>
            </figure>
          </div>
        </section>

        <section className="section" id="philosophy">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-tag">{"我们的服务理念"}</span>
              <h2>{"六年了，这几个原则没变过"}</h2>
              <p className="section-desc">
                {"不喊口号，都是六年一单一单做出来的体会。"}
              </p>
            </div>
            <div className="philosophy-grid reveal-group">
              <article className="philosophy-card reveal">
                <span className="philosophy-card__num" aria-hidden="true">
                  {"01"}
                </span>
                <svg className="icon quote-icon" aria-hidden="true">
                  <use href="#icon-quote"></use>
                </svg>
                <h3>{"我们是和你一条战线的"}</h3>
                <blockquote>
                  <p>
                    {
                      "你的对手是论文要求和导师审核，不是我们。我们会尽全力帮你，但论文最终是你的，答辩也是你上，我们能做的是帮你把内容和格式做到位，让你心里有底。"
                    }
                  </p>
                </blockquote>
              </article>
              <article className="philosophy-card reveal">
                <span className="philosophy-card__num" aria-hidden="true">
                  {"02"}
                </span>
                <svg className="icon quote-icon" aria-hidden="true">
                  <use href="#icon-quote"></use>
                </svg>
                <h3>{"不画饼、不乱承诺"}</h3>
                <blockquote>
                  <p>
                    {
                      "说「百分百保证通过」的都是骗你的，最终能不能通过受很多因素影响。我们能保证的是内容和格式做到符合学校要求，帮你准备答辩问题和回答思路，只要你自己上点心、答辩别太紧张，通过没问题。往年我们辅导的学员通过率在95%以上。"
                    }
                  </p>
                </blockquote>
              </article>
              <article className="philosophy-card reveal">
                <span className="philosophy-card__num" aria-hidden="true">
                  {"03"}
                </span>
                <svg className="icon quote-icon" aria-hidden="true">
                  <use href="#icon-quote"></use>
                </svg>
                <h3>{"规模不小但管理精细，不做流水线"}</h3>
                <blockquote>
                  <p>
                    {
                      "我们每年承接5000单以上，但从来不搞流水线批量生产。每一位辅导老师同时跟进的订单数量是有限的，保证有足够的时间和精力做好每一篇。旺季的时候我们会控制接单量，宁可不接也不粗制滥造。"
                    }
                  </p>
                </blockquote>
              </article>
              <article className="philosophy-card reveal">
                <span className="philosophy-card__num" aria-hidden="true">
                  {"04"}
                </span>
                <svg className="icon quote-icon" aria-hidden="true">
                  <use href="#icon-quote"></use>
                </svg>
                <h3>{"口碑比什么都重要"}</h3>
                <blockquote>
                  <p>
                    {
                      "我们的客户很大一部分是老客户推荐来的。这六年能做下来，靠的不是广告，是一届一届学生口口相传。所以我们特别在意每一位客户的体验，能帮的一定帮，能解决的一定解决。"
                    }
                  </p>
                </blockquote>
              </article>
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
                <h2>{"想聊聊你的论文？联系码在你的宣传单上"}</h2>
                <p>
                  {
                    "把学校要求、专业、时间告诉我们，当天就能给你出方案和报价。工作时间每天9:00到22:00，消息2小时内肯定回，咨询不收费、不催单。"
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
                    {"\n                扫码聊聊我的论文\n              "}
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

        <section className="section" id="anti-fake" style={{ paddingTop: "0" }}>
          <div className="container">
            <div className="ab-anti-fake reveal">
              <h2>
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-shield"></use>
                </svg>
                {"防伪声明"}
              </h2>
              <p>
                {
                  "本站为知瑜网络唯一官方展示网站。近期发现个别同行盗用本站页面与案例图片对外宣传，请认准本站域名与官方微信二维码，谨防受骗。"
                }
              </p>
            </div>
          </div>
        </section>
      </main>
    </FaqProvider>
  );
}
