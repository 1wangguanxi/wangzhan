// Recovered from the public cases.html; editable React server view.
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
        <section className="hero cases-hero">
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
                {"成功案例 · 辅导后通过率95%以上"}
              </p>
              <h1>
                {"他们都"}
                <span className="hl">{"顺利毕业了"}</span>
              </h1>
              <p className="hero__sub">
                {
                  "以下为脱敏后的示例案例，展示各专业常见的辅导方式和结果。工科为主，文科、理科、艺术类全覆盖——你的专业我们也有把握。"
                }
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="cases">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-tag">{"真实辅导案例"}</span>
              <h2>{"138 个真实辅导案例，覆盖七大专业类"}</h2>
              <p className="section-desc">
                {
                  "单片机 / PLC / 机械 / 计算机 / 仿真建模 / 土木 / 艺术设计，点击案例卡可左右翻看更多截图。本页所有案例图片均为知瑜网络辅导项目原创素材，已做脱敏处理，不披露客户真实信息，盗图必究。"
                }
              </p>
            </div>

            <CaseGallery items={catalog.cases}>
              <p
                style={{
                  textAlign: "center",
                  margin: "28px 0 0",
                  color: "#5a6a7d",
                  fontSize: ".95rem",
                }}
              >
                {"你的专业或题目不在上面？每个大类都有更多存货——\n        "}
                <a
                  data-open-modal="qrcode-modal"
                  href="#"
                  style={{
                    color: "#133F66",
                    fontWeight: "600",
                    textDecoration: "underline",
                  }}
                >
                  {"扫宣传单上的联系码加好友，发你同专业案例"}
                </a>
              </p>
              <div className="cases-empty" id="cases-empty" role="status">
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-doc"></use>
                </svg>
                <p>
                  {"该分类暂无公开案例。为保护客户隐私，很多案例未做展示，"}
                  <br />
                  {"你的专业我们大概率也做过，扫码问问就知道了。"}
                </p>
                <button
                  type="button"
                  className="btn btn--accent"
                  data-open-modal="qrcode-modal"
                >
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-chat"></use>
                  </svg>
                  {"\n            扫码问一句：我的专业能做吗\n          "}
                </button>
              </div>
            </CaseGallery>
          </div>
        </section>

        <section className="section section--tint" id="schools">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-tag">{"合作院校展示"}</span>
              <h2>{"业务覆盖全国 100+ 院校"}</h2>
              <p className="section-desc">
                {
                  "承接大量院校毕业设计辅导。仅展示部分合作院校封面，大量案例因客户隐私不予展示。点击封面可放大查看。"
                }
              </p>
            </div>
            <SchoolGallery items={catalog.schools} />
            <p className="schools-note">
              {
                "为保护客户隐私、防止信息泄露，本页面仅展示部分设计截图，不披露客户真实信息。"
              }
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
                <h2>{"你的专业我们也有把握，扫宣传单联系码聊聊"}</h2>
                <p>
                  {
                    "工科为主，文科、理科、艺术类都接过。把你的专业、学校要求、时间告诉我们，当天出方案和报价，咨询不收费、不催单。"
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
                    {"\n                扫码问我的专业能不能做\n              "}
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
