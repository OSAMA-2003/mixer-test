"use client";

import React from "react";
import { Check, X, ShieldCheck, HeartPulse, Droplets, Leaf } from "lucide-react";

export default function NutritionPromise() {
  const comparison = [
    {
      feature: "Active Enzyme & Vitamin C Retention",
      mixer: "98.7% (Cold Hydro-Vortex preserved)",
      traditional: "52% (Thermal friction loss)",
      commercial: "28% (Flash pasteurized)",
    },
    {
      feature: "Fiber Micro-Emulsion Score",
      mixer: "Ultra-silky (Micronized suspension)",
      traditional: "Coarse & gritty pulp sediment",
      commercial: "Strained pulp or artificial thickeners",
    },
    {
      feature: "Added Sugars & Preservatives",
      mixer: "0% Added Sugar (100% raw fruit sweetness)",
      traditional: "Often sweetened with syrups",
      commercial: "High-fructose corn syrup & sorbate",
    },
    {
      feature: "Pitcher Temperature Rise",
      mixer: "+0.8°C (Aerodynamic cooling channels)",
      traditional: "+8.5°C to +14°C (Blades overheat)",
      commercial: "Heated during bottling",
    },
    {
      feature: "Cellular Bioavailability",
      mixer: "Maximum (Cell walls ruptured without oxidation)",
      traditional: "Moderate (Large intact fruit chunks)",
      commercial: "Low (Enzymes destroyed by shelf-life heating)",
    },
  ];

  return (
    <section id="nutrition" className="relative py-28 px-6 bg-[#080c10] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <HeartPulse className="w-3.5 h-3.5" /> Pure Health Science
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            The Freshness <span className="text-gradient-fresh">Guarantee</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Real nutrition isn’t just about what you put in the blender—it’s about how gently you blend it. Here is how The Mixer compares to the rest.
          </p>
        </div>

        {/* Feature Highlights Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Leaf className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">100% Farm-Direct Fruits</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We partner directly with sustainable orchards. Picked at peak ripeness, washed in ozone-purified water, and frozen immediately to halt nutrient decay.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-amber-500/20 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <Droplets className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Zero Added Sweeteners</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No cane sugar, no agave syrups, and no synthetic sweeteners. The rich luscious flavor comes exclusively from sun-drenched tropical fruit sugars.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-rose-500/20 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Cold-Vortex Preservation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Blade friction usually produces heat that denatures delicate vitamins. Our vortex channels dissipate heat away from the blend instantly.
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-5 sm:p-6 text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider">
                    Biological Metric
                  </th>
                  <th className="p-5 sm:p-6 text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 border-x border-amber-500/20">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      THE MIXER (الخلاط)
                    </span>
                  </th>
                  <th className="p-5 sm:p-6 text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider">
                    Standard Kitchen Blender
                  </th>
                  <th className="p-5 sm:p-6 text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider">
                    Supermarket Bottled Juice
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                {comparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-5 sm:p-6 font-semibold text-white">
                      {row.feature}
                    </td>
                    <td className="p-5 sm:p-6 font-bold text-amber-300 bg-amber-500/5 border-x border-amber-500/15">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        {row.mixer}
                      </div>
                    </td>
                    <td className="p-5 sm:p-6 text-slate-400">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-rose-400/80 shrink-0" />
                        {row.traditional}
                      </div>
                    </td>
                    <td className="p-5 sm:p-6 text-slate-400">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-rose-400/80 shrink-0" />
                        {row.commercial}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
