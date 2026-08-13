import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAnnouncementById } from "../../../lib/cms-data";
import { getT } from "@sevp/ui/server";
import { BlocksRenderer } from "../../../components/BlocksRenderer";
import { RichText } from "../../../components/RichText";

export const metadata: Metadata = {
  title: "Announcement",
};

type FallbackAnnouncement = {
  title: string;
  date: string;
  category: string;
  body: string[];
};

const fallbackAnnouncements: Record<string, FallbackAnnouncement> = {
  "1": {
    title: "Regional Development Forum Announced",
    date: "July 25, 2026",
    category: "Events",
    body: [
      "The Office of the Deputy Regional President is pleased to announce a regional development forum scheduled for the upcoming fiscal year.",
      "The forum will bring together stakeholders from various sectors to discuss economic growth strategies, infrastructure development, and social programs.",
      "Key topics to be discussed include economic diversification and investment opportunities, infrastructure development priorities, social service enhancement programs, and public-private partnership frameworks.",
      "The forum aims to create a collaborative platform for aligning regional development goals with national strategies and ensuring inclusive growth across all zones of the South Ethiopia Regional State.",
    ],
  },
  "2": {
    title: "New Infrastructure Projects Underway",
    date: "July 18, 2026",
    category: "Development",
    body: [
      "The regional government has launched multiple infrastructure projects across the South Ethiopia Regional State.",
      "These projects focus on road construction, water supply systems, and healthcare facilities.",
      "The initiative includes construction of 200 km of new roads connecting rural communities, installation of 15 new water supply systems, construction and renovation of 10 healthcare facilities, and development of 5 new schools.",
      "These projects are expected to significantly improve access to essential services and stimulate economic activity in the region.",
    ],
  },
  "3": {
    title: "Peace and Reconciliation Initiative",
    date: "July 10, 2026",
    category: "Governance",
    body: [
      "A comprehensive peace and reconciliation initiative has been launched to strengthen social harmony among communities in the South Ethiopia Regional State.",
      "The initiative focuses on dialogue, conflict resolution, and community building.",
      "The initiative includes community dialogue platforms at the zonal level, training for peace ambassadors, support for traditional conflict resolution mechanisms, and youth engagement programs for peacebuilding.",
      "The Office calls upon all citizens to actively participate in building a peaceful and harmonious society.",
    ],
  },
  "4": {
    title: "Education Sector Reform Update",
    date: "June 28, 2026",
    category: "Education",
    body: [
      "Significant progress has been made in the education sector reform program.",
      "New school construction projects, teacher training programs, and curriculum enhancements are being implemented across the region.",
      "Achievements include construction of 25 new primary schools, training of 500 teachers in modern pedagogy, distribution of educational materials to 100,000 students, and establishment of 10 new libraries.",
      "The Office remains committed to improving access to quality education for all children in the region.",
    ],
  },
};

export default async function AnnouncementDetail({ params }: { params: Promise<{ id: string }> }) {
  const t = await getT();
  const { id } = await params;
  const item = await getAnnouncementById(Number(id));

  let title = item?.title;
  let date = item?.date;
  let category = item?.category;
  let content = item?.content;
  let blocks = item?.blocks;

  if (!item) {
    const fallback = fallbackAnnouncements[id];
    if (!fallback) {
      notFound();
    }
    title = fallback.title;
    date = fallback.date;
    category = fallback.category;
    content = undefined;
    blocks = undefined;
  }

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-green-900 to-green-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/announcements" className="inline-flex items-center gap-1 text-sm text-zinc-300 hover:text-white transition-colors mb-6">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t.announcements.backToAnnouncements}
          </Link>
          <div className="flex items-center gap-3 text-sm text-zinc-300">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-yellow-300">{category}</span>
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
            fallbackAnnouncements[id]?.body.map((paragraph, i) => (
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