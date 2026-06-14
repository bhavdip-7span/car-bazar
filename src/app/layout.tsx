import type { Metadata } from "next";

import "./globals.css";
import Header from "@/components/common/header";

export const metadata: Metadata = {
  metadataBase: new URL("https://car-bazar-zeta.vercel.app"),

  title: {
    default: "CarBazar – Buy Used Cars Online",
    template: "%s | CarBazar",
  },

  description:
    "CarBazar is India’s trusted platform to buy used cars. Explore verified listings, compare prices, and get the best deals on second-hand cars easily.",

  keywords: [
    "used cars",
    "second hand cars",
    "buy used cars",
    "car comparison",
    "used car dealer",
    "CarBazar",
  ],

  icons: {
    icon: "/logo.ico",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "CarBazar – Buy Used Cars Online",
    description:
      "Explore verified used car listings, compare cars, and find the best deals across India.",
    url: "https://car-bazar-zeta.vercel.app",
    siteName: "CarBazar",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-graph-image.png",
        width: 1200,
        height: 630,
        alt: "CarBazar - Buy Used Cars Online",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CarBazar – Buy Used Cars Online",
    description:
      "Explore verified used car listings, compare cars, and find the best deals across India.",
    images: [
      {
        url: "/og-graph-image.png",
        width: 1200,
        height: 630,
        alt: "CarBazar - Buy Used Cars Online",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
