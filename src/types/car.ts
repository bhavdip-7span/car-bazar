export type Car = {
  id: string;
  created_at: string;

  brand: string;
  model: string;
  variant: string;
  slug: string;

  registration_year: number;
  registration_location: string;

  fuel_type: "petrol" | "diesel" | "electric" | "hybrid";
  ownership: "first" | "second" | "third" | "fourth";
  transmission: "manual" | "automatic";

  seats: number;
  engine_cc: number;
  power: number;
  mileage: number;

  body_type: string;

  km_driven: number;

  original_price: number;
  discount_price: number;

  badge: string;

  images: string[];
  color: string;

  description: string;

  feature: string[];
};
