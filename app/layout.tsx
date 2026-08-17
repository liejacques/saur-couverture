import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = (requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host"))?.split(",")[0].trim();
  const forwarded = requestHeaders.get("x-forwarded-proto")?.split(",")[0].trim();
  const protocol = forwarded === "http" || forwarded === "https"
    ? forwarded
    : host?.startsWith("localhost") || host?.startsWith("127.0.0.1") ? "http" : "https";
  let origin: URL | undefined;
  try { if (host) origin = new URL(`${protocol}://${host}`); } catch { origin = undefined; }
  const image = origin ? new URL("/og.jpg", origin).toString() : undefined;
  const title = "Démonstration — Saur, couverture & zinguerie";
  const description = "Prototype fictif d’un site de couvreur-zingueur à Colmar : contenus, coordonnées et réalisations à remplacer.";

  return {
    metadataBase: origin,
    title: { default: title, template: "%s | Démonstration Saur Couverture" },
    description,
    robots: { index: false, follow: false, noarchive: true, nocache: true },
    openGraph: {
      title,
      description,
      locale: "fr_FR",
      type: "website",
      images: image ? [{ url: image, width: 1734, height: 907, alt: "Saur — Une toiture saine. Des explications claires." }] : [],
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : [],
    },
    icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body className={`${sans.variable} ${serif.variable}`}>{children}</body></html>;
}
