"use client";

import { useLanguage } from "@sevp/ui";

const priorities = [
  {
    title: "Peace",
    description: "Fostering lasting peace and stability through conflict resolution, community dialogue, and inclusive reconciliation efforts across the region.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75l-2.25-2.25m0 0L9 9.75m.75 3.75L12 9l2.25 4.5m-2.25 0l2.25 2.25" />
      </svg>
    ),
  },
  {
    title: "Good Governance",
    description: "Promoting transparency, accountability, and participatory decision-making at all levels of regional administration.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Economic Development",
    description: "Accelerating sustainable economic growth through investment, trade, and job creation for the prosperity of all citizens.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
  },
  {
    title: "Women's Empowerment",
    description: "Advancing gender equality, women's leadership, and economic opportunities for women and girls throughout the region.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: "Youth Development",
    description: "Investing in education, skills training, and entrepreneurship to empower the youth as drivers of regional transformation.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
      </svg>
    ),
  },
  {
    title: "Digital Transformation",
    description: "Leveraging technology and digital solutions to modernize public services and enhance administrative efficiency.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5a4.5 4.5 0 004.5 4.5h2.25m-2.25 0A2.25 2.25 0 0115 6.75V3m0 0h3.75M8.25 3H4.5A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V10.5a2.25 2.25 0 00-2.25-2.25H15M8.25 3v.75M17.25 21v-3.75m0 0l2.25 2.25M17.25 17.25l-2.25 2.25" />
      </svg>
    ),
  },
];

export default function StrategicPriorities() {
  const { t } = useLanguage();
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.home.strategicPriorities}
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-primary" />
          <p className="mt-4 text-muted-foreground">
            {t.home.strategicPrioritiesDesc}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {priorities.map((priority) => (
            <div
              key={priority.title}
              className="group flex items-start gap-4 rounded-xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                {priority.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {priority.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {priority.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
