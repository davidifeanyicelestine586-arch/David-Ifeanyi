import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./typography.css";

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
        {children}
      </body>
    </html>
  );
}
