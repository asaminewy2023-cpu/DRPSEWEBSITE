"use client";

import { useLanguage } from "@sevp/ui";

const videos = [
  {
    title: "ጂ7 መዝናኛ ዲላ የአንድ የመሶብ አገልግሎት ቅኝት",
    embedId: "c0Xs7kXUbm4",
  },
  {
    title: "አስደማሚው የአርባምንጭ ፕሮጀክት - የMICE ቱሪዝም እና የተፈጥሮ ውበት መገናኛ አዲሱ የኢኮኖሚ ማዕከል | Arba Minch | MICE Tourism |",
    embedId: "P8uexTaywdI",
  },
];

export default function VideoGallery() {
  const { t } = useLanguage();
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.home.videoGallery}
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-primary" />
          <p className="mt-4 text-muted-foreground">
            {t.home.videoGalleryDesc}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {videos.map((video) => (
            <div
              key={video.title}
              className="overflow-hidden rounded-xl border border-border bg-white shadow-sm"
            >
              <div className="aspect-video w-full">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${video.embedId}`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="px-5 py-4">
                <h3 className="text-sm font-semibold text-foreground">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
