import ImageSlot from "@/components/ui/ImageSlot";

// Image with the mono caption Figma puts under report screenshots
export default function Figure({
  src,
  alt,
  caption,
  width,
  height,
  className = "",
}: {
  src?: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <figure className={`flex flex-col gap-16 ${className}`}>
      <ImageSlot src={src} alt={alt} caption={src ? undefined : alt} width={width} height={height} />
      {caption && <figcaption className="type-mono-xs text-secondary">{caption}</figcaption>}
    </figure>
  );
}
