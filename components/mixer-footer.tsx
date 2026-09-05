"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Clock } from "lucide-react";

export default function MixerFooter() {
  return (
    <footer
      id="contact"
      className="text-white/90 pt-16 pb-8 border-t-4 border-[#fab818] relative overflow-hidden bg-[#004754]"
      dir="rtl"
    >
      {/* Decorative Brand Watermark */}
      <div className="absolute -right-16 -bottom-16 text-white/5 text-9xl font-cairo font-black select-none pointer-events-none">
        الخلاط
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 text-right">

          {/* Column 1: Brand Info & Social */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 bg-white/10 rounded-2xl p-2 border border-white/20 shadow-md">
                <Image
                  src="/logo.png"
                  alt="شعار الخلاط"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h3 className="text-2xl font-black font-cairo text-white">
                  الخلاط
                </h3>
                <p className="text-xs text-[#fab818] font-bold tracking-wider">
                  The Mixer • Sohag
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-white/75 max-w-sm font-medium">
              أكثر من سنوات من الشغف في تقديم أشهى العصائر الفريش، السموذي، الميلك شيك، الطواجن والحلويات الفاخرة في قلب سوهاج.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#fab818] hover:border-[#fab818] text-white hover:text-slate-950 transition-all hover:scale-110 shadow-sm"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#fab818] hover:border-[#fab818] text-white hover:text-slate-950 transition-all hover:scale-110 shadow-sm"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#fab818] hover:border-[#fab818] text-white hover:text-slate-950 transition-all hover:scale-110 shadow-sm"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.46V11.8a8.16 8.16 0 0 0 5.77 2.32V10.7a4.85 4.85 0 0 1-3-.95z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-black text-lg mb-5 font-cairo flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#fab818]"></span>
              روابط سريعة
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <a href="#hero-cinematic" className="hover:text-[#fab818] hover:-translate-x-1 transition-all flex items-center gap-2">
                  <span>←</span> الصفحة الرئيسية
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#fab818] hover:-translate-x-1 transition-all flex items-center gap-2">
                  <span>←</span> قائمة المشروبات والأطباق (المنيو)
                </a>
              </li>
              <li>
                <a href="#branches" className="hover:text-[#fab818] hover:-translate-x-1 transition-all flex items-center gap-2">
                  <span>←</span> موقعنا وفروعنا في سوهاج
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#fab818] hover:-translate-x-1 transition-all flex items-center gap-2">
                  <span>←</span> عن الخلاط وجودتنا
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#fab818] hover:-translate-x-1 transition-all flex items-center gap-2">
                  <span>←</span> تواصل معنا والدليفري
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Working Hours */}
          <div>
            <h4 className="text-white font-black text-lg mb-5 font-cairo flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#fab818]"></span>
              خدمة العملاء والاتصال
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#fab818] shrink-0 mt-0.5" />
                <span>سوهاج  — بجوار مستشفى</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#fab818] shrink-0" />
                <a
                  href="tel:01007375151"
                  dir="ltr"
                  className="font-black text-white tracking-wider hover:text-[#fab818] transition"
                >
                  01007375151
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#fab818] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">مواعيد العمل:</p>
                  <p className="text-xs text-white/70">يومياً من ١٢:٠٠ ظهراً حتى ٠٢:٠٠ بعد منتصف الليل</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60 font-medium">
          <p>© {new Date().getFullYear()} الخلاط. جميع الحقوق محفوظة.</p>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a
              href="https://unilira.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors flex items-center gap-1 group"
            >
              <span>Made by <span className="text-[#fab818] font-bold group-hover:underline underline-offset-4">
                Unilira
              </span></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
