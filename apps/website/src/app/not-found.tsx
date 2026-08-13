import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-white px-4 py-16">
      <div className="mx-auto max-w-md text-center">
        <p className="text-7xl font-bold tracking-tight text-primary/20">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="mt-3 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Check the address or head back home.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
