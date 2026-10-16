"use client";
import { useEffect, useState, type FormEvent } from "react";
import type { Inquiry, Page } from "@zhiyu/admin-contracts";
import { api, dateTime } from "@/lib/client";
import { Heading, Empty, Pager, Dialog } from "./shared";
import { Icon } from "./icon";
const statuses = {
  new: "待跟进",
  following: "跟进中",
  contacted: "已联系",
  closed: "已结束",
};
export function Customers() {
  const [data, setData] = useState<Page<Inquiry> | null>(null),
    [page, setPage] = useState(1),
    [search, setSearch] = useState(""),
    [status, setStatus] = useState(""),
    [error, setError] = useState(""),
    [selected, setSelected] = useState<Inquiry | null>(null),
    [version, setVersion] = useState(0),
    [notice, setNotice] = useState("");
  useEffect(() => {
    const c = new AbortController();
    setError("");
    setData(null);
    api<Page<Inquiry>>(
      `inquiries?page=${page}&search=${encodeURIComponent(search)}&status=${status}`,
      { signal: c.signal },
    )
      .then(setData)
      .catch((e) => {
        if (!c.signal.aborted) setError(e.message);
      });
    return () => c.abort();
  }, [page, search, status, version]);
  return (
    <>
      <Heading
        eyebrow="CUSTOMERS"
        title="客户与留言"
        description="统一管理联系表单，及时跟进每一个真实需求。"
      >
        <span className="tag neutral">表单入库即计为转化</span>
      </Heading>
      {notice && (
        <p className="success" role="status">
          {notice}
        </p>
      )}
      <section className="panel">
        <div className="list-toolbar">
          <form
            className="search"
            onSubmit={(e) => {
              e.preventDefault();
              setPage(1);
              setSearch(
                String(new FormData(e.currentTarget).get("search") || ""),
              );
            }}
          >
            <Icon name="search" size={18} />
            <input
              name="search"
              placeholder="搜索姓名、学校或联系方式"
              aria-label="搜索客户"
            />
            <button type="submit">搜索</button>
          </form>
          <select
            aria-label="跟进状态"
            value={status}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value);
            }}
          >
            <option value="">全部状态</option>
            {Object.entries(statuses).map(([v, label]) => (
              <option key={v} value={v}>
                {label}
              </option>
            ))}
          </select>
          <button
            className="button small"
            onClick={() => setVersion((x) => x + 1)}
          >
            <Icon name="refresh" size={16} />
            刷新
          </button>
        </div>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        {!data ? (
          <Empty text={error ? "数据读取失败" : "正在读取客户记录"} />
        ) : data.items.length ? (
          <>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>客户</th>
                    <th>学校 / 专业</th>
                    <th>联系方式</th>
                    <th>提交时间</th>
                    <th>跟进状态</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((i) => (
                    <tr key={i.id}>
                      <td>
                        <div className="customer-cell">
                          <span className="avatar soft">{i.name[0]}</span>
                          <div>
                            <b>{i.name}</b>
                            <small>#{i.id}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <b>{i.school}</b>
                        <small>{i.major}</small>
                      </td>
                      <td>
                        {i.contact || <span className="muted">未提供</span>}
                      </td>
                      <td className="muted">{dateTime(i.createdAt)}</td>
                      <td>
                        <span className={`tag ${i.status}`}>
                          {statuses[i.status]}
                        </span>
                      </td>
                      <td>
                        <button
                          className="text-button"
                          onClick={() => setSelected(i)}
                        >
                          查看 / 跟进
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pager {...data} onChange={setPage} />
          </>
        ) : (
          <Empty
            text="暂无匹配的客户留言"
            detail="官网表单成功提交后会自动出现在这里，可搜索或切换跟进状态。"
          />
        )}
      </section>
      {selected && (
        <InquiryEditor
          inquiry={selected}
          onClose={() => setSelected(null)}
          onSaved={() => {
            setSelected(null);
            setVersion((v) => v + 1);
            setNotice("客户资料已保存，操作已记录。");
          }}
        />
      )}
    </>
  );
}
function InquiryEditor({
  inquiry: i,
  onClose,
  onSaved,
}: {
  inquiry: Inquiry;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [error, setError] = useState(""),
    [pending, setPending] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError("");
    const d = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await api(`inquiries/${i.id}`, {
        method: "PATCH",
        body: JSON.stringify({ ...d, version: i.updatedAt }),
      });
      onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : "保存失败");
    } finally {
      setPending(false);
    }
  }
  return (
    <Dialog title={`客户详情 · #${i.id}`} onClose={onClose}>
      <form onSubmit={submit} className="editor">
        <div className="detail-box">
          <b>
            {i.school} · {i.major}
          </b>
          <p>截止日期：{i.deadline}</p>
          <p>提交时间：{dateTime(i.createdAt)}</p>
          <p className="message-text">{i.message}</p>
        </div>
        <div className="form-grid">
          <label>
            客户姓名
            <input
              name="name"
              defaultValue={i.name}
              minLength={2}
              maxLength={80}
              required
            />
          </label>
          <label>
            跟进状态
            <select name="status" defaultValue={i.status}>
              {Object.entries(statuses).map(([v, label]) => (
                <option key={v} value={v}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label>
          联系方式
          <input
            name="contact"
            defaultValue={i.contact}
            maxLength={160}
            placeholder="微信 / 手机 / 邮箱"
          />
        </label>
        <label>
          跟进备注
          <textarea
            name="notes"
            rows={5}
            maxLength={5000}
            defaultValue={i.notes}
            placeholder="记录客户需求、沟通进展和下一步安排"
          />
        </label>
        <p className="footnote">
          跟进状态不改变转化统计；成功提交表单即计为转化。
        </p>
        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}
        <div className="dialog-actions">
          <button className="button" type="button" onClick={onClose}>
            取消
          </button>
          <button className="button primary" disabled={pending}>
            {pending ? "保存中…" : "保存修改"}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
