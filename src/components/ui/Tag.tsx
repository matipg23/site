// Figma: components > tag (outlined, Mono)
export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="type-mono-xs inline-flex items-center border border-subtle px-8 py-4 text-secondary">
      {children}
    </span>
  );
}
