import Link from "next/link";
import Arrow from "@/components/ui/Arrow";
import { caseHref, cases } from "@/content/cases";

// Figma: Case > "Previous case study" row. Links to the next case in content/cases.ts, wrapping round.
export default function CaseNav({ slug }: { slug: string }) {
  const i = cases.findIndex((c) => c.slug === slug);
  const next = cases[(i + 1) % cases.length];

  return (
    <nav aria-label="More case studies" className="container-page pb-64">
      <Link
        href={caseHref(next.slug)}
        className="group flex flex-col gap-24 border-t border-default pt-40 md:flex-row md:items-end md:justify-between"
      >
        <div className="flex flex-col gap-12">
          <span className="type-mono-xs-med uppercase text-accent">Next case study</span>
          <span className="type-heading-sm text-primary">{next.title}</span>
        </div>
        <span className="type-mono-xs-med inline-flex items-center gap-8 uppercase text-accent">
          View case study <Arrow />
        </span>
      </Link>
    </nav>
  );
}
