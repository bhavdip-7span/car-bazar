import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/button";
export default function Slug() {
  return (
    <div className="flex min-h-[100vh-120x] justify-center items-center flex-col">
      <Image
        src="/page-not-found.svg"
        alt="page not found"
        width={384}
        height={384}
        className="w-48 h-48 md:w-96 md:h-96"
      />
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
