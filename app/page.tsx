"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import HeroScroll3D from "@/components/hero-scroll-3d";
import BlendsShowcase, { BlendItem } from "@/components/blends-showcase";
import TechSpecs from "@/components/tech-specs";
import NutritionPromise from "@/components/nutrition-promise";
import OrderDrawer, { CartItem } from "@/components/order-drawer";
import Footer from "@/components/footer";

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (blend: BlendItem) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.blend.id === blend.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            blend,
            quantity: 1,
            boosters: [],
            sweetness: "100% Natural Raw Fruit",
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.blend.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.blend.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleBooster = (id: string, booster: string) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.blend.id === id) {
          const exists = item.boosters.includes(booster);
          const newBoosters = exists
            ? item.boosters.filter((b) => b !== booster)
            : [...item.boosters, booster];
          return { ...item, boosters: newBoosters };
        }
        return item;
      })
    );
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToBlends = () => {
    const el = document.getElementById("blends");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#080c10] text-slate-100 selection:bg-amber-500 selection:text-black">
      {/* Floating Navigation Header */}
      {/* <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      /> */}

      {/* 3D Scroll Trigger Hero Section */}
      <HeroScroll3D onExploreClick={scrollToBlends} />

      {/* Signature Blends Menu */}
      <BlendsShowcase onAddToCart={handleAddToCart} />

      {/* Technology & Machine Specs */}
      <TechSpecs />

      {/* Freshness & Nutrition Science */}
      <NutritionPromise />

      {/* Slide-over Cart & Checkout Drawer */}
      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onToggleBooster={handleToggleBooster}
      />

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
