"use client";

import { useRef, useState, useEffect } from "react";
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

  const [isSticky, setIsSticky] = useState(false);
  const tabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    if (tabRef.current) {
      observer.observe(tabRef.current);
    }

    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const sections = [
      { id: "overview", ref: overviewRef },
      { id: "Specs & Features", ref: specsFeatures },
      { id: "EMI", ref: emiRef },
      { id: "Similar Cars", ref: reviewsRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = sections.find(
              (s) => s.ref.current === entry.target,
            );

            if (section) {
              setActiveTab(section.id);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "-100px 0px -30% 0px",
      },
    );
    sections.forEach((section) => {
      if (section.ref.current) {
        observer.observe(section.ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);
  const scrollToSection = (
    ref: React.RefObject<HTMLDivElement | null>,
    tab: string,
  ) => {
    setActiveTab(tab);
    if (tab === "overview") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    if (ref.current) {
      const headerHeight = 80;
      const top =
        ref.current.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div ref={tabRef} className="h-1" />

      <div
        className={` ${
          isSticky
            ? "fixed top-0 inset-x-0 z-40 border-b border-secondary-300 bg-white shadow-md px-8 pt-4"
            : "relative rounded-xl border border-secondary-300 bg-white shadow px-3 pt-4"
        }
    `}
      >
        {isSticky && (
          <Button
            variant="outline"
            className="px-2 py-1 rounded-lg mb-2 mx-3 "
            name={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#bdbdbd"
                  d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
                />
              </svg>
            }
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          />
        )}
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
