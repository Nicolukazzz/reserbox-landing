"use client";

// ============================================================================
// PLAN CARD - Componente reutilizable para mostrar un plan
// ============================================================================

import { motion } from "framer-motion";
import Link from "next/link";
import { Plan } from "@/types/plans";

interface PlanCardProps {
    plan: Plan;
    variant?: "full" | "compact";  // full = pricing page, compact = contact form
    selected?: boolean;
    onSelect?: (plan: Plan) => void;
    animationDelay?: number;
}

function formatPrice(price: number, currency: string = "COP"): string {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
    }).format(price);
}

export function PlanCard({
    plan,
    variant = "full",
    selected = false,
    onSelect,
    animationDelay = 0,
}: PlanCardProps) {
    // Compact variant for contact form
    if (variant === "compact") {
        const isHighlighted = plan.highlighted && plan.highlightLabel;

        return (
            <motion.button
                type="button"
                onClick={() => onSelect?.(plan)}
                className={`
                    relative p-5 rounded-xl border-2 text-left transition-all w-full
                    ${isHighlighted ? "pt-7" : ""}
                    ${selected
                        ? "border-indigo-500 bg-indigo-500/15"
                        : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/[0.08]"
                    }
                `}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: animationDelay * 0.05 }}
            >
                {/* Highlighted badge */}
                {isHighlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-medium whitespace-nowrap z-10">
                        {plan.highlightLabel}
                    </span>
                )}

                {/* Selected checkmark */}
                {selected && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                )}

                {/* Plan name and price - stacked layout */}
                <div className="space-y-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-bold text-white text-lg">{plan.name}</span>
                        <span className="text-indigo-400 font-semibold">
                            {formatPrice(plan.price, plan.currency)}
                            <span className="text-slate-500 font-normal text-sm">{plan.period}</span>
                        </span>
                    </div>
                    <p className="text-sm text-slate-400">{plan.subtitle}</p>
                </div>
            </motion.button>
        );
    }

    // Full variant for pricing section
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: animationDelay }}
        >
            <motion.div
                className={`relative p-6 lg:p-8 rounded-2xl transition-all h-full flex flex-col ${plan.highlighted
                        ? "bg-gradient-to-b from-indigo-500/20 to-purple-500/10 border-2 border-indigo-500/50"
                        : "bg-white/5 border border-white/10 hover:border-white/20"
                    }`}
                whileHover={{
                    scale: 1.02,
                    y: -5,
                    boxShadow: plan.highlighted
                        ? "0 25px 50px -12px rgba(99, 102, 241, 0.4)"
                        : "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
                }}
            >
                {plan.highlighted && plan.highlightLabel && (
                    <motion.div
                        className="absolute -top-4 left-1/2 -translate-x-1/2"
                        initial={{ scale: 0, y: -10 }}
                        whileInView={{ scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    >
                        <span className="px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-medium">
                            {plan.highlightLabel}
                        </span>
                    </motion.div>
                )}

                <div className="mb-4">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <p className="text-sm text-indigo-400 font-medium">{plan.subtitle}</p>
                    <p className="text-sm text-slate-400 mt-1">{plan.description}</p>
                </div>

                {/* Price */}
                <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: "spring" }}
                >
                    <span className="text-3xl lg:text-4xl font-extrabold text-white">
                        {formatPrice(plan.price, plan.currency)}
                    </span>
                    <span className="text-slate-400">{plan.period}</span>
                </motion.div>

                {/* Features */}
                <ul className="space-y-3 mb-6 flex-grow">
                    {plan.features.map((feature, j) => (
                        <motion.li
                            key={j}
                            className={`flex items-start gap-3 text-sm lg:text-base ${feature.included ? "text-slate-300" : "text-slate-500"
                                }`}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: j * 0.05 }}
                        >
                            {feature.included ? (
                                <svg
                                    className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg
                                    className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                            {feature.text}
                        </motion.li>
                    ))}
                </ul>

                {/* CTA */}
                <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-auto"
                >
                    <Link
                        href={`/contacto?plan=${plan.slug}`}
                        className={`block w-full py-3 rounded-xl font-medium text-center transition-all ${plan.highlighted
                                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90"
                                : "bg-white/10 text-white hover:bg-white/20"
                            }`}
                    >
                        {plan.ctaText}
                    </Link>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
