"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import { Car } from "@/types/car";
import ImageCarousel from "@/components/ui/image-carousel";
import TabScrollPage from "@/components/car-details/tab";
import { useCarStore } from "@/store/car-store";
import MasterCard from "@/components/car-details/master-card";
import CompareBar from "@/components/car-details/compare-bar";
import Footer from "@/components/home/footer";
import Link from "next/link";
export default function CarDetailPage() {
  const params = useParams();
  const [notFound, setNotFound] = useState(false);
  const [carDetails, setCarDetails] = useState<Car | null>(null);
  const setCar = useCarStore((state) => state.setCar);
  const setSimilarCars = useCarStore((state) => state.setSimilarCars);
  const loading = useCarStore((state) => state.loadingCar);

  const setLoadingRecommendedCars = useCarStore(
    (state) => state.setLoadingRecommendedCars,
  );
  const setLoading = useCarStore((state) => state.setLoadingCar);

  const setLoadingSimilarCars = useCarStore(
    (state) => state.setLoadingSimilarCars,
  );
  console.log("CAR DETAILS PAGE LOADED");
  const setRecommendedCars = useCarStore((state) => state.setRecommendedCar);
  const slug = params.slug as string;
  console.log(slug);
  useEffect(() => {
    if (!slug) return;
    fetchCarDetails();
  }, [slug]);
  async function fetchCarDetails() {
    if (!slug) return;
    try {
      setLoadingRecommendedCars(true);
      setLoadingSimilarCars(true);
      setLoading(true);
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("slug", slug)
        .single();
      if (error) {
        console.log(error);
        setNotFound(true);

        return;
      }
      if (data) {
        const { data: similarCar, error } = await supabase
          .from("cars")
          .select("*")
          .eq("body_type", data?.body_type)
          .gte("original_price", data.original_price - 300000)
          .lte("original_price", data.original_price + 300000)
          .neq("slug", slug)
          .limit(8);
        setLoadingSimilarCars(false);

        if (similarCar) {
          setSimilarCars(similarCar);
        }

        const { data: recommendedCar } = await supabase
          .from("cars")
          .select("*")
          .lt("original_price", data?.original_price + 200000)
          .gt("original_price", data?.original_price - 200000)
          .neq("slug", slug)
          .limit(8);
        if (recommendedCar) {
          setRecommendedCars(recommendedCar);
        }
        setLoadingRecommendedCars(false);
      }

      setCarDetails(data ?? null);
      setCar(data);
    } catch (error) {
      console.log("something went wrong");
    } finally {
      setLoading(false);
    }
  }
  if (notFound) {
    return (
      <div className="flex min-h-[100vh-120x] justify-center items-center flex-col">
        <img
          src="/page-not-found.svg"
          alt="page not found"
          className="size-48 md:size-96"
        ></img>
        <h1 className=" text-lg md:text-xl font-semibold">Car not found</h1>
        <p className=" text-sm md:text-base font-medium text-secondary-400">
          The car you are looking for does not exist.
        </p>
        <Link
          href="/cars"
          className="px-6 py-2 text-sm font-semibold bg-primary rounded-lg hover:bg-primary-800 text-white mt-2 md:mt-4"
        >
          Explore Cars
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <div className="flex flex-col lg:flex-row gap-4 mt-8 px-4 md:px-8 max-w-xxl mx-auto w-full">
        {loading && (
          <div className="fixed inset-0 flex  items-center justify-center bg-black/10  z-50">
            <img
              src="/car-animation.svg"
              alt="car animation"
              className="w-48 h-48"
            />
          </div>
        )}
        <div className="flex flex-col gap-4 w-full lg:w-6/10">
          <div className=" rounded-lg overflow-hidden border border-gray-300">
            {carDetails ? (
              <ImageCarousel
                images={carDetails?.images || []}
                className="h-98"
              />
            ) : (
              <div className="bg-secondary-300 animate-pulse w-full h-98"></div>
            )}
          </div>
          <div className="block lg:hidden w-full">
            <MasterCard />
          </div>
          <TabScrollPage />
        </div>
        <div className="hidden lg:block w-4/10">
          <MasterCard />
        </div>

        <CompareBar />
      </div>
      <Footer />
    </div>
  );
}
