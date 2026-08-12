import { getPage } from "../lib/cms-data";
import { BlocksRenderer } from "./BlocksRenderer";

export async function CmsPage({
  slug,
  fallback,
}: {
  slug: string;
  fallback: React.ReactNode;
}) {
  const page = await getPage(slug);
  const hasCms =
    !!page &&
    ((page.hero?.title ?? page.hero?.subtitle) ||
      (page.blocks && page.blocks.length > 0));

  if (!hasCms) {
    return <>{fallback}</>;
  }

  const hero = page.hero?.title ?? page.title;

  return (
    <div className="bg-white">
      {page.hero?.title || page.hero?.subtitle ? (
        <section className="bg-gradient-to-br from-green-900 to-green-800 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{hero}</h1>
            {page.hero?.subtitle ? (
              <p className="mt-4 max-w-2xl text-lg text-zinc-300">{page.hero.subtitle}</p>
            ) : null}
          </div>
        </section>
      ) : null}
      <BlocksRenderer owner={page} className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 space-y-4" />
    </div>
  );
}