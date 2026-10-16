import type { Review } from "@zhiyu/content";
import { Icon } from "@/components/icon";
export function ReviewList({ items }: { items: Review[] }) {
  return (
    <div className="rev-grid reveal-group">
      {items.map((r, i) => (
        <article key={r.id} className="review-card reveal">
          <div className="review-card__quote">
            <Icon name="quote" />
          </div>
          <p className="review-card__text">{r.text}</p>
          <div className="review-card__user">
            <span className={r.avatarClass} aria-hidden="true">
              {String.fromCharCode(65 + i)}
            </span>
            <div>
              <div className="user-name">{r.name}</div>
              <div className="user-info">{r.info}</div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
