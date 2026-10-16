// Recovered from the public contact.html; editable React server view.
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
        <section className="page-hero">
          <div
            className="hero__deco hero__deco--circle1"
            aria-hidden="true"
          ></div>
          <div className="hero__deco hero__deco--ring" aria-hidden="true"></div>
          <div className="container">
            <h1>{"联系我们"}</h1>
            <p className="page-hero__sub">
              {
                "咨询不收费、不催单，随便问。扫宣传单（宣传页）上的联系码直接聊，或者留个言——工作时间 2 小时内必回。"
              }
            </p>
          </div>
        </section>

        <section className="section" id="contact-main">
          <div className="container">
            <div className="contact-grid">
              <div>
                <div className="qr-card reveal">
                  <img
                    src="/images/zhiyu-qrcode.png"
                    alt="知瑜网络自媒体账号整合展示二维码"
                    width="200"
                    height="200"
                    loading="lazy"
                  />
                  <p className="qr-card__tip">{"知瑜网络 · 自媒体矩阵"}</p>
                  <p className="qr-card__sub">{"各大平台账号 · 一站直达"}</p>
                </div>
                <p
                  className="reveal"
                  style={{
                    marginTop: "14px",
                    fontSize: "1.05rem",
                    fontWeight: "700",
                    color: "#133F66",
                    lineHeight: "1.7",
                  }}
                >
                  {"此码为自媒体账号整合展示码，仅作公开展示"}
                  <br />
                  <span
                    style={{
                      fontSize: ".88rem",
                      fontWeight: "400",
                      color: "#5a6a7d",
                    }}
                  >
                    {"咨询、下单请扫宣传单（宣传页）上的联系二维码"}
                  </span>
                </p>
                <ul className="contact-info reveal">
                  <li>
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-chat"></use>
                    </svg>
                    <div>
                      <p className="info-title">{"咨询方式"}</p>
                      <p className="info-desc">
                        {
                          "扫宣传单（宣传页）上的联系二维码添加，说说你的专业、学校要求、时间，当天出方案和报价"
                        }
                      </p>
                    </div>
                  </li>
                  <li>
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-clock"></use>
                    </svg>
                    <div>
                      <p className="info-title">{"工作时间"}</p>
                      <p className="info-desc">
                        {
                          "每天 9:00 - 22:00，答辩旺季（2月15日—5月20日）延长营业到 24:00"
                        }
                      </p>
                    </div>
                  </li>
                  <li>
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-users"></use>
                    </svg>
                    <div>
                      <p className="info-title">{"服务区域"}</p>
                      <p className="info-desc">
                        {"全国线上服务，不用见面，全程在专属服务群里推进"}
                      </p>
                    </div>
                  </li>
                  <li>
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-headset"></use>
                    </svg>
                    <div>
                      <p className="info-title">{"响应承诺"}</p>
                      <p className="info-desc">
                        {
                          "工作时间 2 小时内必回，看到先回一句「收到」，不让你等"
                        }
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="contact-form-card reveal">
                <h2>{"在线留言"}</h2>
                <p className="form-desc">
                  {"不方便扫码？留个言，顾问会在工作时间 2 小时内联系你。带 "}
                  <span style={{ color: "var(--c-accent)" }}>{"*"}</span>
                  {" 的是必填项。"}
                </p>
                <ContactForm />

                <div className="ct-welfare reveal">
                  <h3>
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-tag"></use>
                    </svg>
                    {"加好友福利"}
                  </h3>
                  <ul>
                    <li>
                      <b>{"①"}</b>
                      <span>{"加好友即送：免费选题建议一次"}</span>
                    </li>
                    <li>
                      <b>{"②"}</b>
                      <span>
                        {"推荐2位好友添加：再赠开题报告/任务书/大纲（三选一）"}
                      </span>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="btn btn--accent"
                    data-open-modal="qrcode-modal"
                  >
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-chat"></use>
                    </svg>
                    {"\n                扫宣传单联系码领取\n              "}
                  </button>
                  <p
                    style={{
                      fontSize: ".8rem",
                      color: "#5a6a7d",
                      marginTop: "10px",
                    }}
                  >
                    {"注：本站二维码为自媒体账号整合展示码，仅作公开展示"}
                  </p>
                </div>

                <p className="ct-flyer reveal">
                  {
                    "从传单看到我们？直接扫传单上的代理二维码，报「传单」二字优先接待"
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--gray" id="quick-links">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-tag">{"先看答案"}</span>
              <h2>{"大家最常问的 4 个问题"}</h2>
              <p className="section-desc">{"点开就有答案，不用等我们回复。"}</p>
            </div>
            <div className="quick-links reveal-group">
              <a className="quick-link reveal" href="/faq.html#service">
                {"\n            是全包吗？\n            "}
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-arrow-right"></use>
                </svg>
              </a>
              <a className="quick-link reveal" href="/faq.html#price">
                {"\n            怎么收费？\n            "}
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-arrow-right"></use>
                </svg>
              </a>
              <a className="quick-link reveal" href="/faq.html#service">
                {"\n            多久能写完？\n            "}
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-arrow-right"></use>
                </svg>
              </a>
              <a className="quick-link reveal" href="/faq.html#privacy">
                {"\n            怎么保密？\n            "}
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-arrow-right"></use>
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
    </FaqProvider>
  );
}
