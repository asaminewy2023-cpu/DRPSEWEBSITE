import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for the official website of the Office of the Deputy Regional President of the South Ethiopia Regional State.",
};

const sections = [
  {
    title: "Acceptance of Terms",
    body: "By accessing and using this website, you accept and agree to be bound by these terms of use. If you do not agree with any part of these terms, please refrain from using the website.",
  },
  {
    title: "Use of Content",
    body: "The content published on this website, including texts, images, and documents, is intended for public information and may be reproduced with proper acknowledgment of the source, unless otherwise indicated.",
  },
  {
    title: "Accuracy of Information",
    body: "While we strive to keep the information on this website accurate and up to date, content is provided for general information and may change without notice. The Office does not guarantee the completeness or accuracy of any particular item.",
  },
  {
    title: "External Links",
    body: "The website may link to external sites operated by other organizations. We are not responsible for the availability or content of external websites and do not endorse the views expressed on them.",
  },
  {
    title: "No Liability",
    body: "The Office of the Deputy Regional President shall not be liable for any loss or damage arising from the use of this website or any linked external resource.",
  },
];

export default function TermsPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-green-900 to-green-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Terms of Use
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            Conditions governing the use of the official website of the Office of the Deputy Regional President.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">{s.title}</h2>
                <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}