import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell" aria-labelledby="not-found-title">
      <div className="container">
        <div className="eyebrow">404 · Not found</div>
        <h1 id="not-found-title">That page isn’t here.</h1>
        <p className="page-lede">The page you requested may have moved, or the address may be incomplete.</p>
        <Link className="button primary" href="/">Back to portfolio →</Link>
      </div>
    </main>
  );
}
