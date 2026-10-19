import { useEffect, useRef, useState, type FormEvent } from "react";
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);
  const [pending, setPending] = useState(false);
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("");
  const summaryField = useRef<HTMLTextAreaElement>(null);
  useEffect(() => setReady(true), []);

  async function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const data = Object.fromEntries(
      [...new FormData(form)].map(([key, value]) => [
        key,
        String(value).trim(),
      ]),
    );
    const found = validate(data);
    setErrors(found);
    setSummary("");
    setStatus("");
    if (Object.keys(found).length) {
      form
        .querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)
        ?.focus();
      return;
    }
    const text = [
      "咨询信息",
      ...fields.map((field) => `${field.label}：${data[field.name]}`),
    ].join("\n");
    setSummary(text);
    setPending(true);
    try {
      await navigator.clipboard.writeText(text);
      setStatus(
        "咨询信息已复制。请粘贴发送给顾问；本页不会发送或保存这些信息。",
      );
    } catch {
      setStatus(
        "咨询信息已生成。请在下方长按或选中文字复制，再发送给顾问；本页不会发送或保存这些信息。",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      id="contact-form"
      className="contact-form"
      onSubmit={prepare}
      noValidate
    >
      <noscript>
        <p>
          请启用 JavaScript 以整理咨询信息，或直接扫描宣传单上的联系码咨询。
        </p>
      </noscript>
      <fieldset disabled={!ready || pending} className="contact-fields">
        <legend className="sr-only">整理咨询信息</legend>
        {fields.map((field) => {
          const props = {
            id: `f-${field.name}`,
            name: field.name,
            placeholder: field.placeholder,
            maxLength: field.max,
            required: true,
            "aria-invalid": !!errors[field.name],
            "aria-describedby": `error-${field.name}`,
            onChange: () => {
              setErrors((current) => ({ ...current, [field.name]: "" }));
              setSummary("");
              setStatus("");
            },
          };
          return (
            <div
              key={field.name}
              className={`form-field${errors[field.name] ? " has-error" : ""}`}
            >
              <label htmlFor={props.id}>
                {field.label}
                <span className="req" aria-hidden="true">
                  *
                </span>
              </label>
              {field.name === "message" ? (
                <textarea {...props} />
              ) : (
                <input
                  {...props}
                  type={field.type || "text"}
                  autoComplete={field.autoComplete}
                />
              )}
              <p id={`error-${field.name}`} className="form-error" role="alert">
                {errors[field.name]}
              </p>
            </div>
          );
        })}
        <button
          type="submit"
          className="btn btn--accent btn--lg"
          id="contact-prepare"
        >
          {pending ? "正在复制…" : "生成并复制咨询信息"}
          <Icon name="arrow-right" />
        </button>
      </fieldset>
      <p className="contact-privacy">
        填写的信息仅在当前页面用于整理咨询内容，不会自动发送。请扫描宣传单上的联系码添加顾问后，将咨询信息粘贴发送。
      </p>
      <p role="status" aria-live="polite">
        {status}
      </p>
      {summary && (
        <div className="form-field contact-summary">
          <label htmlFor="consultation-summary">
            咨询信息（请复制后发送给顾问）
          </label>
          <textarea
            id="consultation-summary"
            ref={summaryField}
            value={summary}
            readOnly
            rows={10}
            onFocus={(event) => event.currentTarget.select()}
          />
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => {
              summaryField.current?.focus();
              summaryField.current?.select();
            }}
          >
            选中咨询信息
          </button>
        </div>
      )}
    </form>
  );
}
