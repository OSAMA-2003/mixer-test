"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Phone,
  ArrowLeft,
} from "lucide-react";

export default function MixerBranches() {


  return (
    <section
      id="branches"
      dir="rtl"
      className="relative overflow-hidden bg-white px-4 pb-24 pt-16 text-white sm:px-6 lg:px-8 lg:pb-32"
    >

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

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-14 max-w-2xl space-y-3 text-center sm:mb-16"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 sm:w-12 bg-[#008ba3]/30" />
            <span className="text-xs sm:text-sm font-black tracking-widest text-[#008ba3]">
              فروعنا في سوهاج
            </span>
            <span className="h-px w-8 sm:w-12 bg-[#008ba3]/30" />
          </div>

          <h2 className="font-cairo text-3xl font-black text-black sm:text-5xl">
            فروع <span className="text-brand-yellow">الخلاط</span>
          </h2>

          <p className="mx-auto max-w-xl text-sm leading-7 text-black/80 sm:text-base font-medium">
            مكانك جاهز.. اقعد براحتك، اختار اللي على مزاجك واستمتع بتجربة الخلاط.
          </p>
        </motion.div>

        {/* Branch */}
        <div className="mx-auto max-w-5xl">
          <div className="group grid overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.3)] md:grid-cols-2">

            {/* Image */}
            <div className="relative min-h-[300px] overflow-hidden sm:min-h-[400px] md:min-h-[500px]">
              <img
                src="/branch.png"
                alt="فرع الخلاط في سوهاج"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              {/* Branch badge */}
              <div className="absolute right-5 top-5 rounded-full border border-brand-yellow/40 bg-slate-950/70 px-4 py-2 text-xs font-black text-brand-yellow backdrop-blur-md shadow-lg">
                فرع سوهاج
              </div>

              {/* Bottom text */}
              <div className="absolute bottom-6 right-6 left-6">
                <span className="mb-1 block text-xs font-black tracking-widest text-brand-yellow/90">
                  THE MIXER
                </span>

                <h3 className="font-cairo text-3xl font-black text-white sm:text-4xl">
                  مكانك عندنا.
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12 bg-[#004754]">

              <div className="space-y-8">

                {/* Title */}
                <div>
                  <span className="mb-2 block text-xs font-black tracking-[0.2em] text-brand-yellow">
                    OUR BRANCH
                  </span>

                  <h3 className="font-cairo text-3xl font-black text-white sm:text-4xl">
                    الخلاط — سوهاج
                  </h3>

                  <div className="mt-4 flex items-start gap-3 text-sm leading-7 text-white/85">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand-yellow" />

                    <span className="font-medium">
                      سوهاج الجديدة — مول ريتاج 1
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md hover:border-brand-yellow/40 transition-colors">
                    <Clock className="mb-3 h-5 w-5 text-brand-yellow" />

                    <span className="block text-xs font-medium text-white/60">
                      مواعيد العمل
                    </span>

                    <span className="mt-1 block text-sm font-bold leading-6 text-white">
                      ١٢ ظهراً — ٢ بعد منتصف الليل
                    </span>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md hover:border-brand-yellow/40 transition-colors">
                    <Phone className="mb-3 h-5 w-5 text-brand-yellow" />

                    <span className="block text-xs font-medium text-white/60">
                      الدليفري والحجز
                    </span>

                    <a
                      href="tel:01007375151"
                      dir="ltr"
                      className="mt-1 block w-fit text-sm font-black text-brand-yellow transition-colors hover:text-white"
                    >
                      01007375151
                    </a>
                  </div>

                </div>

                {/* CTA */}
                <a
                  href="https://maps.app.goo.gl/4fHmdNxktjSLwUb39"
                  target="_blank"
                  rel="noreferrer"
                  className="group/btn flex w-full items-center justify-center gap-3 rounded-2xl bg-brand-yellow px-6 py-4 text-sm font-black text-slate-950 shadow-xl shadow-brand-yellow/15 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-yellow-hover hover:shadow-2xl hover:shadow-brand-yellow/30"
                >
                  <MapPin className="h-5 w-5 text-slate-950" />

                  <span>
                    تعالى لنا على الخريطة
                  </span>

                  <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-x-1" />
                </a>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
