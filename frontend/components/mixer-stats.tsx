"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

interface CounterNumberProps {
  value: string;
}

function CounterNumber({ value }: CounterNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(() => {
    const match = value.match(/^(\+?)(\d+)(.*)$/);
    if (!match) return "0";
    return `${match[1]}0${match[3]}`;
  });

  useEffect(() => {
    if (!isInView) return;

    const match = value.match(/^(\+?)(\d+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1];
    const target = parseInt(match[2], 10);
    const suffix = match[3];

    const controls = animate(0, target, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        setDisplayValue(`${prefix}${Math.round(latest)}${suffix}`);
      },
    });

    return () => controls.stop();
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
}

export default function MixerStats() {
  const stats = [
    { number: "+100K", label: "عميل سعيد في سوهاج" },
    { number: "+50", label: "مشروب وصنف طبيعي" },
    { number: "2", label: "فروع رئيسية بسوهاج" },
    { number: "100%", label: "مكونات طبيعية فريش" },
  ];

  return (
    <section className="bg-gradient-to-r from-[#004959] via-[#008ba3] to-[#015f70] py-14 text-white border-t border-b border-cyan-400/20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#fab818] tracking-tight mb-1 font-cairo">
                <CounterNumber value={stat.number} />
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
