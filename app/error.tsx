"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") console.error(error);
  }, [error]);

  return (
    <main className="page-shell" aria-labelledby="error-title">
      <div className="container">
        <div className="eyebrow">Something went wrong</div>
        <h1 id="error-title">This page hit an unexpected error.</h1>
        <p className="page-lede">You can retry the page or return to the portfolio.</p>
        <div className="actions">
          <button className="button primary" type="button" onClick={() => reset()}>Try again</button>
          <Link className="button" href="/">Back to portfolio</Link>
        </div>
      </div>
    </main>
  );
}
