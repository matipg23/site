import Reveal from "@/components/ui/Reveal";

// Figma: Case 02 > "01 / THE FIRST RUN": kicker, Heading/LG, accent lead, three numbered notes,
// with a figure alongside
export default function Story({
  kicker,
  heading,
  lead,
  notes,
  figure,
}: {
  kicker: string;
  heading: React.ReactNode;
  lead: string;
  notes: { label: string; body: string }[];
  figure: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-48 lg:grid-cols-[577fr_720fr] lg:gap-64">
      <div className="flex flex-col gap-20">
        <p className="type-mono-xs-med uppercase text-accent">{kicker}</p>
        <h3 className="type-heading-lg uppercase text-primary">{heading}</h3>
        <p className="type-body-lg font-medium italic text-accent">{lead}</p>
        {notes.map((n, i) => (
          <Reveal key={n.label} delay={i} className="flex flex-col gap-8 border-t border-default pt-16">
            <p className="type-mono-xs-med uppercase text-accent">
              {String(i + 1).padStart(2, "0")}&nbsp;&nbsp;{n.label}
            </p>
            <p className="type-body-sm text-primary">{n.body}</p>
          </Reveal>
        ))}
      </div>
      {figure}
    </div>
  );
}
