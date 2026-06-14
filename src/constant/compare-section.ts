export const compareSections = [
  {
    title: "Car Overview",
    fields: [
      {
        label: "Price",
        key: "discount_price",
        better: "lower",
      },
      {
        label: "Fuel Type",
        key: "fuel_type",
      },
      {
        label: "Transmission",
        key: "transmission",
      },
      {
        label: "KM Driven",
        key: "km_driven",
        better: "lower",
      },
      {
        label: "Registration Year",
        key: "registration_year",
        better: "higher",
      },
      {
        label: "Ownership",
        key: "ownership",
        better: "lower",
      },
      {
        label: "Engine cc",
        key: "engine_cc",
        better: "higher",
      },
      {
        label: "Power",
        key: "power",
        better: "higher",
      },
      {
        label: "Mileage",
        key: "mileage",
        better: "higher",
      },
    ],
  },
] as const;
