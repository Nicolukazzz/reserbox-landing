import Link from "next/link";

const PLANS = [
    {
        id: "basico",
        name: "Básico",
        price: 49000,
        period: "/mes",
        description: "Todo lo esencial para tu negocio",
        features: [
            "Dashboard completo",
            "Página de reservas online",
            "Gestión de empleados",
            "Gestión de servicios",
            "Gestión de clientes",
            "Recordatorios por email",
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
                <div className="text-center mb-16">
                    <p className="text-sm uppercase tracking-widest text-indigo-400 mb-4 font-bold">Precios</p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                        Planes simples, sin sorpresas
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Elige el plan que mejor se adapte a tu negocio
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {PLANS.map((plan, i) => (
                        <div
                            key={i}
                            className={`relative p-8 rounded-2xl transition-all ${plan.highlighted
                                ? "bg-gradient-to-b from-indigo-500/20 to-purple-500/10 border-2 border-indigo-500/50"
                                : "bg-white/5 border border-white/10 hover:border-white/20"
                                }`}
                        >
                            {plan.highlighted && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-medium">
                                        Recomendado
                                    </span>
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                                <p className="text-sm text-slate-400">{plan.description}</p>
                            </div>

                            <div className="mb-6">
                                <span className="text-4xl font-extrabold text-white">{formatPrice(plan.price)}</span>
                                <span className="text-slate-400">{plan.period}</span>
                            </div>

                            <ul className="space-y-3 mb-6">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className="flex items-center gap-3 text-base text-slate-300">
                                        <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                                {plan.notIncluded.map((feature, j) => (
                                    <li key={`not-${j}`} className="flex items-center gap-3 text-base text-slate-500">
                                        <svg className="w-5 h-5 text-slate-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={`/contacto?plan=${plan.id}`}
                                className={`block w-full py-3 rounded-xl font-medium text-center transition-all ${plan.highlighted
                                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90"
                                    : "bg-white/10 text-white hover:bg-white/20"
                                    }`}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>

                <p className="text-center text-sm text-slate-500 mt-8">
                    ¿Tienes múltiples sucursales o necesidades especiales? <Link href="/contacto" className="text-indigo-400 hover:underline">Contáctanos</Link>
                </p>
            </div>
        </section>
    );
}
