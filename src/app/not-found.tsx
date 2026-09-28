import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <h1 className="text-2xl font-bold">Page not found</h1>
        <p className="mt-2 text-sm text-muted">That page does not exist or was moved.</p>
        <Link
          href="/dashboard"
          className="mt-4 inline-block text-sm font-medium text-brand-700 hover:underline"
        >
          Back to the dashboard
        </Link>
      </div>
    </div>
  );
}
