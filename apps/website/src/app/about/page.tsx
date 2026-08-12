import type { Metadata } from "next";
import Image from "next/image";
import { getT } from "@sevp/ui/server";
import { CmsPage } from "../../components/CmsPage";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the Office of the Deputy Regional President of the South Ethiopia Regional State.",
};

export default async function AboutPage() {
  const t = await getT();
  return CmsPage({
    slug: "about",
    fallback:
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 to-green-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{t.about.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            {t.about.subtitle}
          </p>
        </div>
      </section>

      {/* History */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">{t.about.history}</h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {t.about.historyDesc}{" "}
            {t.about.historyDesc2}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-muted py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground">{t.about.mission}</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {t.about.missionDesc}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground">{t.about.vision}</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {t.about.visionDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">{t.about.coreValues}</h2>
            <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-primary" />
            <p className="mt-3 text-muted-foreground">{t.about.coreValuesDesc}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {t.about.values.map((v) => (
              <div key={v.title} className="rounded-xl border border-border bg-white p-6 text-center shadow-sm">
                <h3 className="text-base font-bold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Objectives */}
      <section className="bg-muted py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">{t.about.strategicObjectives}</h2>
            <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-primary" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.about.objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl border border-border bg-white p-5 shadow-sm">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">{i + 1}</span>
                <p className="text-sm text-foreground">{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Framework */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">{t.about.legalFramework}</h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {t.about.legalFrameworkDesc}{" "}
            {t.about.legalFrameworkDesc2}
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-muted py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">{t.about.leadership}</h2>
            <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-primary" />
          </div>

          {/* Deputy Regional President */}
          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-white p-8 shadow-sm sm:p-12">
            <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start sm:gap-8">
              <div className="mb-4 sm:mb-0 h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-muted">
                <Image
                  src="/ababayehu-tadesse.jpeg"
                  alt={t.about.officialsList[0].role}
                  width={128}
                  height={128}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-primary">{t.about.officialsList[0].role}</p>
                <h3 className="mt-1 text-2xl font-bold text-foreground">{t.about.officialsList[0].name}</h3>
                <div className="mt-2 h-1 w-12 rounded-full bg-primary" />

                {/* Biography */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-foreground">{t.about.biography}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t.about.biographyDesc}
                  </p>
                </div>

                {/* Responsibilities */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-foreground">{t.about.responsibilities}</h4>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {t.about.responsibilitiesList.map((r) => (
                      <li key={r} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Achievements */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-foreground">{t.about.achievements}</h4>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {t.about.achievementsList.map((a, i) => (
                      <div key={i} className="flex items-start gap-2 rounded-lg bg-muted p-3">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span className="text-xs text-foreground">{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Messages */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">{t.about.messages}</h2>
            <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-primary" />
          </div>
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-muted p-8 sm:p-12">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/20">
              <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </div>
            <blockquote className="text-lg italic leading-relaxed text-foreground">
              &ldquo;{t.about.message}&rdquo;
            </blockquote>
            <p className="mt-4 font-semibold text-foreground">— {t.about.messageSigner}</p>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="bg-muted py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">{t.about.photoGallery}</h2>
            <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-primary" />
            <p className="mt-3 text-muted-foreground">{t.about.photoGalleryDesc}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.about.galleryTitles.map((title, i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl shadow-sm">
                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-green-700 to-green-900">
                  <div className="text-center text-white">
                    <svg className="mx-auto h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-sm font-medium text-white">{title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">{t.about.organizationalStructure}</h2>
            <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-primary" />
          </div>

          {/* Organization Chart */}
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-border bg-muted p-8">
              <div className="flex justify-center mb-8">
                <div className="rounded-xl bg-primary px-8 py-4 text-center text-white shadow-md">
                  <p className="text-sm font-medium text-primary/80">{t.about.orgChartTop}</p>
                  <p className="text-lg font-bold">{t.about.orgChartTitle}</p>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {t.about.orgDepts.map((dept) => (
                  <div key={dept} className="rounded-lg border border-border bg-white px-4 py-3 text-center text-sm font-medium text-foreground shadow-sm">
                    {dept}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Departments */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-foreground">{t.about.departments}</h3>
            <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {t.about.departmentsList.map((dept) => (
                <div key={dept.name} className="rounded-xl border border-border bg-white p-6 shadow-sm">
                  <h4 className="text-base font-semibold text-foreground">{dept.name}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{dept.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Officials */}
      <section className="bg-muted py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">{t.about.officials}</h2>
            <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-primary" />
            <p className="mt-3 text-muted-foreground">{t.about.officialsDesc}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {t.about.officialsList.map((off) => (
              <div key={off.role} className="flex items-start gap-4 rounded-xl border border-border bg-white p-6 shadow-sm">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                  {off.role.split(" ").map(w => w[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="text-xs font-medium text-primary">{off.role}</p>
                  <h4 className="text-base font-semibold text-foreground">{off.name}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{off.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    });
}
