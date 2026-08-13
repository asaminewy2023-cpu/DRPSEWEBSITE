import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDocuments, documentFileUrl } from "../../../lib/cms-data";
import { getT } from "@sevp/ui/server";

export const metadata: Metadata = {
  title: "Documents",
};

const fallbackCategories: { slug: string; title: string }[] = [
  { slug: "annual-reports", title: "Annual Reports" },
  { slug: "policies", title: "Policies" },
  { slug: "guidelines", title: "Guidelines" },
  { slug: "strategic-plans", title: "Strategic Plans" },
  { slug: "tender-documents", title: "Tender Documents" },
  { slug: "budget", title: "Budget" },
  { slug: "manuals", title: "Manuals" },
];

const VALID_SLUGS = new Set(fallbackCategories.map((c) => c.slug));

const fallbackDocuments: Record<string, { title: string; date: string; description: string }[]> = {
  "annual-reports": [
    {
      title: "Annual Report 2025",
      date: "June 2026",
      description:
        "Comprehensive report on regional development, financial performance, and program outcomes for the fiscal year 2025.",
    },
    {
      title: "Annual Report 2024",
      date: "June 2025",
      description:
        "Yearly review of achievements, investments, and governance across the South Ethiopia Regional State for 2024.",
    },
    {
      title: "Annual Report 2023",
      date: "June 2024",
      description:
        "Development progress report covering infrastructure, social services, and economic growth during 2023.",
    },
  ],
  policies: [
    {
      title: "Regional Development Policy",
      date: "March 2026",
      description:
        "Official policy framework guiding sustainable regional development, investment, and resource mobilization.",
    },
    {
      title: "Good Governance Strategy",
      date: "February 2026",
      description:
        "Strategic directives for transparency, accountability, and citizen participation in regional administration.",
    },
  ],
  guidelines: [
    {
      title: "Service Delivery Guidelines",
      date: "January 2026",
      description:
        "Operational standards and procedures for effective public service delivery across all sectors.",
    },
  ],
  "strategic-plans": [
    {
      title: "Strategic Plan 2026-2030",
      date: "October 2025",
      description:
        "Medium-term strategic plan setting out the region's development priorities, targets, and resource allocation.",
    },
  ],
  "tender-documents": [
    {
      title: "Tender: School Construction 2026",
      date: "August 2026",
      description:
        "Public tender invitation for the construction of new primary schools in three zones.",
    },
  ],
  budget: [
    {
      title: "Budget Overview 2026",
      date: "July 2026",
      description:
        "Regional budget documents and expenditure summary for public transparency in the fiscal year 2026.",
    },
  ],
  manuals: [
    {
      title: "Public Procurement Manual",
      date: "May 2026",
      description:
        "Reference guide for procurement officers and bidders on regional procurement procedures.",
    },
  ],
};

export default async function DocumentCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const t = await getT();
  const { category } = await params;

  if (!VALID_SLUGS.has(category)) {
    notFound();
  }

  const docs = await getDocuments(category);
  const categoryInfo =
    t.documents.categoriesList.find((c) => c.slug === category) ??
    fallbackCategories.find((c) => c.slug === category);

  const displayDocs =
    docs.length > 0
      ? docs.map((doc) => ({
          key: String(doc.id),
          title: doc.title,
          date: doc.date,
          description: doc.description ?? "",
          fileUrl: documentFileUrl(doc),
        }))
      : (fallbackDocuments[category] ?? []).map((d, i) => ({
          key: `${category}-${i}`,
          title: d.title,
          date: d.date,
          description: d.description,
          fileUrl: null,
        }));

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-green-900 to-green-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/documents"
            className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-300 transition-colors hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t.documents.backToDocuments}
          </Link>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {categoryInfo?.title}
          </h1>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {displayDocs.length === 0 ? (
            <p className="text-center text-muted-foreground">{t.documents.empty}</p>
          ) : (
            <div className="space-y-6">
              {displayDocs.map((doc) => (
                <div
                  key={doc.key}
                  className="flex flex-col gap-4 rounded-2xl border border-border p-6 transition-all hover:border-primary/30 hover:shadow-md sm:flex-row sm:items-center"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-semibold text-foreground">{doc.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{doc.date}</p>
                    {doc.description ? (
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {doc.description}
                      </p>
                    ) : null}
                  </div>
                  {doc.fileUrl ? (
                    <a
                      href={doc.fileUrl}
                      download
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      {t.documents.download}
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}