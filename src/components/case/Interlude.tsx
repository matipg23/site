// Figma: Case > Interlude band (surface, accent left rule, Heading/LG pull quote)
export default function Interlude({
  kicker,
  heading,
  body,
}: {
  kicker: string;
  heading: React.ReactNode;
  body?: string;
}) {
  return (
    <aside className="mt-56 flex flex-col gap-20 border-l-4 border-accent bg-surface px-24 py-40 md:px-64 md:py-56">
      <p className="type-mono-xs-med uppercase text-accent">{kicker}</p>
      <p className="type-heading-lg text-primary">{heading}</p>
      {body && <p className="type-body-sm text-primary">{body}</p>}
    </aside>
  );
}
