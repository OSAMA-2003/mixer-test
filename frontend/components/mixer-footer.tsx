"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Clock, Star, MessageSquare, ShieldCheck, X } from "lucide-react";
import { submitCustomerReview, submitFeedback } from "@/lib/api";

export default function MixerFooter() {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const [reviewForm, setReviewForm] = useState({ name: "", phone: "", rating: 5, comment: "" });
  const [feedbackForm, setFeedbackForm] = useState({ name: "", phone: "", type: "suggestion" as "suggestion" | "complaint", message: "" });
  const [msg, setMsg] = useState<string | null>(null);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.comment) return;
    const res = await submitCustomerReview(reviewForm);
    if (res.success) {
      setMsg("شكراً لك! تم إرسال تقييمك وسوف يظهر على الموقع فور مراجعته 🎉");
      setTimeout(() => {
        setMsg(null);
        setShowReviewModal(false);
        setReviewForm({ name: "", phone: "", rating: 5, comment: "" });
      }, 2500);
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackForm.name || !feedbackForm.phone || !feedbackForm.message) return;
    const res = await submitFeedback(feedbackForm);
    if (res.success) {
      setMsg("شكراً لاهتمامك! تم إرسال رسالتك مباشرة لإدارة مطعم الخلاط 📩");
      setTimeout(() => {
        setMsg(null);
        setShowFeedbackModal(false);
        setFeedbackForm({ name: "", phone: "", type: "suggestion", message: "" });
      }, 2500);
    }
  };

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

            {/* Public Interactive Modals Trigger Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowReviewModal(true)}
                className="flex items-center gap-1.5 bg-[#fab818] text-slate-950 px-4 py-2 rounded-xl text-xs font-black shadow-md hover:scale-105 transition"
              >
                <Star className="w-4 h-4 fill-current" />
                <span>أضف تقييمك</span>
              </button>

              <button
                onClick={() => setShowFeedbackModal(true)}
                className="flex items-center gap-1.5 bg-white/15 text-white border border-white/20 px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:bg-white/25 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>شكوى أو اقتراح</span>
              </button>
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
                <Link href="/" className="hover:text-[#fab818] hover:-translate-x-1 transition-all flex items-center gap-2">
                  <span>←</span> الصفحة الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#fab818] hover:-translate-x-1 transition-all flex items-center gap-2">
                  <span>←</span> قائمة المشروبات والأطباق (المنيو)
                </Link>
              </li>
              <li>
                <Link href="/#branches" className="hover:text-[#fab818] hover:-translate-x-1 transition-all flex items-center gap-2">
                  <span>←</span> موقعنا وفروعنا في سوهاج
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#fab818] hover:-translate-x-1 transition-all flex items-center gap-2 text-[#fab818] font-bold">
                  <span>←</span> لوحة تحكم الإدارة (Admin Dashboard)
                </Link>
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
                <span>سوهاج  — بجوار مستشفى الهلال</span>
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
            <Link href="/admin" className="hover:text-[#fab818] transition">
              بوابة الإدارة
            </Link>
            <span>•</span>
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

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 shadow-2xl relative text-right text-white">
            <button onClick={() => setShowReviewModal(false)} className="absolute left-5 top-5 p-2 rounded-full bg-slate-800 text-slate-400">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-cairo font-black text-xl mb-4 text-[#fab818]">أضف تقييمك لمطعم الخلاط 🌟</h3>
            {msg ? (
              <p className="p-4 bg-emerald-950 text-emerald-300 rounded-2xl text-sm font-bold text-center">{msg}</p>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold mb-1">الاسم الكريم</label>
                  <input
                    type="text"
                    required
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">رقم الهاتف (اختياري)</label>
                  <input
                    type="text"
                    value={reviewForm.phone}
                    onChange={(e) => setReviewForm({ ...reviewForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">التقييم (من 5 نجوم)</label>
                  <select
                    value={reviewForm.rating}
                    onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-sm font-bold"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (ممتاز جداً 5/5)</option>
                    <option value={4}>⭐⭐⭐⭐ (جيد جداً 4/5)</option>
                    <option value={3}>⭐⭐⭐ (جيد 3/5)</option>
                    <option value={2}>⭐⭐ (مقبول 2/5)</option>
                    <option value={1}>⭐ (ضعيف 1/5)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">رأيك بالتفصيل</label>
                  <textarea
                    required
                    rows={3}
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-sm"
                  />
                </div>
                <button type="submit" className="w-full bg-[#fab818] text-slate-950 font-black py-3 rounded-2xl text-sm shadow-md">
                  إرسال التقييم
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Feedback Submission Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 shadow-2xl relative text-right text-white">
            <button onClick={() => setShowFeedbackModal(false)} className="absolute left-5 top-5 p-2 rounded-full bg-slate-800 text-slate-400">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-cairo font-black text-xl mb-4 text-cyan-400">إرسال شكوى أو اقتراح للإدارة 📩</h3>
            {msg ? (
              <p className="p-4 bg-emerald-950 text-emerald-300 rounded-2xl text-sm font-bold text-center">{msg}</p>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold mb-1">الاسم</label>
                  <input
                    type="text"
                    required
                    value={feedbackForm.name}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">رقم الهاتف للاتصال بك</label>
                  <input
                    type="text"
                    required
                    value={feedbackForm.phone}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">نوع الرسالة</label>
                  <select
                    value={feedbackForm.type}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, type: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-sm font-bold"
                  >
                    <option value="suggestion">اقتراح للتطوير 💡</option>
                    <option value="complaint">شكوى رسمية ⚠️</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">نص الرسالة</label>
                  <textarea
                    required
                    rows={3}
                    value={feedbackForm.message}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-sm"
                  />
                </div>
                <button type="submit" className="w-full bg-[#008ba3] text-white font-black py-3 rounded-2xl text-sm shadow-md">
                  إرسال للإدارة
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
