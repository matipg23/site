// Arrow icon from Figma (1.33px stroke, 16px box). Nudges on hover of a parent with `group`.
export default function Arrow({
  direction = "right",
  size = 16,
  className = "",
}: {
  direction?: "right" | "up-right";
  size?: number;
  className?: string;
}) {
  const nudge =
    direction === "right"
      ? "group-hover:translate-x-2"
      : "group-hover:-translate-y-2 group-hover:translate-x-2";
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.33"
      className={`shrink-0 transition-transform duration-200 ease-out ${nudge} ${className}`}
    >
      {direction === "right" ? (
        <path d="M3.5 8h9M8.5 3.5 13 8l-4.5 4.5" />
      ) : (
        <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
      )}
    </svg>
  );
}
