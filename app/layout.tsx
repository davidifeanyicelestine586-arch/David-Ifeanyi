import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://david-ifeanyi-pi.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "David Ifeanyi — Mechatronics Engineering & Software Development",
  description:
    "Portfolio of David Ifeanyi, a Mechatronics Engineering student building practical software, web applications, and technical systems.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "David Ifeanyi — Mechatronics Engineering & Software Development",
    description:
      "A factual portfolio of projects, technical skills, and development work by David Ifeanyi.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "David Ifeanyi — Mechatronics Engineering & Software Development",
    description:
      "A factual portfolio of projects, technical skills, and development work by David Ifeanyi.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <style>{`
          .skip-link {
            position: fixed;
            top: 12px;
            left: 12px;
            z-index: 100;
            transform: translateY(-200%);
            padding: 10px 14px;
            border: 1px solid var(--accent);
            border-radius: var(--radius-md);
            background: var(--surface-raised);
            color: var(--text);
            font-weight: 700;
            box-shadow: 0 8px 24px rgba(0,0,0,.35);
          }
          .skip-link:focus-visible {
            transform: translateY(0);
            outline: 3px solid var(--accent);
            outline-offset: 3px;
          }
          .project-type,
          .project-meta > span:last-child {
            color: var(--muted);
          }
        `}</style>
        {children}
      </body>
    </html>
  );
}
