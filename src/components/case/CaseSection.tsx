import Chip from "@/components/ui/Chip";

// Figma: Case > Section (hairline divider, Chip eyebrow, then content). surface = bg/surface band.
// The divider is skipped on surface bands and right after one, which already draw their own rule.
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
    // id comes from the label ("The problem" -> "problem") so the case study sub-bar can link to it
    <section id={label.toLowerCase().replace(/^the /, "").replace(/\s+/g, "-")} className={surface ? "band border-y border-default bg-surface" : ""}>
      <div className="container-page pb-80 md:pb-128">
        {!surface && <div aria-hidden className="border-t border-subtle [.band+section_&]:hidden" />}
        <div className={surface ? "pt-64 md:pt-80" : "pt-48 md:pt-56"}>
          <Chip as="h2">{label}</Chip>
        </div>
        <div className="pt-24">{children}</div>
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
