"use client";
import Input from "../ui/input";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CarBrands } from "@/constant/car-brand";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Button from "../ui/button";

import { CarCitys } from "@/constant/car-city";
export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);
  useEffect(() => {
    // Run search logic only on cars listing page
    if (pathname !== "/cars") return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (search.trim()) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      if (search.trim()) {
        router.replace(`/cars?${params.toString()}`);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, pathname, searchParams, router]);
  return (
    <div className="bg-white border-b border-secondary-200 shadow">
      <div className="flex justify-between items-center  max-w-xxl mx-auto w-full h-20 px-8 ">
        <Link href="/" className="flex items-center gap-2 cursor-pointers">
          <img src="/logo.ico" alt="logo" className="size-20" />
          <span className="font-bold text-2xl">Car Bazar</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="relative group flex gap-1 items-center">
            <Button
              variant="link"
              name="Brand"
              className="hover:no-underline group-hover:text-primary"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="transition-all duration-300 group-hover:rotate-180 group-hover:fill-primary "
            >
              <path
                fill="#00000"
                d="M8.12 14.71L12 10.83l3.88 3.88a.996.996 0 1 0 1.41-1.41L12.7 8.71a.996.996 0 0 0-1.41 0L6.7 13.3a.996.996 0 0 0 0 1.41c.39.38 1.03.39 1.42 0"
              />
            </svg>
            <div className="absolute z-[999] top-full left-0 0 invisible opacity-0 group-hover:visible group-hover:opacity-100 bg-white shadow-lg rounded-lg w-96 border border-secondary-200">
              <div className="p-4 text-sm font-semibold grid grid-cols-4 gap-4">
                {CarBrands.map((item) => (
                  <Link
                    key={item}
                    href={`/cars?brands=${item}`}
                    className="w-fit py-1 hover:bg-gray-100 rounded px-2 whitespace-nowrap"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="relative group flex gap-1 items-center">
            <Button
              variant="link"
              name="Location"
              className="hover:no-underline group-hover:text-primary"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="transition-all duration-300 group-hover:rotate-180 group-hover:fill-primary "
            >
              <path
                fill="#00000"
                d="M8.12 14.71L12 10.83l3.88 3.88a.996.996 0 1 0 1.41-1.41L12.7 8.71a.996.996 0 0 0-1.41 0L6.7 13.3a.996.996 0 0 0 0 1.41c.39.38 1.03.39 1.42 0"
              />
            </svg>
            <div className="absolute z-[999] top-full left-0 0 invisible opacity-0 group-hover:visible group-hover:opacity-100 bg-white shadow-lg rounded-lg w-96 border border-secondary-200">
              <div className="p-4 text-sm font-semibold grid grid-cols-4 gap-4">
                {CarCitys.map((item) => (
                  <Link
                    key={item}
                    href={`/cars?location=${item}`}
                    className="w-fit py-1 hover:bg-gray-100 rounded px-2 whitespace-nowrap"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link
            className="font-semibold text-sm hover:text-primary "
            href="/cars"
          >
            All Cars
          </Link>
        </div>
        <div className="max-w-1/3 w-full">
          <Input
            value={search}
            placeholder="Search cars by brand, model or variant..."
            className="w-full"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
