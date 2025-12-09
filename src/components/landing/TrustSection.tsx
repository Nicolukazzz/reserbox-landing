"use client";

import {
    FadeInUp,
    FadeInLeft,
    FadeInRight,
    StaggerContainer,
    StaggerItem,
    motion
} from "../animations";

const TRUST_ITEMS = [
    {
        icon: "🎁",
        title: "15 días gratis para probar",
        description: "Sin tarjeta de crédito, sin compromiso. Prueba todas las funciones y ve cómo encaja con tu negocio.",
        color: "from-emerald-500 to-teal-500",
    },
    {
        icon: "🤝",
        title: "Te ayudamos a configurar todo",
        description: "Agendamos una videollamada contigo para configurar tu cuenta juntos. No te dejamos solo.",
        color: "from-indigo-500 to-purple-500",
    },
    {
        icon: "💬",
        title: "Soporte humano incluido",
        description: "Respuestas rápidas por WhatsApp o email. Nada de bots genéricos ni tiempos de espera eternos.",
        color: "from-pink-500 to-rose-500",
    },
    {
        icon: "🔒",
        title: "Tus datos siempre seguros",
        description: "Infraestructura en la nube con respaldos automáticos. Tu información protegida 24/7.",
        color: "from-amber-500 to-orange-500",
    },
];

export function TrustSection() {
    return (
        <section className="py-24 px-4 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900">
            <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <FadeInUp className="text-center mb-16">
                    <motion.p
                        className="text-sm uppercase tracking-widest text-indigo-400 mb-4 font-bold"
                        initial={{ opacity: 0, letterSpacing: "0.1em" }}
                        whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Por qué elegirnos
                    </motion.p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                        Te acompañamos en cada paso
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        No solo te damos una herramienta, te damos el apoyo para que funcione en tu negocio
                    </p>
                </FadeInUp>

                {/* Trust grid - Responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16">
                    {TRUST_ITEMS.map((item, i) => {
                        const isLeft = i % 2 === 0;
                        const AnimWrapper = isLeft ? FadeInLeft : FadeInRight;

                        return (
                            <AnimWrapper key={i} delay={i * 0.1}>
                                <motion.div
                                    className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all h-full"
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow: "0 20px 40px -20px rgba(99, 102, 241, 0.2)",
                                    }}
                                >
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <motion.div
                                            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-xl sm:text-2xl flex-shrink-0 shadow-lg`}
                                            whileHover={{ rotate: 5, scale: 1.1 }}
                                        >
                                            {item.icon}
                                        </motion.div>
                                        <div>
                                            <h3 className="text-base sm:text-xl font-bold text-white mb-1 sm:mb-2 group-hover:text-indigo-400 transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm sm:text-base text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimWrapper>
                        );
                    })}
                </div>

                {/* Additional trust signals */}
                <FadeInUp delay={0.4}>
                    <div className="p-8 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="text-center md:text-left">
                                <h3 className="text-xl font-bold text-white mb-2">
                                    ¿Listo para organizar tu negocio?
                                </h3>
                                <p className="text-slate-400">
                                    Empieza tu prueba gratuita hoy. Sin tarjeta de crédito, sin sorpresas.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <motion.a
                                    href="/contacto"
                                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-all text-center"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Prueba gratis 15 días
                                </motion.a>
                                <motion.a
                                    href="#pricing"
                                    className="px-6 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all text-center"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Ver planes
                                </motion.a>
                            </div>
                        </div>
                    </div>
                </FadeInUp>
            </div>
        </section>
    );
}
