"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Plus, Check, ArrowRight, X } from "lucide-react";
import MixerHeader from "@/components/mixer-header";
import MixerFooter from "@/components/mixer-footer";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/lib/data.js";
import { useCart } from "@/context/CartContext";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedId, setAddedId] = useState<string | null>(null);

  const [showMenuModal, setShowMenuModal] = useState(false);

  const { addToCart, totalItems, totalPrice } = useCart();

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleAdd = (item: (typeof MENU_ITEMS)[0]) => {
    addToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-gray-900 font-sans selection:bg-[#fab818] selection:text-[#015f70] pb-24" dir="rtl">
      {/* Header Navigation */}
      <MixerHeader isVisible={true} />

      {/* Hero Banner Section */}
      <section className="pt-28 pb-16 sm:pt-36 sm:pb-20 bg-gradient-to-b from-[#004754] via-[#008ba3] to-[#015f70] text-white relative overflow-hidden">
        {/* Background glow Orbs */}
        <div className="pointer-events-none absolute -left-20 top-10 w-80 h-80 rounded-full bg-[#fab818]/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Right: Text & Search */}
            <div className="lg:col-span-7 text-center lg:text-right">
              <div className="mb-4 flex items-center justify-center lg:justify-start gap-3">
                <span className="h-px w-8 sm:w-12 bg-[#fab818]/40" />
                <span className="text-xs sm:text-sm font-black tracking-widest text-[#fab818]">
                  قائمة المشروبات والحلويات الكاملة
                </span>
                <span className="h-px w-8 sm:w-12 bg-[#fab818]/40" />
              </div>

              <h1 className="font-cairo text-4xl sm:text-6xl font-black text-white tracking-tight">
                منيو <span className="text-[#fab818]">الخلاط</span>
              </h1>

              <p className="mt-3 max-w-xl text-sm sm:text-base text-cyan-100/90 font-medium mx-auto lg:mx-0">
                اختار مشروبك أو تحليتك المفضلة، أضف لسلتك وسجل طلبك مباشرة عبر الواتساب أو الاتصال!
              </p>

              {/* Search Bar */}
              <div className="mt-8 max-w-lg mx-auto lg:mx-0 relative">
                <div className="relative flex items-center">
                  <Search className="absolute right-4 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث عن مشروب، وافل، أرز بلبن..."
                    className="w-full pl-10 pr-12 py-3.5 rounded-full bg-white text-gray-900 placeholder-gray-400 font-medium shadow-xl focus:outline-none focus:ring-2 focus:ring-[#fab818] transition-all text-sm sm:text-base"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute left-4 p-1 rounded-full text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* View Full Menu Image Action */}
              <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => setShowMenuModal(true)}
                  className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/20 font-bold px-6 py-2.5 rounded-full shadow-md backdrop-blur-md transition-all text-xs sm:text-sm hover:scale-105"
                >
                  <span>تصفح كارت المنيو الورقي الأصلي </span>
                </button>
              </div>
            </div>

            {/* Left: Interactive Menu Image Preview Card */}
            <div className="lg:col-span-5 flex justify-center">

              {/* Ambient Glow */}

              <div className="relative aspect-[4/4] w-full    ">
                <Image
                  src="/menu.png"
                  alt="منيو الخلاط سوهاج"
                  fill
                  className="object-contain    "
                />

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Lightbox Modal for Full menu.png */}
      {showMenuModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          onClick={() => setShowMenuModal(false)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/90">
              <h3 className="text-white font-black text-lg font-cairo flex items-center gap-2">
                <span>كارت المنيو الأصلي - الخلاط سوهاج</span>
              </h3>
              <button
                onClick={() => setShowMenuModal(false)}
                className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content - Scrollable high-res image */}
            <div className="overflow-auto p-4 flex justify-center bg-black/60 min-h-[400px]">
              <img
                src="/menu.png"
                alt="كارت المنيو الأصلي"
                className="max-w-full h-auto rounded-xl shadow-2xl object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Category Pills Bar */}
      <section className="sticky top-[70px] sm:top-[82px] z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer shrink-0
                  ${activeCategory === cat.id
                    ? "bg-[#008ba3] text-white shadow-md shadow-[#008ba3]/20 scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Items Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-[#fab818] flex items-center justify-center mx-auto mb-4 text-3xl">
              🍹
            </div>
            <h3 className="text-xl font-bold text-gray-900 font-cairo">لم يتم العثور على أي صنف</h3>
            <p className="text-sm text-gray-500 mt-1">جرب البحث بكلمة أخرى أو اختر قسماً آخر من القائمة.</p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="mt-5 px-5 py-2.5 rounded-full bg-[#008ba3] text-white text-xs font-bold shadow-md hover:bg-[#00798f] transition"
            >
              عرض الكل
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge */}
                    {item.badge && (
                      <span className="absolute top-3 right-3 bg-[#fab818] text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-md">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-cairo font-black text-lg sm:text-xl text-gray-900 line-clamp-1 group-hover:text-[#008ba3] transition-colors">
                      {item.name}
                    </h3>
                    {item.desc && (
                      <p className="text-xs sm:text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer Price & Add Button */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-gray-50 mt-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl sm:text-2xl font-black text-[#008ba3]">
                      {item.price}
                    </span>
                    <span className="text-xs font-bold text-gray-500">ج.م</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAdd(item)}
                    className={`
                      px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95
                      ${addedId === item.id
                        ? "bg-emerald-500 text-white shadow-emerald-500/20"
                        : "bg-[#fab818] hover:bg-[#e5a510] text-slate-950 shadow-[#fab818]/20"
                      }
                    `}
                  >
                    {addedId === item.id ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>تم الإضافة</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 stroke-[3]" />
                        <span>أضف للسلة</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Floating Bottom Cart Bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-5 left-4 right-4 sm:left-auto sm:right-8 z-40 sm:max-w-md">
          <Link
            href="/cart"
            className="w-full bg-[#008ba3] hover:bg-[#00798f] text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4 border-2 border-[#fab818] transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fab818] text-slate-950 flex items-center justify-center font-black text-sm shadow-md">
                {totalItems}
              </div>
              <div className="text-right">
                <p className="text-xs text-cyan-100 font-bold">السلة تحتوي على عناصر</p>
                <p className="text-base font-black text-white">{totalPrice} ج.م</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl font-black text-xs text-[#fab818]">
              <span>إتمام الطلب</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </div>
          </Link>
        </div>
      )}

      {/* Official Footer */}
      <MixerFooter />
    </main>
  );
}
