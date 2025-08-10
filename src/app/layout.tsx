import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Base64 Encode and Decode - Free Online Tools | Base64toolsonline.com",
  description: "Free and simple online tools to encode and decode Base64. Quickly convert your data to Base64 format or decode it back to its original form. Support Unicode characters and real-time conversion.",
  keywords: "base64, encode, decode, converter, online tool, text to base64, base64 to text, unicode, free tool",
  authors: [{ name: "Base64 Tools Online" }],
  creator: "Base64 Tools Online",
  publisher: "Base64 Tools Online",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://base64toolsonline.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Base64 Encode and Decode - Free Online Tools",
    description: "Free and simple online tools to encode and decode Base64. Quickly convert your data to Base64 format or decode it back to its original form.",
    url: 'https://base64toolsonline.com',
    siteName: 'Base64 Tools Online',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Base64 Tools Online - Free Encode and Decode Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Base64 Encode and Decode - Free Online Tools",
    description: "Free and simple online tools to encode and decode Base64. Quickly convert your data to Base64 format or decode it back to its original form.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8115477477403051"
          crossOrigin="anonymous"
        />
        <link rel="canonical" href="https://base64toolsonline.com" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Base64 Tools Online",
              "description": "Free online tools to encode and decode Base64 data",
              "url": "https://base64toolsonline.com",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": "Base64 Tools Online"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}