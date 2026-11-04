import type { Metadata } from "next";
import Link from "next/link";
import Contact from "@/components/sections/Contact";
import Arrow from "@/components/ui/Arrow";
import { caseHref, caseIndex, type CaseIndexItem } from "@/content/cases";

export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Case studies across product design and design systems at FanDuel, News UK and Nutmeg: the decisions, the trade-offs, and what I would do differently.",
};

// Figma: WIP > Case studies (index) (388:22346)
export default function WorkPage() {
  return (
    <>
      <section className="container-page flex flex-col gap-32 pb-80 pt-64 md:pt-section">
        <p className="type-mono-lg text-secondary">Case studies</p>
        <h1 className="type-display-md text-primary">Selected work</h1>
        <p className="type-body-md max-w-[788px] text-secondary">
          Each piece opens into a full case study: the decisions, the trade-offs, and what I’d do differently.
        </p>
      </section>

      <section className="container-page pb-80">
        <ol className="border-b border-subtle">
          {caseIndex.map((item, i) => (
            <li key={item.title}>
              <Row n={String(i + 1).padStart(2, "0")} item={item} />
            </li>
          ))}
        </ol>
      </section>

      <Contact />
    </>
  );
}

// Figma: case-row component (Default, Hover, WIP). Items are top-aligned; hover adds the overlay fill, accent top border and accent title.
// Phones stack the meta and action under the title (no mobile frame in Figma yet)
const grid =
  "grid grid-cols-[32px_minmax(0,1fr)] items-start gap-x-16 gap-y-16 border-t border-subtle py-40 lg:grid-cols-[40px_minmax(0,1fr)_180px_182px] lg:gap-x-40";

function Row({ n, item }: { n: string; item: CaseIndexItem }) {
  const body = (
    <>
      <span className="type-caption-md text-accent">{n}</span>
      <div className="flex flex-col gap-12">
        <h2
          className={`type-heading-sm text-primary ${
            item.slug ? "transition-colors duration-150 group-hover:text-accent" : ""
          }`}
        >
          {item.title}
        </h2>
        <p className="type-body-md text-secondary">{item.description}</p>
      </div>
      <p className="type-mono-xs-upper col-start-2 flex flex-col gap-8 text-secondary lg:col-start-auto">
        <span>{item.company}</span>
        <span>{item.tags}</span>
      </p>
      <span
        className={`type-mono-xs-med-upper col-start-2 inline-flex items-center gap-8 whitespace-nowrap lg:col-start-auto lg:pr-32 ${
          item.slug ? "text-accent" : "text-secondary"
        }`}
      >
        {item.slug ? (
          <>
            View case study
            <Arrow size={12} />
          </>
        ) : (
          "Work in progress"
        )}
      </span>
    </>
  );

  return item.slug ? (
    <Link
      href={caseHref(item.slug)}
      className={`group transition-colors duration-150 hover:border-accent hover:bg-overlay-transparent focus-visible:border-accent focus-visible:bg-overlay-transparent ${grid}`}
    >
      {body}
    </Link>
  ) : (
    <div className={grid}>{body}</div>
  );
}
