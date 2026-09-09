"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import NextImage from "next/image";
import { useScroll, useSpring, motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface ImageSequenceProps {
  totalFrames?: number;
  directory?: string;
  framePrefix?: string;
  digits?: number;
  ext?: string;
  aspectRatio?: number; // 1280 / 720 = 1.77777777778
  nativeWidth?: number;
  nativeHeight?: number;
  containerHeight?: string;
  loadingText?: string;
  className?: string;
  onSequenceFinish?: (isFinished: boolean) => void;
}

export default function ImageSequence({
  totalFrames = 139,
  directory = "/frames",
  framePrefix = "frame-",
  digits = 4,
  ext = ".webp",
  nativeWidth = 1280,
  nativeHeight = 720,
  containerHeight = "h-[420vh]",
  loadingText = "استنى ثانية... جاري تحضير الخلاط ",
  className = "",
  onSequenceFinish,
}: ImageSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Performance cache: stores loaded HTMLImageElement instances
  const imageCache = useRef<Map<number, HTMLImageElement>>(new Map());
  const pendingRequests = useRef<Set<number>>(new Set());

  // Animation frame and render state
  const rafId = useRef<number | null>(null);
  const currentFrameIndexRef = useRef<number>(0);
  const isMountedRef = useRef<boolean>(true);

  // Loading state
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isInitialReady, setIsInitialReady] = useState<boolean>(false);

  // Format frame URL: /frames/frame-0001.webp
  const getFrameUrl = useCallback(
    (index: number) => {
      const frameNum = String(index + 1).padStart(digits, "0");
      return `${directory}/${framePrefix}${frameNum}${ext}`;
    },
    [directory, framePrefix, digits, ext]
  );

  // Single-frame fetcher with async decode
  const fetchFrame = useCallback(
    async (index: number): Promise<HTMLImageElement | null> => {
      if (imageCache.current.has(index)) {
        return imageCache.current.get(index)!;
      }
      if (pendingRequests.current.has(index)) {
        return null;
      }

      pendingRequests.current.add(index);
      const url = getFrameUrl(index);

      return new Promise<HTMLImageElement | null>((resolve) => {
        const img = new window.Image();
        img.src = url;

        img.onload = async () => {
          try {
            if ("decode" in img) {
              await img.decode();
            }
          } catch {
            // Ignore decode failures (older browser fallbacks)
          }

          if (isMountedRef.current) {
            imageCache.current.set(index, img);
            pendingRequests.current.delete(index);
            setLoadedCount((prev) => prev + 1);
            resolve(img);
          } else {
            resolve(null);
          }
        };

        img.onerror = () => {
          pendingRequests.current.delete(index);
          resolve(null);
        };
      });
    },
    [getFrameUrl]
  );

  // High-DPI canvas render function with cover aspect-ratio
  const drawFrame = useCallback(
    (targetIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      const clampedIndex = Math.min(Math.max(targetIndex, 0), totalFrames - 1);
      currentFrameIndexRef.current = clampedIndex;

      // Check if image is available in cache
      let img = imageCache.current.get(clampedIndex);

      // If requested frame isn't loaded yet, find closest available cached frame to avoid flickering
      if (!img) {
        fetchFrame(clampedIndex).then((fetched) => {
          if (fetched && currentFrameIndexRef.current === clampedIndex) {
            drawFrame(clampedIndex);
          }
        });

        // Search nearest cached neighbor
        for (let offset = 1; offset < 15; offset++) {
          const prev = imageCache.current.get(clampedIndex - offset);
          if (prev) {
            img = prev;
            break;
          }
          const next = imageCache.current.get(clampedIndex + offset);
          if (next) {
            img = next;
            break;
          }
        }
      }

      if (!img) return;

      // Handle Retina / High-DPI sizing (clamp DPR to 2 to prevent mobile GPU overhead)
      const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
      const rect = canvas.getBoundingClientRect();
      const targetWidth = Math.round(rect.width * dpr);
      const targetHeight = Math.round(rect.height * dpr);

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      // Aspect ratio "cover" calculations (no stretching or letterbox)
      const canvasRatio = canvas.width / canvas.height;
      const imageRatio = nativeWidth / nativeHeight;

      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imageRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imageRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imageRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, nativeWidth, nativeHeight, offsetX, offsetY, drawWidth, drawHeight);
    },
    [totalFrames, fetchFrame, nativeWidth, nativeHeight]
  );

  // Framer Motion Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring physics for fluid cinematic scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 320,
    damping: 36,
    restDelta: 0.0005,
  });

  // Subscribe directly to scroll progress changes (ZERO React re-renders during scroll)
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      const targetIndex = Math.min(
        Math.max(Math.round(latest * (totalFrames - 1)), 0),
        totalFrames - 1
      );

      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        drawFrame(targetIndex);
      });
    });

    return () => {
      unsubscribe();
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [smoothProgress, totalFrames, drawFrame]);

  // Track sequence completion to notify parent (e.g. to reveal navbar after finish)
  const isFinishedRef = useRef<boolean>(false);
  useEffect(() => {
    if (!onSequenceFinish) return;

    const checkFinished = (progress: number) => {
      const finished = progress >= 0.95;
      if (finished !== isFinishedRef.current) {
        isFinishedRef.current = finished;
        onSequenceFinish(finished);
      }
    };

    checkFinished(scrollYProgress.get());

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      checkFinished(latest);
    });

    return () => unsubscribe();
  }, [scrollYProgress, onSequenceFinish]);

  // Window resize listener
  useEffect(() => {
    const handleResize = () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        drawFrame(currentFrameIndexRef.current);
      });
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // Intelligent progressive preload strategy:
  // 1. Immediately fetch Frame 0 and render on canvas
  // 2. Preload first buffer (first 18 frames) to unlock initial ready state
  // 3. Incrementally fetch remaining frames in gentle chunks
  useEffect(() => {
    isMountedRef.current = true;

    async function initializeFrames() {
      // Step 1: Render first frame immediately
      const firstFrame = await fetchFrame(0);
      if (firstFrame && isMountedRef.current) {
        drawFrame(0);
      }

      // Step 2: Buffer initial 18 frames
      const initialBatch = Array.from({ length: Math.min(18, totalFrames) }, (_, i) => i);
      await Promise.all(initialBatch.map((idx) => fetchFrame(idx)));

      if (isMountedRef.current) {
        setIsInitialReady(true);
      }

      // Step 3: Stream remaining frames in gentle batches of 6 to prevent network choking
      const remainingIndices: number[] = [];
      for (let i = 18; i < totalFrames; i++) {
        remainingIndices.push(i);
      }

      const BATCH_SIZE = 6;
      for (let i = 0; i < remainingIndices.length; i += BATCH_SIZE) {
        if (!isMountedRef.current) break;
        const chunk = remainingIndices.slice(i, i + BATCH_SIZE);
        await Promise.all(chunk.map((idx) => fetchFrame(idx)));
      }
    }

    initializeFrames();

    return () => {
      isMountedRef.current = false;
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [fetchFrame, drawFrame, totalFrames]);

  const loadPercent = Math.min(100, Math.round((loadedCount / totalFrames) * 100));

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${containerHeight} bg-[#070b0e] ${className}`}
      id="hero-cinematic"
      dir="rtl"
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Full-bleed Hardware Accelerated Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block will-change-transform"
        />

        {/* Sleek Logo Centered Loader with Dynamic Progress Circle (White Background) */}
        <AnimatePresence>
          {!isInitialReady && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white text-gray-900 select-none px-4 text-center"
            >
              {/* Radial glow background */}
              <div className="absolute w-72 h-72 rounded-full bg-[#fab818]/15 blur-3xl pointer-events-none" />

              {/* Circular Loader with Centered Logo */}
              <div className="relative mb-6 w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">

                {/* Outer Ambient Glowing Spin Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#fab818]/40 animate-[spin_12s_linear_infinite]" />
                <div className="absolute inset-2 rounded-full border border-[#008ba3]/25 animate-[spin_8s_linear_infinite_reverse]" />

                {/* SVG Progress Circle */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 160 160">
                  <defs>
                    <linearGradient id="loader-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fab818" />
                      <stop offset="100%" stopColor="#008ba3" />
                    </linearGradient>
                  </defs>

                  {/* Track Circle */}
                  <circle
                    cx="80"
                    cy="80"
                    r="72"
                    fill="transparent"
                    stroke="rgba(0, 0, 0, 0.08)"
                    strokeWidth="6"
                  />

                  {/* Progress Circle */}
                  <circle
                    cx="80"
                    cy="80"
                    r="72"
                    fill="transparent"
                    stroke="url(#loader-gradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={452.39}
                    strokeDashoffset={452.39 - (452.39 * loadPercent) / 100}
                    className="transition-all duration-300 ease-out"
                  />
                </svg>

                {/* Centered Brand Logo */}
                <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center p-2 rounded-full bg-white border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
                  <NextImage
                    src="/logo.png"
                    alt="الخلاط"
                    width={100}
                    height={100}
                    className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)] animate-pulse"
                    priority
                  />
                </div>
              </div>

              {/* Egyptian Loading Text */}
              <p className="text-lg sm:text-xl font-bold font-cairo text-[#015f70] mb-2 tracking-wide">
                {loadingText}
              </p>

              {/* Progress Percentage Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#008ba3]/10 border border-[#008ba3]/20 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#fab818] animate-ping" />
                <span className="text-xs font-mono font-bold text-[#015f70]">
                  {loadPercent}%
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Scroll-Down Arrow Overlay (Click to jump directly to next section) */}
        {isInitialReady && (
          <motion.button
            type="button"
            aria-label="الانتقال للقسم التالي"
            onClick={() => {
              const nextSection = document.getElementById("menu-cta");
              if (nextSection) {
                nextSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{
              opacity: { duration: 0.8 },
              y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            }}
            className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 cursor-pointer group bg-black/40 hover:bg-slate-950/80 backdrop-blur-md text-white px-8 py-2.5 rounded-xl border border-white/20 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <span className="text-[11px] sm:text-xs font-black font-cairo text-white/90 group-hover:text-[#fab818] transition-colors">
              اكتشف العروض
            </span>
            <ChevronDown className="w-5 h-5 text-[#fab818] stroke-[2.5]" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
