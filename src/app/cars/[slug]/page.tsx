"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import { Car } from "@/types/car";
import ImageCarousel from "@/components/ui/image-carousel";
import TabScrollPage from "@/components/car-details/tab";
import { useCarStore } from "@/store/car-store";
import MasterCard from "@/components/car-details/master-card";
import CompareBar from "@/components/common/compare-bar";
export default function CarDetailPage() {
  const params = useParams();
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
  return (
    <div className="flex gap-4 mt-8 px-8 max-w-xxl mx-auto w-full mb-8">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/10  z-50">
          <img
            src="/car-animation.svg"
            alt="car animation"
            className="w-48 h-48"
          />
        </div>
      )}
      <div className="flex flex-col gap-4 w-6/10">
        <div className=" rounded-lg overflow-hidden border border-gray-300">
          {carDetails ? (
            <ImageCarousel images={carDetails?.images || []} className="h-98" />
          ) : (
            <div className="bg-secondary-300 animate-pulse w-full h-98"></div>
          )}
        </div>
        <TabScrollPage />
      </div>
      <div className="w-4/10">
        <MasterCard />
      </div>
      <CompareBar />
    </div>
  );
}
