import type { Metadata } from "next";

function cleanCarName(slugPart: string) {
  return slugPart
    .replace(
      /-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      "",
    )
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const cars = slug.split("_vs_").map(cleanCarName);

  const compareTitle = cars.join(" vs ");

  return {
    title: `${compareTitle} Comparison | CarBazar`,

    description: `Compare ${compareTitle}. Check price, mileage, specifications, features, safety ratings and performance side by side.`,

    alternates: {
      canonical: `https://car-bazar-zeta.vercel.app/compare-car/${slug}`,
    },

    openGraph: {
      title: `${compareTitle} Comparison`,
      description:
        "Compare price, specifications, mileage, features and performance side by side.",
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
      title: `${compareTitle} Comparison`,
      description:
        "Compare price, specifications, mileage, features and performance side by side.",
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
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
