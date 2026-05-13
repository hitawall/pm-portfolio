import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3, IBM_Plex_Mono } from "next/font/google";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { siteConfig, getBaseUrl } from "@/lib/config";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(getBaseUrl()),
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${sourceSans.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col bg-background text-foreground antialiased">
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
