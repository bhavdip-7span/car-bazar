import Link from "next/link";
import Button from "@/components/ui/button";
export default function Slug() {
  return (
    <div className="flex min-h-[100vh-120x] justify-center items-center flex-col">
      <img
        src="/page-not-found.svg"
        alt="page not found"
        className="size-48 md:size-96"
      ></img>
      <h1 className=" text-lg md:text-xl font-semibold">Car Not found</h1>
      <p className=" text-sm md:text-base font-medium text-secondary-400">
        The car you are looking for does not exist.
      </p>
      <Link href="/cars" className="mt-2">
        <Button name="Browse Cars" className="rounded-lg" />
      </Link>
    </div>
  );
}
