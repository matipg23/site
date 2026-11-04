import Reveal from "@/components/ui/Reveal";

type Owner = { label: string; muted?: boolean };

// Figma: Case > Track > Steps (numeral, Label/SM title, body, owner tags).
// Muted tags mark work owned by someone else.
export default function Steps({ items }: { items: { title: string; body: string; tags?: Owner[] }[] }) {
  return (
    <ol className={`grid gap-24 pt-48 md:grid-cols-2 ${items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
      {items.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i} className="flex flex-col justify-between gap-24 border-t border-subtle pt-24">
          <div className="flex flex-col gap-12">
            <span className="type-highlight-md text-accent">{String(i + 1).padStart(2, "0")}</span>
            <h4 className="type-label-sm text-primary">{s.title}</h4>
            <p className="type-body-sm text-primary">{s.body}</p>
          </div>
          {s.tags && (
            <div className="flex flex-col items-start gap-8">
              {s.tags.map((t) => (
                <span
                  key={t.label}
                  className={`type-mono-xs-med border px-12 py-8 uppercase ${
                    t.muted ? "border-default text-secondary" : "border-accent bg-surface text-accent"
                  }`}
                >
                  {t.label}
                </span>
              ))}
            </div>
          )}
        </Reveal>
      ))}
    </ol>
  );
}
