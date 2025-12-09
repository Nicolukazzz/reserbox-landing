"use client";

import Link from "next/link";
import {
    FadeInUp,
    FadeInLeft,
    FadeInRight,
    StaggerContainer,
    StaggerItem,
    HoverCard,
    motion
} from "../animations";

const PLANS = [
    {
        id: "basico",
        name: "Básico",
        price: 49000,
        period: "/mes",
        description: "Todo lo esencial para tu negocio",
        features: [
            "Tablero completo",
            "Página de reservas online",
            "Gestión de empleados",
            "Gestión de servicios",
            "Gestión de clientes",
            "Métricas y reportes",
        ],
        notIncluded: [
            "Bot de WhatsApp",
            "Recordatorios por WhatsApp",
        ],
        cta: "Elegir Básico",
        highlighted: false,
    },
    {
        id: "pro",
        name: "Pro",
        price: 99000,
        period: "/mes",
        description: "Automatización total con WhatsApp",
        features: [
            "Todo del plan Básico",
            "Bot de WhatsApp integrado",
            "Reservas por WhatsApp",
            "Recordatorios por WhatsApp",
            "Notificaciones automáticas",
            "Soporte prioritario",
        ],
        notIncluded: [],
        cta: "Elegir Pro",
        highlighted: true,
    },
];

function formatPrice(price: number): string {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
    }).format(price);
}

export function PricingSection() {
    return (
        <section id="pricing" className="py-24 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Section header */}
                <FadeInUp className="text-center mb-16">
                    <motion.p
                        className="text-sm uppercase tracking-widest text-indigo-400 mb-4 font-bold"
                        initial={{ opacity: 0, letterSpacing: "0.1em" }}
                        whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Precios
                    </motion.p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                        Planes simples, sin sorpresas
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto mb-6">
                        Elige el plan que mejor se adapte a tu negocio. Todos incluyen:
                    </p>
                    {/* Trust badges */}
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-300">
                            ✓ 15 días gratis
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-sm text-indigo-300">
                            ✓ Configuración asistida
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm text-purple-300">
                            ✓ Soporte incluido
                        </span>
                    </div>
                </FadeInUp>

                {/* Pricing cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {PLANS.map((plan, i) => {
                        const AnimWrapper = i === 0 ? FadeInLeft : FadeInRight;

                        return (
                            <AnimWrapper key={i} delay={i * 0.1}>
                                <HoverCard scale={1.02} lift={-5}>
                                    <motion.div
                                        className={`relative p-8 rounded-2xl transition-all h-full ${plan.highlighted
                                            ? "bg-gradient-to-b from-indigo-500/20 to-purple-500/10 border-2 border-indigo-500/50"
                                            : "bg-white/5 border border-white/10 hover:border-white/20"
                                            }`}
                                        whileHover={{
                                            boxShadow: plan.highlighted
                                                ? "0 25px 50px -12px rgba(99, 102, 241, 0.4)"
                                                : "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
                                        }}
                                    >
                                        {plan.highlighted && (
                                            <motion.div
                                                className="absolute -top-4 left-1/2 -translate-x-1/2"
                                                initial={{ scale: 0, y: -10 }}
                                                whileInView={{ scale: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                            >
                                                <span className="px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-medium">
                                                    Recomendado
                                                </span>
                                            </motion.div>
                                        )}

                                        <div className="mb-6">
                                            <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                                            <p className="text-sm text-slate-400">{plan.description}</p>
                                        </div>

                                        {/* Animated price */}
                                        <motion.div
                                            className="mb-6"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2, type: "spring" }}
                                        >
                                            <span className="text-4xl font-extrabold text-white">{formatPrice(plan.price)}</span>
                                            <span className="text-slate-400">{plan.period}</span>
                                        </motion.div>

                                        {/* Features with stagger */}
                                        <StaggerContainer staggerDelay={0.05} initialDelay={0.3}>
                                            <ul className="space-y-3 mb-6">
                                                {plan.features.map((feature, j) => (
                                                    <StaggerItem key={j} direction="left">
                                                        <li className="flex items-center gap-3 text-base text-slate-300">
                                                            <motion.svg
                                                                className="w-5 h-5 text-emerald-400 flex-shrink-0"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                initial={{ scale: 0 }}
                                                                whileInView={{ scale: 1 }}
                                                                viewport={{ once: true }}
                                                                transition={{ delay: j * 0.05, type: "spring" }}
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </motion.svg>
                                                            {feature}
                                                        </li>
                                                    </StaggerItem>
                                                ))}
                                                {plan.notIncluded.map((feature, j) => (
                                                    <StaggerItem key={`not-${j}`} direction="left">
                                                        <li className="flex items-center gap-3 text-base text-slate-500">
                                                            <svg className="w-5 h-5 text-slate-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                            {feature}
                                                        </li>
                                                    </StaggerItem>
                                                ))}
                                            </ul>
                                        </StaggerContainer>

                                        <motion.div
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            <Link
                                                href={`/contacto?plan=${plan.id}`}
                                                className={`block w-full py-3 rounded-xl font-medium text-center transition-all ${plan.highlighted
                                                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90"
                                                    : "bg-white/10 text-white hover:bg-white/20"
                                                    }`}
                                            >
                                                {plan.cta}
                                            </Link>
                                        </motion.div>
                                    </motion.div>
                                </HoverCard>
                            </AnimWrapper>
                        );
                    })}
                </div>


            </div>
        </section>
    );
}
