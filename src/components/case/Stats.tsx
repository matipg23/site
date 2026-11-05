import CountUp from "@/components/ui/CountUp";

// Figma: Case > stats row (Highlight/LG number, Caption/MD label)
export default function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="mt-56 grid grid-cols-2 lg:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="flex flex-col-reverse justify-end gap-8 border-l border-subtle py-24 pl-24 md:pl-40">
          <dt className="type-caption-md uppercase text-secondary">{s.label}</dt>
          <dd className="type-highlight-lg text-accent">
            <CountUp value={s.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
