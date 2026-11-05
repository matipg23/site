import Chip from "@/components/ui/Chip";
import { links } from "@/content/links";
import { ChannelBody, type Icon } from "./ContactChannel";
import CopyEmail from "./CopyEmail";

// `platform` is the extra word the phone layout shows before the handle ("LinkedIn /matipeinado")
const channels: { label: string; icon: Icon; platform?: string; value: string; href: string }[] = [
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
              <li className="border-b border-subtle lg:border-b-0">
                <CopyEmail email={links.email} />
              </li>
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
