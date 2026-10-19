import { Counter } from "@/components/counter";
import { ReviewList } from "@/features/reviews";
import type { Catalog } from "@/content/types";
export default function ReviewsPage({ catalog }: { catalog: Catalog }) {
  return (
    <main>
      <section className="rev-hero">
        <div className="container">
          <h1>
            {"他们都已经"}
            <span className="rev-hl">{"顺利毕业"}</span>
          </h1>
          <p className="rev-hero__sub">
            {
              "六年口碑，每年辅导 5000+ 订单，辅导后通过率 95% 以上。以下评价与截图均已脱敏处理，不披露任何客户真实信息。"
            }
          </p>
          <div className="rev-hero__stats">
            <div className="rev-stat">
              <div className="stat-num">
                <Counter target={6} suffix="" className="num" />
                <span className="stat-suffix">{"年"}</span>
              </div>
              <div className="stat-label">{"深耕论文辅导"}</div>
            </div>
            <div className="rev-stat">
              <div className="stat-num">
                <Counter target={5000} suffix="" className="num" />
                <span className="stat-suffix">{"+"}</span>
              </div>
              <div className="stat-label">{"每年辅导订单"}</div>
            </div>
            <div className="rev-stat">
              <div className="stat-num">
                <Counter target={95} suffix="" className="num" />
                <span className="stat-suffix">{"%+"}</span>
              </div>
              <div className="stat-label">{"辅导后通过率"}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="reviews">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-tag">{"客户好评"}</span>
            <h2>{"12 条辅导反馈，看看有没有和你一样的情况"}</h2>
            <p className="section-desc">
              {
                "以下均为脱敏后的客户反馈，署名不含真实姓名与学校，头像为虚拟标识。"
              }
            </p>
          </div>
          <ReviewList items={catalog.reviews} />
        </div>
      </section>

      <section className="section section--gray" id="proof">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-tag">{"结果佐证"}</span>
            <h2>{"查重/AI检测，辅导后轻松达标"}</h2>
            <p className="section-desc">
              {
                "定稿后按学校要求查重、AI检测达标，以下为客户反馈的部分报告截图，点击缩略图可查看大图。"
              }
            </p>
          </div>
          <div className="rev-shots reveal-group">
            <a
              aria-label="查看查重报告截图大图"
              className="rev-shot reveal"
              href="/images/check/c-001.webp"
              rel="noopener"
              target="_blank"
            >
              <img
                src="/images/check/c-001_t.webp"
                alt="查重报告截图（已脱敏）"
                width="600"
                height="600"
                loading="lazy"
              />
              <span className="rev-shot__cap">
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-image"></use>
                </svg>
                {"点击查看大图"}
              </span>
            </a>
            <a
              aria-label="查看查重报告截图大图"
              className="rev-shot reveal"
              href="/images/check/c-002.webp"
              rel="noopener"
              target="_blank"
            >
              <img
                src="/images/check/c-002_t.webp"
                alt="查重报告截图（已脱敏）"
                width="600"
                height="600"
                loading="lazy"
              />
              <span className="rev-shot__cap">
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-image"></use>
                </svg>
                {"点击查看大图"}
              </span>
            </a>
            <a
              aria-label="查看查重报告截图大图"
              className="rev-shot reveal"
              href="/images/check/c-003.webp"
              rel="noopener"
              target="_blank"
            >
              <img
                src="/images/check/c-003_t.webp"
                alt="查重报告截图（已脱敏）"
                width="600"
                height="600"
                loading="lazy"
              />
              <span className="rev-shot__cap">
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-image"></use>
                </svg>
                {"点击查看大图"}
              </span>
            </a>
            <a
              aria-label="查看AI检测报告截图大图"
              className="rev-shot reveal"
              href="/images/check/c-007.webp"
              rel="noopener"
              target="_blank"
            >
              <img
                src="/images/check/c-007_t.webp"
                alt="AI检测报告截图（已脱敏）"
                width="600"
                height="600"
                loading="lazy"
              />
              <span className="rev-shot__cap">
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-image"></use>
                </svg>
                {"点击查看大图"}
              </span>
            </a>
            <a
              aria-label="查看查重报告截图大图"
              className="rev-shot reveal"
              href="/images/check/c-009.webp"
              rel="noopener"
              target="_blank"
            >
              <img
                src="/images/check/c-009_t.webp"
                alt="查重报告截图（已脱敏）"
                width="600"
                height="600"
                loading="lazy"
              />
              <span className="rev-shot__cap">
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-image"></use>
                </svg>
                {"点击查看大图"}
              </span>
            </a>
            <a
              aria-label="查看AI检测报告截图大图"
              className="rev-shot reveal"
              href="/images/check/c-012.webp"
              rel="noopener"
              target="_blank"
            >
              <img
                src="/images/check/c-012_t.webp"
                alt="AI检测报告截图（已脱敏）"
                width="600"
                height="600"
                loading="lazy"
              />
              <span className="rev-shot__cap">
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-image"></use>
                </svg>
                {"点击查看大图"}
              </span>
            </a>
            <a
              aria-label="查看查重报告截图大图"
              className="rev-shot reveal"
              href="/images/check/c-017.webp"
              rel="noopener"
              target="_blank"
            >
              <img
                src="/images/check/c-017_t.webp"
                alt="查重报告截图（已脱敏）"
                width="600"
                height="600"
                loading="lazy"
              />
              <span className="rev-shot__cap">
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-image"></use>
                </svg>
                {"点击查看大图"}
              </span>
            </a>
            <a
              aria-label="查看AI检测报告截图大图"
              className="rev-shot reveal"
              href="/images/check/c-019.webp"
              rel="noopener"
              target="_blank"
            >
              <img
                src="/images/check/c-019_t.webp"
                alt="AI检测报告截图（已脱敏）"
                width="600"
                height="600"
                loading="lazy"
              />
              <span className="rev-shot__cap">
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-image"></use>
                </svg>
                {"点击查看大图"}
              </span>
            </a>
            <a
              aria-label="查看查重报告截图大图"
              className="rev-shot reveal"
              href="/images/check/c-004.webp"
              rel="noopener"
              target="_blank"
            >
              <img
                src="/images/check/c-004_t.webp"
                alt="知网AIGC检测报告（已脱敏）"
                width="600"
                height="600"
                loading="lazy"
              />
              <span className="rev-shot__cap">
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-image"></use>
                </svg>
                {"点击查看大图"}
              </span>
            </a>
            <a
              aria-label="查看查重报告截图大图"
              className="rev-shot reveal"
              href="/images/check/c-013.webp"
              rel="noopener"
              target="_blank"
            >
              <img
                src="/images/check/c-013_t.webp"
                alt="万方检测报告（已脱敏）"
                width="600"
                height="600"
                loading="lazy"
              />
              <span className="rev-shot__cap">
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-image"></use>
                </svg>
                {"点击查看大图"}
              </span>
            </a>
            <a
              aria-label="查看查重报告截图大图"
              className="rev-shot reveal"
              href="/images/check/c-016.webp"
              rel="noopener"
              target="_blank"
            >
              <img
                src="/images/check/c-016_t.webp"
                alt="万方检测报告（已脱敏）"
                width="600"
                height="600"
                loading="lazy"
              />
              <span className="rev-shot__cap">
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-image"></use>
                </svg>
                {"点击查看大图"}
              </span>
            </a>
          </div>
          <p className="rev-privacy reveal">
            <svg className="icon" aria-hidden="true">
              <use href="#icon-lock"></use>
            </svg>
            <span>
              {
                "为保护客户隐私、防止信息泄露，本页面仅展示部分设计截图，不披露客户真实信息。"
              }
            </span>
          </p>
        </div>
      </section>

      <section className="section" id="gift">
        <div className="container">
          <div className="rev-gift reveal">
            <span className="rev-gift__badge">{"限时福利"}</span>
            <h2>{"加好友，免费送选题建议"}</h2>
            <div className="rev-gift__rule">
              {"\n            扫宣传单（宣传页）上的联系码添加咨询号即送 "}
              <strong>{"免费选题建议"}</strong>
              {"；推荐 "}
              <strong>{"2 位好友"}</strong>
              {"添加，再赠 "}
              <strong>{"开题报告 / 任务书 / 大纲"}</strong>
              {" 指导（三选一）。\n          "}
            </div>
            <p>
              {
                "还没定题、开题没思路的同学先来领一份，咨询不收费、不催单。工作时间每天 9:00 - 22:00，消息 2 小时内回复。"
              }
            </p>
            <button
              type="button"
              className="btn rev-btn-gold btn--lg"
              data-open-modal="qrcode-modal"
            >
              <svg className="icon" aria-hidden="true">
                <use href="#icon-chat"></use>
              </svg>
              {"\n            扫宣传单联系码，领选题建议\n          "}
            </button>
            <p style={{ fontSize: ".8rem", opacity: ".85", marginTop: "10px" }}>
              {"注：本站二维码为自媒体账号整合展示码，仅作公开展示"}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
