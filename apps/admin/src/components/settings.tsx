"use client";
import { useEffect, useState, type FormEvent } from "react";
import type { Audit } from "@zhiyu/admin-contracts";
import { api, dateTime } from "@/lib/client";
import { Heading, Empty } from "./shared";
import { Icon } from "./icon";
const actions: Record<string, string> = {
  login: "登录后台",
  password_change: "修改密码",
  inquiry_update: "更新客户资料",
  asset_update: "更新资源资料",
  asset_upload: "上传资源",
};
export function Activity() {
  const [data, setData] = useState<Audit[] | null>(null),
    [error, setError] = useState(""),
    [version, setVersion] = useState(0);
  useEffect(() => {
    const c = new AbortController();
    api<Audit[]>("audit", { signal: c.signal })
      .then((d) => {
        setData(d);
        setError("");
      })
      .catch((e) => {
        if (!c.signal.aborted) setError(e.message);
      });
    return () => c.abort();
  }, [version]);
  return (
    <>
      <Heading
        eyebrow="ACTIVITY LOG"
        title="操作记录"
        description="记录管理操作与执行人，方便追踪重要变更。"
      >
        <button className="button" onClick={() => setVersion((v) => v + 1)}>
          <Icon name="refresh" size={16} />
          刷新
        </button>
      </Heading>
      <section className="panel">
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        {data?.length ? (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>操作人</th>
                  <th>操作</th>
                  <th>对象</th>
                  <th>时间</th>
                </tr>
              </thead>
              <tbody>
                {data.map((a) => (
                  <tr key={a.id}>
                    <td>{a.actor}</td>
                    <td>{actions[a.action] || a.action}</td>
                    <td>{a.subject}</td>
                    <td className="muted">{dateTime(a.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="footnote table-note">
              显示最近 100 条操作。日志不记录密码或客户留言正文。
            </p>
          </div>
        ) : (
          <Empty text={data ? "暂无操作记录" : "正在加载记录"} />
        )}
      </section>
    </>
  );
}
export function Settings() {
  const [error, setError] = useState(""),
    [pending, setPending] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    if (d.get("next") !== d.get("confirm")) {
      setError("两次输入的新密码不一致");
      return;
    }
    setPending(true);
    setError("");
    try {
      await api("password", {
        method: "POST",
        body: JSON.stringify({ old: d.get("old"), next: d.get("next") }),
      });
      window.location.assign("/login");
    } catch (e) {
      setError(e instanceof Error ? e.message : "保存失败");
    } finally {
      setPending(false);
    }
  }
  return (
    <>
      <Heading
        eyebrow="ACCOUNT"
        title="账户设置"
        description="管理登录凭据，保护客户和运营数据。"
      />
      <section className="panel settings-panel">
        <div className="panel-title">
          <div>
            <h2>修改登录密码</h2>
            <p>修改后所有现有会话将退出，请使用新密码登录。</p>
          </div>
        </div>
        <form className="editor" onSubmit={submit}>
          <label>
            当前密码
            <input
              type="password"
              name="old"
              autoComplete="current-password"
              required
              maxLength={72}
            />
          </label>
          <label>
            新密码
            <input
              type="password"
              name="next"
              autoComplete="new-password"
              required
              minLength={12}
              maxLength={72}
              placeholder="至少 12 个字符"
            />
          </label>
          <label>
            确认新密码
            <input
              type="password"
              name="confirm"
              autoComplete="new-password"
              required
              minLength={12}
              maxLength={72}
            />
          </label>
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          <button className="button primary" disabled={pending}>
            {pending ? "正在修改…" : "更新密码"}
          </button>
        </form>
      </section>
      <section className="panel settings-panel policy">
        <h2>统计与数据说明</h2>
        <p>
          联系表单成功入库即为一次转化；相同提交标识的重试不重复统计。客户跟进状态仅用于业务管理。
        </p>
        <p>
          原始访问事件保存 90 天，后台支持近 24 小时、7 天和 30
          天统计。客户留言及资源元数据持续保存在 PostgreSQL。
        </p>
        <p>
          匿名会话标识不跨设备识别人，不记录表单输入作为点击数据。访客禁用脚本、网络失败或拦截统计会导致访问数据少于实际值。
        </p>
      </section>
    </>
  );
}
