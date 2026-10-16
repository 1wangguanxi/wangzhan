export function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    overview: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6M21 21v-3a6 6 0 0 0-3-5" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8" cy="8" r="1" />
        <path d="m3 17 5-5 4 4 4-6 5 7" />
      </>
    ),
    activity: <path d="M3 12h4l3-8 4 16 3-8h4" />,
    settings: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="m9 3-1 3-3 1-2 4 2 2v4l4 3 3-1 3 1 4-3v-4l2-2-2-4-3-1-1-3Z" />
      </>
    ),
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    external: (
      <>
        <path d="M14 3h7v7m0-7L11 13M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" />
      </>
    ),
    click: <path d="m5 3 3 17 4-6 7-3Z" />,
    upload: (
      <>
        <path d="M12 16V3m-5 5 5-5 5 5M4 16v5h16v-5" />
      </>
    ),
    search: (
      <>
        <circle cx="10" cy="10" r="6" />
        <path d="m15 15 6 6" />
      </>
    ),
    logout: (
      <>
        <path d="M9 3H4v18h5M10 12h11m-5-5 5 5-5 5" />
      </>
    ),
    check: <path d="m4 12 5 5L20 6" />,
    refresh: (
      <>
        <path d="M20 8A8 8 0 1 0 21 14M20 3v5h-5" />
      </>
    ),
    close: <path d="m6 6 12 12M6 18 18 6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.overview}
    </svg>
  );
}
