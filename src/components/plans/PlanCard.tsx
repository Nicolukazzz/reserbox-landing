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
        return (
            <button
                type="button"
                onClick={() => onSelect?.(plan)}
                className={`p-4 rounded-xl border-2 text-left transition-all relative w-full ${selected
                        ? "border-indigo-500 bg-indigo-500/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
            >
                {plan.highlighted && plan.highlightLabel && (
                    <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs">
                        {plan.highlightLabel}
                    </span>
                )}
                <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white">{plan.name}</span>
                    <span className="text-sm text-slate-400">
                        {formatPrice(plan.price, plan.currency)}{plan.period}
                    </span>
                </div>
                <p className="text-sm text-slate-400">{plan.subtitle}</p>
            </button>
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
