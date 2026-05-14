"use client";
import { motion, useReducedMotion, useAnimation, type Variants } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

/**
 * 2.5s safety net: if the IntersectionObserver never fires (anchor jump,
 * Lenis edge case, print, headless capture), force the content visible so
 * mid-page sections can't stay stuck at opacity:0.
 */
function useSafetyReveal(controls: ReturnType<typeof useAnimation>) {
  const fired = useRef(false);
  useEffect(() => {
    const t = setTimeout(() => {
      if (!fired.current) controls.start("show");
    }, 2500);
    return () => clearTimeout(t);
  }, [controls]);
  return () => {
    fired.current = true;
  };
}

export function FadeUp({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const controls = useAnimation();
  const markFired = useSafetyReveal(controls);
  const Comp = motion[as] as typeof motion.div;
  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    show: reduce
      ? { opacity: 1, transition: { duration: 0.4 } }
      : { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut, delay } },
  };
  return (
    <Comp
      variants={variants}
      initial="hidden"
      animate={controls}
      whileInView="show"
      onViewportEnter={() => {
        markFired();
        controls.start("show");
      }}
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </Comp>
  );
}

export function Stagger({
  children,
  className,
  delay = 0.05,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const controls = useAnimation();
  const markFired = useSafetyReveal(controls);
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: delay, delayChildren: 0.1 } },
  };
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={controls}
      whileInView="show"
      onViewportEnter={() => {
        markFired();
        controls.start("show");
      }}
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    show: reduce
      ? { opacity: 1, transition: { duration: 0.4 } }
      : { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  };
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

export function HoverLift({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
}) {
  const props = {
    className,
    whileHover: { y: -4, transition: { duration: 0.3, ease: easeOut } },
    whileTap: { scale: 0.99 },
  };
  if (href) return <motion.a href={href} {...props}>{children}</motion.a>;
  return <motion.div {...props}>{children}</motion.div>;
}
