import Chip from "@/components/ui/Chip";
import { links } from "@/content/links";

type Icon = "speech" | "external" | "download";

// `platform` is the extra word the phone layout shows before the handle ("LinkedIn /matipeinado")
const channels: { label: string; icon: Icon; platform?: string; value: string; href: string }[] = [
  { label: "Talk", icon: "speech", value: links.email, href: `mailto:${links.email}` },
  { label: "Connect", icon: "external", platform: "LinkedIn", value: "/matipeinado", href: links.linkedin },
  { label: "Read", icon: "external", platform: "Medium", value: "@mpg23", href: links.medium },
  { label: "Resume", icon: "download", value: "Download PDF", href: links.cv },
];

// Figma: Home - Refined > Contact (surface) at lg and up; About Me - Mobile (Option A) > Contact below lg.
// Shared by Home and About.
export default function Contact() {
  return (
    <section id="contact" className="bg-surface">
      <div className="container-page pb-48 pt-64 lg:py-section">
        <div className="flex flex-col gap-24 lg:gap-0">
          <Chip>Contact</Chip>
          <div className="flex flex-col gap-24 lg:flex-row lg:justify-between lg:gap-56 lg:pt-title">
            <div className="flex flex-col gap-24 lg:gap-0">
              {/* Figma phone size for Display/SM is 58 and the title breaks over two lines */}
              <h2 className="type-display-lg text-primary max-lg:text-[58px]">
                Let&apos;s <br className="lg:hidden" />
                <span className="text-accent">talk</span>
              </h2>
              <p className="type-body-sm max-w-[520px] text-primary lg:type-body-md lg:pt-lead">
                Open to conversations about design systems, product craft, and what good design infrastructure looks
                like in practice. If you&apos;re building something great and thinking about how it scales, let&apos;s
                talk about it.
              </p>
            </div>
            <ul className="flex flex-col border-t border-subtle lg:w-[205px] lg:gap-24 lg:border-t-0">
              {channels.map((c) => (
                <li key={c.label} className="border-b border-subtle lg:border-b-0">
                  <a
                    href={c.href}
                    className="group flex items-center justify-between gap-16 py-[14px] lg:block lg:py-0"
                    {...(c.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                    {...(c.icon === "download" ? { download: "" } : {})}
                  >
                    <ChannelBody {...c} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// Phones: label and value stacked, icon at the right edge. Desktop: icon sits next to the label.
function ChannelBody({
  label,
  icon,
  platform,
  value,
}: {
  label: string;
  icon: Icon;
  platform?: string;
  value: string;
}) {
  return (
    <>
      <span className="flex flex-col gap-[2px] lg:block">
        <span className="type-mono-md-bold flex items-center gap-[6px] text-accent">
          {label}
          <span className="hidden lg:inline">
            <ChannelIcon icon={icon} />
          </span>
        </span>
        <span className="type-body-sm block text-primary underline decoration-transparent underline-offset-4 transition-colors duration-150 group-hover:text-accent group-hover:decoration-current lg:type-body-md">
          {platform && <span className="lg:hidden">{platform} </span>}
          {value}
        </span>
      </span>
      <span className="shrink-0 text-accent lg:hidden">
        <ChannelIcon icon={icon} />
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
