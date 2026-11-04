import Image from "next/image";

// A real image, or the bracket-caption placeholder Figma uses for unfilled slots.
// Pass the slot's aspect ratio as a class, e.g. "aspect-[770/522]".
export default function ImageSlot({
  src,
  alt = "",
  caption,
  width = 1600,
  height = 1000,
  className = "",
}: {
  src?: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`w-full border border-default bg-surface object-cover ${className}`}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={caption ?? alt}
      className={`flex w-full items-center justify-center border border-default bg-surface ${className || "aspect-video"}`}
    >
      <span className="type-mono-xs px-12 py-8 text-center text-secondary">[{caption}]</span>
    </div>
  );
}
