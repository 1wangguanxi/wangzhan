"use client";
import { useRef, useState, type FormEvent } from "react";
import { analyticsSession } from "@/lib/analytics-session";
import { Icon } from "@/components/icon";
const fields = [
  {
    name: "contact",
    label: "联系方式（微信 / 手机 / 邮箱）",
    placeholder: "请留下可联系到你的微信、手机号或邮箱",
    max: 160,
    autoComplete: "off",
  },
  {
    name: "name",
    label: "姓名",
    placeholder: "怎么称呼你",
    max: 80,
    autoComplete: "name",
  },
  {
    name: "school",
    label: "学校",
    placeholder: "你的学校全称",
    max: 160,
    autoComplete: "organization",
  },
  {
    name: "major",
    label: "专业",
    placeholder: "如：机械设计制造及其自动化",
    max: 160,
  },
  {
    name: "deadline",
    label: "论文截止时间（交稿或答辩日期）",
    type: "date",
    max: 10,
  },
  {
    name: "message",
    label: "需求描述",
    placeholder:
      "题目定了没有、需要哪几项辅导（如正文辅导/降重/排版）、学校有什么特殊要求……",
    max: 5000,
  },
];
function validate(data: Record<string, string>) {
  const errors: Record<string, string> = {};
  fields.forEach((f) => {
    if (!data[f.name])
      errors[f.name] =
        f.name === "deadline"
          ? "请选择论文截止时间"
          : f.name === "message"
            ? "请简单描述一下你的需求"
            : `请填写你的${f.label}`;
  });
  if (data.name && data.name.length < 2) errors.name = "姓名至少写 2 个字哦";
  else if (data.name && !/[一-龥a-zA-Z0-9]/.test(data.name))
    errors.name = "姓名不能全是符号，请写真实称呼";
  if (data.school && data.school.length < 2)
    errors.school = "学校名称至少写 2 个字，写全称更好";
  if (data.message && data.message.length < 10)
    errors.message =
      "需求描述至少写 10 个字——说说专业、题目方向和截止时间，我们才能给你靠谱方案";
  if (data.deadline) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (new Date(data.deadline + "T00:00:00") < now)
      errors.deadline = "论文截止时间不能早于今天，请检查";
  }
  return errors;
}
export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({}),
    [pending, setPending] = useState(false),
    [success, setSuccess] = useState(false),
    [failure, setFailure] = useState("");
  const key = useRef("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const data = Object.fromEntries(
      [...new FormData(form)].map(([k, v]) => [k, String(v).trim()]),
    );
    const found = validate(data);
    setErrors(found);
    setFailure("");
    if (Object.keys(found).length) {
      form
        .querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)
        ?.focus();
      return;
    }
    key.current ||= crypto.randomUUID();
    setPending(true);
    try {
      const response = await fetch("/api/contact-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": key.current,
        },
        body: JSON.stringify({ ...data, sessionId: analyticsSession() }),
        signal: AbortSignal.timeout(12000),
      });
      const body = await response.json();
      if (!response.ok) {
        if (body.fields) setErrors(body.fields);
        throw new Error(
          body.error || "提交失败，请稍后重试，或直接扫码加微信咨询",
        );
      }
      form.reset();
      setSuccess(true);
    } catch (e) {
      setFailure(e instanceof Error ? e.message : "提交失败，请稍后重试");
    } finally {
      setPending(false);
    }
  }
  if (success)
    return (
      <div
        className="form-success is-visible"
        id="form-success"
        role="status"
        tabIndex={-1}
        ref={(node) => {
          node?.focus();
        }}
      >
        <Icon name="check-circle" />
        <h3>提交成功！</h3>
        <p>
          顾问会在工作时间 2
          小时内联系你。着急的话也可以扫宣传单上的联系码加微信，回复更快。
        </p>
      </div>
    );
  return (
    <form
      id="contact-form"
      className="contact-form"
      onSubmit={submit}
      noValidate
    >
      {fields.map((f) => (
        <div
          key={f.name}
          className={`form-field${errors[f.name] ? " has-error" : ""}`}
        >
          <label htmlFor={`f-${f.name}`}>
            {f.label}
            <span className="req" aria-hidden="true">
              *
            </span>
          </label>
          {f.name === "message" ? (
            <textarea
              id={`f-${f.name}`}
              name={f.name}
              placeholder={f.placeholder}
              maxLength={f.max}
              required
              aria-invalid={!!errors[f.name]}
              aria-describedby={`error-${f.name}`}
              onChange={() => {
                key.current = "";
                setErrors((e) => ({ ...e, [f.name]: "" }));
              }}
            />
          ) : (
            <input
              type={f.type || "text"}
              id={`f-${f.name}`}
              name={f.name}
              placeholder={f.placeholder}
              maxLength={f.max}
              autoComplete={f.autoComplete}
              required
              aria-invalid={!!errors[f.name]}
              aria-describedby={`error-${f.name}`}
              onChange={() => {
                key.current = "";
                setErrors((e) => ({ ...e, [f.name]: "" }));
              }}
            />
          )}
          <p id={`error-${f.name}`} className="form-error" role="alert">
            {errors[f.name]}
          </p>
        </div>
      ))}
      <button
        type="submit"
        className={`btn btn--accent btn--lg${pending ? " is-loading" : ""}`}
        id="contact-submit"
        disabled={pending}
      >
        {pending ? (
          "提交中…"
        ) : (
          <>
            免费获取辅导方案
            <Icon name="arrow-right" />
          </>
        )}
      </button>
      {failure && (
        <p role="alert" style={{ color: "#b91c1c" }}>
          {failure}
        </p>
      )}
      <p
        style={{
          marginTop: 12,
          fontSize: ".8125rem",
          color: "var(--c-text-3)",
        }}
      >
        你填的信息仅用于顾问联系你，严格保密、绝不外泄；留言咨询不收费、不催单。
      </p>
    </form>
  );
}
