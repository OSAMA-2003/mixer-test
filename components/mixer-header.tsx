"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart, Menu, X } from "lucide-react";

interface MixerHeaderProps {
  isVisible?: boolean;
}

export default function MixerHeader({ isVisible = true }: MixerHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
      } ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100 py-3"
          : "bg-white/90 backdrop-blur-sm border-b border-gray-100 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Order Now Button (Left) */}
        <div className="flex items-center gap-3">
          <a
            href="#menu"
            className="inline-flex items-center gap-2 bg-[#008ba3] hover:bg-[#015f70] text-white font-extrabold px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>اطلب دلوقتي</span>
          </a>
        </div>

        {/* Desktop Navigation (Center) - RTL order from right to left */}
        <nav className="hidden md:flex items-center gap-2 font-bold text-sm">
          <a
            href="#hero-cinematic"
            className="px-5 py-2 bg-[#fab818] text-slate-950 font-black rounded-full shadow-sm hover:bg-[#e5a510] transition-colors"
          >
            الرئيسية
          </a>
          <a
            href="#menu"
            className="px-4 py-2 text-gray-700 hover:text-[#008ba3] transition-colors rounded-full"
          >
            المنيو
          </a>
          <a
            href="#branches"
            className="px-4 py-2 text-gray-700 hover:text-[#008ba3] transition-colors rounded-full"
          >
            فروع سوهاج
          </a>
          <a
            href="#about"
            className="px-4 py-2 text-gray-700 hover:text-[#008ba3] transition-colors rounded-full"
          >
            عن الخلاط
          </a>
          <a
            href="#contact"
            className="px-4 py-2 text-gray-700 hover:text-[#008ba3] transition-colors rounded-full"
          >
            تواصل معنا
          </a>
        </nav>

        {/* Brand Logo & Emblem (Right) */}
        <div className="flex items-center gap-3">
          <a href="#hero-cinematic" className="flex items-center gap-2 group">
            <div className="flex flex-col text-right">
              <div className="text-2xl font-black text-[#fab818] tracking-tighter leading-none">
                الخلاط
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                The Mixer • سوهاج
              </span>
            </div>

            {/* Stylized Blender Emblem with pulsing badge */}
            <div className="relative w-11 h-11 flex items-center justify-center bg-yellow-50 rounded-2xl border border-yellow-200 shadow-inner group-hover:scale-105 transition-transform p-1.5">
              <Image
                src="/logo.png"
                alt="شعار الخلاط سوهاج"
                width={36}
                height={36}
                className="object-contain"
                priority
              />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fab818] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#fab818]" />
              </span>
            </div>
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-[#008ba3]"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-4 flex flex-col gap-2 shadow-lg text-right">
          <a
            href="#hero-cinematic"
            onClick={() => setMobileOpen(false)}
            className="py-2 text-[#008ba3] font-bold border-b border-gray-100"
          >
            الرئيسية
          </a>
          <a
            href="#menu"
            onClick={() => setMobileOpen(false)}
            className="py-2 text-gray-700 hover:text-[#008ba3] border-b border-gray-100"
          >
            المنيو
          </a>
          <a
            href="#branches"
            onClick={() => setMobileOpen(false)}
            className="py-2 text-gray-700 hover:text-[#008ba3] border-b border-gray-100"
          >
            فروع سوهاج
          </a>
          <a
            href="#about"
            onClick={() => setMobileOpen(false)}
            className="py-2 text-gray-700 hover:text-[#008ba3] border-b border-gray-100"
          >
            عن الخلاط
          </a>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="py-2 text-gray-700 hover:text-[#008ba3]"
          >
            تواصل معنا
          </a>
        </div>
      )}
    </header>
  );
}
