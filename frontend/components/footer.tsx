"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Send, MapPin, Phone, Clock, Heart, Globe, MessageCircle } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer id="footer" className="relative bg-[#06090d] border-t border-white/10 pt-20 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 bg-white/5 rounded-2xl p-1 border border-white/10 shadow-md">
                <Image
                  src="/logo.png"
                  alt="الخلاط The Mixer Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black text-white tracking-tight">
                    THE MIXER
                  </span>
                  <span className="text-sm font-bold text-amber-400 font-sans">
                    الخلاط
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                  30,000 RPM Hydro-Vortex Blends
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Crafting cold-pressed, zero-additive smoothies and functional fruit elixirs with our revolutionary hydrodynamic vortex engine. Real fruit, untamed power.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Flagship Juice Bars
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Cairo: 26th July St, Zamalek</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Dubai: Marina Walk Promenade</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Riyadh: Tahlia St, Al Olaya</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>London: Soho, Wardour St</span>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Service & Hours
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-200 font-semibold">Daily Fresh Hours:</div>
                  <div>8:00 AM – 1:30 AM</div>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-200 font-semibold">Priority Delivery:</div>
                  <div className="font-mono text-emerald-400">+20 (0) 100 800 MIX</div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Vortex Club
            </h4>
            <p className="text-xs text-slate-400">
              Get secret seasonal recipes, VIP tastings, and 20% off your first cold blend order.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                ✓ Welcome to the Vortex Club!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-500 pr-10"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-amber-500 text-black hover:bg-amber-400 transition-colors cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} The Mixer (الخلاط). All Rights Reserved. Pure fruit revolution.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Engineered with passion for fresh nutrition</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
