import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPressReleaseById } from "../../../lib/cms-data";
import { getT } from "@sevp/ui/server";
import { BlocksRenderer } from "../../../components/BlocksRenderer";
import { RichText } from "../../../components/RichText";

export const metadata: Metadata = {
  title: "Press Release",
};

type FallbackRelease = {
  title: string;
  date: string;
  excerpt: string;
  body: string[];
};

const fallbackReleases: Record<string, FallbackRelease> = {
  "1": {
    title: "Regional Development Forum Concludes with Action Plan",
    date: "July 28, 2026",
    excerpt:
      "The two-day regional development forum brought together stakeholders from all sectors to align on priority initiatives for the upcoming fiscal year.",
    body: [
      "The Office of the Deputy Regional President has concluded the two-day Regional Development Forum with a comprehensive action plan for the upcoming fiscal year.",
      "The forum brought together government officials, the private sector, civil society, and development partners to align on the region's growth priorities.",
      "Agreed priorities include expanding economic diversification and investment, accelerating infrastructure development, strengthening public service delivery, and enhancing social protection programs.",
      "The action plan will now be operationalized across all zones, with quarterly progress reviews to keep implementation on track.",
    ],
  },
  "2": {
    title: "Infrastructure Development Package Approved by Cabinet",
    date: "July 20, 2026",
    excerpt:
      "The regional cabinet has approved a comprehensive infrastructure development package for the fiscal year.",
    body: [
      "The Regional Cabinet has approved a comprehensive infrastructure development package spanning roads, water, energy, and public facilities for the fiscal year.",
      "The package represents one of the largest infrastructure investments in the region's history.",
      "Key components include 200 km of new road construction, 15 new water supply systems, 10 healthcare facility construction and renovation projects, and 5 new schools.",
      "The projects are expected to significantly improve access to essential services and stimulate economic activity across the region.",
    ],
  },
  "3": {
    title: "New Education Reforms Announced for 2026-2027",
    date: "July 5, 2026",
    excerpt:
      "The regional government has announced new education reforms aimed at improving quality and access for all children.",
    body: [
      "The Regional Government has announced a new round of education reforms for the 2026-2027 academic year, focused on quality, access, and equity.",
      "The reforms build on recent progress to expand enrollment and improve learning outcomes across the region.",
      "Key measures include 25 new primary schools, teacher training and professional development programs, distribution of learning materials to all students, and expansion of digital learning initiatives.",
      "The Office reaffirms its commitment to ensuring every child in the region has access to quality education.",
    ],
  },
};

export default async function PressReleaseDetail({ params }: { params: Promise<{ id: string }> }) {
  const t = await getT();
  const { id } = await params;
  const item = await getPressReleaseById(Number(id));

  let title = item?.title;
  let date = item?.date;
  let content = item?.content;
  let blocks = item?.blocks;

  if (!item) {
    const fallback = fallbackReleases[id];
    if (!fallback) {
      notFound();
    }
    title = fallback.title;
    date = fallback.date;
    content = undefined;
    blocks = undefined;
  }

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-green-900 to-green-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/press-releases" className="inline-flex items-center gap-1 text-sm text-zinc-300 hover:text-white transition-colors mb-6">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t.pressReleases.backTo}
          </Link>
          <div className="flex items-center gap-3 text-sm text-zinc-300">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-yellow-300">
              {t.pressReleases.badge}
            </span>
            <span>{date}</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {item && blocks && blocks.length > 0 ? (
            <BlocksRenderer owner={item} className="space-y-4" />
          ) : item && content ? (
            <RichText data={content} />
          ) : (
            fallbackReleases[id]?.body.map((paragraph, i) => (
              <p key={i} className="mb-4 text-base leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))
          )}
        </div>
      </section>
    </div>
  );
}