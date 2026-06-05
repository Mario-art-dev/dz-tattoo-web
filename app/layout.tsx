import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import SiteShell from "@/components/ui/SiteShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://dztattoo.es'),
  title: "D.Z Tattoo Studio | Tatuajes Premium en Silla, Valencia",
  description:
    "D.Z Tattoo Studio — Arte con alma. Especialistas en realismo, fine line, microblading, micropigmentación y eliminación láser en Silla, Valencia. Reserva tu cita.",
  keywords: [
    "tatuajes Silla",
    "tatuajes Valencia",
    "realismo Valencia",
    "fine line Valencia",
    "microblading Valencia",
    "micropigmentación Valencia",
    "cover up Valencia",
    "láser tatuajes Valencia",
    "estudio tatuajes premium",
    "DZ Tattoo",
  ],
  authors: [{ name: "D.Z Tattoo Studio" }],
  creator: "D.Z Tattoo Studio",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://dztattoo.es",
    siteName: "D.Z Tattoo Studio",
    title: "D.Z Tattoo Studio | Tatuajes Premium en Valencia",
    description:
      "Arte con alma. Especialistas en realismo, fine line, microblading y láser en Silla, Valencia.",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "D.Z Tattoo Studio",
    description: "Arte con alma. Tatuajes premium en Silla, Valencia.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: "https://dztattoo.es" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased grain-overlay`}
    >
      <body className="bg-[#050505] text-[#E8E2D9] min-h-screen overflow-x-hidden">
        <SmoothScrollProvider>
          <SiteShell />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
