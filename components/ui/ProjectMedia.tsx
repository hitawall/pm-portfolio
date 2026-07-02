"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Images } from "lucide-react";
import { MediaLightbox, type LightboxImage } from "./MediaLightbox";

type Props = {
  images: LightboxImage[];
  videoEmbedUrl?: string;
};

export function ProjectMedia({ images, videoEmbedUrl }: Props) {
  const [open, setOpen] = useState(false);
  const hasMedia = images.length > 0 || !!videoEmbedUrl;
  if (!hasMedia) return null;

  const thumbnail = images[0];

  return (
    <>
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(true); }}
        className="group/media relative mt-3 w-full overflow-hidden rounded-lg border border-border"
        aria-label="Open media preview"
      >
        {thumbnail ? (
          <div className="relative aspect-video w-full">
            <Image
              src={thumbnail.url}
              alt={thumbnail.alt ?? "Project screenshot"}
              fill
              className="object-cover transition-transform duration-300 group-hover/media:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        ) : (
          // Video-only: show a play card with no thumbnail
          <div className="flex aspect-video w-full items-center justify-center bg-surface">
            <Play size={28} className="text-foreground-muted" />
          </div>
        )}

        {/* Overlay badges */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover/media:bg-black/30">
          <div className="flex gap-2 opacity-0 transition-opacity duration-200 group-hover/media:opacity-100">
            {videoEmbedUrl && (
              <span className="flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                <Play size={11} className="fill-white" /> Watch demo
              </span>
            )}
            {images.length > 0 && (
              <span className="flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                <Images size={11} /> {images.length} screenshot{images.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </button>

      {open && (
        <MediaLightbox
          images={images}
          videoEmbedUrl={videoEmbedUrl}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
