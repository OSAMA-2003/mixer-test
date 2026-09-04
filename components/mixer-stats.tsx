"use client";

import React from "react";

export default function MixerStats() {
  const stats = [
    { number: "+100K", label: "عميل سعيد في سوهاج" },
    { number: "+50", label: "مشروب وصنف طبيعي" },
    { number: "6", label: "فروع رئيسية بسوهاج" },
    { number: "100%", label: "مكونات طبيعية فريش" },
  ];

  return (
    <section className="bg-gradient-to-r from-[#004959] via-[#008ba3] to-[#015f70] py-14 text-white border-t border-b border-cyan-400/20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#fab818] tracking-tight mb-1 font-cairo">
                {stat.number}
              </span>
              <span className="text-sm sm:text-base font-bold text-gray-100">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
