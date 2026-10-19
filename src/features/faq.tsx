import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Icon } from "@/components/icon";
const categories = [
  ["all", "全部"],
  ["service", "关于服务"],
  ["price", "关于价格"],
  ["quality", "关于质量"],
  ["after", "关于售后"],
  ["privacy", "关于保密"],
];
const Context = createContext({
  category: "all",
  select: (_category: string) => {},
});
export function FaqProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState("all");
  useEffect(() => {
    const update = () => {
      const c = location.hash.slice(1);
      setCategory(categories.some((x) => x[0] === c) ? c : "all");
    };
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  return (
    <Context.Provider
      value={{
        category,
        select: (c) => {
          setCategory(c);
          history.replaceState(
            null,
            "",
            c === "all" ? location.pathname : "#" + c,
          );
        },
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function FaqTabs() {
  const { category, select } = useContext(Context);
  return (
    <div className="faq-tabs reveal" role="group" aria-label="问题分类筛选">
      {categories.map(([id, label]) => (
        <button
          key={id}
          className={`faq-tab${category === id ? " is-active" : ""}`}
          aria-pressed={category === id}
          onClick={() => select(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
export function FaqCount() {
  return (
    <p className="faq-cat-tip reveal">共 24 个高频问题，点击分类快速筛选</p>
  );
}
export function Accordion({
  question,
  children,
  category,
}: {
  question: ReactNode;
  children: ReactNode;
  category: string;
}) {
  const filter = useContext(Context),
    [open, setOpen] = useState(false),
    [height, setHeight] = useState(0),
    ref = useRef<HTMLDivElement>(null),
    id = useId();
  useEffect(() => {
    if (!open) return;
    const update = () => setHeight(ref.current?.scrollHeight || 0);
    update();
    const observer = new ResizeObserver(update);
    if (ref.current?.firstElementChild)
      observer.observe(ref.current.firstElementChild);
    return () => observer.disconnect();
  }, [open]);
  return (
    <div
      className={`faq-item${open ? " is-open" : ""}`}
      data-cat={category}
      hidden={
        !!category && filter.category !== "all" && filter.category !== category
      }
    >
      <button
        className="faq-item__q"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        {question}
        <Icon name="chevron-down" />
      </button>
      <div
        id={id}
        className="faq-item__a"
        ref={ref}
        style={{ maxHeight: open ? height : 0 }}
        aria-hidden={!open}
      >
        {children}
      </div>
    </div>
  );
}
