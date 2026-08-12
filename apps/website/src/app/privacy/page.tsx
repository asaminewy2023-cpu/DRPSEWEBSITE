import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for the official website of the Office of the Deputy Regional President of the South Ethiopia Regional State.",
};

const sections = [
  {
    title: "Information We Collect",
    body: "When you contact us through the website, we may collect personal information you volunteer, such as your name, email address, phone number, and the content of your message. We do not collect personal information when you simply browse the site.",
  },
  {
    title: "How We Use Your Information",
    body: "Information you provide is used solely to respond to your inquiries, process requests submitted through the website, and improve our public services. We do not sell, rent, or trade your personal information to third parties.",
  },
  {
    title: "Cookies and Analytics",
    body: "The website may use cookies and similar technologies to understand how visitors navigate the site and to improve the user experience. You can disable cookies through your browser settings, though some features may not function as intended.",
  },
  {
    title: "Data Security",
    body: "We take reasonable technical and organizational measures to protect the personal information you submit through the website against unauthorized access, loss, or misuse.",
  },
  {
    title: "Third-Party Links",
    body: "The website may contain links to external services, including the social media channels of the regional government. Those services operate under their own privacy policies, and we are not responsible for their practices.",
  },
  {
    title: "Contact",
    body: "For questions about this privacy policy or the handling of your personal information, please contact the Office of the Deputy Regional President of the South Ethiopia Regional State.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-green-900 to-green-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            How the Office of the Deputy Regional President handles information collected through this website.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="mb-10 text-base leading-relaxed text-muted-foreground">
            This privacy policy explains how personal information is collected, used, and protected when you visit
            the official website of the Office of the Deputy Regional President of the South Ethiopia Regional State.
          </p>
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