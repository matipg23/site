import CountUp from "@/components/ui/CountUp";

// Figma: Case > stats row (Highlight/LG number, Caption/MD label)
export default function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="mt-64 grid grid-cols-2 border-t border-default pt-64 lg:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="flex flex-col-reverse gap-8 border border-subtle px-24 py-24 md:px-40">
          <dt className="type-caption-md uppercase text-secondary">{s.label}</dt>
          <dd className="type-highlight-lg text-accent">
            <CountUp value={s.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
