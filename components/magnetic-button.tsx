"use client";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Magnetic({
  children,
  strength = 0.3,
  className,
  href,
  onClick,
  target,
  rel,
  cursorLabel,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  cursorLabel?: string;
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.5 });

  useEffect(() => setMounted(true), []);

  function onMove(e: MouseEvent) {
    if (!mounted) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  // SSR + first render: render plain element to avoid hydration mismatch from motion style
  if (!mounted) {
    if (href) {
      return (
        <a href={href} target={target} rel={rel} onClick={onClick} className={className} data-cursor={cursorLabel}>
          {children}
        </a>
      );
    }
    return (
      <button onClick={onClick} className={className} data-cursor={cursorLabel}>
        {children}
      </button>
    );
  }

  const Comp: any = href ? motion.a : motion.button;
  return (
    <Comp
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
      data-cursor={cursorLabel}
    >
      {children}
    </Comp>
  );
}
