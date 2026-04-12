import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-10 text-foreground">
      <div className="max-w-[640px] text-center">
        <p className="text-sm uppercase tracking-[0.24em] text-[#79e6a7]">Not found</p>
        <h1 className="mt-6 text-6xl font-semibold tracking-[-0.05em] text-white">
          This page slipped out of the forge.
        </h1>
        <p className="mt-6 text-lg leading-8 text-white/65">
          The route you requested does not exist, or it has been moved while the product is evolving.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex h-12 items-center rounded-full bg-white px-6 text-sm font-semibold text-slate-950"
          >
            Go home
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex h-12 items-center rounded-full border border-white/12 px-6 text-sm font-medium text-white/82"
          >
            Open dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
