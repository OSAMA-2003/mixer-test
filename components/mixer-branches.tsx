"use client";

import React from "react";
import { MapPin, Phone, Clock, Sparkles } from "lucide-react";

export default function MixerBranches() {
  const branches = [
    {
      name: "فرع شارع 15 (الفرع الرئيسي)",
      area: "شارع 15 - سوهاج",
      address: "تقاطع شارع 15 مع شارع الجمهورية، بجوار كوبري أخميم، سوهاج",
      phone: "012 3456 7890",
      hours: "يومياً من 9:00 ص إلى 2:30 ص",
    },
    {
      name: "فرع كورنيش النيل الشرقي",
      area: "الكورنيش - سوهاج",
      address: "ممشى كورنيش النيل الشرقي، أمام نادي نقابة المهندسين، سوهاج",
      phone: "012 3456 7891",
      hours: "يومياً من 10:00 ص إلى 3:00 ص",
    },
    {
      name: "فرع ميدان الثقافة",
      area: "الثقافة - سوهاج",
      address: "ميدان الثقافة، برج النيل، طريق أسيوط - سوهاج",
      phone: "010 8800 1122",
      hours: "يومياً من 9:00 ص إلى 2:00 ص",
    },
    {
      name: "فرع حي سيتي",
      area: "سيتي - سوهاج",
      address: "حي سيتي، أمام مجمع المحاكم، شارع الشهيد عبد المنعم رياض، سوهاج",
      phone: "010 8800 1133",
      hours: "يومياً من 9:00 ص إلى 2:00 ص",
    },
    {
      name: "فرع سوهاج الجديدة",
      area: "الكوامل - سوهاج الجديدة",
      address: "المركز التجاري والخدمي الرئيسي، مدينة سوهاج الجديدة",
      phone: "011 2233 4455",
      hours: "يومياً من 9:00 ص إلى 1:30 ص",
    },
    {
      name: "فرع أخميم",
      area: "أخميم - سوهاج",
      address: "شارع الفاتح الرئيسي، بجوار ميدان الساعة، أخميم، سوهاج",
      phone: "011 2233 4466",
      hours: "يومياً من 9:00 ص إلى 2:00 ص",
    },
  ];

  return (
    <section id="branches" className="py-20 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-[#008ba3] font-black text-sm mb-2 bg-[#eef8fa] px-4 py-1.5 rounded-full">
            <MapPin className="w-4 h-4" />
            <span>في خدمتكم بجميع أنحاء سوهاج</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 font-cairo">
            فروع <span className="text-[#008ba3]">الخلاط</span> في سوهاج
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">
            من قلب صعيد مصر.. زورنا في أقرب فرع ليك في محافظة سوهاج واستمتع بأحلى كوباية عصير فريش وسموذي وموخيتو، أو اطلب دليفري سريع لحد باب بيتك!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((b, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#eef8fa] border border-cyan-100/80 hover:border-[#008ba3]/50 hover:shadow-xl transition-all text-right flex flex-col justify-between group hover:-translate-y-1 duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#008ba3] text-white flex items-center justify-center text-sm font-bold shadow-sm">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-[#008ba3] bg-white px-2.5 py-1 rounded-full border border-cyan-200">
                      {b.area}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#004959] font-cairo">
                    {b.name}
                  </h3>
                </div>

                <p className="text-gray-700 text-xs sm:text-sm mb-4 leading-relaxed flex items-start gap-2 justify-start mt-3">
                  <MapPin className="w-4 h-4 text-[#008ba3] shrink-0 mt-0.5" />
                  <span>{b.address}</span>
                </p>
              </div>

              <div className="pt-4 border-t border-cyan-200/60 flex flex-col gap-2.5 text-xs text-gray-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-700 font-bold">
                    <Phone className="w-3.5 h-3.5 text-[#008ba3]" />
                    <span>دليفري سوهاج:</span>
                  </div>
                  <a
                    href={`tel:${b.phone.replace(/\s+/g, '')}`}
                    className="font-mono text-[#008ba3] hover:text-[#015f70] font-bold text-sm tracking-wide"
                  >
                    {b.phone}
                  </a>
                </div>
                <div className="flex items-center justify-between text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>مواعيد العمل:</span>
                  </div>
                  <span>{b.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
