import type { Metadata } from "next";
import { getT } from "@sevp/ui/server";
import { getShorts } from "../../lib/cms-data";
import ShortFeed from "../../components/ShortFeed";

export const metadata: Metadata = {
  title: "Media Center",
  description: "Photos, videos, press releases, and publications from the South Ethiopia Regional State.",
};

const galleryColors = [
  "from-blue-600 to-blue-800",
  "from-green-600 to-green-800",
  "from-amber-600 to-amber-800",
  "from-purple-600 to-purple-800",
  "from-cyan-600 to-cyan-800",
  "from-rose-600 to-rose-800",
];

type VideoEmbed =
  | { kind: "youtube"; id: string }
  | { kind: "facebook"; src: string };

const videos: VideoEmbed[] = [
  { kind: "youtube", id: "c0Xs7kXUbm4" },
  { kind: "youtube", id: "P8uexTaywdI" },
];

export default async function MediaPage() {
  const t = await getT();
  const shorts = await getShorts();
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-green-900 to-green-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{t.media.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            {t.media.subtitle}
          </p>
        </div>
      </section>

      {/* Photos */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground">{t.media.photos}</h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.media.galleries.map((g, i) => (
              <div key={g.title} className={`group relative overflow-hidden rounded-xl shadow-sm bg-gradient-to-br ${galleryColors[i]}`}>
                <div className="flex h-48 items-center justify-center">
                  <div className="text-center text-white">
                    <svg className="mx-auto h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <p className="mt-2 text-xs text-white/70">{g.count}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-sm font-medium text-white">{g.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shorts */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground">{t.media.shorts}</h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
          <p className="mt-4 text-muted-foreground">{t.media.shortsDesc}</p>
          <div className="mt-8">
            {shorts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No shorts published yet.</p>
            ) : (
              <ShortFeed shorts={shorts} />
            )}
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="bg-muted py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground">{t.media.videos}</h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {t.media.videosList.map((v, i) => {
              const embed = videos[i] ?? videos[0];
              return (
                <div key={v.title} className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
                  <div className={embed.kind === "facebook" ? "aspect-[560/429] w-full" : "aspect-video w-full"}>
                    {embed.kind === "youtube" ? (
                      <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${embed.id}`} title={v.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    ) : (
                      <iframe className="h-full w-full" src={embed.src} title={v.title} loading="lazy" style={{ border: "none", overflow: "hidden" }} scrolling="no" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen />
                    )}
                  </div>
                  <div className="px-5 py-4">
                    <h3 className="text-sm font-semibold text-foreground">{v.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground">{t.media.pressReleases}</h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
          <div className="mt-8 divide-y divide-border rounded-xl border border-border">
            {t.media.pressReleasesList.map((pr) => (
              <div key={pr.title} className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-muted/30">
                <p className="text-sm font-medium text-foreground">{pr.title}</p>
                <span className="shrink-0 text-xs text-muted-foreground">{pr.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="bg-muted py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground">{t.media.publications}</h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.media.publicationsList.map((p) => (
              <div key={p.title} className="flex items-center justify-between rounded-xl border border-border bg-white p-5 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{p.title}</p>
                    <p className="text-xs text-muted-foreground">{p.format} &middot; {p.size}</p>
                  </div>
                </div>
                <button className="ml-3 shrink-0 rounded-lg bg-primary/10 p-2 text-primary transition-colors hover:bg-primary hover:text-white" aria-label={t.media.download}>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
