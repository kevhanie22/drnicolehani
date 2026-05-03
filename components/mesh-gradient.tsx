"use client";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Subtle animated mesh gradient — radial blobs that breathe in/out.
 * Sits behind a section. Low opacity. Composes well over cream/navy.
 */
export function MeshGradient({
  variant = "warm",
  className = "",
}: {
  variant?: "warm" | "navy" | "cool";
  className?: string;
}) {
  const reduce = useReducedMotion();

  const palettes = {
    warm: {
      a: "rgba(200,168,91,0.32)",   // gold
      b: "rgba(247,242,232,0.0)",
      c: "rgba(14,42,90,0.10)",     // navy whisper
      d: "rgba(200,168,91,0.18)",
    },
    navy: {
      a: "rgba(200,168,91,0.28)",
      b: "rgba(255,255,255,0.04)",
      c: "rgba(28,57,109,0.55)",
      d: "rgba(200,168,91,0.18)",
    },
    cool: {
      a: "rgba(159,183,221,0.32)",
      b: "rgba(255,255,255,0.0)",
      c: "rgba(14,42,90,0.12)",
      d: "rgba(200,168,91,0.16)",
    },
  } as const;

  const p = palettes[variant];

  const transition = reduce
    ? undefined
    : { duration: 14, repeat: Infinity, repeatType: "mirror" as const, ease: "easeInOut" as const };

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute -top-1/3 -left-1/4 h-[80vh] w-[80vh] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle at center, ${p.a}, ${p.b} 70%)` }}
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={reduce ? undefined : { x: [0, 80, -40, 0], y: [0, -60, 40, 0], scale: [1, 1.08, 0.95, 1] }}
        transition={transition}
      />
      <motion.div
        className="absolute -bottom-1/3 -right-1/4 h-[70vh] w-[70vh] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle at center, ${p.c}, transparent 70%)` }}
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={reduce ? undefined : { x: [0, -60, 40, 0], y: [0, 50, -30, 0], scale: [1, 1.06, 0.96, 1] }}
        transition={transition ? { ...transition, duration: 18 } : undefined}
      />
      <motion.div
        className="absolute top-1/3 left-1/2 h-[50vh] w-[50vh] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle at center, ${p.d}, transparent 70%)` }}
        initial={{ scale: 1, opacity: 0.7 }}
        animate={reduce ? undefined : { scale: [1, 1.12, 0.96, 1], opacity: [0.7, 0.9, 0.6, 0.7] }}
        transition={transition ? { ...transition, duration: 16 } : undefined}
      />
      {/* grain — sealed on top */}
      <div
        className="absolute inset-0 mix-blend-multiply opacity-[0.07]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
