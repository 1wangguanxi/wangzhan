export function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <a
                aria-label="知瑜网络 首页"
                className="brand"
                href="/index.html"
              >
                <span className="brand-logo">
                  <img
                    src="/images/zhiyu-logo.png"
                    alt="知瑜 ZHIYU NETWORK"
                    width="435"
                    height="277"
                  />
                </span>
                <span className="brand-text">
                  <span className="brand-name">{"知瑜网络"}</span>
                  <span className="brand-sub">{"毕业论文辅导"}</span>
                </span>
              </a>
              <p>
                {
                  "2020年成立的毕业论文/设计辅导公司，40人以上专业团队，每年承接5000单以上。让学生少走弯路、少熬夜、顺顺利利毕业。"
                }
              </p>
            </div>

            <nav className="footer-col" aria-label="页脚导航">
              <h3>{"快速导航"}</h3>
              <ul>
                <li>
                  <a href="/index.html">{"首页"}</a>
                </li>
                <li>
                  <a href="/services.html">{"服务介绍"}</a>
                </li>
                <li>
                  <a href="/process.html">{"服务流程"}</a>
                </li>
                <li>
                  <a href="/about.html">{"关于我们"}</a>
                </li>
                <li>
                  <a href="/cases.html">{"成功案例"}</a>
                </li>
                <li>
                  <a href="/faq.html">{"常见问题"}</a>
                </li>
                <li>
                  <a href="/contact.html">{"联系我们"}</a>
                </li>
              </ul>
            </nav>

            <nav className="footer-col" aria-label="服务项目">
              <h3>{"服务项目"}</h3>
              <ul>
                <li>
                  <a href="/services.html#topic">{"选题指导"}</a>
                </li>
                <li>
                  <a href="/services.html#proposal">{"开题报告"}</a>
                </li>
                <li>
                  <a href="/services.html#writing">{"正文辅导"}</a>
                </li>
                <li>
                  <a href="/services.html#plagiarism">{"查重降重"}</a>
                </li>
                <li>
                  <a href="/services.html#format">{"格式排版"}</a>
                </li>
                <li>
                  <a href="/services.html#defense">{"答辩准备"}</a>
                </li>
              </ul>
            </nav>

            <div className="footer-col">
              <h3>{"联系方式"}</h3>
              <ul className="footer-contact">
                <li>
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-chat"></use>
                  </svg>
                  <span>
                    {"自媒体账号整合展示码 · 咨询请扫宣传单上的联系码"}
                  </span>
                </li>
                <li>
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-clock"></use>
                  </svg>
                  <span>
                    {"工作时间：每天 9:00 - 22:00"}
                    <br />
                    {"答辩旺季（2月15日—5月20日）延长营业到 24:00"}
                  </span>
                </li>
              </ul>
              <img
                className="footer-qrcode"
                src="/images/zhiyu-qrcode.png"
                alt="知瑜网络自媒体账号整合展示二维码"
                width="96"
                height="96"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="footer-bar">
          <div className="container">
            <p>{"© 2020-2026 知瑜网络 版权所有"}</p>

            <p>{"辽ICP备XXXXXXXX号"}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
