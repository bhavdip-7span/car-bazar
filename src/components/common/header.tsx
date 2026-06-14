"use client";
import Input from "../ui/input";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CarBrands } from "@/constant/car-brand";
import { useRouter, usePathname } from "next/navigation";
import Button from "../ui/button";
import Image from "next/image";

import { CarCitys } from "@/constant/car-city";
export default function Header() {
  const router = useRouter();

  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const isHomePage = pathname === "/";

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);

      if (search.trim()) {
        params.set("search", search);
      } else {
        params.delete("search");
        if (pathname === "/cars") {
          router.replace(`/cars?${params.toString()}`);
        }
        return;
      }

      router.replace(`/cars?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div
      className={
        isHomePage
          ? "absolute top-0 left-0 right-0 z-50"
          : "border-b border-secondary-200 shadow bg-white"
      }
    >
      <div className="flex justify-between items-center  max-w-xxl mx-auto w-full h-20 px-4 lg:px-8 ">
        <Link href="/" className="flex items-center gap-2 cursor-pointers">
          <div className="relative w-16 h-16 lg:w-20 lg:h-20">
            <Image src="/logo.ico" alt="logo" fill className="object-contain" />
          </div>
          <p
            className={` font-bold text-base lg:text-2xl ${isHomePage ? " text-white" : "text-black"}`}
          >
            Car <span className="text-primary"> Bazar</span>
          </p>
        </Link>
        <nav className=" items-center gap-4 hidden md:flex">
          <div className="relative group flex gap-1 items-center">
            <Button
              variant="link"
              name="Brand"
              className={`hover:no-underline group-hover:text-primary ${isHomePage ? "text-white" : "fill-secondary"}`}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className={`transition-all duration-300 group-hover:rotate-180 ${isHomePage ? "fill-white" : "fill-secondary"} group-hover:fill-primary `}
            >
              <path d="M8.12 14.71L12 10.83l3.88 3.88a.996.996 0 1 0 1.41-1.41L12.7 8.71a.996.996 0 0 0-1.41 0L6.7 13.3a.996.996 0 0 0 0 1.41c.39.38 1.03.39 1.42 0" />
            </svg>
            <div className="absolute z-[999] top-full left-0 0 invisible opacity-0 group-hover:visible group-hover:opacity-100 bg-white shadow-lg rounded-lg w-96 border border-secondary-200">
              <div className="p-4 text-sm font-semibold grid grid-cols-4 gap-4">
                {CarBrands.map((item) => (
                  <Link
                    key={item}
                    href={`/cars?brands=${item}`}
                    className="w-fit py-1 text-secondary hover:text-primary   px-2 whitespace-nowrap"
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
              className={`hover:no-underline group-hover:text-primary ${isHomePage ? "text-white" : "text-secondary"}`}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className={`transition-all duration-300 group-hover:rotate-180 ${isHomePage ? "fill-white" : "fill-secondary"} group-hover:fill-primary `}
            >
              <path d="M8.12 14.71L12 10.83l3.88 3.88a.996.996 0 1 0 1.41-1.41L12.7 8.71a.996.996 0 0 0-1.41 0L6.7 13.3a.996.996 0 0 0 0 1.41c.39.38 1.03.39 1.42 0" />
            </svg>
            <div className="absolute z-[999] top-full left-0 0 invisible opacity-0 group-hover:visible group-hover:opacity-100 bg-white shadow-lg rounded-lg w-96 border border-secondary-200">
              <div className="p-4 text-sm font-semibold grid grid-cols-4 gap-4">
                {CarCitys.map((item) => (
                  <Link
                    key={item}
                    href={`/cars?location=${item}`}
                    className="w-fit py-1 text-secondary hover:text-primary   px-2 whitespace-nowrap"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link
            className={`hover:no-underline hover:text-primary font-semibold text-sm ${isHomePage ? "text-white" : "text-secondary"}`}
            href="/cars"
          >
            Cars
          </Link>
        </nav>
        <div className=" max-w-3/5 md:max-w-1/3 w-full">
          <Input
            value={search}
            placeholder="Search cars by brand, model or variant..."
            className={`${isHomePage ? "text-white  placeholder:text-white" : "text-black placeholder:text-secondary"} w-full`}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
