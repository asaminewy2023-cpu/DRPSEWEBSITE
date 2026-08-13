"use client";

import { useState } from "react";
import { useLanguage } from "@sevp/ui";
import { submitComment } from "@/lib/cms-data";
import type { Comment } from "@sevp/shared";

type CommentSectionProps = {
  postId: number;
  comments: Comment[];
};

export function CommentSection({ postId, comments }: CommentSectionProps) {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedContent = content.trim();
    if (!trimmedName || !trimmedContent) return;
    setPending(true);
    setMessage(null);
    setError(null);
    const result = await submitComment({
      post: postId,
      name: trimmedName,
      email: email.trim() || undefined,
      content: trimmedContent,
    });
    setPending(false);
    if (result.success) {
      setName("");
      setEmail("");
      setContent("");
      setMessage(t.blog.commentSubmitSuccess);
    } else {
      setError(t.blog.commentSubmitError);
    }
  };

  return (
    <section className="mt-16 border-t border-border pt-12" id="comments">
      <h2 className="text-2xl font-bold text-foreground">{t.blog.comments}</h2>
      <div className="mt-2 h-1 w-12 rounded-full bg-primary" />

      {comments.length > 0 ? (
        <ul className="mt-8 space-y-6">
          {comments.map((comment) => (
            <li key={comment.id} className="rounded-xl border border-border bg-muted/50 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {comment.name.charAt(0).toUpperCase()}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{comment.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground">{comment.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-sm text-muted-foreground">{t.blog.commentsEmpty}</p>
      )}

      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-xl border border-border bg-muted/50 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t.blog.commentName}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t.blog.commentEmail}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t.blog.commentContent}</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={4}
              className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          {message && <p className="text-sm text-green-700">{message}</p>}
          {error && <p className="text-sm text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? t.blog.commentSubmitPending : t.blog.commentSubmit}
          </button>
        </form>
    </section>
  );
}
