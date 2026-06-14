import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Used Cars for Sale",
  description:
    "Browse verified used cars. Filter by brand, model, fuel type, transmission, and price to find your next car.",

  alternates: {
    canonical: "https://car-bazar-zeta.vercel.app/cars",
  },

  openGraph: {
    title: "Used Cars for Sale",
    description:
      "Browse verified used cars. Filter by brand, model, fuel type, transmission, and price.",
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
    title: "Used Cars for Sale",
    description:
      "Browse verified used cars. Filter by brand, model, fuel type, transmission, and price.",
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

export default function CarsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
