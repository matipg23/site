// Section eyebrow chip: accent dot + Mono/XS-Med-Caps label on overlay-transparent.
// Figma: "Chip" on Home and About. Case pages keep SectionLabel.
export default function Chip({
  children,
  as: Tag = "p",
}: {
  children: React.ReactNode;
  as?: "p" | "h2";
}) {
  return (
    <Tag className="type-mono-xs-med-upper inline-flex w-fit items-center gap-8 bg-overlay-transparent px-12 py-[6px] text-accent">
      <span aria-hidden className="h-[6px] w-[6px] shrink-0 rounded-full bg-current" />
      {children}
    </Tag>
  );
}
