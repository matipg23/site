import ImageSlot from "@/components/ui/ImageSlot";
import Video from "./Video";

// Image (or silent looping video) with the mono caption Figma puts under report screenshots
export default function Figure({
  src,
  video,
  alt,
  caption,
  width,
  height,
  className = "",
  imageClassName = "",
}: {
  src?: string;
  video?: { src: string; poster?: string };
  alt: string;
  caption?: string;
  width: number;
  height: number;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <figure className={`flex flex-col gap-16 ${className}`}>
      {video ? (
        <Video src={video.src} poster={video.poster} label={alt} width={width} height={height} />
      ) : (
        <ImageSlot src={src} alt={alt} caption={src ? undefined : alt} width={width} height={height} className={imageClassName} />
      )}
      {caption && <figcaption className="type-mono-xs text-secondary">{caption}</figcaption>}
    </figure>
  );
}
