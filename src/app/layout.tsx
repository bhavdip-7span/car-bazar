import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "CarBazar – Buy Used Cars Online",
  description:
    "CarBazar is India’s trusted platform to buy used cars. Explore verified listings, compare prices, and get the best deals on second-hand cars easily.",
  icons: {
    icon: "/logo.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
