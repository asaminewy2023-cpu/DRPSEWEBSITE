import type { Metadata } from "next";
import { getPrograms } from "../../lib/cms-data";
import { getT } from "@sevp/ui/server";

export const metadata: Metadata = {
  title: "Programs",
  description: "Development programs and initiatives led by the Office of the Deputy Regional President.",
};

export default async function ProgramsPage() {
  const t = await getT();
  const programs = await getPrograms();

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-green-900 to-green-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {t.programs.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            {t.programs.subtitle}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {programs.length === 0 ? (
            <p className="text-center text-muted-foreground">{t.programs.empty}</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((program) => (
                <div
                  key={program.id}
                  className="group rounded-2xl border border-border p-8 transition-all hover:border-primary/30 hover:shadow-lg"
                >
                  <span className="text-4xl">{program.icon}</span>
                  <h3 className="mt-4 text-xl font-semibold text-foreground">{program.title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{program.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
