"use client";

import { useState, useEffect } from "react";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export default function Accordion({
  title,
  children,
  defaultOpen = false,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

  return (
    <div className="border border-secondary-200 rounded-lg shadow ">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between p-4 cursor-pointer text-secondary-600"
      >
        <span className="font-medium">{title}</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path fill="currentColor" d="M7 10l5 5l5-5z" />
        </svg>
      </button>

      <div
        className={` overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[720px]" : "max-h-0"
        }`}
      >
        <div className="px-4 pb-4 mt-4">{children}</div>
      </div>
    </div>
  );
}
