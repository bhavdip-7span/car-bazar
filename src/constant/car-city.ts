export const CarCitys = [
  "Mumbai",
  "Ahmedabad",
  "Surat",
  "Delhi",
  "Bangalore",
  "Rajkot",
  "Vadodara",
  "Pune",
  "Indore",
  "Gandhinagar",
  "Jamnagar",
  "Bhavnagar",
] as const;

export type City = (typeof CarCitys)[number];
