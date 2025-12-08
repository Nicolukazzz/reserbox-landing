"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, Variants, HTMLMotionProps } from "framer-motion";

// ============================================================================
// ANIMATION UTILITIES & HOOKS
// ============================================================================

// Custom hook for scroll-triggered animations
export function useScrollAnimation(threshold = 0.1) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: threshold });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    return { ref, controls, isInView };
}

// ============================================================================
// PREDEFINED ANIMATION VARIANTS
// ============================================================================

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

export const blurIn: Variants = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

// Stagger container for children animations
export const staggerContainer: Variants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

export const staggerContainerFast: Variants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.05,
        },
    },
};

// ============================================================================
// REUSABLE ANIMATION COMPONENTS
// ============================================================================

interface AnimationWrapperProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    variants?: Variants;
    className?: string;
    delay?: number;
    duration?: number;
    once?: boolean;
    amount?: number;
}

// FadeIn component with scroll trigger
export function FadeIn({
    children,
    variants = fadeInUp,
    className = "",
    delay = 0,
    duration,
    once = true,
    amount = 0.2,
    ...props
}: AnimationWrapperProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, amount });

    const customVariants: Variants = {
        hidden: variants.hidden,
        visible: {
            ...variants.visible,
            transition: {
                ...(variants.visible as { transition?: object }).transition,
                delay,
                ...(duration && { duration }),
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={customVariants}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// FadeInUp - most common animation
export function FadeInUp({
    children,
    delay = 0,
    className = "",
    ...props
}: Omit<AnimationWrapperProps, "variants">) {
    return (
        <FadeIn variants={fadeInUp} delay={delay} className={className} {...props}>
            {children}
        </FadeIn>
    );
}

// FadeInDown 
export function FadeInDown({
    children,
    delay = 0,
    className = "",
    ...props
}: Omit<AnimationWrapperProps, "variants">) {
    return (
        <FadeIn variants={fadeInDown} delay={delay} className={className} {...props}>
            {children}
        </FadeIn>
    );
}

// FadeInLeft
export function FadeInLeft({
    children,
    delay = 0,
    className = "",
    ...props
}: Omit<AnimationWrapperProps, "variants">) {
    return (
        <FadeIn variants={fadeInLeft} delay={delay} className={className} {...props}>
            {children}
        </FadeIn>
    );
}

// FadeInRight
export function FadeInRight({
    children,
    delay = 0,
    className = "",
    ...props
}: Omit<AnimationWrapperProps, "variants">) {
    return (
        <FadeIn variants={fadeInRight} delay={delay} className={className} {...props}>
            {children}
        </FadeIn>
    );
}

// ScaleIn - for cards and items
export function ScaleIn({
    children,
    delay = 0,
    className = "",
    ...props
}: Omit<AnimationWrapperProps, "variants">) {
    return (
        <FadeIn variants={scaleIn} delay={delay} className={className} {...props}>
            {children}
        </FadeIn>
    );
}

// BlurIn - for text reveals
export function BlurIn({
    children,
    delay = 0,
    className = "",
    ...props
}: Omit<AnimationWrapperProps, "variants">) {
    return (
        <FadeIn variants={blurIn} delay={delay} className={className} {...props}>
            {children}
        </FadeIn>
    );
}

// ============================================================================
// STAGGER CONTAINER - For animating lists/grids
// ============================================================================

interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
    initialDelay?: number;
    once?: boolean;
    amount?: number;
}

export function StaggerContainer({
    children,
    className = "",
    staggerDelay = 0.1,
    initialDelay = 0.1,
    once = true,
    amount = 0.1,
}: StaggerContainerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, amount });

    const containerVariants: Variants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: initialDelay,
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Stagger Item - child of StaggerContainer
interface StaggerItemProps {
    children: ReactNode;
    className?: string;
    direction?: "up" | "down" | "left" | "right" | "scale";
}

export function StaggerItem({
    children,
    className = "",
    direction = "up",
}: StaggerItemProps) {
    const variants: Record<string, Variants> = {
        up: fadeInUp,
        down: fadeInDown,
        left: fadeInLeft,
        right: fadeInRight,
        scale: scaleIn,
    };

    return (
        <motion.div variants={variants[direction]} className={className}>
            {children}
        </motion.div>
    );
}

// ============================================================================
// ANIMATED TEXT COMPONENTS
// ============================================================================

interface AnimatedTextProps {
    text: string;
    className?: string;
    delay?: number;
    once?: boolean;
}

// Animated heading - word by word
export function AnimatedHeading({
    text,
    className = "",
    delay = 0,
    once = true,
}: AnimatedTextProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, amount: 0.5 });

    const words = text.split(" ");

    const containerVariants: Variants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: delay,
            },
        },
    };

    const wordVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className={className}
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    variants={wordVariants}
                    className="inline-block mr-[0.25em]"
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}

// ============================================================================
// HOVER ANIMATION COMPONENTS
// ============================================================================

interface HoverCardProps {
    children: ReactNode;
    className?: string;
    scale?: number;
    lift?: number;
}

// Card with hover lift effect
export function HoverCard({
    children,
    className = "",
    scale = 1.02,
    lift = -5,
}: HoverCardProps) {
    return (
        <motion.div
            className={className}
            whileHover={{
                scale,
                y: lift,
                transition: { duration: 0.2, ease: "easeOut" },
            }}
            whileTap={{ scale: 0.98 }}
        >
            {children}
        </motion.div>
    );
}

// Button with pulse effect
interface HoverButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export function HoverButton({ children, className = "", onClick }: HoverButtonProps) {
    return (
        <motion.button
            className={className}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            {children}
        </motion.button>
    );
}

// ============================================================================
// FLOATING ANIMATION - For decorative elements
// ============================================================================

interface FloatingProps {
    children: ReactNode;
    className?: string;
    duration?: number;
    distance?: number;
    delay?: number;
}

export function Floating({
    children,
    className = "",
    duration = 3,
    distance = 10,
    delay = 0,
}: FloatingProps) {
    return (
        <motion.div
            className={className}
            animate={{
                y: [0, -distance, 0],
            }}
            transition={{
                duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay,
            }}
        >
            {children}
        </motion.div>
    );
}

// Pulsing glow effect
export function PulsingGlow({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            className={className}
            animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.05, 1],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            {children}
        </motion.div>
    );
}

// ============================================================================
// COUNTER ANIMATION - For stats
// ============================================================================

interface CounterProps {
    from?: number;
    to: number;
    duration?: number;
    className?: string;
    suffix?: string;
    prefix?: string;
}

export function Counter({
    from = 0,
    to,
    duration = 2,
    className = "",
    suffix = "",
    prefix = "",
}: CounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(from);

    useEffect(() => {
        if (!isInView) return;

        const startTime = Date.now();
        const endTime = startTime + duration * 1000;

        const updateCount = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / (duration * 1000), 1);

            // Easing function (ease out)
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const currentCount = Math.floor(from + (to - from) * easeOut);
            setCount(currentCount);

            if (now < endTime) {
                requestAnimationFrame(updateCount);
            } else {
                setCount(to);
            }
        };

        requestAnimationFrame(updateCount);
    }, [isInView, from, to, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}{count}{suffix}
        </span>
    );
}

// ============================================================================
// PARALLAX COMPONENT
// ============================================================================

interface ParallaxProps {
    children: ReactNode;
    className?: string;
    speed?: number; // Negative = slower, Positive = faster
}

export function Parallax({ children, className = "", speed = 0.5 }: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                const scrolled = -rect.top * speed;
                setOffset(scrolled);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [speed]);

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{ y: offset }}
        >
            {children}
        </motion.div>
    );
}

// ============================================================================
// REVEAL ON SCROLL - With clip path
// ============================================================================

export function RevealOnScroll({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                {children}
            </motion.div>
        </div>
    );
}

// Export motion for direct use
export { motion };
