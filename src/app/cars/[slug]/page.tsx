"use client";

import { useParams } from "next/navigation";

export default function CarDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  return <div>{slug}</div>;
}
