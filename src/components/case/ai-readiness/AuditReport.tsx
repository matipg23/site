// Figma: Case 02 > "Figure / Generated vs corrected (shareable)". Built from tokens so it follows the page theme.

const rows = [
  { part: "Icon chip", v1: "Filled circle, #004EA3", installed: "No chip, icon sits bare" },
  { part: "Icon shape", v1: "Invented generic path", installed: "System info icon (ring and i)" },
  { part: "Title layout", v1: "Title above the message", installed: "Title inline, before the message" },
  { part: "Body opacity", v1: "Message at 85% opacity", installed: "Message at full strength" },
  { part: "Dismiss icon", v1: "Custom drawn X", installed: "System close icon" },
  { part: "Dismiss colour", v1: "#004EA3", installed: "#0070EB, same for all 7 intents" },
  { part: "Flex gap", v1: "8px (space-2)", installed: "12px (space-3)" },
  { part: "Compliance", v1: "Claimed anatomy verified", installed: "Labelled approximate, no verified claim" },
];

const missed = [
  "Icon chip colour used a valid system variable, so nothing was invented.",
  "Icon shapes were SVG paths, not Unicode, so the icon rule passed.",
  "Title layout and body opacity are layout choices with no lexical fingerprint.",
  "Dismiss colour: both the used and the correct slot are valid variables, so the check cannot choose between them.",
  "Gap: 8px and 12px are both canonical spacing tokens.",
];

function InfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="10" cy="10" r="8.25" />
      <path d="M10 9v5M10 6.2v.1" strokeLinecap="round" />
    </svg>
  );
}

function Close() {
  return (
    <span className="type-body-xs ml-auto text-primary" aria-hidden="true">
      ×
    </span>
  );
}

export default function AuditReport() {
  return (
    <div className="flex flex-col gap-24 border border-subtle bg-page p-24 text-primary">
      <div className="flex flex-col gap-12">
        <h4 className="type-heading-xs">Notification banner: generated vs corrected</h4>
        <div className="flex flex-wrap gap-8">
          {["v1: deviations found", "v2: all corrected", "intent shown: info"].map((t) => (
            <span key={t} className="type-mono-xs border border-default bg-surface px-8 py-[2px] text-secondary">
              {t}
            </span>
          ))}
        </div>
        <p className="type-body-xs text-secondary">
          The same banner generated twice. v1 is the first agent output. v2 is the output after auditing it against the
          installed component. Each numbered difference is a place where v1 looked plausible but did not match the
          system.
        </p>
      </div>

      <div className="grid gap-16 sm:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div className="flex items-start gap-12 border border-info bg-info-subtle p-16">
            <span className="mt-4 size-[16px] shrink-0 rounded-full bg-info" aria-hidden="true" />
            <div className="flex flex-col gap-4">
              <p className="type-body-xs font-bold">Heads up</p>
              <p className="type-body-xs opacity-85">A new version is available.</p>
            </div>
            <Close />
          </div>
          <p className="type-body-xs text-secondary">v1: filled icon chip, stacked title, dimmed body.</p>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-12 border border-info bg-info-subtle p-16 text-info">
            <InfoIcon />
            <p className="type-body-xs text-primary">
              <span className="font-bold">Heads up</span> A new version is available.
            </p>
            <Close />
          </div>
          <p className="type-body-xs text-secondary">v2: outlined icon, inline title, full-strength body.</p>
        </div>
      </div>

      <div className="overflow-x-auto border border-default">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead className="bg-surface">
            <tr className="type-mono-xs text-secondary">
              <th className="p-12 font-normal">#</th>
              <th className="p-12 font-normal">Part</th>
              <th className="p-12 font-normal">v1 generated</th>
              <th className="p-12 font-normal">Installed component</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.part} className="border-t border-subtle align-middle">
                <td className="p-12">
                  <span className="type-mono-xs-bold flex size-[20px] items-center justify-center rounded-full border border-critical text-critical">
                    {i + 1}
                  </span>
                </td>
                <td className="type-body-xs p-12">{r.part}</td>
                <td className="type-mono-xs p-12 text-critical">{r.v1}</td>
                <td className="type-mono-xs p-12">{r.installed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-12 border border-critical p-16">
        <p className="type-body-xs font-bold text-critical">Structural layer misread as visual</p>
        <p className="type-body-xs">
          The component description labelled the icon container as an instance of a container component, with no hint
          whether it was visual or structural. The agent assumed a visual chip. Seven of the eight deviations trace back
          to this single misread.
        </p>
        <pre className="type-mono-xs overflow-x-auto border border-default bg-surface p-12 normal-case tracking-normal">
{`"iconContainer": {
  "type": "instance",
  "instanceOf": "IconContainer"
  // missing: "purpose": "structural"
  // without it, the agent defaults to a visual reading
}`}
        </pre>
      </div>

      <div className="flex flex-col gap-12 border border-info p-16">
        <p className="type-body-xs font-bold text-info">Why the existing check did not catch these</p>
        <p className="type-body-xs">
          The check was lexical. It looks for hardcoded hex values, invented variable names, Unicode icon substitutes
          and raw pixel spacing. Every visual deviation passed it:
        </p>
        <ul className="type-body-xs flex flex-col gap-8">
          {missed.map((m) => (
            <li key={m} className="flex gap-8">
              <span aria-hidden="true">•</span>
              <span>{m}</span>
            </li>
          ))}
        </ul>
        <p className="type-body-xs font-bold">
          The fix is a purpose field on every anatomy layer, which turns these rules into something a machine can
          verify.
        </p>
      </div>
    </div>
  );
}
