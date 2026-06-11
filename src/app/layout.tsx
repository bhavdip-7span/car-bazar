import type { Metadata } from "next";

import "./globals.css";
import Header from "@/components/common/header";

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
    <html lang="en" className="h-full">
      <body className="h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
