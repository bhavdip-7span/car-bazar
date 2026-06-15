export type CarFilters = {
  brands: string[];
  models: string[];
  colors: string[];
  fuelTypes: string[];
  transmissions: string[];
  ownership: string[];
  seats: number[];
  bodyType: string[];
  location: string[];

  search?: string | null;

  price: [number, number];
  year: [number, number];
  kms: [number, number];

  engine: string | null;
};
