import type { Metadata } from "next";

import { getCarBySlug } from "@/service/get-car";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const car = await getCarBySlug(slug);

  if (!car) {
    return {
      title: "Car Not Found",
    };
  }

  return {
    title: `${car.brand} ${car.model} ${car.registration_year}`,

    description: `${car.brand} ${car.model} ${car.registration_year}. Price ₹${car.discount_price}.`,

    alternates: {
      canonical: `https://car-bazar-zeta.vercel.app/${car.slug}`,
    },

    openGraph: {
      title: `${car.brand} ${car.model} ${car.registration_year}`,
      description: `${car.brand} ${car.model} available on CarBazar.`,
      images: [
        {
          url: car.images?.[0] || "/og-graph-image.png",
          width: 1200,
          height: 630,
          alt: `${car.brand} ${car.model}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${car.brand} ${car.model} ${car.registration_year}`,
      description: `${car.brand} ${car.model} available on CarBazar.`,
      images: [
        {
          url: car.images?.[0] || "/og-graph-image.png",
          width: 1200,
          height: 630,
          alt: `${car.brand} ${car.model}`,
        },
      ],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
