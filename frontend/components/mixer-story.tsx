"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin,
  Award,
  History,
  ArrowLeft,
  Heart,
} from "lucide-react";

export default function MixerStory() {
  return (
    <section
      id="about"
      dir="rtl"
      className="relative overflow-hidden bg-[#faf8f5] py-24 sm:py-28 lg:py-36"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Main glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] rounded-full bg-emerald-300/20 blur-[130px]" />

        {/* Left glow */}
        <div className="absolute left-[-150px] top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-lime-200/30 blur-[110px]" />

        {/* Right glow */}
        <div className="absolute right-[-150px] top-1/3 w-[400px] h-[400px] rounded-full bg-teal-200/25 blur-[110px]" />

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">

          {/* ================= IMAGE ================= */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative lg:col-span-6"
          >
            <div className="relative mx-auto max-w-[560px]">

              {/* Decorative circle */}
              <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full border border-[#008ba3]/20 sm:h-40 sm:w-40" />

              {/* Main image */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-[0_35px_80px_rgba(0,0,0,0.16)]">

                <Image
                  src="/story.png"
                  alt="تجربة الخلاط في سوهاج"
                  fill
                  priority={false}
                  className="object-cover transition-transform duration-1000 ease-out hover:scale-105"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/5" />

                {/* Image content */}
                <div className="absolute bottom-7 right-7 left-7">

                  <div className="mb-3 flex items-center gap-2 text-white/70">
                    <span className="h-px w-8 bg-white/50" />
                    <span className="text-[10px] font-black tracking-[0.3em]">
                      THE MIXER
                    </span>
                  </div>

                  <h3 className="font-aref text-3xl font-bold leading-tight text-white sm:text-4xl">
                    مش مجرد مشروب.
                    <br />
                    دي حكاية.
                  </h3>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.5,
                  duration: 0.6,
                }}
                className="absolute -bottom-6 -left-3 flex items-center gap-3 rounded-2xl border border-white/70 bg-white px-5 py-4 shadow-2xl sm:-left-8"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fab818]/15">
                  <Heart className="h-5 w-5 fill-[#fab818] text-[#fab818]" />
                </div>

                <div>
                  <span className="block text-[10px] font-bold text-gray-400">
                    MADE WITH
                  </span>

                  <span className="block text-sm font-black text-gray-900">
                    حب من سوهاج
                  </span>
                </div>
              </motion.div>

              {/* Side vertical text */}
              <div className="absolute -left-7 top-1/2 hidden -translate-y-1/2 -rotate-90 lg:block">
                <span className="text-[10px] font-black tracking-[0.4em] text-[#008ba3]/50">
                  FRESH • MIXED • LOCAL
                </span>
              </div>

            </div>
          </motion.div>

          {/* ================= CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-6"
          >

            {/* Eyebrow */}
            <div className="mb-4 flex items-center gap-3">
              <span className="text-xs sm:text-sm font-black tracking-widest text-[#008ba3]">
                قصة الخلاط
              </span>
              <span className="h-px w-12 bg-[#008ba3]/30" />
            </div>

            {/* Heading */}
            <h2 className="font-aref text-4xl font-black leading-[1.2] text-[#171717] sm:text-5xl lg:text-6xl">
              إحنا بنحب
              <br />

              <span className="relative inline-block text-[#008ba3]">
                نعملها صح.
                <span className="absolute -bottom-1 right-0 h-2 w-full rounded-full bg-[#fab818]/50" />
              </span>
            </h2>

            {/* Story */}
            <p className="mt-7 max-w-xl text-base font-medium leading-8 text-gray-600 sm:text-lg">
              في <span className="font-black text-[#008ba3]">الخلاط</span>،
              الموضوع مش مجرد إننا نخلط مكونات مع بعض.
              إحنا بنختارها، بنظبطها، وبنقدمها بالطريقة اللي تخليك
              تستمتع بكل رشفة وكل لقمة.
            </p>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
              من أول اختيار المكونات لحد اللحظة اللي الطلب فيها يبقى قدامك،
              كل تفصيلة عندنا معمولة عشان تجربتك تكون مختلفة.
            </p>

            {/* ================= VALUES ================= */}
            <div className="mt-10 grid grid-cols-3 border-y border-black/10 py-6">

              {/* Item */}
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#008ba3]/10">
                  <MapPin className="h-5 w-5 text-[#008ba3]" />
                </div>

                <div>
                  <span className="block text-sm font-black text-[#171717]">
                    من سوهاج
                  </span>

                  <span className="mt-1 block text-[10px] font-bold text-gray-400">
                    LOCAL LOVE
                  </span>
                </div>
              </div>

              {/* Item */}
              <div className="flex flex-col items-center gap-3 border-x border-black/10 px-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fab818]/15">
                  <Award className="h-5 w-5 text-[#d99d00]" />
                </div>

                <div>
                  <span className="block text-sm font-black text-[#171717]">
                    جودة بتفرق
                  </span>

                  <span className="mt-1 block text-[10px] font-bold text-gray-400">
                    QUALITY FIRST
                  </span>
                </div>
              </div>

              {/* Item */}
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <History className="h-5 w-5 text-emerald-600" />
                </div>

                <div>
                  <span className="block text-sm font-black text-[#171717]">
                    على مزاجك
                  </span>

                  <span className="mt-1 block text-[10px] font-bold text-gray-400">
                    YOUR MOOD
                  </span>
                </div>
              </div>

            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-5">

              <a
                href="#branches"
                className="group inline-flex items-center gap-3 rounded-2xl bg-[#004754] px-7 py-4 text-sm font-black text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#004754] hover:shadow-2xl"
              >
                <span>تعالى شوفنا</span>

                <ArrowLeft className="h-4 w-4 text-[#fab818] transition-transform duration-300 group-hover:-translate-x-1" />
              </a>


            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}