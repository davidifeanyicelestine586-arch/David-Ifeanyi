import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "David Ifeanyi — Mechatronics Engineering & Software Development",
  description:
    "Portfolio of David Ifeanyi, a Mechatronics Engineering student building practical software, web applications, and technical systems.",
  metadataBase: new URL("https://davidifeanyicelestine586-arch.github.io"),
  openGraph: {
    title: "David Ifeanyi — Mechatronics Engineering & Software Development",
    description:
      "A factual portfolio of projects, technical skills, and development work by David Ifeanyi.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
