"use client";

import { useEffect, useRef } from "react";

type ShortItem = {
  id: number;
  title: string;
  videoUrl: string;
  description?: string | null;
};

export default function ShortFeed({ shorts }: { shorts: ShortItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const videos = Array.from(
      container.querySelectorAll<HTMLVideoElement>("video"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            void video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { root: container, threshold: 0.55 },
    );

    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, [shorts]);

  return (
    <div
      ref={containerRef}
      className="no-scrollbar mx-auto h-[70vh] max-w-sm snap-y snap-mandatory overflow-y-auto rounded-2xl border border-border bg-black shadow-xl"
    >
      {shorts.map((short) => (
        <div key={short.id} className="relative h-full w-full snap-center">
          <video
            src={short.videoUrl}
            className="h-full w-full object-contain"
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <p className="text-sm font-semibold text-white">{short.title}</p>
            {short.description && (
              <p className="mt-1 line-clamp-2 text-xs text-white/80">
                {short.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
