"use client";

import { useMotionValueEvent, type MotionValue } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

/**
 * Scroll-scrubbed image-sequence player. Preloads a PNG frame sequence and
 * draws the frame matching scroll progress onto a canvas — the technique
 * sites like briamgroup.com use to "turn" a rendered 3D object on scroll.
 * Transparent PNGs composite cleanly on any background.
 */
export function ScrollFrames({
  progress,
  count,
  srcFor,
  still = false,
  stillFrame,
}: {
  progress: MotionValue<number>;
  count: number;
  /** 1-indexed URL for a given frame number. */
  srcFor: (i: number) => string;
  still?: boolean;
  /** 0-indexed frame to hold when `still` (defaults to ~40% through). */
  stillFrame?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgsRef = useRef<HTMLImageElement[]>([]);
  const currentRef = useRef<number>(-1);

  const draw = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = imgsRef.current[idx];
    if (!img || !img.complete || !img.naturalWidth) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // object-fit: contain
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = canvas.width / canvas.height;
    let dw: number, dh: number;
    if (ir > cr) {
      dw = canvas.width;
      dh = dw / ir;
    } else {
      dh = canvas.height;
      dw = dh * ir;
    }
    ctx.drawImage(img, (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh);
    currentRef.current = idx;
  }, []);

  const idxFor = useCallback(
    (p: number) => Math.max(0, Math.min(count - 1, Math.round(p * (count - 1)))),
    [count],
  );

  // preload the sequence
  useEffect(() => {
    let alive = true;
    const imgs: HTMLImageElement[] = [];
    for (let i = 1; i <= count; i++) {
      const img = new Image();
      img.src = srcFor(i);
      img.onload = () => {
        if (!alive) return;
        // draw first available frame so we're never blank
        if (currentRef.current === -1) {
          draw(still ? (stillFrame ?? Math.floor(count * 0.4)) : idxFor(progress.get()));
        }
      };
      imgs.push(img);
    }
    imgsRef.current = imgs;
    return () => {
      alive = false;
    };
  }, [count, srcFor, draw, idxFor, progress, still, stillFrame]);

  useMotionValueEvent(progress, "change", (p) => {
    if (still) return;
    const idx = idxFor(p);
    if (idx !== currentRef.current) draw(idx);
  });

  // redraw on resize
  useEffect(() => {
    const onResize = () => draw(currentRef.current < 0 ? 0 : currentRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [draw]);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden />;
}
