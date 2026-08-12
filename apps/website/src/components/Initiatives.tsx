"use client";

import { useLanguage } from "@sevp/ui";

const initiatives = [
  {
    title: "Ethio Coders",
    description: "Empowering youth with coding and digital skills to drive innovation and technology-led economic growth in the region.",
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    color: "from-blue-600 to-blue-800",
  },
  {
    title: "MESOB",
    description: "Micro and Small Enterprises development program fostering entrepreneurship, job creation, and local economic development.",
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125V9M7.5 12h.75m0 0h.75m-.75 0v-.75m0 .75v.75m0-1.5h.75m-.75 0h-.75m3 0h.75m0 0h.75m-.75 0v-.75m0 .75v.75m0-1.5h.75m-.75 0H12m3 0h.75m0 0h.75m-.75 0v-.75m0 .75v.75m0-1.5h.75m-.75 0H18" />
      </svg>
    ),
    color: "from-green-600 to-green-800",
  },
  {
    title: "FYDA",
    description: "Fana Youth Development Association engaging young people in civic participation, leadership, and community development.",
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    color: "from-purple-600 to-purple-800",
  },
];

export default function Initiatives() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.home.initiatives}
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-primary" />
          <p className="mt-4 text-muted-foreground">
            Key programs driving youth empowerment, entrepreneurship, and community development.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {initiatives.map((init) => (
            <div
              key={init.title}
              className="group overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className={`bg-gradient-to-r ${init.color} px-6 py-5`}>
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/20 text-white">
                  {init.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground">{init.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{init.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
