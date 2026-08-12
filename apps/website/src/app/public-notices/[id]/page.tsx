import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicNoticeById } from "../../../lib/cms-data";
import { getT } from "@sevp/ui/server";
import { BlocksRenderer } from "../../../components/BlocksRenderer";
import { RichText } from "../../../components/RichText";

export const metadata: Metadata = {
  title: "Public Notice",
};

export default async function PublicNoticeDetail({ params }: { params: Promise<{ id: string }> }) {
  const t = await getT();
  const { id } = await params;
  const item = await getPublicNoticeById(Number(id));

  if (!item) {
    notFound();
  }

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-green-900 to-green-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/public-notices" className="inline-flex items-center gap-1 text-sm text-zinc-300 hover:text-white transition-colors mb-6">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t.publicNotices.backTo}
          </Link>
          <div className="flex items-center gap-3 text-sm text-zinc-300">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-yellow-300">
              {t.publicNotices.badge}
            </span>
            <span>{item.date}</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">{item.title}</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {item.blocks && item.blocks.length > 0 ? (
            <BlocksRenderer owner={item} className="space-y-4" />
          ) : (
            <RichText data={item.content} />
          )}
        </div>
      </section>
    </div>
  );
}