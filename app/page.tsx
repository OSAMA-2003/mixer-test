"use client";

import React, { useState } from "react";
import MixerHeader from "@/components/mixer-header";
import { ImageSequence } from "@/components/ImageSequence";
import MixerCategories from "@/components/mixer-categories";
import MixerFeatured from "@/components/mixer-featured";
import MixerPromos from "@/components/mixer-promos";
import MixerStory from "@/components/mixer-story";
import MixerStats from "@/components/mixer-stats";
import { MixerExperienceCTA, MixerRingsDivider } from "@/components/mixer-spotlight";
import MixerBranches from "@/components/mixer-branches";
import MixerFooter from "@/components/mixer-footer";
import { Heart, ChevronDown } from "lucide-react";
import Delivery from "@/components/delivery";
import Gallery from "@/components/gallery";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <main className="relative min-h-screen bg-white text-gray-800 font-sans selection:bg-[#fab818] selection:text-[#015f70]">
      {/* 1. Header Navigation (Hidden until user finishes scrolling the ImageSequence) */}
      <MixerHeader isVisible={showNavbar} />

      {/* 2. Cinematic Canvas Image Sequence (Scroll-Controlled Hero) */}
      <ImageSequence
        totalFrames={192}
        containerHeight="h-[420vh]"
        onSequenceFinish={(finished) => setShowNavbar(finished)}
      />

      {/* 3. Decorative 3D Hexagonal Rings (Half in Hero Section, Half in Showcase Section) */}
      <MixerRingsDivider />

      {/* 4. Product Showcase Experience Section */}
      <MixerExperienceCTA />


      {/* 4. Category Selector (عصائر، الركن الشتوي، وافلز، أرز بلبن، إضافات) */}
      {/* <MixerCategories
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      /> */}

      {/* 5. Featured Dishes & Best Sellers */}
      <MixerFeatured activeCategory={selectedCategory} />


      {/* 6. Promo Banners (إضافاتك & الركن الشتوي) */}
      <MixerPromos />

      {/* 7. Brand Story (قصتنا وجودتنا - مختلفين بطريقتنا من سنة 2000) */}
      <MixerStory />



      {/* 8. Live Statistics Bar */}
      <MixerStats />

      <Gallery />

      {/* 9. Branches in Egypt */}
      <MixerBranches />

      <Delivery />

      {/* 10. Official Footer */}
      <MixerFooter />
    </main>
  );
}
