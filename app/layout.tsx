import type { Metadata } from "next";
import { Anton, Poppins } from "next/font/google";
import "./globals.css";

// Anton ≈ Druk Text (heavy condensed display). Swap for licensed Druk .woff2 later.
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
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
  title: "BRIAM Asia — Structural Steel, Delivered Across Sea",
  description:
    "BRIAM Asia is Singapore's gateway to BRIAM Group's global engineering capabilities, including exclusive regional access to the SCE RD Steel Alliance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${poppins.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-surface text-ink">
        {children}
      </body>
    </html>
  );
}
