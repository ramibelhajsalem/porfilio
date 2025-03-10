"use client";

import { cn } from "@/lib/utils";
import { useMemo } from "react";

type GlassWaveProps = {
  /** z-index value */
  zIndex?: number;
  /** Rotation in degrees */
  rotate?: number;
  /** Width as CSS string e.g. "94vw", "100%" */
  width?: string;
  /** Height in px */
  height?: number;
  /** Backdrop blur amount in px */
  blur?: number;
  /** Stroke width for the wave path */
  strokeWidth?: number;
  /** SVG path d attribute */
  path?: string;
  /** Extra Tailwind classes */
  className?: string;
};

export default function GlassWave({
  zIndex = 15,
  rotate = 0,
  width = "100%",
  height = 200,
  blur = 8,
  strokeWidth = 45,
  path = "M0 120 Q200 40 400 100 Q600 170 800 80 Q1000 0 1200 100",
  className,
}: GlassWaveProps) {
  // Build an SVG mask: white stroke on transparent = where glass shows through
  const maskSvg = useMemo(() => {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 240' preserveAspectRatio='none'><path d='${path}' stroke='white' stroke-width='${strokeWidth}' stroke-linecap='round' fill='none'/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, [path, strokeWidth]);

  return (
    <div
      className={cn("pointer-events-none", className)}
      style={{
        width,
        height: `${height}px`,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        zIndex,
        WebkitMaskImage: maskSvg,
        maskImage: maskSvg,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        backdropFilter: `blur(${blur}px) saturate(1.3)`,
        WebkitBackdropFilter: `blur(${blur}px) saturate(1.3)`,
        background: "rgba(255, 255, 255, 0.12)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
      }}
    />
  );
}
