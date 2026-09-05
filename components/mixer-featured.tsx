"use client";

import React, { useState, useRef, useCallback, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Plus,
  Check,
  ShoppingBag,
} from "lucide-react";

// Safe isomorphic layout effect
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

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
  const [addedId, setAddedId] = useState<string | null>(null);

  const filteredDishes =
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
      className="py-20 lg:py-28 bg-gradient-to-b from-[#014f5d] via-[#015f70] to-[#004754] text-white relative overflow-hidden"
      dir="rtl"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-[#fab818] mb-2 font-bold text-xs sm:text-sm tracking-wider uppercase bg-white/10 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#fab818]" />
            <span>مختارات الخلاط الحصرية</span>
            <Sparkles className="w-4 h-4 text-[#fab818]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-cairo">
            أطباق ومشروبات مميزة
          </h2>
          <p className="text-sm sm:text-base text-cyan-100/80 mt-2 font-medium max-w-xl mx-auto">
            تصفح كروت الـ 3D Coverflow واستمتع بأشهر خلات الخلاط في سوهاج.
          </p>
        </div>

        {/* 3D Coverflow Carousel Section */}
        <CoverflowDishCarousel
          dishes={filteredDishes}
          addedId={addedId}
          onAdd={handleAdd}
          rotate={42}
          depth={0.55}
          perspective={3.2}
          falloff={0.56}
          fade={0.12}
          cardWidth="clamp(250px, 30vw, 340px)"
          gap={0.08}
          loop={true}
          showPagination={true}
          showNavigation={true}
        />

        {/* Bottom Call-to-Action */}
        <div className="mt-14 text-center">
          <button
            className="inline-flex items-center gap-3 bg-[#fab818] hover:bg-[#e5a510] text-slate-950 font-black text-base sm:text-lg px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>باقي المنيو</span>
          </button>
        </div>

      </div>
    </section>
  );
}

/* =========================================================================
   3D COVERFLOW ENGINE COMPONENT (NO CAPTION, HIGH-PERFORMANCE 60FPS DOM PAINT)
   ========================================================================= */

interface CoverflowDishCarouselProps {
  dishes: MenuItem[];
  addedId: string | null;
  onAdd: (dish: MenuItem) => void;
  rotate?: number;
  depth?: number;
  perspective?: number;
  falloff?: number;
  fade?: number;
  cardWidth?: string;
  gap?: number;
  loop?: boolean;
  showPagination?: boolean;
  showNavigation?: boolean;
}

function CoverflowDishCarousel({
  dishes,
  addedId,
  onAdd,
  rotate = 42,
  depth = 0.55,
  perspective = 3.2,
  falloff = 0.56,
  fade = 0.12,
  cardWidth = "clamp(250px, 30vw, 340px)",
  gap = 0.08,
  loop = true,
  showPagination = true,
  showNavigation = true,
}: CoverflowDishCarouselProps) {
  const count = dishes.length;

  const frameRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const posRef = useRef(0);
  const targetRef = useRef(0);
  const widthRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const dragRef = useRef<{
    id: number;
    x: number;
    pos: number;
    v: number;
    t: number;
  } | null>(null);

  const [selected, setSelected] = useState(0);

  const indexAt = useCallback(
    (pos: number) => ((Math.round(pos) % count) + count) % count,
    [count]
  );

  const paint = useCallback(() => {
    const width = widthRef.current;
    if (!width) return;
    const pitch = width * (1 + gap);
    const pos = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      let offset = index - pos;
      if (loop) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }

      const distance = Math.abs(offset);
      const ramp = Math.pow(distance, falloff);
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset);

      card.style.transform =
        `translateX(calc(-50% + ${offset * pitch}px)) ` +
        `translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`;

      const edge = loop ? Math.min(1, Math.max(0, count / 2 - distance)) : 1;
      card.style.opacity = String(Math.max(0, 1 - fade * distance) * edge);
      card.style.zIndex = String(100 - Math.round(distance));
    });
  }, [count, depth, fade, falloff, gap, loop, rotate]);

  const settle = useCallback(
    (target: number) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      targetRef.current = target;
      setSelected(indexAt(target));

      const step = () => {
        const remaining = target - posRef.current;
        if (Math.abs(remaining) < 0.0004) {
          posRef.current = target;
          paint();
          rafRef.current = null;
          return;
        }
        posRef.current += remaining * 0.16;
        paint();
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [indexAt, paint]
  );

  const clamp = useCallback(
    (pos: number) => (loop ? pos : Math.max(0, Math.min(count - 1, pos))),
    [count, loop]
  );

  const goTo = useCallback(
    (index: number) => {
      const target = loop
        ? index + Math.round((targetRef.current - index) / count) * count
        : index;
      settle(clamp(target));
    },
    [clamp, count, loop, settle]
  );

  const nudge = useCallback(
    (by: number) => settle(clamp(Math.round(targetRef.current) + by)),
    [clamp, settle]
  );

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    targetRef.current = posRef.current;
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      pos: posRef.current,
      v: 0,
      t: performance.now(),
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    const pitch = widthRef.current * (1 + gap);
    if (!pitch) return;

    const now = performance.now();
    const previous = posRef.current;
    posRef.current = clamp(drag.pos - (event.clientX - drag.x) / pitch);
    drag.v = ((posRef.current - previous) / Math.max(now - drag.t, 1)) * 1000;
    drag.t = now;

    const index = indexAt(posRef.current);
    if (index !== selected) setSelected(index);
    paint();
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;
    const carried = Math.max(-2, Math.min(2, drag.v * 0.18));
    settle(clamp(Math.round(posRef.current + carried)));
  };

  useIsoLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const card = cardRefs.current[0];
      if (!card) return;
      widthRef.current = card.offsetWidth;
      paint();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

  useEffect(() => {
    // Reset carousel position when dishes list changes
    posRef.current = 0;
    targetRef.current = 0;
    setSelected(0);
    paint();
  }, [dishes, paint]);

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  if (count === 0) return null;

  return (
    <div
      className="w-full relative"
      style={{ ["--cf-card" as string]: cardWidth }}
      role="region"
      aria-label="3D Coverflow Dish Carousel"
    >
      <div className="relative">

        {/* Navigation Buttons */}
        {showNavigation && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => nudge(-1)}
              className="absolute left-1 sm:left-4 top-1/2 z-[200] -translate-y-1/2 rounded-2xl bg-slate-900/80 hover:bg-[#fab818] p-3 text-white hover:text-slate-950 border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </button>

            <button
              type="button"
              aria-label="Next slide"
              onClick={() => nudge(1)}
              className="absolute right-1 sm:right-4 top-1/2 z-[200] -translate-y-1/2 rounded-2xl bg-slate-900/80 hover:bg-[#fab818] p-3 text-white hover:text-slate-950 border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </button>
          </>
        )}

        {/* 3D Stage Container */}
        <div
          ref={frameRef}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              nudge(-1);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              nudge(1);
            }
          }}
          className="cursor-grab overflow-hidden py-12 outline-none active:cursor-grabbing"
          style={{
            perspective: `calc(var(--cf-card) * ${perspective})`,
            touchAction: "pan-y",
          }}
        >
          <div
            className="relative select-none"
            style={{
              height: "calc(var(--cf-card) * 1.38)",
              transformStyle: "preserve-3d",
            }}
          >
            {dishes.map((dish, index) => (
              <div
                key={dish.id}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}`}
                className={cn(
                  "absolute left-1/2 top-0 overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border-2 shadow-2xl text-right transition-colors duration-300 pointer-events-auto group",
                  dish.badge
                    ? "border-[#fab818] ring-2 ring-[#fab818]/30 shadow-[#fab818]/10"
                    : "border-white/20 hover:border-[#fab818]"
                )}
                style={{
                  width: "var(--cf-card)",
                  height: "calc(var(--cf-card) * 1.38)",
                  willChange: "transform, opacity",
                }}
              >
                {/* ================= IMAGE ================= */}
                <div className="absolute inset-0 w-full h-full overflow-hidden rounded-3xl">
                  <Image
                    src={dish.img}
                    alt={dish.name}
                    fill
                    sizes="340px"
                    draggable={false}
                    className="
        object-cover
        group-hover:scale-105
        transition-transform
        duration-700
        ease-out
        select-none
      "
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/5" />
                </div>

                {/* ================= CONTENT ================= */}
                <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-6">

                  {/* Name */}
                  <div>
                    <h3 className="font-black text-xl sm:text-2xl mb-2 text-white font-cairo text-right line-clamp-1 group-hover:text-[#fab818] transition-colors">
                      {dish.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-white/75 mb-5 text-right line-clamp-2 leading-relaxed font-medium max-w-[90%]">
                      {dish.desc}
                    </p>
                  </div>

                  {/* Price + Button */}
                  <div className="w-full flex items-center justify-between gap-3 pt-3 border-t border-white/20">

                    {/* Price */}
                    <span className="bg-[#fab818] text-slate-950 font-black px-3.5 py-1.5 rounded-full text-xs sm:text-sm shadow-lg">
                      {dish.price} ج.م
                    </span>

                    {/* Add Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAdd(dish);
                      }}
                      className={cn(
                        "px-3.5 py-2 rounded-xl text-xs font-black transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95",
                        addedId === dish.id
                          ? "bg-emerald-400 text-slate-950 shadow-emerald-400/30"
                          : "bg-white/20 hover:bg-[#fab818] text-white hover:text-slate-950 border border-white/20 hover:border-[#fab818]"
                      )}
                      aria-label="أضف للطلب"
                    >
                      {addedId === dish.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>تم الإضافة</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                          <span>أضف للطلب</span>
                        </>
                      )}
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination Dots (No caption as requested) */}
      {showPagination && count > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2 z-20 relative">
          {dishes.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selected}
              onClick={() => goTo(index)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300 cursor-pointer",
                index === selected
                  ? "w-8 bg-[#fab818] opacity-100 shadow-md shadow-[#fab818]/40"
                  : "w-2.5 bg-white/40 hover:bg-white/70 opacity-60"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
