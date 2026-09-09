"use client";

import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Check, Flame } from "lucide-react";
import { fetchOfferItems, fetchRestaurantSettings, MenuItem } from "@/lib/api";
import { useCart } from "@/context/CartContext";

// Safe isomorphic layout effect
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function MixerOffers() {
  const [offersList, setOffersList] = useState<MenuItem[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [addedId, setAddedId] = useState<string | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    async function loadOffers() {
      const [settings, offers] = await Promise.all([
        fetchRestaurantSettings(),
        fetchOfferItems(),
      ]);

      if (settings && settings.show_offers_section === false) {
        setIsVisible(false);
        return;
      }

      if (offers && offers.length > 0) {
        setOffersList(offers);
      } else {
        // Fallback default offers if list is empty
        setOffersList([
          {
            id: "shikar",
            category_id: "special",
            name: "شيكار الخلاط",
            price: 65,
            original_price: 85,
            badge: "خصم 24% 🔥",
            image: "/products/p1.jpg",
            img: "/products/p1.jpg",
            description: "خلطة الخلاط السحرية الغنية بقطع الفواكه والكريمة والآيس كريم.",
            is_available: true,
            is_offer: true,
          },
          {
            id: "avocado-nuts",
            category_id: "special",
            name: "أفوكادو عصير مكسرات",
            price: 85,
            original_price: 110,
            badge: "خصم 23% 🥑",
            image: "/products/p3.jpg",
            img: "/products/p3.jpg",
            description: "أفوكادو بلدي طازج مع العسل الطبيعي والمكسرات الفاخرة.",
            is_available: true,
            is_offer: true,
          },
          {
            id: "waffle-elmixer",
            category_id: "waffles",
            name: "وافلز الخلاط الملكي",
            price: 100,
            original_price: 130,
            badge: "الملكي ✨",
            image: "/products/p5.jpg",
            img: "/products/p5.jpg",
            description: "وافلز عملاق بطبقات الفواكه والآيس كريم والنوتيلا واللوتس.",
            is_available: true,
            is_offer: true,
          },
        ]);
      }
    }

    loadOffers();
  }, []);

  if (!isVisible || offersList.length === 0) {
    return null;
  }

  const handleAdd = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      img: item.image || item.img || "/products/p1.jpg",
      category: item.category_id,
    });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section className="py-14  bg-white text-slate-900 relative overflow-hidden" dir="rtl" id="offers">
      {/* Background ambient glows & grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] rounded-full bg-emerald-300/20 blur-[130px]" />
        <div className="absolute left-[-150px] top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-lime-200/30 blur-[110px]" />
        <div className="absolute right-[-150px] top-1/3 w-[400px] h-[400px] rounded-full bg-teal-200/25 blur-[110px]" />
        <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 sm:w-12 bg-[#008ba3]/40" />
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black tracking-widest text-[#008ba3]">
              <Flame className="w-4 h-4 fill-[#fab818] text-[#fab818]" />
              عروض وخصومات ممتازة لفترة محدودة
            </span>
            <span className="h-px w-8 sm:w-12 bg-[#008ba3]/40" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-cairo text-slate-900">
            عروض <span className="text-[#008ba3]">الخلاط الحصرية</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium max-w-xl mx-auto">
            وفّر واستمتع بأقوى خلطاتنا وأطباقنا بأسعار استثنائية مع نفس الجودة الفاخرة!
          </p>
        </motion.div>

        {/* 3D Coverflow Carousel Section */}
        <CoverflowOfferCarousel
          items={offersList}
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

      </div>
    </section>
  );
}

/* =========================================================================
   3D COVERFLOW ENGINE FOR OFFERS
   ========================================================================= */

interface CoverflowOfferCarouselProps {
  items: MenuItem[];
  addedId: string | null;
  onAdd: (item: MenuItem) => void;
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

function CoverflowOfferCarousel({
  items,
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
}: CoverflowOfferCarouselProps) {
  const count = items.length;

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
    posRef.current = 0;
    targetRef.current = 0;
    setSelected(0);
    paint();
  }, [items, paint]);

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
      aria-label="3D Coverflow Offer Carousel"
    >
      <div className="relative">

        {/* Navigation Buttons */}
        {showNavigation && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => nudge(-1)}
              className="hidden sm:flex absolute left-1 sm:left-4 top-1/2 z-[200] -translate-y-1/2 rounded-2xl bg-slate-900/80 hover:bg-[#fab818] p-3 text-white hover:text-slate-950 border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </button>

            <button
              type="button"
              aria-label="Next slide"
              onClick={() => nudge(1)}
              className="hidden sm:flex absolute right-1 sm:right-4 top-1/2 z-[200] -translate-y-1/2 rounded-2xl bg-slate-900/80 hover:bg-[#fab818] p-3 text-white hover:text-slate-950 border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
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
            {items.map((item, index) => {
              const hasDiscount = item.original_price && item.original_price > item.price;
              const imgSrc = item.image || item.img || "/products/p1.jpg";

              return (
                <div
                  key={item.id}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${count}`}
                  className={cn(
                    "absolute left-1/2 top-0 overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border-2 shadow-2xl text-right transition-colors duration-300 pointer-events-auto group",
                    item.badge || hasDiscount
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
                      src={imgSrc}
                      alt={item.name}
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
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-white/75 mb-5 text-right line-clamp-2 leading-relaxed font-medium max-w-[90%]">
                        {item.description}
                      </p>
                    </div>

                    {/* Price + Button */}
                    <div className="w-full flex items-center justify-between gap-3 pt-3 border-t border-white/20">

                      {/* Price Tag (with original price strikethrough if offer) */}
                      <div className="flex items-center gap-1.5 bg-[#fab818] text-slate-950 font-black px-3.5 py-1.5 rounded-full text-xs sm:text-sm shadow-lg">
                        {hasDiscount && (
                          <span className="text-[11px] text-slate-700 line-through opacity-80 font-bold">
                            {item.original_price}
                          </span>
                        )}
                        <span>{item.price} ج.م</span>
                      </div>

                      {/* Add Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAdd(item);
                        }}
                        className={cn(
                          "px-3.5 py-2 rounded-xl text-xs font-black transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95",
                          addedId === item.id
                            ? "bg-emerald-400 text-slate-950 shadow-emerald-400/30"
                            : "bg-white/20 hover:bg-[#fab818] text-white hover:text-slate-950 border border-white/20 hover:border-[#fab818]"
                        )}
                        aria-label="أضف للطلب"
                      >
                        {addedId === item.id ? (
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
              );
            })}
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      {showPagination && count > 1 && (
        <div className="mt-4 hidden sm:flex items-center justify-center gap-2 z-20 relative">
          {items.map((_, index) => (
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
