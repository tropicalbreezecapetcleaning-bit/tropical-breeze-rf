import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tropical Breeze RF™ | Residue-Free Cleaning | MD & DE Eastern Shore",
    template: "%s | Tropical Breeze RF™",
  },
  description:
    "Maryland and Delaware's only residue-free cleaning service. Carpet, upholstery, tile, hardwood, windows & EZ Breeze. Serving 33+ cities across the Eastern Shore. Call 443-856-3244.",
  metadataBase: new URL("https://tropicalbreezerf.com"),
  alternates: {
    canonical: "https://tropicalbreezerf.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tropicalbreezerf.com",
    siteName: "Tropical Breeze RF™",
    title: "Tropical Breeze RF™ | Residue-Free Cleaning | MD & DE Eastern Shore",
    description:
      "Maryland and Delaware's only residue-free cleaning service. Carpet, upholstery, tile, hardwood, windows & EZ Breeze. Serving 33+ cities across the Eastern Shore.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tropical Breeze RF™ — Residue-Free Cleaning on the Eastern Shore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tropical Breeze RF™ | Residue-Free Cleaning | MD & DE Eastern Shore",
    description:
      "Maryland and Delaware's only residue-free cleaning service. Serving 33+ cities across the Eastern Shore.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Tropical Breeze RF™",
  alternateName: "Tropical Breeze RF",
  url: "https://tropicalbreezerf.com",
  logo: "https://tropicalbreezerf.com/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-443-856-3244",
    contactType: "customer service",
    areaServed: ["MD", "DE"],
    availableLanguage: "English",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "",
    addressLocality: "Salisbury",
    addressRegion: "MD",
    postalCode: "21801",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.facebook.com/tropicalbreezerf",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
