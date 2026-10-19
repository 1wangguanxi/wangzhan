import { useState } from "react";
import { Icon } from "./icon";
const links = [
  ["index", "首页"],
  ["services", "服务介绍"],
  ["process", "服务流程"],
  ["about", "关于我们"],
  ["cases", "成功案例"],
  ["reviews", "客户好评"],
  ["faq", "常见问题"],
  ["contact", "联系我们"],
];
export function Header({ page }: { page: string }) {
  const [open, setOpen] = useState(false);
  const nav = (
    <ul>
      {links.map(([id, label]) => (
        <li key={id}>
          <a
            data-page={id}
            href={`/${id}.html`}
            className={page === id ? "is-active" : undefined}
            aria-current={page === id ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
  return (
    <header className="site-header">
      <div className="container">
        <a className="brand" href="/index.html" aria-label="知瑜网络 首页">
          <span className="brand-logo">
            <img
              src="/images/zhiyu-logo.png"
              alt="知瑜 ZHIYU NETWORK"
              width="435"
              height="277"
            />
          </span>
          <span className="brand-text">
            <span className="brand-name">知瑜网络</span>
            <span className="brand-sub">毕业论文辅导</span>
          </span>
        </a>
        <nav className="main-nav" aria-label="主导航">
          {nav}
        </nav>
        <button
          className="btn btn--accent btn--sm header-cta"
          data-open-modal="qrcode-modal"
        >
          <Icon name="chat" />
          关注我们
        </button>
        <button
          className={`nav-toggle${open ? " is-open" : ""}`}
          aria-label="打开菜单"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </div>
      <nav
        className={`mobile-nav${open ? " is-open" : ""}`}
        id="mobile-nav"
        aria-label="移动端导航"
      >
        {nav}
        <div style={{ padding: "0 16px 16px" }}>
          <button className="btn btn--accent" data-open-modal="qrcode-modal">
            <Icon name="chat" />
            关注我们
          </button>
        </div>
      </nav>
    </header>
  );
}
