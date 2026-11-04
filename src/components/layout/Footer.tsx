import TokenInspector from "@/components/ui/TokenInspector";

// Figma: Home - Refined > Footer (top border, three Mono/XS-Caps items)
export default function Footer() {
  return (
    <footer className="border-t border-default">
      {/* Phones follow the Figma mobile footer: three stacked Body/2XS lines */}
      <div className="container-page type-body-2xs relative flex flex-col gap-8 pb-32 pt-24 text-secondary md:type-mono-xs-upper md:flex-row md:items-center md:justify-between md:gap-12 md:py-24">
        <p>© 2026 Matias Peinado Greco</p>
        <div>
          Themed by its own tokens · <TokenInspector />
        </div>
        <p>Product design · Design systems</p>
      </div>
    </footer>
  );
}
