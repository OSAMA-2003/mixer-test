"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface MixerHeaderProps {
  isVisible?: boolean;
}

const navItems = [
  { label: "الرئيسية", href: "/" },
  { label: "المنيو  ", href: "/menu" },
  { label: "فروعنا", href: "/#branches" },
  { label: "عن الخلاط", href: "/#about" },
  { label: "تواصل معنا", href: "/#contact" },
];

export default function MixerHeader({
  isVisible = true,
}: MixerHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500 ease-out
        ${isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
        }
        ${scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-black/[0.06] shadow-sm"
          : "bg-white/80 backdrop-blur-md"
        }
      `}
    >
      <div
        className={`
          max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10
          flex items-center justify-between
          transition-all duration-500
          ${scrolled ? "h-[70px]" : "h-[82px]"}
        `}
      >
        {/* LEFT — Logo */}
        <Link
          href="/"
          className="
              relative
              w-24 h-24 sm:w-28 sm:h-28
              flex items-center justify-center
            "
        >
          <Image
            src="/logo.png"
            alt="الخلاط سوهاج"
            width={140}
            height={140}
            className="object-contain"
            priority
          />
        </Link>


        {/* CENTER — Navigation */}
        <nav
          dir="rtl"
          className="
            hidden md:flex
            items-center
            gap-1
            absolute left-1/2 -translate-x-1/2
          "
        >
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative
                px-4 lg:px-5
                py-2.5
                text-[14px]
                font-bold
                transition-colors duration-300
                ${index === 0
                  ? "text-[#008ba3]"
                  : "text-[#3f4448] hover:text-[#008ba3]"
                }

                after:absolute
                after:right-4
                after:left-4
                after:-bottom-[2px]
                after:h-[2px]
                after:rounded-full
                after:bg-[#fab818]
                after:scale-x-0
                after:origin-right
                after:transition-transform
                after:duration-300

                hover:after:scale-x-100
              `}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT — Cart & Order Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="
              group
              relative
              inline-flex items-center gap-2.5
              bg-[#008ba3]
              hover:bg-[#00798f]
              text-white
              px-5 sm:px-6
              h-11
              rounded-full
              text-[13px]
              font-bold
              transition-all duration-300
              hover:-translate-y-0.5
              shadow-[0_6px_20px_rgba(0,139,163,0.18)]
            "
          >
            <ShoppingCart
              className="
                w-[17px] h-[17px]
                transition-transform duration-300
                group-hover:scale-110
              "
            />

            <span>سلة الطلبات</span>

            {totalItems > 0 && (
              <span className="flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-[#fab818] text-slate-950 font-black text-xs shadow-md animate-pulse">
                {totalItems}
              </span>
            )}
          </Link>
        </div>


        {/* Mobile menu button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(!mobileOpen);
          }}
          className="
              md:hidden
              mr-1
              w-10 h-10
              flex items-center justify-center
              rounded-full
              border border-black/[0.08]
              text-[#303438]
              transition-all duration-300
              hover:border-[#008ba3]
              hover:text-[#008ba3]
            "
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-[19px] h-[19px]" />
          ) : (
            <Menu className="w-[19px] h-[19px]" />
          )}
        </button>
      </div>


      <div
        className={`
          md:hidden
          overflow-hidden
          transition-all duration-400 ease-out
          ${mobileOpen
            ? "max-h-[420px] opacity-100"
            : "max-h-0 opacity-0"
          }
        `}
      >
        <div
          dir="rtl"
          className="
            bg-white
            border-t border-black/[0.05]
            px-5
            py-4
          "
        >
          <nav className="flex flex-col">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center justify-between
                  py-4
                  border-b border-black/[0.05]
                  text-[15px]
                  font-bold
                  transition-colors duration-200
                  ${index === 0
                    ? "text-[#008ba3]"
                    : "text-[#3f4448] hover:text-[#008ba3]"
                  }
                `}
              >
                <span>{item.label}</span>

                <span
                  className="
                    w-1.5 h-1.5
                    rounded-full
                    bg-[#fab818]
                    opacity-0
                    transition-opacity
                    group-hover:opacity-100
                  "
                />
              </Link>
            ))}

            {/* Mobile CTA */}
            <Link
              href="/cart"
              onClick={() => setMobileOpen(false)}
              className="
                mt-4
                flex items-center justify-center gap-2
                h-12
                rounded-full
                bg-[#008ba3]
                text-white
                text-sm
                font-bold
                shadow-[0_8px_24px_rgba(0,139,163,0.15)]
              "
            >
              <ShoppingCart className="w-4 h-4" />
              <span>سلة الطلبات ({totalItems})</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}