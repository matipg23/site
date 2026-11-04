// The mono eyebrow over a rule that opens every Figma section ("SELECTED WORK", "WHAT I DO", ...)
export default function SectionLabel({
  children,
  as: Tag = "p",
}: {
  children: React.ReactNode;
  as?: "p" | "h2";
}) {
  return (
    <Tag className="type-mono-sm-bold border-b border-default pb-12 uppercase text-accent">{children}</Tag>
  );
}
