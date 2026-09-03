"use client";

import React, { useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle, Sparkles, ArrowRight } from "lucide-react";
import { BlendItem } from "./blends-showcase";

export interface CartItem {
  blend: BlendItem;
  quantity: number;
  boosters: string[];
  sweetness: string;
}

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onToggleBooster: (id: string, booster: string) => void;
}

const AVAILABLE_BOOSTERS = [
  { name: "15g Pure Whey Isolate", price: 1.5 },
  { name: "Organic Chia & Flax", price: 0.75 },
  { name: "Raw Blossom Honey", price: 0.5 },
  { name: "Ceremonial Matcha", price: 1.25 },
];

export default function OrderDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onToggleBooster,
}: OrderDrawerProps) {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => {
    const boostersPrice = item.boosters.length * 1.0; // average booster price
    return acc + (item.blend.price + boostersPrice) * item.quantity;
  }, 0);

  const ecoFee = cart.length > 0 ? 0.5 : 0;
  const total = subtotal + ecoFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;
    setOrderPlaced(true);
  };

  const handleReset = () => {
    setOrderPlaced(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0a0f16] border-l border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Your Fresh Order</h3>
                <p className="text-xs text-slate-400">
                  {cart.length} {cart.length === 1 ? "blend" : "blends"} selected
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {orderPlaced ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mb-6 shadow-xl shadow-emerald-500/20 animate-bounce">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-black text-white mb-2">
                  Order Dispatched To The Blades!
                </h4>
                <p className="text-slate-300 text-sm max-w-xs mb-6">
                  Thank you, <span className="font-bold text-amber-400">{customerName}</span>! Your hydro-vortex smoothie is now spinning at 30,000 RPM.
                </p>

                <div className="p-4 rounded-2xl glass-panel border border-white/10 text-left w-full mb-8 text-xs space-y-2">
                  <div className="flex justify-between text-slate-400">
                    <span>Order Reference:</span>
                    <span className="font-mono text-white">#MX-{Math.floor(1000 + Math.random() * 9000)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Estimated Blend Time:</span>
                    <span className="font-bold text-emerald-400">3 - 5 minutes</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Pick-up / Delivery:</span>
                    <span className="text-white">Fresh Priority Express</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm shadow-lg shadow-orange-500/20 cursor-pointer"
                >
                  Order Another Fresh Blend
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center">
                <span className="text-5xl mb-4">🥤</span>
                <h4 className="text-lg font-bold text-white mb-2">Your blender pitcher is empty</h4>
                <p className="text-slate-400 text-xs max-w-xs mb-6">
                  Choose one of our signature cold-pressed fruit blends from the menu to start!
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl glass-panel text-amber-300 border border-amber-500/30 text-xs font-bold hover:bg-amber-500/10 transition-all cursor-pointer"
                >
                  Browse Signature Blends
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.blend.id}
                    className="p-4 rounded-2xl glass-card border border-white/10 flex flex-col gap-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl">
                          {item.blend.emoji}
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm">
                            {item.blend.name}
                          </div>
                          <div className="text-xs text-amber-400 font-sans">
                            {item.blend.arabicName}
                          </div>
                          <div className="text-xs text-slate-400 font-mono mt-0.5">
                            ${item.blend.price.toFixed(2)} each
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.blend.id)}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-1 cursor-pointer"
                        title="Remove blend"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Boosters tags */}
                    <div className="pt-2 border-t border-white/5">
                      <div className="text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" /> Functional Boosters:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {AVAILABLE_BOOSTERS.map((booster) => {
                          const isSelected = item.boosters.includes(booster.name);
                          return (
                            <button
                              key={booster.name}
                              onClick={() => onToggleBooster(item.blend.id, booster.name)}
                              className={`text-[10px] px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-amber-500/20 border-amber-500/50 text-amber-300 font-bold"
                                  : "bg-white/5 border-white/5 text-slate-400 hover:text-white"
                              }`}
                            >
                              {isSelected ? "✓ " : "+ "}
                              {booster.name} (${booster.price.toFixed(2)})
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="text-xs text-slate-400">Quantity:</span>
                      <div className="flex items-center gap-3 bg-white/5 rounded-lg px-2 py-1 border border-white/10">
                        <button
                          onClick={() => onUpdateQuantity(item.blend.id, -1)}
                          className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-white px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.blend.id, 1)}
                          className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Customer Details Form */}
                <form onSubmit={handleCheckout} id="checkout-form" className="pt-4 space-y-3">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    Customer Information
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone / WhatsApp Number"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Footer & Checkout Total */}
          {!orderPlaced && cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-black/40 space-y-4">
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Compostable Eco-Bottle Fee:</span>
                  <span>${ecoFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/10">
                  <span>Total Due:</span>
                  <span className="text-amber-400">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={!customerName || !customerPhone}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed hover:from-amber-400 hover:to-orange-400 text-black font-black text-sm shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Confirm & Blend Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
