import type { Metadata } from "next";
import { ContactForm } from "../../components/ContactForm";
import { getT } from "@sevp/ui/server";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Office of the Deputy Regional President of the South Ethiopia Regional State.",
};

export default async function ContactPage() {
  const t = await getT();
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-green-900 to-green-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {t.contact.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{t.contact.officeAddress}</h2>
                <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
                <div className="mt-4 space-y-3 text-muted-foreground">
                  <p>{t.contact.officeLine1}</p>
                  <p>{t.contact.officeLine2}</p>
                  <p>{t.contact.officeLine3}</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground">{t.contact.contactInformation}</h2>
                <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
                <div className="mt-4 space-y-3 text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <span>info@southethiopia.gov.et</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <span>+251-XX-XXX-XXXX</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground">{t.contact.workingHours}</h2>
                <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
                <div className="mt-4 space-y-2 text-muted-foreground">
                  <p>{t.contact.mondayFriday}</p>
                  <p>{t.contact.saturday}</p>
                  <p>{t.contact.sunday}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground">{t.contact.sendMessage}</h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
