// Figma: Case > timeline (phase icons and labels over an accent bar)
const icons = {
  search: <path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm9 16-4-4" />,
  click: <path d="M9 3v3M3 9h3M4.5 4.5l2 2M12 9l8 3-3.5 1.5L15 17l-3-8Z" />,
  check: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-4 9 3 3 5-6" />,
};

export default function PhaseTimeline({
  phases,
}: {
  phases: { title: string; body: string; icon: keyof typeof icons }[];
}) {
  return (
    <div className="py-40">
      <ol className="grid gap-32 md:grid-cols-3">
        {phases.map((p, i) => (
          <li
            key={p.title}
            className={`flex flex-col gap-16 ${i === 1 ? "md:items-center md:text-center" : ""} ${
              i === 2 ? "md:items-end md:text-right" : ""
            }`}
          >
            <span className="flex h-64 w-64 items-center justify-center border border-default bg-page text-accent">
              <svg aria-hidden width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {icons[p.icon]}
              </svg>
            </span>
            <div>
              <p className="type-label-md text-primary">{p.title}</p>
              <p className="type-body-sm max-w-[276px] text-primary">{p.body}</p>
            </div>
          </li>
        ))}
      </ol>
      {/* The bar thins out at the end: the step back after handoff */}
      <div aria-hidden className="mt-24 flex h-[26px] gap-4">
        <span className="flex-[1081] bg-border-accent" />
        <span className="flex-[248] bg-border-accent opacity-80" />
        <span className="flex-[8] bg-border-accent opacity-60" />
        <span className="flex-[8] bg-border-accent opacity-40" />
        <span className="flex-[6] bg-border-accent opacity-20" />
      </div>
    </div>
  );
}
