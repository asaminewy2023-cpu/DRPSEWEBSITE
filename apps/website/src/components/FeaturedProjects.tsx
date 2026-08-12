"use client";

import { useLanguage } from "@sevp/ui";

const projects = [
  {
    title: "Road Construction",
    description: "Building and upgrading over 500 km of roads connecting rural communities to urban centers and markets across the region.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V9.75M17.25 21h-3M3 3l3.586 3.586a2.25 2.25 0 001.59.659H12m0 0l2.25-2.25M12 7.5v3m0 0l-2.25 2.25M12 10.5l2.25-2.25M12 10.5v3" />
      </svg>
    ),
  },
  {
    title: "Health Facilities",
    description: "Constructing and renovating 25 health centers and clinics to expand access to quality healthcare for all communities.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    title: "Schools",
    description: "Building 15 new schools and upgrading existing facilities to provide quality education for thousands of students.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
      </svg>
    ),
  },
  {
    title: "Water Projects",
    description: "Installing 40+ water supply systems to bring clean and safe drinking water to rural communities across the region.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a.999.999 0 01-.394-.323l-.168-.251a.997.997 0 00-.564-.397.996.996 0 00-.65.096l-.973.474a1.125 1.125 0 00.193 2.008l1.358.566c.246.103.424.31.484.568l.112.485a.75.75 0 00.729.558h.997c.39 0 .759.154 1.033.428l.18.18c.274.274.428.644.428 1.033v.408c0 1.052-.636 1.998-1.612 2.399l-1.127.563a1.337 1.337 0 01-.739.116l-1.668-.247a.998.998 0 00-.915.361l-.236.3a.998.998 0 01-1.108.315l-.837-.297a1.077 1.077 0 01-.645-.804l-.149-.615a.937.937 0 00-.443-.618l-.184-.116a.996.996 0 01-.447-.72l-.071-.496a1.18 1.18 0 00-.56-.861l-.678-.42a1.016 1.016 0 01-.37-.418l-.455-1.014a1.13 1.13 0 00-.898-.63l-1.013-.079a.938.938 0 00-.875.417l-.39.586a.926.926 0 01-.876.46l-.307-.015a1.382 1.382 0 01-1.207-.977l-.164-.574a1.425 1.425 0 00-1.019-.912l-.152-.038a1.068 1.068 0 01-.885-1.036V11.6c0-.311.085-.616.244-.875l.44-.716c.353-.574.564-1.228.611-1.904.007-.095.154-1.898 1.516-4.048" />
      </svg>
    ),
  },
  {
    title: "Agricultural Program",
    description: "Supporting farmers with modern techniques, irrigation systems, and market access to boost food security and incomes.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
];

export default function FeaturedProjects() {
  const { t } = useLanguage();
  return (
    <section className="bg-muted py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.home.featuredProjects}
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-primary" />
          <p className="mt-4 text-muted-foreground">
            {t.home.featuredProjectsDesc}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group rounded-xl border border-border bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-green-100 text-green-700 transition-colors group-hover:bg-primary group-hover:text-white">
                {project.icon}
              </div>
              <h3 className="mb-2 text-sm font-semibold text-foreground">
                {project.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
