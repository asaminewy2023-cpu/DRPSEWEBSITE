"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error("Unhandled error:", error);

  return (
    <html lang="en">
      <body className="h-full antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-16">
          <div className="mx-auto max-w-md text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900">
              Something went wrong
            </h1>
            <p className="mt-3 text-zinc-600">
              An unexpected problem occurred on our end. Please try again in a
              moment. If the issue keeps happening, contact the Office of the
              Deputy Regional President.
            </p>
            <button
              onClick={() => reset()}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
