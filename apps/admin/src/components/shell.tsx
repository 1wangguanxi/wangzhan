"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AdminUser } from "@zhiyu/admin-contracts";
import { Icon } from "./icon";
import { api } from "@/lib/client";
import { useState } from "react";
const links = [
  ["/", "overview", "数据概览"],
  ["/customers", "users", "客户与留言"],
  ["/resources", "image", "资源管理"],
  ["/activity", "activity", "操作记录"],
  ["/settings", "settings", "账户设置"],
];
export function Shell({
  user,
  children,
}: {
  user: AdminUser;
  children: React.ReactNode;
}) {
  const path = usePathname();
  const [error, setError] = useState("");
  return (
    <div className="console">
      <aside className="sidebar">
        <Link className="brand" href="/">
          <span className="brand-symbol">
            <img
              src="/images/zhiyu-logo.png"
              alt="知瑜 ZHIYU NETWORK"
              width="435"
              height="277"
            />
          </span>
          <span>
            知瑜网络<small>运营管理工作台</small>
          </span>
        </Link>
        <div className="workspace">
          <span className="workspace-dot" />
          知瑜官方网站 <span className="env">LOCAL</span>
        </div>
        <p className="nav-label">工作空间</p>
        <nav>
          {links.map(([href, icon, label]) => (
            <Link
              key={href}
              href={href}
              className={path === href ? "nav-item active" : "nav-item"}
            >
              <Icon name={icon} />
              {label}
              {path === href && <span className="nav-dot" />}
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="support">
            <Icon name="activity" />
            <b>让每一次访问都有价值</b>
            <p>真实数据，连接业务增长。</p>
          </div>
          <a
            className="nav-item"
            href={process.env.NEXT_PUBLIC_SITE_URL || "http://127.0.0.1:3000"}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="external" />
            查看官方网站
          </a>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <span>
            工作空间 <span className="slash">/</span>{" "}
            <strong>{links.find((l) => l[0] === path)?.[2]}</strong>
          </span>
          <div className="account">
            <span className="timezone">北京时间 UTC+8</span>
            <span className="avatar">{user.name[0]}</span>
            <span>{user.name}</span>
            <button
              className="icon-button"
              title="退出登录"
              onClick={async () => {
                try {
                  await api("logout", { method: "POST", body: "{}" });
                  window.location.assign("/login");
                } catch (e) {
                  setError(String(e));
                }
              }}
            >
              <Icon name="logout" size={17} />
            </button>
          </div>
        </header>
        <main className="main">
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          {children}
          <footer className="page-footer">
            知瑜网络 · 运营管理系统<span>数据仅限授权人员访问</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
