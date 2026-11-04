import TokenInspector from "@/components/ui/TokenInspector";

// Figma: Home - Refined > Footer (top border, three Mono/XS-Caps items)
export default function Footer() {
  return (
    <footer className="border-t border-default">
      <div className="container-page type-mono-xs-caps relative flex flex-col gap-12 py-24 text-secondary md:flex-row md:items-center md:justify-between">
        <p>© 2026 Matias Peinado Greco</p>
        <div>
          Themed by its own tokens · <TokenInspector />
        </div>
        <p>Product design · Design systems</p>
      </div>
    </footer>
  );
}
