import Chip from "@/components/ui/Chip";
import { links } from "@/content/links";

type Icon = "speech" | "external" | "download";

const channels: { label: string; icon: Icon; value: string; href: string | null }[] = [
  { label: "Talk", icon: "speech", value: links.email, href: `mailto:${links.email}` },
  { label: "Connect", icon: "external", value: "/matipeinado", href: links.linkedin },
  { label: "Read", icon: "external", value: "@mpg23", href: links.medium },
  { label: "Resume", icon: "download", value: "Download PDF", href: links.cv },
];

// Figma: Home - Refined > Contact (surface). Shared by Home and About.
export default function Contact() {
  return (
    <section id="contact" className="bg-surface">
      <div className="container-page py-section">
        <Chip>Contact</Chip>
        <div className="flex flex-col gap-48 pt-title lg:flex-row lg:justify-between lg:gap-56">
          <div>
            <h2 className="type-display-lg text-primary">
              Let&apos;s <span className="text-accent">talk</span>
            </h2>
            <p className="type-body-md max-w-[520px] pt-lead text-primary">
              Open to conversations about design systems, product craft, and what good design infrastructure looks like
              in practice. If you&apos;re building something great and thinking about how it scales, let&apos;s talk
              about it.
            </p>
          </div>
          <ul className="flex flex-col gap-24 lg:w-[205px]">
            {channels.map((c) => (
              <li key={c.label}>
                {c.href ? (
                  <a
                    href={c.href}
                    className="group block"
                    {...(c.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                    {...(c.icon === "download" ? { download: "" } : {})}
                  >
                    <ChannelBody {...c} />
                  </a>
                ) : (
                  // TODO(content): no CV file yet, so this renders as plain text, not a dead link
                  <div>
                    <ChannelBody {...c} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ChannelBody({ label, icon, value }: { label: string; icon: Icon; value: string }) {
  return (
    <>
      <span className="type-mono-md-bold flex items-center gap-[6px] text-accent">
        {label}
        <ChannelIcon icon={icon} />
      </span>
      <span className="type-body-md block text-secondary underline decoration-transparent underline-offset-4 transition-colors duration-150 group-hover:text-primary group-hover:decoration-current">
        {value}
      </span>
    </>
  );
}

// 12px icons redrawn from the Figma "speech", "ext-url" and "donwload-cv" frames
function ChannelIcon({ icon }: { icon: Icon }) {
  return (
    <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
      {icon === "speech" && <path d="M1.5 2.1h9v6h-3.3L6 9.9 4.8 8.1H1.5z" strokeLinejoin="round" />}
      {icon === "external" && (
        <>
          <path d="M5.4 1.8H2.4a.6.6 0 0 0-.6.6v7.2a.6.6 0 0 0 .6.6h7.2a.6.6 0 0 0 .6-.6v-3" />
          <path d="M7.2 1.8h3v3M10.2 1.8 5.7 6.3" />
        </>
      )}
      {icon === "download" && (
        <>
          <path d="M8.4 10.2H2.4a.6.6 0 0 1-.6-.6V2.4a.6.6 0 0 1 .6-.6h7.2a.6.6 0 0 1 .6.6v4.2" />
          <path d="M3.9 4.2h4.2M3.9 6h2.4M9.3 7.5v3M8.1 9.3l1.2 1.2 1.2-1.2" />
        </>
      )}
    </svg>
  );
}
