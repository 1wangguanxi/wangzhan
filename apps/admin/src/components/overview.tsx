"use client";
import { useEffect, useState } from "react";
import type { Dashboard, Point } from "@zhiyu/admin-contracts";
import { api, dateTime, number } from "@/lib/client";
import { Heading, Empty } from "./shared";
import { Icon } from "./icon";
const pageNames: Record<string, string> = {
  "/": "首页",
  "/index.html": "首页",
  "/services.html": "服务项目",
  "/process.html": "服务流程",
  "/about.html": "关于我们",
  "/cases.html": "案例与院校",
  "/reviews.html": "客户评价",
  "/faq.html": "常见问题",
  "/contact.html": "联系我们",
};
function stamp(time: string, short = false) {
  return new Date(time).toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai",
    ...(short
      ? { hour: "2-digit", minute: "2-digit" }
      : {
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
    hour12: false,
  });
}
function change(current: number, previous: number) {
  if (!previous) return current ? "较上一时段新增" : "与上一时段持平";
  return `较上一时段 ${current >= previous ? "+" : ""}${(((current - previous) / previous) * 100).toFixed(1)}%`;
}
export function Overview() {
  const [period, setPeriod] = useState("24h"),
    [data, setData] = useState<Dashboard | null>(null),
    [error, setError] = useState(""),
    [refresh, setRefresh] = useState(0);
  useEffect(() => {
    let disposed = false;
    const abort = new AbortController();
    let timer: ReturnType<typeof setTimeout>;
    setData(null);
    setError("");
    async function load() {
      if (document.visibilityState === "hidden") {
        timer = setTimeout(load, 5000);
        return;
      }
      try {
        const d = await api<Dashboard>(`analytics?period=${period}`, {
          signal: abort.signal,
        });
        if (!disposed) {
          setData(d);
          setError("");
        }
      } catch (e) {
        if (!disposed)
          setError(e instanceof Error ? e.message : "数据更新失败");
      } finally {
        if (!disposed) timer = setTimeout(load, 5000);
      }
    }
    void load();
    return () => {
      disposed = true;
      abort.abort();
      clearTimeout(timer);
    };
  }, [period, refresh]);
  const peak = data?.series.reduce<Point | undefined>(
    (best, p) => (!best || p.views > best.views ? p : best),
    undefined,
  );
  return (
    <>
      <Heading
        eyebrow="OVERVIEW"
        title="数据概览"
        description="每一次访问、每一条留言，都有迹可循。"
      >
        <span className={`live-pill ${error ? "offline" : ""}`}>
          <i />
          {error ? "连接中断" : "5 秒自动刷新"}
        </span>
        <div className="segmented">
          {[
            ["24h", "近 24 小时"],
            ["7d", "近 7 天"],
            ["30d", "近 30 天"],
          ].map(([v, label]) => (
            <button
              key={v}
              onClick={() => setPeriod(v)}
              className={period === v ? "selected" : ""}
            >
              {label}
            </button>
          ))}
        </div>
      </Heading>
      {error && (
        <div className="error" role="alert">
          {error} · 当前显示最近一次成功获取的数据。
          <button onClick={() => setRefresh((x) => x + 1)}>重试</button>
        </div>
      )}
      {!data ? (
        <div className="panel">
          <Empty
            text={error ? "暂时无法获取数据" : "正在连接实时数据"}
            detail="正在读取 PostgreSQL 中的真实访问记录。"
          />
        </div>
      ) : (
        <>
          <div className="status-strip">
            <span>
              <span className="green-dot" />
              当前活跃 <b>{data.active}</b> 个会话 <small>最近 5 分钟</small>
            </span>
            <span>
              最近更新 {stamp(data.generatedAt, true)}
              <button
                className="icon-button"
                aria-label="刷新统计"
                onClick={() => setRefresh((x) => x + 1)}
              >
                <Icon name="refresh" size={15} />
              </button>
            </span>
          </div>
          <div className="metrics">
            {[
              {
                label: "页面浏览量",
                tag: "PV",
                value: number(data.views),
                note: change(data.views, data.previousViews),
                icon: "overview",
                color: "blue",
              },
              {
                label: "交互点击量",
                tag: "CLICKS",
                value: number(data.clicks),
                note: `其中 ${number(data.contactClicks)} 次联系入口点击`,
                icon: "click",
                color: "violet",
              },
              {
                label: "成功提交量",
                tag: "LEADS",
                value: number(data.submissions),
                note: change(data.submissions, data.previousSubmissions),
                icon: "users",
                color: "teal",
              },
              {
                label: "会话转化率",
                tag: "CVR",
                value: `${data.conversionRate.toFixed(2)}%`,
                note: `${data.convertedSessions} 个转化会话 / ${data.sessions} 个访问会话`,
                icon: "activity",
                color: "orange",
              },
            ].map((m) => (
              <article className="metric" key={m.tag}>
                <div className="metric-top">
                  <span>
                    {m.label}
                    <small>{m.tag}</small>
                  </span>
                  <span className={`metric-icon ${m.color}`}>
                    <Icon name={m.icon} />
                  </span>
                </div>
                <strong>{m.value}</strong>
                <p>{m.note}</p>
              </article>
            ))}
          </div>
          <div className="overview-grid">
            <section className="panel trend-panel">
              <div className="panel-title">
                <div>
                  <h2>访问与转化趋势</h2>
                  <p>
                    {data.bucketMinutes === 15
                      ? "每 15 分钟"
                      : data.bucketMinutes === 60
                        ? "每小时"
                        : "每天"}
                    聚合 · 最后一个时段仍在累计
                  </p>
                </div>
                <span className="muted">{stamp(data.since)} 起</span>
              </div>
              <Trend points={data.series} />
            </section>
            <section className="panel funnel">
              <div className="panel-title">
                <div>
                  <h2>转化路径</h2>
                  <p>以表单成功入库为准</p>
                </div>
                <Icon name="arrow" />
              </div>
              <div className="funnel-step">
                <span>
                  01<small>访问网站</small>
                </span>
                <strong>
                  {number(data.sessions)}
                  <small>个会话</small>
                </strong>
                <div className="funnel-bar" />
              </div>
              <div className="funnel-step">
                <span>
                  02<small>点击联系入口</small>
                </span>
                <strong>
                  {number(data.contactClicks)}
                  <small>次点击</small>
                </strong>
                <div className="funnel-bar secondary" />
              </div>
              <div className="funnel-step">
                <span>
                  03<small>成功提交表单</small>
                </span>
                <strong>
                  {number(data.submissions)}
                  <small>条留言</small>
                </strong>
                <div className="funnel-bar tertiary" />
              </div>
              <p className="footnote">
                点击为次数，访问为会话数；三项并非严格漏斗。
                {data.unattributed > 0
                  ? `当前有 ${data.unattributed} 条提交无法关联本时段访问，未计入会话转化率。`
                  : "同一会话重复提交仅计一个转化会话。"}
              </p>
            </section>
          </div>
          <div className="insight-strip">
            <span className="insight-icon">
              <Icon name="activity" />
            </span>
            <div>
              <b>
                {data.views && peak
                  ? `流量峰值出现在 ${stamp(peak.time)}`
                  : "等待第一个访问高峰"}
              </b>
              <p>
                {data.views && peak
                  ? `该时段共 ${peak.views} 次浏览、${peak.clicks} 次点击、${peak.submissions} 次成功提交。`
                  : "打开官网浏览页面，真实流量将自动出现在这里。"}
              </p>
            </div>
            <span className="insight-badge">高峰洞察</span>
          </div>
          <div className="lower-grid">
            <section className="panel">
              <div className="panel-title">
                <div>
                  <h2>热门页面</h2>
                  <p>了解访客最关心的内容</p>
                </div>
                <span className="muted">浏览 / 点击</span>
              </div>
              {data.pages.length ? (
                <div className="top-pages">
                  {data.pages.map((p, i) => (
                    <div className="top-page" key={p.path}>
                      <span className={`rank ${i < 3 ? "leading" : ""}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <b>{pageNames[p.path] || p.path}</b>
                        <small>{p.path}</small>
                        <div
                          className="rank-bar"
                          style={{
                            width: `${Math.max(3, (p.views / Math.max(1, data.pages[0].views)) * 100)}%`,
                          }}
                        />
                      </div>
                      <span>
                        <b>{number(p.views)}</b>
                        <small>{number(p.clicks)} 次点击</small>
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <Empty />
              )}
            </section>
            <section className="panel">
              <div className="panel-title">
                <div>
                  <h2>访问高峰分布</h2>
                  <p>按星期与小时累计浏览量 · 北京时间</p>
                </div>
              </div>
              <Heatmap data={data} />
              <div className="definition">
                <b>统计口径</b>
                <p>
                  会话转化率 = 本时段有成功提交且有浏览记录的会话数 ÷
                  本时段访问会话数。提交量直接来自后端入库记录，刷新或网络重试不重复计数。
                </p>
                <p>
                  匿名会话闲置 30
                  分钟后更新；不采集输入内容或联系方式作为点击数据。新接入统计不包含历史访问。
                </p>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
}
function Trend({ points }: { points: Point[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(
    4,
    ...points.map((p) => Math.max(p.views, p.clicks, p.submissions)),
  );
  const W = 800,
    H = 230,
    top = 15,
    bottom = 35;
  const x = (i: number) => 40 + (i / Math.max(1, points.length - 1)) * (W - 55),
    y = (n: number) => H - bottom - (n / max) * (H - top - bottom);
  const path = (key: "views" | "clicks" | "submissions") =>
    points.map((p, i) => `${i ? "L" : "M"}${x(i)},${y(p[key])}`).join(" ");
  const chosen = hover === null ? undefined : points[hover];
  return (
    <div className="trend">
      <div className="legend">
        <span>
          <i style={{ background: "#4376ed" }} />
          页面浏览
        </span>
        <span>
          <i style={{ background: "#a9b5ce" }} />
          交互点击
        </span>
        <span>
          <i style={{ background: "#22aa91" }} />
          成功提交
        </span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="浏览、点击和成功提交的时间趋势"
        onMouseLeave={() => setHover(null)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setHover(
            Math.max(
              0,
              Math.min(
                points.length - 1,
                Math.round(
                  ((((e.clientX - rect.left) / rect.width) * W - 40) /
                    (W - 55)) *
                    (points.length - 1),
                ),
              ),
            ),
          );
        }}
      >
        <defs>
          <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4376ed" stopOpacity=".18" />
            <stop offset="100%" stopColor="#4376ed" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <line
              x1="40"
              y1={y((max * i) / 4)}
              x2={W - 15}
              y2={y((max * i) / 4)}
              stroke="#edf0f5"
              strokeDasharray="4 4"
            />
            <text x="28" y={y((max * i) / 4) + 4} textAnchor="end">
              {Math.round((max * i) / 4)}
            </text>
          </g>
        ))}
        <path
          d={`${path("views")} L${x(points.length - 1)},${y(0)} L40,${y(0)}Z`}
          fill="url(#area)"
        />
        {(["clicks", "views", "submissions"] as const).map((key, i) => (
          <path
            key={key}
            d={path(key)}
            fill="none"
            stroke={["#a9b5ce", "#4376ed", "#22aa91"][i]}
            strokeWidth="2.3"
            strokeLinejoin="round"
          />
        ))}
        {[0, 0.25, 0.5, 0.75, 1].map((v) => {
          const i = Math.round((points.length - 1) * v);
          return (
            points[i] && (
              <text
                key={v}
                x={x(i)}
                y={H - 9}
                textAnchor={v === 0 ? "start" : v === 1 ? "end" : "middle"}
              >
                {stamp(points[i].time, points.length <= 100)}
              </text>
            )
          );
        })}
        {chosen && hover !== null && (
          <g>
            <line
              x1={x(hover)}
              x2={x(hover)}
              y1={top}
              y2={y(0)}
              stroke="#7a8cab"
              strokeDasharray="4"
            />
            <circle cx={x(hover)} cy={y(chosen.views)} r="4" fill="#4376ed" />
          </g>
        )}
      </svg>
      <div className="chart-readout">
        {chosen
          ? `${stamp(chosen.time)} · 浏览 ${chosen.views} · 点击 ${chosen.clicks} · 成功提交 ${chosen.submissions}`
          : "鼠标移入图表查看时段详情；无访问的时段显示为 0。"}
      </div>
    </div>
  );
}
function Heatmap({ data }: { data: Dashboard }) {
  const max = Math.max(1, ...data.heatmap.map((h) => h.views));
  return (
    <div className="heatmap">
      <div className="heat-axis">
        <span />
        {Array.from({ length: 24 }, (_, i) => (
          <small key={i}>{i % 4 === 0 ? `${i}h` : ""}</small>
        ))}
      </div>
      {["一", "二", "三", "四", "五", "六", "日"].map((day, d) => (
        <div className="heat-row" key={day}>
          <small>周{day}</small>
          {Array.from({ length: 24 }, (_, hour) => {
            const value =
              data.heatmap.find((h) => h.day === d + 1 && h.hour === hour)
                ?.views || 0;
            return (
              <span
                key={hour}
                title={`周${day} ${hour}:00–${hour + 1}:00 · ${value} 次浏览`}
                style={{
                  background: value
                    ? `rgba(67,118,237,${0.2 + (0.8 * value) / max})`
                    : "#f0f3f8",
                }}
              />
            );
          })}
        </div>
      ))}
      <div className="heat-legend">
        少{" "}
        {[0, 0.2, 0.45, 0.7, 1].map((v) => (
          <i
            key={v}
            style={{ background: v ? `rgba(67,118,237,${v})` : "#f0f3f8" }}
          />
        ))}{" "}
        多
      </div>
    </div>
  );
}
