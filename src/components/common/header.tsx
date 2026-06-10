"use client";
import Input from "../ui/input";
import Link from "next/link";
export default function Header() {
  return (
    <div className="flex justify-between items-center  max-w-xxl mx-auto w-full px-8 sticky top-0 z-50 bg-white border-b border-secondary-200 shadow">
      <Link href="/" className="flex items-center gap-2 cursor-pointers">
        <img src="/logo.ico" alt="logo" className="size-20" />
        <span className="font-bold text-2xl">Car Bazar</span>
      </Link>

      <div className="max-w-1/3 w-full">
        <Input
          placeholder="Search cars by brand, model or variant..."
          className="w-full"
        />
      </div>
    </div>
  );
}
