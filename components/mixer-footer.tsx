"use client";

import React from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Heart } from "lucide-react";

export default function MixerFooter() {
  return (
    <footer id="contact" className="bg-[#004754] text-white pt-16 pb-8 border-t border-cyan-800" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-cyan-800/80 text-right">
          
          {/* Col 1: Contact Info */}
          <div>
            <h4 className="text-xl font-bold text-[#fab818] mb-6 font-cairo">تواصل معنا</h4>
            <ul className="space-y-4 text-sm text-gray-200">
              <li className="flex items-center justify-start gap-3">
                <Phone className="w-4 h-4 text-[#fab818] shrink-0" />
                <a href="tel:01234567890" className="font-mono hover:text-[#fab818] transition-colors">012 3456 7890</a>
              </li>
              <li className="flex items-center justify-start gap-3">
                <Mail className="w-4 h-4 text-[#fab818] shrink-0" />
                <span className="font-mono">sohag@elmixer.com</span>
              </li>
              <li className="flex items-center justify-start gap-3">
                <MapPin className="w-4 h-4 text-[#fab818] shrink-0" />
                <span>محافظة سوهاج - جمهورية مصر العربية</span>
              </li>
            </ul>
          </div>

          {/* Col 2: Menu Links */}
          <div>
            <h4 className="text-xl font-bold text-[#fab818] mb-6 font-cairo">المنيو في سوهاج</h4>
            <ul className="space-y-2.5 text-sm text-gray-200">
              <li><a className="hover:text-[#fab818] transition-colors" href="#menu">عصائر فريش</a></li>
              <li><a className="hover:text-[#fab818] transition-colors" href="#menu">ميلك شيك وسموذي</a></li>
              <li><a className="hover:text-[#fab818] transition-colors" href="#menu">موخيتو ومنعشات</a></li>
              <li><a className="hover:text-[#fab818] transition-colors" href="#menu">ليمون ومثلجات</a></li>
              <li><a className="hover:text-[#fab818] transition-colors" href="#menu">بولات فواكه وقشطة</a></li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-[#fab818] mb-6 font-cairo">روابط سريعة</h4>
            <ul className="space-y-2.5 text-sm text-gray-200">
              <li><a className="hover:text-[#fab818] transition-colors" href="#hero-cinematic">الرئيسية</a></li>
              <li><a className="hover:text-[#fab818] transition-colors" href="#menu">المنيو والأسعار</a></li>
              <li><a className="hover:text-[#fab818] transition-colors" href="#branches">فروع سوهاج</a></li>
              <li><a className="hover:text-[#fab818] transition-colors" href="#about">عنا وعن الخلاط</a></li>
              <li><a className="hover:text-[#fab818] transition-colors" href="#contact">تواصل معنا</a></li>
            </ul>
          </div>

          {/* Col 4: Brand & Socials */}
          <div className="flex flex-col items-start text-right">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8 bg-white/10 rounded-lg p-1 border border-white/20">
                <Image
                  src="/logo.png"
                  alt="شعار الخلاط سوهاج"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-black text-[#fab818]">
                الخلاط <small className="text-xs text-gray-300">The Mixer • Sohag</small>
              </span>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-6 text-right">
              من قلب سوهاج بنقدم لك أحلى خلطات فريش بطعم لا يُقاوم وجودة تخلي كل رشفة حكاية وانتعاش مختلف.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-cyan-800/80 hover:bg-[#fab818] hover:text-slate-900 flex items-center justify-center text-sm transition-all"
                aria-label="Tiktok"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.46V11.8a8.16 8.16 0 0 0 5.77 2.32V10.7a4.85 4.85 0 0 1-3-.95z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-cyan-800/80 hover:bg-[#fab818] hover:text-slate-900 flex items-center justify-center text-sm transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-cyan-800/80 hover:bg-[#fab818] hover:text-slate-900 flex items-center justify-center text-sm transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <div className="flex items-center gap-1">
            <span>صُنع بكل</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
            <span>من أجل أهل وعشاق الخلاط في سوهاج</span>
          </div>
          <div>
            © {new Date().getFullYear()} الخلاط - سوهاج. جميع الحقوق محفوظة.
          </div>
        </div>

      </div>
    </footer>
  );
}
