"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";

const springConfig = {
  type: "spring" as const,
  stiffness: 85,
  damping: 14,
  mass: 1.1,
};

/**
 * Decorative 3D Hexagonal Rings positioned absolutely between sections
 * (50% in the first section above, 50% in the second section below)
 */
export function MixerRingsDivider() {
  return (
    <div className="relative w-full z-30 pointer-events-none">
      <div className="absolute left-0 right-0 top-0 -translate-y-1/2 w-full flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{
            type: "spring",
            stiffness: 90,
            damping: 15,
            mass: 1.1,
          }}
          className="w-full flex justify-center"
        >
          <Image
            src="/rings.png"
            alt="Mixer Hexagonal Rings"
            width={2143}
            height={500}
            priority
            className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.28)] select-none pointer-events-none"
          />
        </motion.div>
      </div>
    </div>
  );
}

export function MixerExperienceCTA() {
  return (
    <section
      id="menu-cta"
      dir="rtl"
      className="relative min-h-[700px] lg:min-h-[780px] bg-[#faf8f5] pt-24 pb-20 sm:pt-28 lg:pt-36 lg:pb-28"
    >
      {/* ================= BACKGROUND ================= */}

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

      <div className="relative z-10 max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-4">

          {/* ================================================= */}
          {/* MOBILE IMAGES WRAPPER */}
          {/* ================================================= */}

          <div className="lg:hidden order-1 grid grid-cols-2 items-end gap-0 -mx-4">

            {/* LEFT IMAGE */}
            <motion.div
              initial={{
                opacity: 0,
                y: 120,
                scale: 0.7,
                rotate: -8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
              }}
              viewport={{
                once: false,
                amount: 0.25,
              }}
              transition={springConfig}
              className="relative flex justify-center"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 1, -1, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-[170px] h-[270px] sm:w-[210px] sm:h-[330px]"
              >
                <Image
                  src="/slideup-2.png"
                  alt="مشروب منعش"
                  fill
                  sizes="50vw"
                  className="
            object-contain
            select-none
            pointer-events-none
            drop-shadow-[0_25px_25px_rgba(0,0,0,0.18)]
          "
                />
              </motion.div>
            </motion.div>


            {/* RIGHT IMAGE */}
            <motion.div
              initial={{
                opacity: 0,
                y: 120,
                scale: 0.7,
                rotate: 8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
              }}
              viewport={{
                once: false,
                amount: 0.25,
              }}
              transition={{
                ...springConfig,
                delay: 0.12,
              }}
              className="relative flex justify-center"
            >
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, -1, 1, 0],
                }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-[170px] h-[270px] sm:w-[210px] sm:h-[330px]"
              >
                <Image
                  src="/slideup-1.png"
                  alt="مشروب فاخر"
                  fill
                  sizes="50vw"
                  className="
            object-contain
            select-none
            pointer-events-none
            drop-shadow-[0_25px_25px_rgba(0,0,0,0.18)]
          "
                />
              </motion.div>
            </motion.div>

          </div>


          {/* ================================================= */}
          {/* DESKTOP LEFT IMAGE */}
          {/* ================================================= */}

          <div className="hidden lg:flex lg:col-span-4 relative justify-center items-center min-h-[620px] order-1">

            <motion.div
              initial={{
                opacity: 0,
                y: 180,
                scale: 0.7,
                rotate: -8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
              }}
              viewport={{
                once: false,
                amount: 0.25,
              }}
              transition={springConfig}
              className="relative z-10"
            >
              <motion.div
                animate={{
                  y: [0, -16, 0],
                  rotate: [0, 1.5, -1.5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-[370px] h-[570px]"
              >
                <Image
                  src="/slideup-2.png"
                  alt="مشروب منعش"
                  fill
                  sizes="400px"
                  className="
            object-contain
            select-none
            pointer-events-none
            drop-shadow-[0_35px_35px_rgba(0,0,0,0.18)]
          "
                />
              </motion.div>
            </motion.div>

          </div>


          {/* ================================================= */}
          {/* CENTER CTA */}
          {/* ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
      lg:col-span-4
      order-2
      lg:order-2
      text-center
      relative
      z-30
    "
          >

            {/* Label */}
            <div className="inline-flex items-center gap-2 px-4 py-2  ">
              <div
                className="
                           relative
                           w-36 h-36
                           flex items-center justify-center
                         
                         "
              >
                <Image
                  src="/logo-font.png"
                  alt="الخلاط سوهاج"
                  width={200}
                  height={200}
                  className="object-contain"
                  priority
                />
              </div>


            </div>

            {/* Heading */}
            <h2 className="
      font-black
      text-gray-950
      tracking-tight
      leading-[1.05]
      text-4xl
      sm:text-5xl
      lg:text-[4.2rem]
    ">
              خبراء
              <br />

              <span className="
        bg-gradient-to-r
        from-emerald-600
        via-teal-600
        to-lime-500
        bg-clip-text
        text-transparent
      ">
                السعادة
              </span>
            </h2>

            {/* Description */}
            <p className="
      mt-6
      text-gray-600
      text-base
      sm:text-lg
      lg:text-xl
      font-medium
      leading-relaxed
      max-w-md
      mx-auto
    ">
              دي لحظة تستاهل تتعاش.
              <br />
              اختار مزاجك واكتشف عالم من النكهات
              معمول عشان يغيّر مودك من أول رشفة.
            </p>

            {/* CTA */}
            <div className="mt-8 flex justify-center">
              <motion.a
                href="#menu"
                whileHover={{
                  scale: 1.04,
                  y: -3,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="
          group
          inline-flex
          items-center
          gap-3
          bg-gray-950
          hover:bg-emerald-700
          text-white
          font-black
          px-8
          py-4
          rounded-full
          shadow-xl
          transition-colors
        "
              >
                <span>اكتشف المنيو</span>

                <ArrowLeft
                  className="
            w-5
            h-5
            transition-transform
            duration-300
            group-hover:-translate-x-1
          "
                />
              </motion.a>
            </div>

            {/* Bottom Text */}
            <div className="mt-7 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-gray-300" />

              <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
                جودة • خبرة • أمان
              </span>

              <span className="w-8 h-px bg-gray-300" />
            </div>

          </motion.div>


          {/* ================================================= */}
          {/* DESKTOP RIGHT IMAGE */}
          {/* ================================================= */}

          <div className="hidden lg:flex lg:col-span-4 relative justify-center items-center min-h-[620px] order-3">

            <motion.div
              initial={{
                opacity: 0,
                y: 180,
                scale: 0.7,
                rotate: 8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
              }}
              viewport={{
                once: false,
                amount: 0.25,
              }}
              transition={{
                ...springConfig,
                delay: 0.12,
              }}
              className="relative z-10"
            >
              <motion.div
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -1.5, 1.5, 0],
                }}
                transition={{
                  duration: 4.7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-[370px] h-[570px]"
              >
                <Image
                  src="/slideup-1.png"
                  alt="مشروب فاخر"
                  fill
                  sizes="400px"
                  className="
            object-contain
            select-none
            pointer-events-none
            drop-shadow-[0_35px_35px_rgba(0,0,0,0.18)]
          "
                />
              </motion.div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}