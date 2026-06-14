"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
type Props = {
  className?: string;
  images: string[];
  onClick?: () => void;
};

export default function ImageCarousel({ images, className, onClick }: Props) {
  const [current, setCurrent] = useState(0);

  if (!images?.length) return null;

  const next = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div
      className={cn(
        "relative w-full h-48 overflow-hidden rounded-lg",
        className,
      )}
    >
      <div
        onClick={onClick}
        className="flex w-full h-full transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`slide-${i}`}
            className="min-w-full h-full flex-shrink-0 object-cover"
          />
        ))}
      </div>

      <button
        onClick={(e) => {
          prev();
        }}
        className="absolute left-2 cursor-pointer top-1/2 -translate-y-1/2  bg-white text-secondary opacity-70 hover:opacity-100 px-2 rounded-full shadow"
      >
        ❮
      </button>

      <button
        onClick={(e) => {
          next();
        }}
        className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 bg-white text-secondary opacity-70 hover:opacity-100  px-2 rounded-full shadow"
      >
        ❯
      </button>

      <div className="absolute bottom-2 w-full flex justify-center gap-1">
        {images.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full cursor-pointer transition-all shadow ${
              i === current ? "bg-white scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
