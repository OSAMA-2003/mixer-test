"use client";

import Link from "next/link";
import {
    Smartphone,
    ShoppingBag,
    Phone,
    ArrowLeft,
    Clock3,
    MapPin,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Delivery() {
    return (
        <section
            dir="rtl"
            className="relative overflow-hidden bg-[#004754] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24"
        >

            <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-8">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="space-y-6 text-right lg:col-span-7"
                >
                    {/* Badge */}

                    <div className="mb-4 flex items-center gap-3">
                        <span className="text-xs sm:text-sm font-black tracking-widest text-[#fab818]">
                            خدمة التوصيل السريع
                        </span>
                        <span className="h-px w-12 bg-[#fab818]/40" />
                    </div>

                    {/* Heading */}

                    <h2 className="font-aref text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
                        نفسك في الخلاط؟
                        <br />

                        <span className="text-brand-yellow">
                            خليه يوصلك.
                        </span>
                    </h2>

                    {/* Description */}

                    <p className="max-w-xl text-base font-medium leading-8 text-white/85 sm:text-lg">
                        اختار طلبك من المنيو، وإحنا نجهزهولك بعناية ويوصلك لحد باب بيتك
                        طازة وسخن زي ما بتحبه.
                    </p>

                    {/* Buttons */}

                    <div className="flex flex-wrap items-center gap-3 pt-3">
                        <Link
                            href="/menu"
                            className="
                group
                inline-flex
                items-center
                gap-3
                rounded-2xl
                bg-brand-dark
                px-7
                py-4
                text-sm
                font-black
                text-white
                shadow-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-black
                hover:shadow-2xl
              "
                        >
                            <ShoppingBag className="h-5 w-5 text-brand-orange" />

                            <span>اطلب أونلاين</span>

                            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                        </Link>

                        <a
                            href="tel:01007375151"
                            className="
                inline-flex
                items-center
                gap-2
                rounded-2xl
                border
                border-white/30
                bg-white/10
                px-6
                py-4
                text-sm
                font-bold
                text-white
                backdrop-blur-md
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white/20
              "
                        >
                            <Phone className="h-4 w-4" />

                            <span dir="ltr">01007375151</span>
                        </a>
                    </div>

                    {/* Info */}

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-3 text-xs font-bold text-white/75">
                        <div className="flex items-center gap-2">
                            <Clock3 className="h-4 w-4" />
                            <span>توصيل سريع</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>داخل سوهاج</span>
                        </div>
                    </div>
                </motion.div>

                {/* ================= IMAGE ================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.85,
                        x: -40,
                    }}
                    whileInView={{
                        opacity: 1,
                        scale: 1,
                        x: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                    transition={{
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative flex items-center justify-center lg:col-span-5"
                >
                    {/* Glow */}

                    <div className="absolute h-72 w-72 rounded-full bg-white/15 blur-3xl sm:h-96 sm:w-96" />

                    <motion.img
                        src="/delivery.png"
                        alt="دليفري الخلاط"
                        whileHover={{
                            scale: 1.04,
                            y: -8,
                        }}
                        transition={{
                            duration: 0.5,
                            ease: "easeOut",
                        }}
                        className="
              relative
              z-10
              w-full
              max-w-[420px]
              object-contain
              drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)]
              sm:max-w-[480px]
            "
                    />
                </motion.div>
            </div>
        </section>
    );
}