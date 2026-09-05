"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Phone,
  Send,
  ArrowRight,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import MixerHeader from "@/components/mixer-header";
import MixerFooter from "@/components/mixer-footer";
import { useCart } from "@/context/CartContext";
import { RESTAURANT_INFO } from "@/lib/data.js";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalPrice, totalItems } =
    useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [notes, setNotes] = useState("");

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) return;

    let text = `*طلب جديد من موقع الخلاط - سوهاج*\n\n`;
    if (customerName) text += `*الاسم:* ${customerName}\n`;
    if (customerPhone) text += `*الهاتف:* ${customerPhone}\n`;
    if (customerAddress) text += `*العنوان:* ${customerAddress}\n`;
    if (notes) text += `*ملاحظات:* ${notes}\n`;

    text += `\n*الطلبات:* \n`;
    cartItems.forEach((item, index) => {
      text += `${index + 1}. ${item.name} (${item.quantity}x) - ${
        item.price * item.quantity
      } ج.م\n`;
    });

    text += `\n*الإجمالي:* ${totalPrice} ج.م\n`;
    text += `شكراً لكم!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encoded}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-slate-50 text-gray-900 font-sans selection:bg-[#fab818] selection:text-[#015f70] pb-24" dir="rtl">
      {/* Navigation Header */}
      <MixerHeader isVisible={true} />

      {/* Page Title Section */}
      <section className="pt-28 pb-12 sm:pt-36 sm:pb-16 bg-gradient-to-b from-[#004754] via-[#008ba3] to-[#015f70] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 sm:w-12 bg-[#fab818]/40" />
            <span className="text-xs sm:text-sm font-black tracking-widest text-[#fab818]">
              مراجعة وإتمام طلبك
            </span>
            <span className="h-px w-8 sm:w-12 bg-[#fab818]/40" />
          </div>

          <h1 className="font-cairo text-3xl sm:text-5xl font-black text-white">
            سلة <span className="text-[#fab818]">الطلبات</span>
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-20 h-20 rounded-full bg-cyan-50 text-[#008ba3] flex items-center justify-center mx-auto mb-5">
              <ShoppingBag className="w-10 h-10" />
            </div>

            <h2 className="text-2xl font-black text-gray-900 font-cairo">سلتك فارغة حالياً</h2>
            <p className="text-sm text-gray-500 mt-2 font-medium">
              لم تقم بإضافة أي عصير أو تحلية إلى سلة طلباتك بعد.
            </p>

            <Link
              href="/menu"
              className="mt-6 inline-flex items-center gap-2 bg-[#fab818] hover:bg-[#e5a510] text-slate-950 font-black px-6 py-3 rounded-full text-sm shadow-md transition-all duration-300 hover:scale-105"
            >
              <span>تصفح المنيو الآن</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        ) : (
          /* Cart Grid: Items List + Checkout Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Cart Items (8 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between bg-white p-4 px-6 rounded-2xl border border-gray-100 shadow-sm">
                <span className="text-sm font-bold text-gray-700">
                  عدد العناصر: <strong className="text-[#008ba3] font-black">{totalItems}</strong>
                </span>

                <button
                  onClick={clearCart}
                  className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>تفرغ السلة</span>
                </button>
              </div>

              {/* Items Cards */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-100 shadow-sm flex items-center gap-4 justify-between"
                >
                  <div className="flex items-center gap-4">
                    {/* Thumbnail */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gray-100 overflow-hidden shrink-0">
                      <Image
                        src={item.img}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div>
                      <h3 className="font-cairo font-black text-base sm:text-lg text-gray-900 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-xs font-bold text-[#008ba3] mt-1">
                        {item.price} ج.م <span className="text-gray-400 font-normal">/ للواحدة</span>
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls & Total */}
                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg bg-white text-gray-700 hover:bg-gray-200 flex items-center justify-center font-bold text-sm shadow-xs transition"
                        aria-label="إنقاص"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="w-6 text-center font-black text-sm text-gray-900">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg bg-white text-gray-700 hover:bg-gray-200 flex items-center justify-center font-bold text-sm shadow-xs transition"
                        aria-label="زيادة"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-sm font-black text-gray-900">
                        {item.price * item.quantity} ج.م
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition"
                      aria-label="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#008ba3] hover:text-[#00798f] transition"
                >
                  <span>+ إضافة المزيد من المنيو</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Customer Info & Checkout (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-md space-y-6">
              <h3 className="font-cairo text-xl font-black text-gray-900 border-b border-gray-100 pb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#008ba3]" />
                <span>بيانات طلب التوصيل</span>
              </h3>

              {/* Form Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    الاسم بالكامل
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="أدخل اسمك"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#008ba3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    رقم الهاتف للاتصال
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="010xxxxxxx"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#008ba3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    عنوان التوصيل في سوهاج
                  </label>
                  <input
                    type="text"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="المنطقة - الشارع - رقم العمارة"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#008ba3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    ملاحظات للطلب (اختياري)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="مثال: بدون سكر زيادة، أو سكر مضبوط..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#008ba3]"
                  />
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100 space-y-2 text-sm font-medium">
                <div className="flex items-center justify-between text-gray-600">
                  <span>مجموع المنتجات:</span>
                  <span className="font-bold text-gray-900">{totalPrice} ج.م</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>رسوم التوصيل:</span>
                  <span className="text-xs text-[#008ba3] font-bold">تحدد عند الاتصال</span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-base font-black text-gray-900">
                  <span>الإجمالي:</span>
                  <span className="text-xl text-[#008ba3] font-black">{totalPrice} ج.م</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال الطلب عبر الواتساب</span>
                </button>

                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#008ba3]" />
                  <span>اتصال تلفوني للطلب المباشر</span>
                </a>
              </div>
            </div>

          </div>
        )}
      </section>

      {/* Official Footer */}
      <MixerFooter />
    </main>
  );
}
