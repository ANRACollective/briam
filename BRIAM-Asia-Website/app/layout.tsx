import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { Intro } from "@/components/ui/Intro";
import "./globals.css";

// Update this to your production domain (e.g. your Vercel URL) for correct OG/canonical URLs.
const SITE_URL = "https://briam-asia.vercel.app";

// Druk Text Medium — the licensed brand display face (headings).
// Exposed on the same --font-anton CSS var the design system already binds to,
// so no token/component changes are needed downstream.
const druk = localFont({
  src: "./fonts/DrukText-Medium.woff2",
  variable: "--font-anton",
  weight: "500",
  style: "normal",
  display: "swap",
});

// Poppins ≈ Galano Grotesque (geometric body). Swap for licensed Galano later.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BRIAM Asia — Structural Steel, Delivered Across Sea",
    template: "%s · BRIAM Asia",
  },
  description:
    "BRIAM Asia is Singapore's gateway to BRIAM Group's global engineering capabilities and the exclusive regional agent for the SCE RD Steel Alliance — standalone structural steel and silo-based turnkey projects across Southeast Asia.",
  keywords: [
    "BRIAM Asia",
    "SCE RD Steel Alliance",
    "structural steel Singapore",
    "square silo",
    "steel structures Southeast Asia",
    "Silbloxx",
    "turnkey silo projects",
  ],
  authors: [{ name: "BRIAM Asia" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "BRIAM Asia",
    title: "BRIAM Asia — Structural Steel, Delivered Across Sea",
    description:
      "Singapore's gateway to BRIAM Group and the exclusive regional agent for the SCE RD Steel Alliance.",
    locale: "en_SG",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "BRIAM Asia — Structural Steel, Delivered Across Sea",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BRIAM Asia — Structural Steel, Delivered Across Sea",
    description:
      "Singapore's gateway to BRIAM Group and the exclusive regional agent for the SCE RD Steel Alliance.",
    images: ["/og.jpg"],
  },
  icons: { icon: "/icon.png", apple: "/icon.png" },
  robots: { index: true, follow: true },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BRIAM Asia",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  description:
    "Singapore's gateway to BRIAM Group and the exclusive regional agent for the SCE RD Steel Alliance.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "75 High Street",
    postalCode: "179435",
    addressLocality: "Singapore",
    addressCountry: "SG",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "archit.newaskar@briamgroup.com",
    telephone: "+65-6595-6689",
    areaServed: ["SG", "TH", "VN", "ID", "MY", "PH", "MM", "KH"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${druk.variable} ${poppins.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-surface text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Intro />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
