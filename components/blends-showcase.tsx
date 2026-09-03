"use client";

import React, { useState } from "react";
import { Plus, Flame, Sparkles, Check, Heart, Info } from "lucide-react";

export interface BlendItem {
  id: string;
  name: string;
  arabicName: string;
  category: "tropical" | "berry" | "green" | "protein";
  description: string;
  ingredients: string[];
  calories: number;
  vitaminC: string;
  price: number;
  tag?: string;
  color: string;
  emoji: string;
}

export const SIGNATURE_BLENDS: BlendItem[] = [
  {
    id: "mango-tornado",
    name: "Mango Tropical Tornado",
    arabicName: "إعصار المانجو الاستوائي",
    category: "tropical",
    description: "Our legendary 3D hero mix. Luscious Alphonso mango vortexed with fresh passionfruit, sweet pineapple, and refreshing coconut water.",
    ingredients: ["Alphonso Mango", "Passionfruit", "Pineapple Cubes", "Coconut Water", "Lime Zest"],
    calories: 195,
    vitaminC: "140% DV",
    price: 6.5,
    tag: "Signature Hero",
    color: "from-amber-500/20 to-orange-500/30 border-amber-500/40",
    emoji: "🥭",
  },
  {
    id: "strawberry-surge",
    name: "Wild Strawberry Surge",
    arabicName: "فورة الفراولة البرية",
    category: "berry",
    description: "Sun-ripened garden strawberries crushed with red pomegranate seeds, acai berry drizzle, and a hint of wild mountain blossom honey.",
    ingredients: ["Fresh Strawberries", "Pomegranate Seeds", "Wild Acai", "Mountain Honey", "Mint Leaf"],
    calories: 165,
    vitaminC: "180% DV",
    price: 6.0,
    tag: "Antioxidant King",
    color: "from-rose-500/20 to-red-500/30 border-rose-500/40",
    emoji: "🍓",
  },
  {
    id: "emerald-detox",
    name: "Emerald Detox Vortex",
    arabicName: "دوامة الديتوكس الزمردية",
    category: "green",
    description: "Hydro-sheared crisp green apple, zesty golden kiwi, baby spinach, cold cucumber water, and organic chia seeds for clean cellular energy.",
    ingredients: ["Crisp Green Apple", "Golden Kiwi", "Baby Spinach", "Cucumber", "Chia Seeds", "Lime"],
    calories: 135,
    vitaminC: "160% DV",
    price: 6.25,
    tag: "Pure Cleanse",
    color: "from-emerald-500/20 to-lime-500/30 border-emerald-500/40",
    emoji: "🥝",
  },
  {
    id: "acai-blueberry-rush",
    name: "Blueberry Acai Velvet",
    arabicName: "مخمل التوت البري والأساي",
    category: "berry",
    description: "Deep antioxidant powerhouse. Crushed wild blueberries, raw Amazonian acai puree, frozen banana, and roasted almond cream swirl.",
    ingredients: ["Wild Blueberries", "Amazon Acai", "Ripe Banana", "Almond Butter", "Oat Milk"],
    calories: 220,
    vitaminC: "110% DV",
    price: 7.0,
    tag: "Brain Fuel",
    color: "from-purple-500/20 to-indigo-500/30 border-purple-500/40",
    emoji: "🫐",
  },
  {
    id: "dragon-citrus-fuel",
    name: "Dragon Citrus Electrolyte",
    arabicName: "طاقة الدراجون والحمضيات",
    category: "tropical",
    description: "Electric pink dragonfruit (Pitaya), blood orange squeeze, juicy watermelon cubes, and Himalayan pink salt electrolyte hydration.",
    ingredients: ["Red Pitaya", "Blood Orange", "Watermelon", "Mint", "Himalayan Pink Salt"],
    calories: 150,
    vitaminC: "190% DV",
    price: 6.75,
    tag: "Immunity Boost",
    color: "from-pink-500/20 to-rose-500/30 border-pink-500/40",
    emoji: "🌺",
  },
  {
    id: "power-protein-beast",
    name: "Hydro-Power Whey Beast",
    arabicName: "وحش البروتين الهيدروليكي",
    category: "protein",
    description: "28g ultra-filtered isolate protein, raw peanut butter, Belgian cocoa nibs, rolled oats, and frozen organic banana blended to silk perfection.",
    ingredients: ["28g Whey Isolate", "Peanut Butter", "Cocoa Nibs", "Organic Oats", "Almond Milk"],
    calories: 340,
    vitaminC: "45% DV",
    price: 7.5,
    tag: "28g High Protein",
    color: "from-amber-600/20 to-yellow-600/30 border-amber-600/40",
    emoji: "⚡",
  },
];

interface BlendsShowcaseProps {
  onAddToCart: (item: BlendItem) => void;
}

export default function BlendsShowcase({ onAddToCart }: BlendsShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Masterpieces" },
    { id: "tropical", label: "🥭 Tropical Energy" },
    { id: "berry", label: "🍓 Berry Antioxidants" },
    { id: "green", label: "🥝 Detox & Greens" },
    { id: "protein", label: "⚡ High Protein" },
  ];

  const filteredBlends =
    selectedCategory === "all"
      ? SIGNATURE_BLENDS
      : SIGNATURE_BLENDS.filter((b) => b.category === selectedCategory);

  const handleAdd = (item: BlendItem) => {
    onAddToCart(item);
    setAddedId(item.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1200);
  };

  return (
    <section id="blends" className="relative py-28 px-6 bg-[#080c10] border-t border-white/5">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Handcrafted On Demand
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Signature <span className="text-gradient-orange">Hydro-Blends</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Zero pasteurization. Zero artificial syrups. Just raw whole fruits whipped by our 30,000 RPM vortex into the smoothest textures on Earth.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg shadow-orange-500/20 scale-105"
                    : "glass-panel text-slate-300 hover:text-white hover:border-white/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Blends Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlends.map((blend) => (
            <div
              key={blend.id}
              className={`group relative rounded-3xl p-6 sm:p-7 glass-card transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between border ${blend.color}`}
            >
              {/* Top Meta */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
                    {blend.emoji}
                  </div>
                  {blend.tag && (
                    <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-white/10 text-amber-300 border border-white/15">
                      {blend.tag}
                    </span>
                  )}
                </div>

                <div className="mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {blend.name}
                  </h3>
                  <div className="text-xs font-medium text-amber-400/80 font-sans mt-0.5">
                    {blend.arabicName}
                  </div>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3">
                  {blend.description}
                </p>

                {/* Fresh Ingredients Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {blend.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] font-medium text-slate-300 border border-white/5"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-white">
                      ${blend.price.toFixed(2)}
                    </span>
                    <span className="text-[11px] text-slate-400">/ 500ml</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                    <span className="flex items-center gap-0.5 text-orange-400">
                      <Flame className="w-3 h-3" /> {blend.calories} kcal
                    </span>
                    <span>•</span>
                    <span className="text-emerald-400">Vit C: {blend.vitaminC}</span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAdd(blend)}
                  className={`p-3 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-all transform active:scale-95 cursor-pointer ${
                    addedId === blend.id
                      ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/30"
                      : "bg-amber-500 hover:bg-amber-400 text-black shadow-md shadow-orange-500/20"
                  }`}
                  aria-label={`Add ${blend.name} to order`}
                >
                  {addedId === blend.id ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" /> Added
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 stroke-[3]" /> Add Blend
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Mix Prompt Banner */}
        <div className="mt-14 glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl">
              🧪
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">
                Want to engineer your own customized smoothie?
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm">
                Pick your fruit base, choose your plant milk, and add functional boosters (Whey, Chia, Maca, Spirulina).
              </p>
            </div>
          </div>
          <button
            onClick={() => handleAdd(SIGNATURE_BLENDS[0])}
            className="whitespace-nowrap px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-amber-300 font-bold text-sm border border-amber-500/30 transition-all cursor-pointer"
          >
            Customize in Cart →
          </button>
        </div>
      </div>
    </section>
  );
}
