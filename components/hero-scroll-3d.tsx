"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useSpring } from "framer-motion";

const TOTAL_FRAMES = 192;

interface HeroScroll3DProps {
  onExploreClick?: () => void;
}

export default function HeroScroll3D({}: HeroScroll3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Framer Motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });

  // Preload all 192 WebP frames from hero-vid2.mp4
  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(4, "0");
      img.src = `/frames/frame-${frameNum}.webp`;

      img.onload = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
        if (count >= 20) {
          setIsLoaded(true);
        }
      };

      loadedImages.push(img);
    }

    setImages(loadedImages);

    return () => {
      isMounted = false;
    };
  }, []);

  // Draw current frame on canvas with aspect-ratio cover
  const drawFrame = useCallback(
    (frameIdx: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !images.length) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const safeIdx = Math.min(Math.max(frameIdx, 0), TOTAL_FRAMES - 1);
      const img = images[safeIdx];
      if (!img || !img.complete) return;

      const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
      const rect = canvas.getBoundingClientRect();

      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }

      const hRatio = canvas.width / img.naturalWidth;
      const vRatio = canvas.height / img.naturalHeight;
      const ratio = Math.max(hRatio, vRatio);

      const destW = img.naturalWidth * ratio;
      const destH = img.naturalHeight * ratio;
      const destX = (canvas.width - destW) / 2;
      const destY = (canvas.height - destH) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, destX, destY, destW, destH);
    },
    [images]
  );

  // Sync scroll to frame rendering via Framer Motion
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      const targetFrame = Math.round(latest * (TOTAL_FRAMES - 1));
      requestAnimationFrame(() => drawFrame(targetFrame));
    });

    return () => unsubscribe();
  }, [smoothProgress, drawFrame]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const currentProgress = smoothProgress.get();
      const targetFrame = Math.round(currentProgress * (TOTAL_FRAMES - 1));
      drawFrame(targetFrame);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame, smoothProgress]);

  // Initial render when first frame is ready
  useEffect(() => {
    if (images[0]?.complete) {
      drawFrame(0);
    }
  }, [images, drawFrame]);

  const loadPercent = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#080c10]" id="hero-3d">
      {/* Sticky Fullscreen Viewport - Only the canvas frames */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Full-bleed Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block"
        />

        {/* Temporary loading indicator while initial frames buffer */}
        {!isLoaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#080c10] text-white">
            <div className="w-12 h-12 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin mb-4" />
            <div className="text-xs font-mono text-slate-400">
              Loading Frames ({loadPercent}%)
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
