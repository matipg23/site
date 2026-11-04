import SectionLabel from "@/components/ui/SectionLabel";
import { links } from "@/content/links";

const channels = [
  { label: "Email", value: links.email, href: `mailto:${links.email}` },
  { label: "LinkedIn", value: "/matipeinado", href: links.linkedin },
  { label: "Medium", value: "@mpg23", href: links.medium },
];

// Figma: Home - Revised > Section "CONTACT" (surface)
export default function Contact() {
  return (
    <section id="contact" className="border-t border-default bg-surface">
      <div className="container-page py-64 md:py-96">
        <SectionLabel>Contact</SectionLabel>
        <div className="flex flex-col gap-48 pt-40 lg:flex-row lg:justify-between lg:gap-56">
          <div>
            <h2 className="type-display-lg text-primary">
              Let&apos;s <span className="text-accent">talk</span>
            </h2>
            <p className="type-body-md max-w-[520px] pt-32 text-secondary">
              I&apos;m always up for a conversation about design systems, product craft, or what good design
              infrastructure actually looks like in practice. If you&apos;re building something great and thinking about
              how it scales, let&apos;s talk.
            </p>
          </div>
          <dl className="flex flex-col gap-24 lg:w-[205px]">
            {channels.map((c) => (
              <div key={c.label}>
                <dt className="type-mono-sm-bold pb-4 text-accent">{c.label}</dt>
                <dd>
                  <a
                    href={c.href}
                    className="type-body-md text-primary underline decoration-transparent underline-offset-4 transition-colors duration-150 hover:decoration-current"
                    {...(c.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    {c.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
