"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Award, History, Heart, CheckCircle2 } from "lucide-react";

export default function MixerStory() {
  return (
    <section id="about" className="py-20 bg-[#faf8f5] relative overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Polaroid Team & Storefront Image */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative bg-white p-4 pb-8 rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300 max-w-md w-full border border-gray-100">
              
              {/* Tape Top */}
              <div className="washi-tape absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 rounded-sm transform rotate-1 z-10" />

              {/* Store & Customer Photo from /products/p6.jpg */}
              <div className="overflow-hidden rounded-xl bg-gray-100 border border-gray-200 aspect-[4/3] relative">
                <Image
                  src="/products/p6.jpg"
                  alt="عائلة وعشاق الخلاط في سوهاج"
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/* Handwritten Note Effect */}
              <div className="mt-4 flex items-center justify-between text-gray-700 px-2 font-bold text-base">
                <span>عشاق الخلاط من البداية</span>
                <span className="text-red-500 font-black flex items-center gap-1">
                  <Heart className="w-4 h-4 fill-red-500" /> من قلب سوهاج
                </span>
              </div>

              {/* Tape Bottom Corner */}
              <div className="washi-tape absolute -bottom-3 -right-3 w-20 h-6 rounded-sm transform -rotate-12" />
            </div>
          </div>

          {/* Right: Story Narrative & Highlights */}
          <div className="lg:col-span-6 text-right">
            <div className="inline-flex items-center gap-2 text-[#008ba3] font-black text-sm mb-2 bg-[#eef8fa] px-4 py-1 rounded-full">
              <CheckCircle2 className="w-4 h-4" />
              <span>قصتنا وجودتنا في سوهاج</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4 leading-tight font-cairo">
              مختلفين <span className="text-[#008ba3]">بطريقتنا</span>
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 font-medium">
              من قلب محافظة سوهاج وعروس النيل، بنقدملك في <span className="font-bold text-[#008ba3]">الخلاط</span> أحلى خلطات وأطيب طعم، بجودة مضمونة ومكونات طبيعية 100%.. عصائر فريش، سموذي، ميلك شيك، وموخيتو يروق مزاجك في كل فرع من فروعنا بسوهاج.
            </p>

            {/* Three Pillars Feature Highlights */}
            <div className="grid grid-cols-3 gap-4 mb-8 text-center border-y border-gray-200 py-6">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-cyan-100 text-[#008ba3] flex items-center justify-center text-xl mb-2">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="font-bold text-gray-800 text-sm">من قلب سوهاج</span>
              </div>

              <div className="flex flex-col items-center border-x border-gray-200 px-2">
                <div className="w-14 h-14 rounded-full bg-amber-100 text-[#fab818] flex items-center justify-center text-xl mb-2">
                  <Award className="w-6 h-6" />
                </div>
                <span className="font-bold text-gray-800 text-sm">جودة طبيعية 100%</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl mb-2">
                  <History className="w-6 h-6" />
                </div>
                <span className="font-bold text-gray-800 text-sm">أصالة وتميز</span>
              </div>
            </div>

            <a
              href="#branches"
              className="inline-block bg-[#fab818] hover:bg-[#e5a510] text-slate-900 font-extrabold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all text-sm"
            >
              تعرف على فروعنا في سوهاج
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
