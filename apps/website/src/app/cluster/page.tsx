import type { Metadata } from "next";
import { getT } from "@sevp/ui/server";
import { CmsPage } from "../../components/CmsPage";

export const metadata: Metadata = {
  title: "Clusters",
  description: "South Ethiopia Regional State strategic clusters driving development and transformation.",
};

const clusterStyles = [
  {
    color: "from-blue-700 to-blue-900",
    icon: (
      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    color: "from-green-700 to-green-900",
    icon: (
      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    color: "from-amber-700 to-amber-900",
    icon: (
      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    color: "from-purple-700 to-purple-900",
    icon: (
      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    color: "from-rose-700 to-rose-900",
    icon: (
      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.069 1.069 0 00-.673 1.207l.218.873c.144.576-.19 1.16-.736 1.295l-.196.05a7.5 7.5 0 01-4.55 0l-.196-.05c-.547-.135-.88-.72-.736-1.295l.218-.873a1.069 1.069 0 00-.673-1.207l-.143-.048a2.25 2.25 0 01-1.161-.886l-.51-.766c-.319-.48-.226-1.121.216-1.49l1.068-.89c.257-.214.405-.53.405-.864V3.03m0 0c9 0 9 0 9 0m-9 0a9 9 0 10-9 9" />
      </svg>
    ),
  },
];

export default async function ClusterPage() {
  const t = await getT();
  return CmsPage({
    slug: "cluster",
    fallback:
    <div className="bg-white">
      <section className="bg-gradient-to-br from-green-900 to-green-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{t.cluster.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            {t.cluster.subtitle}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {t.cluster.items.map((cluster, i) => (
              <div key={cluster.title} className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
                <div className={`bg-gradient-to-r ${clusterStyles[i].color} px-8 py-6`}>
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/20 text-white">
                      {clusterStyles[i].icon}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-white/70">{t.cluster.clusterLabel} {i + 1}</span>
                      <h2 className="text-xl font-bold text-white sm:text-2xl">{cluster.title}</h2>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-base leading-relaxed text-muted-foreground">{cluster.description}</p>
                  <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-foreground">{t.cluster.keyObjectives}</h3>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {cluster.objectives.map((obj) => (
                      <li key={obj} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    });
}
