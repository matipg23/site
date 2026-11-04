// Figma: Home - Revised > Footer (64px, top border, three Mono/XS items)
export default function Footer() {
  return (
    <footer className="border-t border-default">
      <div className="container-page flex flex-col gap-12 py-24 md:flex-row md:items-center md:justify-between">
        <p className="type-mono-xs text-secondary">© 2026 Mati Peinado Greco</p>
        <p className="type-mono-xs text-secondary">Themed by its own tokens</p>
        <p className="type-mono-xs text-secondary">Product Design / Design Systems</p>
      </div>
    </footer>
  );
}
