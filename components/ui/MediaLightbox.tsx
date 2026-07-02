"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type LightboxImage = {
  url: string;
  alt?: string;
  caption?: string;
};

type Props = {
  images: LightboxImage[];
  videoEmbedUrl?: string;
  initialIndex?: number;
  onClose: () => void;
};

export function MediaLightbox({ images, videoEmbedUrl, initialIndex = 0, onClose }: Props) {
  // -1 = video tab, 0+ = image index
  const [active, setActive] = useState(videoEmbedUrl ? -1 : initialIndex);

  const prev = useCallback(() => {
    setActive((i) => (i <= 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setActive((i) => (i >= images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && active >= 0) prev();
      if (e.key === "ArrowRight" && active >= 0) next();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [active, onClose, prev, next]);

  const showingVideo = active === -1 && !!videoEmbedUrl;
  const currentImage = active >= 0 ? images[active] : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-4xl flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -right-2 -top-10 flex h-8 w-8 items-center justify-center rounded-full bg-surface/80 text-foreground-muted transition-colors hover:text-foreground"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Tabs: Video + Images */}
        {(videoEmbedUrl || images.length > 1) && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {videoEmbedUrl && (
              <button
                onClick={() => setActive(-1)}
                className={cn(
                  "shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                  active === -1
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-surface/60 text-foreground-muted hover:text-foreground"
                )}
              >
                ▶ Demo video
              </button>
            )}
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  "relative h-10 w-16 shrink-0 overflow-hidden rounded-lg border transition-all",
                  active === i ? "border-accent" : "border-border opacity-60 hover:opacity-100"
                )}
              >
                <Image src={img.url} alt={img.alt ?? ""} fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
        )}

        {/* Main content */}
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          {showingVideo ? (
            <div className="aspect-video w-full">
              <iframe
                src={videoEmbedUrl}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Project demo"
              />
            </div>
          ) : currentImage ? (
            <div className="relative">
              <div className="relative aspect-video w-full">
                <Image
                  src={currentImage.url}
                  alt={currentImage.alt ?? ""}
                  fill
                  className="object-contain"
                  sizes="(max-width: 896px) 100vw, 896px"
                />
              </div>
              {/* Prev/Next */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                    aria-label="Next image"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
              {currentImage.caption && (
                <p className="border-t border-border px-4 py-2 text-xs text-foreground-muted">
                  {currentImage.caption}
                </p>
              )}
            </div>
          ) : null}
        </div>

        {/* Image counter */}
        {images.length > 1 && active >= 0 && (
          <p className="text-center font-mono text-xs text-foreground-muted">
            {active + 1} / {images.length}
          </p>
        )}
      </div>
    </div>
  );
}
