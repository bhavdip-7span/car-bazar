import Link from "next/link";
import Button from "@/components/ui/button";
export default function Slug() {
  return (
    <div className="flex min-h-[100vh-120x] justify-center items-center flex-col px-4">
      <img
        src="/page-not-found.svg"
        alt="page not found"
        className="size-48 md:size-96"
      ></img>
      <h1 className=" text-lg md:text-xl font-semibold">
        {" "}
        No Cars Selected for Comparison
      </h1>
      <p className=" text-sm md:text-base font-medium text-secondary-400 max-w-96 text-center w-full">
        Start by browsing our available cars and add your favorites to compare
        them side by side.
      </p>
      <Link href="/cars" className="mt-2">
        <Button name="Browse Cars" className="rounded-lg" />
      </Link>
    </div>
  );
}
