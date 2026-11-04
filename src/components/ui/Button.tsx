import Link from "next/link";
import Arrow from "./Arrow";

type Variant = "solid" | "outline" | "link" | "cta" | "text";

const styles: Record<Variant, string> = {
  // Home hero buttons (Figma "Link" at 47px): Mono/MD-Bold, 12 / 16 padding
  cta:
    "type-mono-md-bold inline-flex items-center gap-8 bg-action-accent px-16 py-12 text-action-primary-text transition-[opacity,transform] duration-150 ease-out hover:opacity-90 active:scale-[0.98]",
  text:
    "type-mono-md-bold group inline-flex items-center gap-8 text-action-accent underline decoration-transparent underline-offset-4 transition-colors duration-150 hover:decoration-current",
  solid:
    "type-mono-sm-bold inline-flex h-[52px] items-center gap-8 bg-action-accent px-24 text-action-primary-text transition-[opacity,transform] duration-150 ease-out hover:opacity-90 active:scale-[0.98]",
  outline:
    "type-mono-sm-bold inline-flex h-[52px] items-center gap-8 border border-subtle px-24 text-primary transition-[border-color,transform] duration-150 ease-out hover:border-accent active:scale-[0.98]",
  link:
    "type-mono-sm-bold group inline-flex items-center gap-8 text-action-accent",
};

// Figma: components > button (Solid / Outline / Link)
export default function Button({
  href,
  variant = "solid",
  arrow,
  children,
  className = "",
}: {
  href: string;
  variant?: Variant;
  arrow?: "right" | "up-right" | "down";
  children: React.ReactNode;
  className?: string;
}) {
  const external = /^(https?:|mailto:)/.test(href);
  const content = (
    <>
      {children}
      {arrow && <Arrow direction={arrow} />}
    </>
  );
  const cls = `${styles[variant]} ${className}`;

  return external ? (
    <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
      {content}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
