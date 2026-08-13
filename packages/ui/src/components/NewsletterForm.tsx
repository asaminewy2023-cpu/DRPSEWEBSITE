"use client";

import { useState } from "react";
import { useLanguage } from "../lib/LanguageContext";

const CMS_API = process.env.NEXT_PUBLIC_CMS_BASE_URL ?? "http://localhost:3000";

export function NewsletterForm() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!value || !value.includes("@")) return;
    setPending(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch(`${CMS_API}/api/subscribers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: value,
          name: name.trim() || undefined,
        }),
      });
      if (res.ok) {
        setEmail("");
        setName("");
        setMessage(t.footer.newsletterSuccess);
      } else if (res.status === 409) {
        setError(t.footer.newsletterExists);
      } else {
        setError(t.footer.newsletterError);
      }
    } catch {
      setError(t.footer.newsletterError);
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
        {t.footer.newsletterDesc}
      </p>
      {message && <p className="mt-2 text-sm text-green-700">{message}</p>}
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
      <div className="mt-3 flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder={t.footer.newsletterEmail}
          aria-label={t.footer.newsletterEmail}
          className="min-w-0 flex-1 rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? t.footer.newsletterPending : t.footer.newsletterSubscribe}
        </button>
      </div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={t.footer.newsletterName}
        aria-label={t.footer.newsletterName}
        className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </form>
  );
}