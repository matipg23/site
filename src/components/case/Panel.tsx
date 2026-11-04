import Figure from "./Figure";

// Labelled image ("01 / RESET PASSWORD") used in Case 03/04 grids
export default function Panel({
  label,
  src,
  alt,
  width,
  height,
}: {
  label: string;
  src?: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <div className="flex flex-col gap-16">
      <p className="type-mono-xs-med uppercase text-accent">{label}</p>
      <Figure src={src} alt={alt} width={width} height={height} />
    </div>
  );
}
