"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const promos = [
  {
    image: "/promo-1.png",
    eyebrow: "SWEET MOOD",
    title: "لما نفسك",
    highlight: "تتدلع.",
    description:
      "طواجن، حلويات وآيس كريم متظبطين بكل التفاصيل اللي تخلي آخر لقمة أحلى من أولها.",
    button: "شوف الحلويات",
    theme: "dessert",
  },
  {
    image: "/promo-2.png",
    eyebrow: "FRESH MOOD",
    title: "انتعاش",
    highlight: "على مزاجك.",
    description:
      "فواكه طازة، قشطة وعسل.. خلطة خفيفة ومنعشة تتظبط على مودك.",
    button: "شوف الفواكه",
    theme: "fresh",
  },
];

export default function MixerPromos() {
  return (
    <section
      className="relative overflow-hidden bg-white py-20 sm:py-28 lg:py-32"
      dir="rtl"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-12 flex flex-col items-center text-center sm:mb-16"
        >
          <span className="mb-4 text-[10px] font-black tracking-[0.3em] text-gray-400 sm:text-[11px]">
            FROM THE MIXER
          </span>

          <h2 className="text-4xl font-black leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
            اختار اللي على{" "}
            <span className="text-[#008ba3]">مزاجك.</span>
          </h2>

          <p className="mt-4 max-w-xl text-sm font-medium leading-7 text-gray-500 sm:text-base">
            من أول رشفة لآخر لقمة.. عندنا حاجة لكل مود.
          </p>
        </motion.div>

        {/* ================= PROMO CARDS ================= */}

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2 lg:gap-8">

          {promos.map((promo, index) => (
            <motion.article
              key={promo.theme}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`
                group
                relative
                flex
                min-h-[570px]
                flex-col
                overflow-hidden
                rounded-[2rem]
                border
                shadow-[0_25px_70px_rgba(0,0,0,0.10)]
                transition-shadow
                duration-500
                hover:shadow-[0_35px_90px_rgba(0,0,0,0.16)]

                lg:min-h-[500px]
                lg:overflow-visible

                ${promo.theme === "dessert"
                  ? "border-[#6b3519]/20 bg-[#29150c]"
                  : "border-[#008ba3]/20 bg-[#003f4b]"
                }
              `}
            >

              {/* ================= BACKGROUND ================= */}

              <div
                className={`
                  pointer-events-none
                  absolute
                  inset-0
                  overflow-hidden
                  rounded-[2rem]

                  ${promo.theme === "dessert"
                    ? "bg-[radial-gradient(circle_at_85%_20%,rgba(250,184,24,0.18),transparent_35%)]"
                    : "bg-[radial-gradient(circle_at_85%_20%,rgba(20,220,220,0.18),transparent_35%)]"
                  }
                `}
              />

              {/* Decorative Circles */}

              <div
                className={`
                  pointer-events-none
                  absolute
                  -right-24
                  -top-24
                  h-72
                  w-72
                  rounded-full
                  border

                  ${promo.theme === "dessert"
                    ? "border-amber-400/10"
                    : "border-cyan-300/10"
                  }
                `}
              />

              <div
                className={`
                  pointer-events-none
                  absolute
                  -right-10
                  -top-10
                  h-44
                  w-44
                  rounded-full
                  border

                  ${promo.theme === "dessert"
                    ? "border-amber-400/10"
                    : "border-cyan-300/10"
                  }
                `}
              />

              {/* ================================================= */}
              {/* MOBILE IMAGE                                       */}
              {/* ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.15 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`
                  relative
                  order-1
                  z-10
                  flex
                  h-[250px]
                  w-full
                  shrink-0
                  items-center
                  justify-center
                  pt-5

                  lg:absolute
                  lg:order-none
                  lg:h-auto
                  lg:w-auto
                  lg:shrink
                  lg:pt-0

                  ${promo.theme === "dessert"
                    ? `
                        lg:-bottom-8
                        lg:-left-20
                        lg:w-[440px]
                      `
                    : `
                        lg:-bottom-7
                        lg:-left-20  
                        lg:w-[390px]
                      `
                  }
                `}
              >
                <Image
                  src={promo.image}
                  alt=""
                  width={300}
                  height={300}
                  priority
                  className="
                    h-full
                    w-auto
                    max-w-[92%]
                    object-contain

                    drop-shadow-[0_25px_30px_rgba(0,0,0,0.40)]

                    transition-transform
                    duration-700
                    ease-out

                    group-hover:scale-[1.05]

                    lg:h-auto
                    lg:w-[500px]
                    
                  "
                />
              </motion.div>

              {/* ================================================= */}
              {/* CONTENT                                           */}
              {/* ================================================= */}

              <div
                className="
                  relative
                  z-20
                  order-2
                  flex
                  flex-1
                  flex-col
                  p-7
                  pt-3

                  sm:p-10
                  sm:pt-4

                  lg:order-none
                  lg:h-full
                  lg:flex-none
                  lg:p-11
                "
              >

                {/* Eyebrow */}

                <div
                  className={`
                    mb-5
                    text-[10px]
                    font-black
                    tracking-[0.3em]

                    sm:mb-7

                    ${promo.theme === "dessert"
                      ? "text-[#fab818]"
                      : "text-cyan-300"
                    }
                  `}
                >
                  {promo.eyebrow}
                </div>

                {/* Heading */}

                <h3
                  className="
                    max-w-[330px]
                    text-4xl
                    font-black
                    leading-[1.05]
                    tracking-tight
                    text-white

                    sm:text-5xl
                  "
                >
                  {promo.title}

                  <br />

                  <span
                    className={`
                      ${promo.theme === "dessert"
                        ? "text-[#fab818]"
                        : "text-cyan-300"
                      }
                    `}
                  >
                    {promo.highlight}
                  </span>
                </h3>

                {/* Description */}

                <p
                  className={`
                    mt-5
                    max-w-[310px]
                    text-sm
                    font-medium
                    leading-7

                    ${promo.theme === "dessert"
                      ? "text-amber-100/65"
                      : "text-cyan-100/70"
                    }
                  `}
                >
                  {promo.description}
                </p>

                {/* CTA */}

                <div className="mt-auto pt-7 lg:pt-8">
                  <a
                    href="#menu"
                    className="
                      group/btn
                      inline-flex
                      items-center
                      gap-3
                      rounded-full
                      bg-white
                      px-5
                      py-3
                      text-sm
                      font-black
                      text-gray-950

                      transition-all
                      duration-300

                      hover:-translate-y-1
                      hover:bg-[#fab818]
                      hover:shadow-xl
                    "
                  >
                    <span>{promo.button}</span>

                    <ArrowLeft
                      className="
                        h-4
                        w-4
                        transition-transform
                        duration-300
                        group-hover/btn:-translate-x-1
                      "
                    />
                  </a>
                </div>
              </div>

              {/* ================= BOTTOM GRADIENT ================= */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  z-[5]
                  h-32
                  rounded-b-[2rem]
                  bg-gradient-to-t
                  from-black/20
                  to-transparent
                "
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}