export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-white px-4 py-16">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    </div>
  );
}
