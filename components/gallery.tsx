"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronRight, ChevronLeft, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const GALLERY_ROW_1 = [
    "/gallery/1.jfif",
    "/gallery/2.jpg",
    "/gallery/3.jpg",
    "/gallery/4.jpg",
    "/gallery/5.png",
    "/gallery/6.png",
    "/gallery/7.png",
];

export const GALLERY_ROW_2 = [
    "/gallery/7.png",
    "/gallery/6.png",
    "/gallery/5.png",
    "/gallery/4.jpg",
    "/gallery/3.jpg",
    "/gallery/2.jpg",
    "/gallery/1.jfif",
];

export const Gallery: React.FC = () => {
    const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

    const allPhotos = [...GALLERY_ROW_1, ...GALLERY_ROW_2];

    // Infinite marquee streams (repeated for seamless infinite loops)
    const row1Stream = [...GALLERY_ROW_1, ...GALLERY_ROW_1, ...GALLERY_ROW_1, ...GALLERY_ROW_1];
    const row2Stream = [...GALLERY_ROW_2, ...GALLERY_ROW_2, ...GALLERY_ROW_2, ...GALLERY_ROW_2];

    // Keyboard navigation for Lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (activePhotoIndex === null) return;
            if (e.key === "Escape") setActivePhotoIndex(null);
            if (e.key === "ArrowRight") {
                setActivePhotoIndex((prev) => (prev === null || prev === 0 ? allPhotos.length - 1 : prev - 1));
            }
            if (e.key === "ArrowLeft") {
                setActivePhotoIndex((prev) => (prev === null || prev === allPhotos.length - 1 ? 0 : prev + 1));
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activePhotoIndex, allPhotos.length]);

    return (
        <section id="gallery" className="py-20 sm:py-28 bg-white relative overflow-hidden text-gray-900">
            {/* Ambient Background Blur Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Main glow */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] rounded-full bg-emerald-300/20 blur-[130px]" />

                {/* Left glow */}
                <div className="absolute left-[-150px] top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-lime-200/30 blur-[110px]" />

                {/* Right glow */}
                <div className="absolute right-[-150px] top-1/3 w-[400px] h-[400px] rounded-full bg-teal-200/25 blur-[110px]" />

                {/* Subtle grid */}
                <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:28px_28px]" />
            </div>
            <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-[#fab818]/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-[#008ba3]/10 blur-3xl" />

            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 text-center"
            >
                <div className="mb-4 flex items-center justify-center gap-3">
                    <span className="h-px w-8 sm:w-12 bg-[#008ba3]/30" />
                    <span className="text-xs sm:text-sm font-black tracking-widest text-[#008ba3]">
                        لحظاتنا وأجواؤنا
                    </span>
                    <span className="h-px w-8 sm:w-12 bg-[#008ba3]/30" />
                </div>

                <h2 className="font-cairo text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                    معرض صور <span className="text-[#fab818]">الخلاط</span>
                </h2>
                <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base text-gray-600 font-medium">
                    عِش التجربة معنا واكتشف أجواء الخلاط المميزة ولحظات السعادة مع كل طبق وعصير
                </p>
            </motion.div>

            {/* Dual Pure Continuous Image Marquee Showcase */}
            <div className="space-y-4 sm:space-y-6 select-none">
                {/* Row 1: Right-to-Left */}
                <div className="relative w-full overflow-hidden py-2" dir="ltr">
                    {/* Left & Right Edge Fade Gradients */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

                    <div className="animate-marquee-rtl flex gap-4 sm:gap-6">
                        {row1Stream.map((src, idx) => (
                            <div
                                key={`r1-${src}-${idx}`}
                                onClick={() => {
                                    const originalIndex = allPhotos.indexOf(src);
                                    setActivePhotoIndex(originalIndex !== -1 ? originalIndex : 0);
                                }}
                                className="relative w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 shrink-0 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group cursor-pointer border border-gray-100 hover:scale-[1.03]"
                            >
                                <img
                                    src={src}
                                    alt="لحظات الخلاط"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none"
                                />

                                {/* Hover Glass Overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                    <div className="p-3.5 rounded-full bg-white/90 text-slate-950 shadow-xl group-hover:scale-110 transition-transform duration-300">
                                        <Maximize2 className="w-5 h-5 stroke-[2.5]" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 2: Left-to-Right */}
                <div className="relative w-full overflow-hidden py-2" dir="ltr">
                    {/* Left & Right Edge Fade Gradients */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

                    <div className="animate-marquee-ltr flex gap-4 sm:gap-6">
                        {row2Stream.map((src, idx) => (
                            <div
                                key={`r2-${src}-${idx}`}
                                onClick={() => {
                                    const originalIndex = allPhotos.indexOf(src);
                                    setActivePhotoIndex(originalIndex !== -1 ? originalIndex : 0);
                                }}
                                className="relative w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 shrink-0 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group cursor-pointer border border-gray-100 hover:scale-[1.03]"
                            >
                                <img
                                    loading="lazy"
                                    src={src}
                                    alt="لحظات الخلاط"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none"
                                />

                                {/* Hover Glass Overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                    <div className="p-3.5 rounded-full bg-white/90 text-slate-950 shadow-xl group-hover:scale-110 transition-transform duration-300">
                                        <Maximize2 className="w-5 h-5 stroke-[2.5]" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {activePhotoIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 select-none"
                        onClick={() => setActivePhotoIndex(null)}
                        dir="rtl"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="relative max-w-4xl w-full bg-slate-950/90 rounded-3xl overflow-hidden shadow-2xl border border-white/15 flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header / Controls */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 text-white">
                                <span className="text-sm font-bold text-white/80">
                                    الصورة {activePhotoIndex + 1} من {allPhotos.length}
                                </span>

                                <button
                                    onClick={() => setActivePhotoIndex(null)}
                                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#fab818] hover:text-slate-950 text-white flex items-center justify-center transition cursor-pointer"
                                    aria-label="إغلاق"
                                >
                                    <X className="w-5 h-5 stroke-[2.5]" />
                                </button>
                            </div>

                            {/* High-Resolution Picture View */}
                            <div className="relative flex items-center justify-center max-h-[75vh] overflow-hidden p-3 bg-black/40">
                                <img
                                    src={allPhotos[activePhotoIndex]}
                                    alt="معرض صور الخلاط"
                                    className="w-full max-h-[72vh] object-contain rounded-2xl shadow-2xl"
                                />

                                {/* Prev / Next Navigation Arrows */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActivePhotoIndex((prev) =>
                                            prev === null || prev === 0 ? allPhotos.length - 1 : prev - 1
                                        );
                                    }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-[#fab818] text-white hover:text-slate-950 border border-white/20 flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer hover:scale-110 active:scale-95"
                                    aria-label="الصورة السابقة"
                                >
                                    <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActivePhotoIndex((prev) =>
                                            prev === null || prev === allPhotos.length - 1 ? 0 : prev + 1
                                        );
                                    }}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-[#fab818] text-white hover:text-slate-950 border border-white/20 flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer hover:scale-110 active:scale-95"
                                    aria-label="الصورة التالية"
                                >
                                    <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
