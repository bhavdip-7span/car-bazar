import type { MetadataRoute } from "next";
import { getCars } from "@/service/get-cars";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cars = await getCars();

  const carUrls = cars.map((car) => ({
    url: `https://car-bazar-zeta.vercel.app/cars/${car.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: "https://car-bazar-zeta.vercel.app",
      lastModified: new Date(),
    },
    {
      url: "https://car-bazar-zeta.vercel.app/cars",
      lastModified: new Date(),
    },
    ...carUrls,
  ];
}
