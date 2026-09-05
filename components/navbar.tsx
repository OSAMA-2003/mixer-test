"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingBag, Menu, X, PhoneCall } from "lucide-react";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "3D Experience", href: "#hero-3d" },
    { name: "Signature Blends", href: "#blends" },
    { name: "Blender Engine", href: "#tech-specs" },
    { name: "Freshness Promise", href: "#nutrition" },
    { name: "Locations", href: "#footer" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#080c10]/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero-3d" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-2xl p-1 border border-white/10 group-hover:border-amber-500/50 transition-all shadow-md">
            <Image
              src="/logo.png"
              alt="الخلاط The Mixer Logo"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg md:text-xl font-black text-white tracking-tight">
                THE MIXER
              </span>
              <span className="text-sm font-bold text-amber-400 font-sans">
                الخلاط
              </span>
            </div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
              Hydro-Vortex Juice Bar
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions (Cart & Order CTA) */}
        <div className="flex items-center gap-3">
          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl glass-panel border border-white/10 text-slate-200 hover:text-white hover:border-amber-500/50 transition-all cursor-pointer"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black text-xs font-black flex items-center justify-center shadow-lg animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Order CTA Button */}
          <a
            href="#blends"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-sm shadow-lg shadow-orange-500/25 transition-all transform hover:scale-105 active:scale-95"
          >
            <span>Order Fresh</span>
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl glass-panel border border-white/10 text-slate-300"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0f16]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-200 hover:text-amber-400 transition-colors py-2 border-b border-white/5"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#blends"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm"
          >
            <span>Order Fresh Blend</span>
          </a>
        </div>
      )}
    </header>
  );
}
