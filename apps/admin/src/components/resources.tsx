"use client";
import { useEffect, useState, useRef, type FormEvent } from "react";
import type { Asset, Page } from "@zhiyu/admin-contracts";
import { api, dateTime } from "@/lib/client";
import { Heading, Empty, Pager, Dialog } from "./shared";
import { Icon } from "./icon";
const size = (n: number) =>
  n > 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.ceil(n / 1024)} KB`;
export function Resources() {
  const [data, setData] = useState<Page<Asset> | null>(null),
    [page, setPage] = useState(1),
    [search, setSearch] = useState(""),
    [status, setStatus] = useState(""),
    [error, setError] = useState(""),
    [selected, setSelected] = useState<Asset | null>(null),
    [version, setVersion] = useState(0),
    [notice, setNotice] = useState(""),
    [uploading, setUploading] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const c = new AbortController();
    setError("");
    setData(null);
    api<Page<Asset>>(
      `assets?page=${page}&search=${encodeURIComponent(search)}&status=${status}`,
      { signal: c.signal },
    )
      .then(setData)
      .catch((e) => {
        if (!c.signal.aborted) setError(e.message);
      });
    return () => c.abort();
  }, [page, search, status, version]);
  async function upload(file: File) {
    if (file.size > 8 * 1024 * 1024) {
      setError("图片不能超过 8 MB");
      return;
    }
    setUploading(true);
    setError("");
    const f = new FormData();
    f.set("file", file);
    try {
      await api("assets", { method: "POST", body: f });
      setPage(1);
      setStatus("");
      setVersion((x) => x + 1);
      setNotice("图片已上传并保存，可在资源详情中复制公开地址。");
    } catch (e) {
      setError(e instanceof Error ? e.message : "上传失败");
    } finally {
      setUploading(false);
      if (input.current) input.current.value = "";
    }
  }
  return (
    <>
      <Heading
        eyebrow="ASSET LIBRARY"
        title="资源管理"
        description="集中管理网站图片，让每一份素材清晰可查。"
      >
        <input
          type="file"
          ref={input}
          hidden
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={(e) => {
            if (e.target.files?.[0]) void upload(e.target.files[0]);
          }}
        />
        <button
          className="button primary"
          disabled={uploading}
          onClick={() => input.current?.click()}
        >
          <Icon name="upload" size={18} />
          {uploading ? "正在上传…" : "上传图片"}
        </button>
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
              placeholder="搜索资源名称、分类或路径"
              aria-label="搜索资源"
            />
            <button type="submit">搜索</button>
          </form>
          <div className="segmented">
            {[
              ["", "资源库"],
              ["archived", "已归档"],
            ].map(([v, label]) => (
              <button
                key={v}
                className={status === v ? "selected" : ""}
                onClick={() => {
                  setStatus(v);
                  setPage(1);
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <span className="muted">PNG / JPG / WebP / GIF · 最大 8 MB</span>
        </div>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        {!data ? (
          <Empty text={error ? "资源读取失败" : "正在读取资源库"} />
        ) : data.items.length ? (
          <>
            <div className="asset-grid">
              {data.items.map((a) => (
                <button
                  className="asset-card"
                  key={a.id}
                  onClick={() => setSelected(a)}
                >
                  <div className="asset-image">
                    <img
                      src={`/api/admin/assets/${a.id}/file`}
                      alt={a.alt || a.name}
                      loading="lazy"
                    />
                    <span>{a.mime.split("/")[1].toUpperCase()}</span>
                  </div>
                  <div className="asset-info">
                    <strong title={a.name}>{a.name}</strong>
                    <div>
                      <span>{a.category}</span>
                      <small>{size(a.bytes)}</small>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <Pager {...data} onChange={setPage} />
          </>
        ) : (
          <Empty
            text={status ? "暂无归档资源" : "没有匹配的资源"}
            detail="试试其他关键词，或上传新的图片。"
          />
        )}
      </section>
      <p className="footnote resource-note">
        归档仅将素材移出资源库常用列表，不删除文件或中断已有网页引用。资源名称、分类和描述是管理元数据；上传新图不会自动替换官网现有图片。
      </p>
      {selected && (
        <AssetEditor
          asset={selected}
          onClose={() => setSelected(null)}
          onSaved={() => {
            setSelected(null);
            setVersion((v) => v + 1);
            setNotice("资源资料已保存。");
          }}
        />
      )}
    </>
  );
}
function AssetEditor({
  asset: a,
  onClose,
  onSaved,
}: {
  asset: Asset;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [error, setError] = useState(""),
    [pending, setPending] = useState(false),
    [copied, setCopied] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError("");
    const d = new FormData(e.currentTarget);
    try {
      await api(`assets/${a.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: d.get("name"),
          alt: d.get("alt"),
          category: d.get("category"),
          archived: d.get("archived") === "on",
          version: a.updatedAt,
        }),
      });
      onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : "保存失败");
    } finally {
      setPending(false);
    }
  }
  return (
    <Dialog title="资源详情" onClose={onClose}>
      <form className="editor" onSubmit={submit}>
        <div className="asset-preview">
          <img src={`/api/admin/assets/${a.id}/file`} alt={a.alt || a.name} />
        </div>
        <div className="asset-meta">
          <span>
            {a.mime} · {size(a.bytes)}
          </span>
          <span>{dateTime(a.createdAt)}</span>
        </div>
        <label>
          资源名称
          <input name="name" defaultValue={a.name} required maxLength={200} />
        </label>
        <div className="form-grid">
          <label>
            分类
            <input name="category" defaultValue={a.category} maxLength={80} />
          </label>
          <label>
            图片描述
            <input
              name="alt"
              defaultValue={a.alt}
              maxLength={500}
              placeholder="用于内部检索与管理"
            />
          </label>
        </div>
        <label>
          公开资源路径
          <div className="copy-field">
            <input value={a.path} readOnly />
            <button
              className="button small"
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(
                    (process.env.NEXT_PUBLIC_SITE_URL ||
                      "http://127.0.0.1:3000") + a.path,
                  );
                  setCopied(true);
                } catch {
                  setError("无法访问剪贴板，请手动复制资源路径");
                }
              }}
            >
              {copied ? "已复制" : "复制地址"}
            </button>
          </div>
        </label>
        <label className="check-label">
          <input name="archived" type="checkbox" defaultChecked={a.archived} />
          归档此资源（保留原文件及引用）
        </label>
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
