export function Icon({ name }: { name: string }) {
  return (
    <svg className="icon" aria-hidden="true">
      <use href={`#icon-${name}`} />
    </svg>
  );
}
