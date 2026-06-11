"use client";

import { useRef, useState } from "react";
import Button from "../ui/button";
import OverviewCard from "./overview-card";
import EMI from "../ui/emi";
import SpecsFeaturesCard from "./specs-features-card";
import SimilarCard from "./similar-card";

export default function TabScrollPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const overviewRef = useRef<HTMLDivElement>(null);
  const specsFeatures = useRef<HTMLDivElement>(null);
  const emiRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (
    ref: React.RefObject<HTMLDivElement | null>,
    tab: string,
  ) => {
    setActiveTab(tab);

    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="flex flex-col">
      <div className="sticky top-[80px] bg-white z-10  flex gap-6 border border-secondary-300  rounded-lg px-3 pt-5 pb-2 shadow">
        <Button
          variant="link"
          className={`${activeTab === "overview" ? "border-b-2 border-primary" : ""} rounded-none pb-3 px-6 hover:no-underline`}
          onClick={() => scrollToSection(overviewRef, "overview")}
          name=" Overview"
        />

        <Button
          variant="link"
          className={`${activeTab === "Specs & Features" ? "border-b-2 border-primary" : ""} rounded-none px-6 pb-3 hover:no-underline`}
          onClick={() => scrollToSection(specsFeatures, "Specs & Features")}
          name="Specs & Features"
        />
        <Button
          variant="link"
          className={`${activeTab === "EMI" ? "border-b-2 border-primary" : ""} rounded-none pb-3 px-6 hover:no-underline`}
          onClick={() => scrollToSection(emiRef, "EMI")}
          name="EMI"
        />

        <Button
          variant="link"
          className={`${activeTab === "Similar Cars" ? "border-b-2 border-primary" : ""} rounded-none px-6 pb-3 hover:no-underline`}
          onClick={() => scrollToSection(reviewsRef, "Similar Cars")}
          name="Similar Cars"
        />
      </div>

      <div className="flex flex-col gap-8 mt-8">
        <OverviewCard refProp={overviewRef} />
        <SpecsFeaturesCard refProp={specsFeatures} />
        <EMI refProp={emiRef} />

        <SimilarCard refProp={reviewsRef} />
      </div>
    </div>
  );
}
