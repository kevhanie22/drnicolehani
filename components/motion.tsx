"use client";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

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
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: easeOut, delay }}
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
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: delay, delayChildren: 0.1 } },
  };
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
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
