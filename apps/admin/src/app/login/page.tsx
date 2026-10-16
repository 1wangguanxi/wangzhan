"use client";
import { useState, type FormEvent } from "react";
import { api } from "@/lib/client";
import { Icon } from "@/components/icon";
export default function Login() {
  const [pending, setPending] = useState(false),
    [error, setError] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await api("login", { method: "POST", body: JSON.stringify(data) });
      window.location.assign("/");
    } catch (e) {
      setError(e instanceof Error ? e.message : "登录失败");
    } finally {
      setPending(false);
    }
  }
  return (
    <main className="login-page">
      <div className="login-story">
        <div className="brand">
          <span className="brand-symbol">
            <img
              src="/images/zhiyu-logo.png"
              alt="知瑜 ZHIYU NETWORK"
              width="435"
              height="277"
            />
          </span>
          <span>
            知瑜网络<small>ZHIYU NETWORK</small>
          </span>
        </div>
        <div>
          <p className="eyebrow">YOUR BUSINESS, AT A GLANCE</p>
          <h1>
            看见数据，
            <br />
            连接每一次机会。
          </h1>
          <p>
            从资源到客户，从访问到转化。
            <br />
            让日常运营清晰、有序、可追踪。
          </p>
          <div className="login-graphic">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <small>知瑜网络 · 运营管理工作台</small>
      </div>
      <section className="login-side">
        <form className="login-form" onSubmit={submit}>
          <span className="login-icon">
            <Icon name="overview" size={26} />
          </span>
          <h2>欢迎回来</h2>
          <p>登录运营后台，查看网站的最新动态。</p>
          <label>
            管理员邮箱
            <input
              name="email"
              type="email"
              autoComplete="username"
              placeholder="请输入管理员邮箱"
              required
            />
          </label>
          <label>
            密码
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              minLength={12}
              maxLength={72}
              placeholder="请输入登录密码"
              required
            />
          </label>
          {error && (
            <p role="alert" className="error">
              {error}
            </p>
          )}
          <button className="button primary" disabled={pending}>
            {pending ? "正在登录…" : "登录管理后台"}
            <Icon name="arrow" size={18} />
          </button>
          <p className="login-hint">
            管理员账号由本地初始化命令创建。
            <br />
            首次登录凭据见项目的 .runtime 目录。
          </p>
        </form>
      </section>
    </main>
  );
}
