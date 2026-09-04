"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Flame } from "lucide-react";

export default function MixerPromos() {
  return (
    <section className="py-16 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Promo 1: شيكات وميلك شيك */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 p-8 text-white shadow-xl flex flex-col justify-between min-h-[300px] group">
            <div className="relative z-10 max-w-[62%] text-right">
              <div className="inline-flex items-center gap-1 bg-black/20 text-[#fab818] px-3 py-1 rounded-full text-xs font-bold mb-3">
                <Flame className="w-3.5 h-3.5" />
                <span>إدمان عشاق الشوكولاتة في سوهاج</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black mb-2 font-cairo">
                أوريو & كيت كات شيك
              </h3>
              <p className="text-white/95 text-xs sm:text-sm font-semibold mb-6 leading-relaxed">
                غرقان شوكولاتة وآيس كريم فريش، تجربة تدوب في قلبك وتعدل مزاجك من أول رشفة!
              </p>
              <a
                href="#menu"
                className="inline-block bg-[#fab818] hover:bg-yellow-400 text-slate-900 font-black px-6 py-2.5 rounded-full shadow transition-all transform group-hover:scale-105 text-sm"
              >
                شوف المنيو
              </a>
            </div>

            <div className="absolute -left-4 -bottom-4 w-48 sm:w-56 h-56 opacity-95 group-hover:scale-105 transition-transform duration-300 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/products/p2.jpg"
                alt="أوريو شيك الخلاط سوهاج"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Promo 2: موخيتو ومنعشات الصيف */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-700 via-[#008ba3] to-cyan-500 p-8 text-white shadow-xl flex flex-col justify-between min-h-[300px] group">
            <div className="relative z-10 max-w-[62%] text-right">
              <div className="inline-flex items-center gap-1 bg-black/20 text-cyan-200 px-3 py-1 rounded-full text-xs font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>انتعاش سوهاج في الصيف</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black mb-2 font-cairo">
                موخيتو بلو لاجون
              </h3>
              <p className="text-white/95 text-xs sm:text-sm font-semibold mb-6 leading-relaxed">
                مزيج الليمون الأخضر، الصودا الفوارة، ونكهة البلو لاجون الساحرة لترطيب حرارة الصعيد.
              </p>
              <a
                href="#menu"
                className="inline-block bg-[#fab818] hover:bg-yellow-400 text-slate-900 font-black px-6 py-2.5 rounded-full shadow transition-all transform group-hover:scale-105 text-sm"
              >
                اطلب دلوقتي
              </a>
            </div>

            <div className="absolute -left-4 -bottom-4 w-48 sm:w-56 h-56 opacity-95 group-hover:scale-105 transition-transform duration-300 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/products/p5.jpg"
                alt="موخيتو الخلاط سوهاج"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
