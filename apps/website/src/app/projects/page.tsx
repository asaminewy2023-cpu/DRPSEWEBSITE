import type { Metadata } from "next";
import Link from "next/link";
import { getT } from "@sevp/ui/server";
import { CmsPage } from "../../components/CmsPage";

export const metadata: Metadata = {
  title: "Projects",
  description: "Key development projects across the South Ethiopia Regional State.",
};

const projectStyles = [
  {
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V9.75M17.25 21h-3M3 3l3.586 3.586a2.25 2.25 0 001.59.659H12m0 0l2.25-2.25M12 7.5v3m0 0l-2.25 2.25M12 10.5l2.25-2.25M12 10.5v3" />
      </svg>
    ),
    color: "from-blue-600 to-blue-800",
  },
  {
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
    color: "from-red-600 to-red-800",
  },
  {
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
      </svg>
    ),
    color: "from-green-600 to-green-800",
  },
  {
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    color: "from-amber-600 to-amber-800",
  },
  {
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a.999.999 0 01-.394-.323l-.168-.251a.997.997 0 00-.564-.397.996.996 0 00-.65.096l-.973.474a1.125 1.125 0 00.193 2.008l1.358.566c.246.103.424.31.484.568l.112.485a.75.75 0 00.729.558h.997c.39 0 .759.154 1.033.428l.18.18c.274.274.428.644.428 1.033v.408c0 1.052-.636 1.998-1.612 2.399l-1.127.563a1.337 1.337 0 01-.739.116l-1.668-.247a.998.998 0 00-.915.361l-.236.3a.998.998 0 01-1.108.315l-.837-.297a1.077 1.077 0 01-.645-.804l-.149-.615a.937.937 0 00-.443-.618l-.184-.116a.996.996 0 01-.447-.72l-.071-.496a1.18 1.18 0 00-.56-.861l-.678-.42a1.016 1.016 0 01-.37-.418l-.455-1.014a1.13 1.13 0 00-.898-.63l-1.013-.079a.938.938 0 00-.875.417l-.39.586a.926.926 0 01-.876.46l-.307-.015a1.382 1.382 0 01-1.207-.977l-.164-.574a1.425 1.425 0 00-1.019-.912l-.152-.038a1.068 1.068 0 01-.885-1.036V11.6c0-.311.085-.616.244-.875l.44-.716c.353-.574.564-1.228.611-1.904.007-.095.154-1.898 1.516-4.048" />
      </svg>
    ),
    color: "from-cyan-600 to-cyan-800",
  },
  {
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5a4.5 4.5 0 004.5 4.5h2.25m-2.25 0A2.25 2.25 0 0115 6.75V3m0 0h3.75M8.25 3H4.5A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V10.5a2.25 2.25 0 00-2.25-2.25H15M8.25 3v.75M17.25 21v-3.75m0 0l2.25 2.25M17.25 17.25l-2.25 2.25" />
      </svg>
    ),
    color: "from-indigo-600 to-indigo-800",
  },
  {
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    color: "from-pink-600 to-pink-800",
  },
  {
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    color: "from-teal-600 to-teal-800",
  },
  {
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    color: "from-zinc-600 to-zinc-800",
  },
];

export default async function ProjectsPage() {
  const t = await getT();
  return CmsPage({
    slug: "projects",
    fallback:
    <div className="bg-white">
      <section className="bg-gradient-to-br from-green-900 to-green-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{t.projects.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            {t.projects.subtitle}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.projects.items.map((project, i) => (
              <Link
                key={project.title}
                href={`/projects/${project.slug ?? ""}`}
                className="group overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className={`bg-gradient-to-r ${projectStyles[i].color} px-6 py-5`}>
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 text-white">
                    {projectStyles[i].icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-medium text-primary">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {project.stats}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
    });
}
