import SectionLabel from "@/components/ui/SectionLabel";

// Figma: Case > Section (mono label over a rule, then content). surface = bg/surface band.
export default function CaseSection({
  label,
  surface = false,
  children,
}: {
  label: string;
  surface?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={surface ? "border-y border-default bg-surface" : ""}>
      <div className="container-page pb-80 pt-64 md:pb-128">
        <SectionLabel as="h2">{label}</SectionLabel>
        <div className="pt-48">{children}</div>
      </div>
    </section>
  );
}

// Heading left, prose right (Figma "Frame 15": left container + 600px right container)
export function Split({ heading, children }: { heading: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid gap-40 lg:grid-cols-[1fr_600px] lg:gap-64">
      <h3 className="type-display-xs text-primary">{heading}</h3>
      <div>{children}</div>
    </div>
  );
}

// Body/MD paragraphs with a blank line between them, as in Figma
export function Prose({
  children,
  size = "md",
  className = "",
}: {
  children: React.ReactNode;
  size?: "md" | "sm";
  className?: string;
}) {
  return (
    <div className={`${size === "md" ? "type-body-md" : "type-body-sm"} flex flex-col gap-32 text-primary ${className}`}>
      {children}
    </div>
  );
}

export function Accent({ children }: { children: React.ReactNode }) {
  return <span className="text-accent">{children}</span>;
}
