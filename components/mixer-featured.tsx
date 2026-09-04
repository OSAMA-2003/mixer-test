"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, ChevronLeft, ChevronRight, Plus, Check, Heart } from "lucide-react";

export interface MenuItem {
  id: string;
  name: string;
  category: "juices" | "shakes" | "mojito" | "summer" | "desserts" | "all";
  price: number;
  badge?: string;
  img: string;
  desc?: string;
}

export const DISHES: MenuItem[] = [
  {
    id: "strawberry-frappe",
    name: "سموذي الفراولة الطبيعي",
    category: "juices",
    price: 45,
    badge: "الأكثر طلباً 🔥",
    img: "/products/p1.jpg",
    desc: "فراولة بلدي طازجة 100% مع لمسة كريمة وثلج مجروش بطريقة الخلاط المميزة في سوهاج.",
  },
  {
    id: "oreo-shake",
    name: "أوريو شيك غرقان شوكولاتة",
    category: "shakes",
    price: 55,
    badge: "المميز ⭐",
    img: "/products/p2.jpg",
    desc: "ميلك شيك أوريو غني بصوص الشوكولاتة والآيس كريم وقطع بسكويت الأوريو المقرمشة.",
  },
  {
    id: "lemon-mint",
    name: "ليمون نعناع فريش مثلج",
    category: "summer",
    price: 35,
    badge: "انتعاش الصيف 🍋",
    img: "/products/p3.jpg",
    desc: "عصير ليمون طازج مع أوراق النعناع الخضراء ومكعبات الثلج لانتعاش فوري بطعم سوهاج الأصلي.",
  },
  {
    id: "blueberry-cream",
    name: "بلوبيري كريم شيك",
    category: "shakes",
    price: 60,
    badge: "جديد الخلاط ✨",
    img: "/products/p4.jpg",
    desc: "خلطة التوت البري مع الحليب المركز والآيس كريم لتقديم تجربة ساحرة من أول رشفة.",
  },
  {
    id: "blue-lagoon",
    name: "موخيتو بلو لاجون المنعش",
    category: "mojito",
    price: 45,
    badge: "بارد ومنعش 🧊",
    img: "/products/p5.jpg",
    desc: "شرائح الليمون الأخضر مع الصودا الفوارة ونكهة البلو لاجون ومكعبات الثلج المثلجة.",
  },
  {
    id: "fruit-bowl-special",
    name: "بول فواكه وقشطة الخلاط",
    category: "desserts",
    price: 65,
    badge: "دلّع نفسك 🍓",
    img: "/products/p6.jpg",
    desc: "تشكيلة فواكه موسمية طازجة مع آيس كريم مشكل، قشطة بلدي غنية، وصوص عسل طبيعي.",
  },
];

interface MixerFeaturedProps {
  activeCategory: string;
  onAddToCart?: (dish: MenuItem) => void;
}

export default function MixerFeatured({ activeCategory, onAddToCart }: MixerFeaturedProps) {
  const [addedId, setAddedId] = React.useState<string | null>(null);

  const filtered =
    activeCategory === "all"
      ? DISHES
      : DISHES.filter((d) => d.category === activeCategory);

  const handleAdd = (dish: MenuItem) => {
    if (onAddToCart) onAddToCart(dish);
    setAddedId(dish.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section
      id="menu"
      className="py-20 bg-gradient-to-b from-[#028090] to-[#015f70] text-white relative overflow-hidden"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="hidden sm:block text-xs font-bold text-amber-300 bg-white/10 px-4 py-2 rounded-full border border-white/20">
            طازة 100% يومياً في سوهاج
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-[#fab818] mb-1 font-bold text-sm tracking-wider uppercase">
              <Sparkles className="w-4 h-4" />
              <span>مختارات الخلاط الأصلية</span>
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-cairo">
              أطباق ومشروبات مميزة
            </h2>
            <p className="text-sm text-cyan-100 mt-2 font-medium">
              استمتع بأشهر خلطات الخلاط الحصرية في سوهاج بأعلى جودة ومكونات طبيعية.
            </p>
          </div>

          <div className="hidden sm:block text-xs font-bold text-amber-300 bg-white/10 px-4 py-2 rounded-full border border-white/20">
            دليفري سريع في سوهاج
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-5">
          {filtered.map((dish) => (
            <div
              key={dish.id}
              className={`bg-white/10 backdrop-blur-md border-2 ${
                dish.badge ? "border-[#fab818] shadow-xl ring-2 ring-[#fab818]/40" : "border-white/30"
              } rounded-3xl p-3.5 flex flex-col items-center text-right group hover:border-[#fab818] hover:-translate-y-2 transition-all duration-300`}
            >
              <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden mb-3 bg-black/20 relative shadow-inner">
                {dish.badge && (
                  <span className="absolute top-2 right-2 z-10 bg-[#fab818] text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-full shadow-md">
                    {dish.badge}
                  </span>
                )}
                <Image
                  src={dish.img}
                  alt={dish.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h3 className="font-bold text-base sm:text-lg mb-1.5 text-white font-cairo w-full text-right line-clamp-1">
                {dish.name}
              </h3>

              <p className="text-xs text-gray-200 mb-3 text-right line-clamp-2 leading-relaxed w-full">
                {dish.desc}
              </p>

              <div className="w-full flex items-center justify-between gap-2 mt-auto pt-2.5 border-t border-white/15">
                <span className="bg-[#fab818] text-slate-900 font-black px-3 py-1 rounded-full text-xs sm:text-sm shadow">
                  {dish.price} ج.م
                </span>

                <button
                  onClick={() => handleAdd(dish)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                    addedId === dish.id
                      ? "bg-emerald-400 text-black font-extrabold"
                      : "bg-white/20 hover:bg-[#fab818] text-white hover:text-slate-950 font-bold"
                  }`}
                  aria-label="أضف للطلب"
                >
                  {addedId === dish.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>تم</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      <span>اطلب</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Menu CTA Button */}
        <div className="mt-14 text-center">
          <a
            href="tel:01234567890"
            className="inline-flex items-center gap-3 bg-[#fab818] hover:bg-[#e5a510] text-slate-950 font-black text-lg px-10 py-3.5 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            <span>اطلب دليفري في سوهاج: 012 3456 7890</span>
          </a>
        </div>

      </div>
    </section>
  );
}
