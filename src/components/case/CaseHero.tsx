import Tag from "@/components/ui/Tag";

// Figma: Case > Hero (eyebrow, Display/MD title, tags, facts row)
export default function CaseHero({
  client,
  title,
  tags,
  facts,
}: {
  client: string;
  title: React.ReactNode;
  tags: string[];
  facts: { label: string; value: string }[];
}) {
  return (
    <header>
      <div className="container-page pb-64 pt-32 md:pb-128 md:pt-96">
        <p className="type-mono-sm-bold flex gap-12">
          <span className="text-accent">Case Study</span>
          <span aria-hidden className="text-secondary">/</span>
          <span className="text-accent">{client}</span>
        </p>
        <h1 className="type-display-md max-w-[1024px] pt-40 text-primary">{title}</h1>
        <ul className="flex flex-wrap gap-16 py-24">
          {tags.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
        <dl className="grid grid-cols-2 md:grid-cols-[240fr_400fr_400fr_240fr]">
          {facts.map((f) => (
            <div key={f.label} className="flex flex-col gap-8 border-subtle py-24 md:pl-24 md:first:pl-0 md:[&:not(:first-child)]:border-l">
              <dt className="type-caption-3xs uppercase text-secondary">{f.label}</dt>
              <dd className="type-label-xs text-primary">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
