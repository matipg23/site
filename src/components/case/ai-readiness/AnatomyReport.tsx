// Figma: Case 02 > "Figure / First run, anatomy (shareable)". Built from tokens so it follows the page theme.

const parts = [
  { part: "Banner background", token: "positive.background.subtle", value: "#E9F8EF", on: true },
  { part: "Component identity", token: "Invented wrapper name", value: "not in the schema", on: false },
  { part: "Banner border", token: "positive.border.default", value: "#128000", on: true },
  { part: "Title and message", token: "text.brand.default", value: "#05285A", on: true },
  { part: "Icon glyph", token: "Unicode check character", value: "not a system icon", on: false },
  { part: "CSS variable namespace", token: "Invented: --ds-banner-*", value: "not in the token file", on: false },
  { part: "Icon colour", token: "positive.icon.default", value: "#00732C", on: true },
  { part: "Dismiss glyph", token: "Unicode multiplication sign", value: "not a system icon", on: false },
];

const variables = [
  { part: "Background", canonical: "--ds-positive-bg-subtle", used: "--ds-banner-bg", value: "#E9F8EF" },
  { part: "Border", canonical: "--ds-positive-border", used: "--ds-banner-border", value: "#128000" },
  { part: "Icon colour", canonical: "--ds-positive-icon", used: "--ds-banner-icon", value: "#00732C" },
  { part: "Title colour", canonical: "--ds-text-brand", used: "--ds-banner-title", value: "#05285A" },
  { part: "Body colour", canonical: "--ds-text-brand", used: "--ds-banner-body", value: "#05285A" },
  { part: "Dismiss colour", canonical: "--ds-action-link", used: "--ds-banner-close", value: "#004EA3" },
];

function Badge({ children, tone }: { children: React.ReactNode; tone: "positive" | "critical" }) {
  const colour = tone === "positive" ? "border-positive text-positive" : "border-critical text-critical";
  return (
    <span className={`type-mono-xs-upper inline-block whitespace-nowrap border px-8 py-[2px] ${colour}`}>
      {children}
    </span>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="10" cy="10" r="8.25" />
      <path d="M6.5 10.2l2.4 2.4 4.6-4.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AnatomyReport() {
  return (
    <div className="flex flex-col gap-24 border border-subtle bg-page p-24 text-primary">
      <div className="flex flex-col gap-12">
        <h4 className="type-heading-xs">Notification banner: anatomy check</h4>
        <div className="flex flex-wrap gap-8">
          <span className="type-mono-xs border border-default bg-surface px-8 py-[2px] text-secondary">Run 1</span>
          <span className="type-mono-xs border border-default bg-surface px-8 py-[2px] text-secondary">
            Source: component schema + token file
          </span>
        </div>
        <p className="type-body-xs text-secondary">
          Every part of the banner is annotated with its token, its canonical CSS variable, its resolved value and a
          compliance badge. ON SYSTEM means the generated code used the system&apos;s value. OFF SYSTEM means the agent
          substituted its own. Names are abstracted.
        </p>
      </div>

      <div className="flex items-start gap-12 border border-positive bg-positive-subtle p-16 text-positive">
        <CheckIcon />
        <div className="flex flex-col gap-4 text-primary">
          <p className="type-body-sm font-bold">Changes saved</p>
          <p className="type-body-sm">Your preferences were updated.</p>
        </div>
      </div>

      <p className="type-body-xs text-secondary">
        Generated banner, run 1. Four of eight parts matched the system; four were substituted.
      </p>

      <div className="grid gap-12 sm:grid-cols-2">
        {parts.map((p) => (
          <div key={p.part} className="flex flex-col items-start gap-4 border border-default bg-page p-12">
            <p className="type-body-xs font-bold">{p.part}</p>
            <p className="type-mono-xs text-secondary">{p.token}</p>
            <p className="type-mono-xs">{p.value}</p>
            <Badge tone={p.on ? "positive" : "critical"}>{p.on ? "On system" : "Off system"}</Badge>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto border border-default">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead className="bg-surface">
            <tr className="type-mono-xs text-secondary">
              <th className="p-12 font-normal">Part</th>
              <th className="p-12 font-normal">Canonical variable</th>
              <th className="p-12 font-normal">Variable the agent used</th>
              <th className="p-12 font-normal">Value</th>
              <th className="p-12" />
            </tr>
          </thead>
          <tbody>
            {variables.map((v) => (
              <tr key={v.part} className="border-t border-subtle align-middle">
                <td className="type-body-xs p-12">{v.part}</td>
                <td className="type-mono-xs p-12">{v.canonical}</td>
                <td className="type-mono-xs p-12 text-critical">{v.used}</td>
                <td className="type-mono-xs p-12">{v.value}</td>
                <td className="p-12">
                  <span className="flex gap-8">
                    <Badge tone="positive">✓ Value</Badge>
                    <Badge tone="critical">✕ Name</Badge>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="type-body-xs text-secondary">
        Result: 6 of 6 values correct, 6 of 6 variable names invented. The agent read the right values and still wrote
        its own names, so the output looks right and fails any token lookup.
      </p>
    </div>
  );
}
