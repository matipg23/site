export type Icon = "speech" | "external" | "download";

// One row of the Contact list. Phones: label and value stacked, icon at the right edge.
// Desktop: the icon sits next to the label.
export function ChannelBody({
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
