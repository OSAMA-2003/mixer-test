"use client";

import React, { useState, useEffect } from "react";
import { Star, MessageSquare, HeartHandshake, Send, Loader2 } from "lucide-react";
import { fetchApprovedReviews, submitCustomerReview, submitFeedback, Review } from "@/lib/api";

export default function FeedbacksSection() {
    const [reviewsList, setReviewsList] = useState<Review[]>([]);
    const [fetchingReviews, setFetchingReviews] = useState<boolean>(true);
    const [activeFormTab, setActiveFormTab] = useState<"review" | "feedback">("review");

    // Review Form
    const [reviewForm, setReviewForm] = useState({ name: "", phone: "", rating: 5, comment: "" });
    const [reviewSuccessMsg, setReviewSuccessMsg] = useState<string | null>(null);

    // Feedback Form
    const [feedbackForm, setFeedbackForm] = useState({ name: "", phone: "", type: "suggestion" as "suggestion" | "complaint", message: "" });
    const [feedbackSuccessMsg, setFeedbackSuccessMsg] = useState<string | null>(null);

    // Submit Loading state
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function loadReviews() {
            setFetchingReviews(true);
            try {
                const data = await fetchApprovedReviews();
                if (data && data.length > 0) {
                    setReviewsList(data);
                } else {
                    setReviewsList([
                        {
                            id: "r1",
                            name: "أحمد محمود",
                            phone: "01012345678",
                            rating: 5,
                            comment: "أفضل عصير مانجو وأفوكادو في سوهاج بلا منازع! الخدمة والسرعة ممتازة.",
                            status: "approved",
                        },
                        {
                            id: "r2",
                            name: "سارة علي",
                            phone: "01198765432",
                            rating: 5,
                            comment: "الوافلز بالنوتيلا والفواكه خطير وطازج جداً. بنصح أي حد يزوره.",
                            status: "approved",
                        },
                        {
                            id: "r3",
                            name: "محمد مصطفى",
                            phone: "01009876543",
                            rating: 5,
                            comment: "الخدمة ممتازة ونظافة عالية طواجن أم علي سخنة وطعمها تحفة.",
                            status: "approved",
                        },
                    ]);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setFetchingReviews(false);
            }
        }

        loadReviews();
    }, []);

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reviewForm.name || !reviewForm.comment || loading) return;
        setLoading(true);
        try {
            const res = await submitCustomerReview(reviewForm);
            if (res.success) {
                setReviewSuccessMsg("شكراً لتقييمك! تم حفظ تقييمك وسوف يظهر على الموقع فور مراجعته ");
                setReviewForm({ name: "", phone: "", rating: 5, comment: "" });
                setTimeout(() => setReviewSuccessMsg(null), 4000);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleFeedbackSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!feedbackForm.name || !feedbackForm.phone || !feedbackForm.message || loading) return;
        setLoading(true);
        try {
            const res = await submitFeedback(feedbackForm);
            if (res.success) {
                setFeedbackSuccessMsg("شكراً لاهتمامك! تم إرسال رسالتك مباشرة لإدارة الخلاط ");
                setFeedbackForm({ name: "", phone: "", type: "suggestion", message: "" });
                setTimeout(() => setFeedbackSuccessMsg(null), 4000);
            }
        } finally {
            setLoading(false);
        }
    };

    const row1Reviews = [...reviewsList, ...reviewsList, ...reviewsList, ...reviewsList];
    const row2Reviews = [...reviewsList.slice(1), ...reviewsList, ...reviewsList, ...reviewsList, reviewsList[0]];

    // Reusable Form Card
    const renderFormCard = () => (
        <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100">
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl mb-6">
                <button
                    type="button"
                    onClick={() => setActiveFormTab("review")}
                    className={`flex-1 py-3 rounded-xl font-black text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-2 ${activeFormTab === "review"
                        ? "bg-[#fab818] text-slate-950 shadow-md"
                        : "text-slate-600 hover:text-slate-900"
                        }`}
                >
                    <Star className="w-4 h-4 fill-current" />
                    <span>أضف تقييمك</span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveFormTab("feedback")}
                    className={`flex-1 py-3 rounded-xl font-black text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-2 ${activeFormTab === "feedback"
                        ? "bg-[#008ba3] text-white shadow-md"
                        : "text-slate-600 hover:text-slate-900"
                        }`}
                >
                    <MessageSquare className="w-4 h-4" />
                    <span>شكوى/اقتراح </span>
                </button>
            </div>

            {activeFormTab === "review" && (
                <div>
                    <h4 className="font-cairo font-black text-xl text-slate-900 mb-1">انشر تقييمك لمطعم الخلاط </h4>
                    <p className="text-xs text-slate-500 font-medium mb-6">رأيك يهمنا ويساعدنا دائماً في التطوير تقديم الأفضل</p>

                    {reviewSuccessMsg ? (
                        <div className="p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-2xl text-xs font-bold text-center">
                            {reviewSuccessMsg}
                        </div>
                    ) : (
                        <form onSubmit={handleReviewSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">الاسم الكريم</label>
                                <input type="text" required value={reviewForm.name} onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })} placeholder="اكتب اسمك الكامل..." className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#008ba3]" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">رقم الهاتف (اختياري)</label>
                                <input type="text" value={reviewForm.phone} onChange={(e) => setReviewForm({ ...reviewForm, phone: e.target.value })} placeholder="010XXXXXXXX" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#008ba3]" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">درجة التقييم</label>
                                <select value={reviewForm.rating} onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })} className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#008ba3] cursor-pointer">
                                    <option value={5}>⭐⭐⭐⭐⭐ (ممتاز جداً 5/5)</option>
                                    <option value={4}>⭐⭐⭐⭐ (جيد جداً 4/5)</option>
                                    <option value={3}>⭐⭐⭐ (جيد 3/5)</option>
                                    <option value={2}>⭐⭐ (مقبول 2/5)</option>
                                    <option value={1}>⭐ (ضعيف 1/5)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">رأيك وتجربتك *</label>
                                <textarea required rows={3} value={reviewForm.comment} onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })} placeholder="اكتب انطباعك عن المشروبات أو الحلويات..." className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#008ba3]" />
                            </div>
                            <button type="submit" disabled={loading} className="w-full bg-[#fab818] hover:bg-[#e0a410] text-slate-950 font-black py-3.5 rounded-2xl text-xs sm:text-sm shadow-md hover:scale-[1.02] transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50">
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                                        <span>جاري الإرسال...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        <span>إرسال التقييم </span>
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            )}

            {activeFormTab === "feedback" && (
                <div>
                    <h4 className="font-cairo font-black text-xl text-slate-900 mb-1">رسالة مباشرة للإدارة 📩</h4>
                    <p className="text-xs text-slate-500 font-medium mb-6">شكواك أو اقتراحك يصل مباشرة لإدارة مطعم الخلاط</p>

                    {feedbackSuccessMsg ? (
                        <div className="p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-2xl text-xs font-bold text-center">
                            {feedbackSuccessMsg}
                        </div>
                    ) : (
                        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">الاسم</label>
                                <input type="text" required value={feedbackForm.name} onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })} placeholder="اسمك الكامل..." className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#008ba3]" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">رقم الهاتف للتواصل معك</label>
                                <input type="text" required value={feedbackForm.phone} onChange={(e) => setFeedbackForm({ ...feedbackForm, phone: e.target.value })} placeholder="010XXXXXXXX" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#008ba3]" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">نوع الرسالة</label>
                                <select value={feedbackForm.type} onChange={(e) => setFeedbackForm({ ...feedbackForm, type: e.target.value as any })} className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#008ba3] cursor-pointer">
                                    <option value="suggestion">اقتراح للتطوير 💡</option>
                                    <option value="complaint">شكوى رسمية ⚠️</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">تفاصيل الرسالة</label>
                                <textarea required rows={3} value={feedbackForm.message} onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })} placeholder="اكتب تفاصيل الشكوى أو الاقتراح..." className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#008ba3]" />
                            </div>
                            <button type="submit" disabled={loading} className="w-full bg-[#008ba3] hover:bg-[#00768b] text-white font-black py-3.5 rounded-2xl text-xs sm:text-sm shadow-md hover:scale-[1.02] transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50">
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                                        <span>جاري الإرسال...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        <span>إرسال للإدارة 📩</span>
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );

    return (
        <section className="py-20 lg:py-28 bg-white text-slate-900 relative overflow-hidden" dir="rtl" id="feedback">
            {/* Background ambient glows & grid */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] rounded-full bg-emerald-300/20 blur-[130px]" />
                <div className="absolute left-[-150px] top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-lime-200/30 blur-[110px]" />
                <div className="absolute right-[-150px] top-1/3 w-[400px] h-[400px] rounded-full bg-teal-200/25 blur-[110px]" />
                <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:28px_28px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 bg-[#fab818]/20 border border-[#fab818]/40 px-4 py-1.5 rounded-full text-xs font-black text-[#008ba3] mb-3">
                        <HeartHandshake className="w-4 h-4 text-[#008ba3]" />
                        <span>آراء العملاء والتواصل المباشر</span>
                    </div>
                    <h2 className="font-cairo font-black text-3xl sm:text-5xl text-slate-900 tracking-tight">
                        ماذا يقول عملاؤنا عن <span className="text-[#008ba3]">الخلاط</span>؟
                    </h2>
                    <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium">
                        تجارب حقيقية ورسائل نعتز بها من أهل سوهاج، ويسعدنا دائماً استقبال آرائكم واقتراحاتكم!
                    </p>
                </div>

                {/* =========================================================================
                   MOBILE LAYOUT (lg:hidden): Single Horizontal Marquee Stream + Form Below
                   ========================================================================= */}
                <div className="block lg:hidden space-y-10">
                    {/* 1 Row Horizontal Marquee */}
                    <div className="relative w-full overflow-hidden py-2 select-none" dir="ltr">
                        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

                        {fetchingReviews ? (
                            <div className="flex items-center justify-center py-8 text-slate-400">
                                <Loader2 className="w-6 h-6 animate-spin text-[#008ba3] mb-2" />
                            </div>
                        ) : (
                            <div className="animate-marquee-rtl flex gap-4 hover:[animation-play-state:paused]">
                                {row1Reviews.map((rev, idx) => (
                                    <div
                                        key={`mob-${rev.id}-${idx}`}
                                        dir="rtl"
                                        className="w-72 shrink-0 bg-white text-slate-900 rounded-3xl p-5 border border-slate-100 shadow-md flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between gap-2 mb-3">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="w-9 h-9 rounded-2xl bg-[#008ba3]/10 text-[#008ba3] font-black flex items-center justify-center text-sm border border-[#008ba3]/20">
                                                        {rev.name.charAt(0)}
                                                    </div>
                                                    <span className="font-cairo font-black text-sm text-slate-900 block line-clamp-1">{rev.name}</span>
                                                </div>

                                                <div className="flex items-center gap-0.5 text-[#fab818]">
                                                    {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                                                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                                    ))}
                                                </div>
                                            </div>

                                            <p className="text-xs text-slate-600 font-medium leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                                "{rev.comment}"
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Mobile Form Card */}
                    <div className="max-w-xl mx-auto">
                        {renderFormCard()}
                    </div>
                </div>

                {/* =========================================================================
                   DESKTOP LAYOUT (hidden lg:grid): Vertical 2-Column Marquee Side-by-Side with Form Card
                   ========================================================================= */}
                <div className="hidden lg:grid grid-cols-12 gap-10 items-start">

                    {/* Left 7 Columns: Vertical Continuous Marquee Streams */}
                    <div className="col-span-7 space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-cairo font-black text-xl text-[#008ba3] flex items-center gap-2">
                                <Star className="w-5 h-5 fill-current text-[#fab818]" />
                                <span>تقييمات وثقة العملاء</span>
                            </h3>
                        </div>

                        {fetchingReviews ? (
                            <div className="flex flex-col items-center justify-center h-[560px] bg-slate-50/50 rounded-3xl border border-slate-100 text-slate-500">
                                <Loader2 className="w-8 h-8 animate-spin text-[#008ba3] mb-3" />
                                <span className="text-xs font-bold">جاري تحميل تقييمات العملاء...</span>
                            </div>
                        ) : (
                            <div className="relative h-[580px] overflow-hidden rounded-3xl border border-slate-100 bg-slate-50/40 p-2 select-none">
                                {/* Top & Bottom Masks */}
                                <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white via-white/90 to-transparent z-20" />
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/90 to-transparent z-20" />

                                <style>{`
                                  @keyframes verticalMarqueeUp {
                                    0% { transform: translateY(0%); }
                                    100% { transform: translateY(-50%); }
                                  }
                                  @keyframes verticalMarqueeDown {
                                    0% { transform: translateY(-50%); }
                                    100% { transform: translateY(0%); }
                                  }
                                  .animate-marquee-v1 {
                                    animation: verticalMarqueeUp 14s linear infinite;
                                  }
                                  .animate-marquee-v2 {
                                    animation: verticalMarqueeDown 16s linear infinite;
                                  }
                                `}</style>

                                <div className="grid grid-cols-2 gap-4 h-full">
                                    {/* Stream 1 (Up) */}
                                    <div className="flex flex-col gap-4 animate-marquee-v1 hover:[animation-play-state:paused]">
                                        {row1Reviews.map((rev, idx) => (
                                            <div
                                                key={`desk1-${rev.id}-${idx}`}
                                                className="bg-white text-slate-900 rounded-3xl p-5 border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 shrink-0 hover:scale-[1.02] cursor-pointer"
                                            >
                                                <div className="flex items-center justify-between gap-2 mb-3">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-9 h-9 rounded-2xl bg-[#008ba3]/10 text-[#008ba3] font-black flex items-center justify-center text-sm border border-[#008ba3]/20">
                                                            {rev.name.charAt(0)}
                                                        </div>
                                                        <span className="font-cairo font-black text-sm text-slate-900 block line-clamp-1">{rev.name}</span>
                                                    </div>

                                                    <div className="flex items-center gap-0.5 text-[#fab818]">
                                                        {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                                                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                                        ))}
                                                    </div>
                                                </div>

                                                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                                                    "{rev.comment}"
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Stream 2 (Down) */}
                                    <div className="flex flex-col gap-4 animate-marquee-v2 hover:[animation-play-state:paused]">
                                        {row2Reviews.map((rev, idx) => (
                                            <div
                                                key={`desk2-${rev.id}-${idx}`}
                                                className="bg-white text-slate-900 rounded-3xl p-5 border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 shrink-0 hover:scale-[1.02] cursor-pointer"
                                            >
                                                <div className="flex items-center justify-between gap-2 mb-3">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-9 h-9 rounded-2xl bg-[#fab818]/20 text-slate-950 font-black flex items-center justify-center text-sm border border-[#fab818]/30">
                                                            {rev.name.charAt(0)}
                                                        </div>
                                                        <span className="font-cairo font-black text-sm text-slate-900 block line-clamp-1">{rev.name}</span>
                                                    </div>

                                                    <div className="flex items-center gap-0.5 text-[#fab818]">
                                                        {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                                                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                                        ))}
                                                    </div>
                                                </div>

                                                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                                                    "{rev.comment}"
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right 5 Columns: Desktop Form Card */}
                    <div className="col-span-5">
                        {renderFormCard()}
                    </div>
                </div>

            </div>
        </section>
    );
}
