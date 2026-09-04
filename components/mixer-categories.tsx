"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, CornerDownLeft, Sparkles } from "lucide-react";

interface MixerCategoriesProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const CATEGORIES = [
  {
    id: "all",
    name: "الكل",
    gradient: "from-amber-400 to-amber-600",
    img: "/products/p1.jpg",
  },
  {
    id: "juices",
    name: "عصائر طبيعية",
    gradient: "from-red-500 to-amber-500",
    img: "/products/p1.jpg",
  },
  {
    id: "shakes",
    name: "ميلك شيك",
    gradient: "from-purple-500 to-pink-500",
    img: "/products/p2.jpg",
  },
  {
    id: "summer",
    name: "ليمون ومنعشات",
    gradient: "from-emerald-400 to-teal-500",
    img: "/products/p3.jpg",
  },
  {
    id: "mojito",
    name: "موخيتو فريش",
    gradient: "from-cyan-500 to-blue-500",
    img: "/products/p5.jpg",
  },
  {
    id: "desserts",
    name: "بولات وحلويات",
    gradient: "from-amber-300 to-yellow-500",
    img: "/products/p6.jpg",
  },
];

export default function MixerCategories({
  activeCategory,
  onSelectCategory,
}: MixerCategoriesProps) {
  return (
    <section className="relative bg-amber-50/40 py-16 border-t border-b border-amber-100/60" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">

          {/* Badge */}
          <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-amber-200 shadow-sm text-xs font-bold text-amber-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>منيو الخلاط في سوهاج</span>
          </div>

          {/* Heading */}
          <div className="text-center md:text-right flex items-center gap-3">
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-cairo">
                اختار <span className="text-[#008ba3]">اللي على مزاجك</span>
              </h2>
              <span className="block w-24 h-1.5 bg-[#fab818] rounded-full mt-1.5 mr-auto md:mr-0" />
            </div>
            <CornerDownLeft className="text-[#fab818] w-6 h-6 hidden sm:inline-block" />
          </div>

        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div
                  className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr ${cat.gradient} shadow-md group-hover:scale-105 group-hover:shadow-xl transition-all duration-300 ${
                    isSelected ? "ring-4 ring-[#fab818] scale-105" : ""
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-white p-1 relative shadow-inner">
                    <Image
                      src={cat.img}
                      alt={cat.name}
                      fill
                      className="object-cover rounded-full p-0.5"
                    />
                  </div>
                </div>
                <span
                  className={`mt-3 font-bold text-sm sm:text-base transition-colors text-center ${
                    isSelected
                      ? "text-[#008ba3] font-black underline decoration-[#fab818] decoration-2"
                      : "text-gray-800 group-hover:text-[#008ba3]"
                  }`}
                >
                  {cat.name}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
