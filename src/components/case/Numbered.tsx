import Reveal from "@/components/ui/Reveal";

// Figma: Case > Learnings (numeral, title, body, rules between rows)
export default function Numbered({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol>
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={i} className="flex gap-24 border-b border-default py-24">
          <span className="type-highlight-md w-[72px] shrink-0 text-accent">{String(i + 1).padStart(2, "0")}</span>
          <div className="flex flex-col gap-8">
            <h4 className="type-body-sm-medium text-primary">{item.title}</h4>
            <p className="type-body-sm text-primary">{item.body}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
