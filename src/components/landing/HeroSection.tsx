"use client";

import Link from "next/link";
import {
    FadeInUp,
    FadeInDown,
    ScaleIn,
    StaggerContainer,
    StaggerItem,
    Counter,
    Floating,
    PulsingGlow,
    motion
} from "../animations";

export function HeroSection() {
    return (
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
            {/* Animated background effects */}
            <div className="absolute inset-0 -z-10">
                <Floating duration={4} distance={20}>
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
                </Floating>
                <Floating duration={5} distance={15} delay={1}>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
                </Floating>
                <Floating duration={6} distance={25} delay={0.5}>
                    <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />
                </Floating>
            </div>

            <div className="max-w-5xl mx-auto text-center">
                {/* Badge */}
                <FadeInDown delay={0}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
                        <PulsingGlow>
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        </PulsingGlow>
                        <span className="text-sm text-emerald-200">🎉 Primeros 15 días gratis — Sin tarjeta de crédito</span>
                    </div>
                </FadeInDown>

                {/* Headline */}
                <FadeInUp delay={0.1}>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight mb-6">
                        Tu agenda online
                        <br />
                        <motion.span
                            className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent inline-block"
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            style={{
                                backgroundSize: "200% 200%",
                            }}
                        >
                            disponible 24/7
                        </motion.span>
                    </h1>
                </FadeInUp>

                {/* Subheadline */}
                <FadeInUp delay={0.2}>
                    <p className="text-xl sm:text-2xl text-slate-300 max-w-2xl mx-auto mb-6">
                        Ofrece una página de reservas profesional a tus clientes.
                        Gestiona tu negocio y envía recordatorios automáticos por WhatsApp.
                    </p>
                </FadeInUp>

                {/* Trust badges */}
                <FadeInUp delay={0.25}>
                    <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>15 días gratis</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Configuración asistida</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Soporte incluido</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Cancela cuando quieras</span>
                        </div>
                    </div>
                </FadeInUp>

                {/* CTAs */}
                <FadeInUp delay={0.3}>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/contacto"
                                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-indigo-500/25 inline-block"
                            >
                                Prueba gratis 15 días →
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/demo"
                                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all text-center inline-block"
                            >
                                Ver página de reservas demo
                            </Link>
                        </motion.div>
                    </div>
                </FadeInUp>

                {/* Stats with animated counters */}
                <StaggerContainer className="grid grid-cols-3 gap-8 max-w-lg mx-auto" staggerDelay={0.15}>
                    <StaggerItem>
                        <ScaleIn>
                            <motion.div
                                className="group cursor-default"
                                whileHover={{ scale: 1.1 }}
                            >
                                <p className="text-3xl font-bold text-white">
                                    <Counter to={80} suffix="%" duration={2} />
                                </p>
                                <p className="text-sm text-slate-400 group-hover:text-indigo-400 transition-colors">Menos ausencias</p>
                            </motion.div>
                        </ScaleIn>
                    </StaggerItem>
                    <StaggerItem>
                        <ScaleIn>
                            <motion.div
                                className="group cursor-default"
                                whileHover={{ scale: 1.1 }}
                            >
                                <p className="text-3xl font-bold text-white">
                                    <Counter to={5} suffix="min" duration={1.5} />
                                </p>
                                <p className="text-sm text-slate-400 group-hover:text-indigo-400 transition-colors">Para configurar</p>
                            </motion.div>
                        </ScaleIn>
                    </StaggerItem>
                    <StaggerItem>
                        <ScaleIn>
                            <motion.div
                                className="group cursor-default"
                                whileHover={{ scale: 1.1 }}
                            >
                                <p className="text-3xl font-bold text-white">24/7</p>
                                <p className="text-sm text-slate-400 group-hover:text-indigo-400 transition-colors">Recibe reservas</p>
                            </motion.div>
                        </ScaleIn>
                    </StaggerItem>
                </StaggerContainer>
            </div>
        </section>
    );
}
