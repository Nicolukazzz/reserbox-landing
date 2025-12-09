"use client";

import { useState } from "react";
import Image from "next/image";
import {
    FadeInUp,
    StaggerContainer,
    StaggerItem,
    motion
} from "../animations";

const DEMO_SCREENS = [
    {
        id: "tablero",
        title: "Tablero general",
        description: "Vista completa de tu negocio: reservas del día, estado del sistema, métricas en tiempo real y agenda diaria.",
        image: "/demo-images/tablero-general.png",
        features: ["Resumen rápido", "Estado del bot", "Agenda del día", "Métricas clave"]
    },
    {
        id: "reservas",
        title: "Calendario de reservas",
        description: "Visualiza todas tus citas en formato semanal. Crea, edita y gestiona reservas con un solo clic.",
        image: "/demo-images/reservas-calendario.png",
        features: ["Vista semanal", "Gestión de turnos", "Estados de citas", "Fácil navegación"]
    },
    {
        id: "balance",
        title: "Balance e ingresos",
        description: "Controla tus finanzas: ingresos por servicio, desempeño del equipo y reportes detallados.",
        image: "/demo-images/balance-ingresos.png",
        features: ["Ingresos totales", "Servicios más vendidos", "Rendimiento del equipo", "Reportes detallados"]
    }
];

export function DemoSection() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <section id="demo" className="py-16 sm:py-20 md:py-24 px-4 overflow-hidden bg-gradient-to-b from-transparent via-slate-800/30 to-transparent">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <FadeInUp className="text-center mb-8 sm:mb-12 md:mb-16">
                    <motion.p
                        className="text-xs sm:text-sm uppercase tracking-widest text-indigo-400 mb-3 sm:mb-4 font-bold"
                        initial={{ opacity: 0, letterSpacing: "0.1em" }}
                        whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Conoce la plataforma
                    </motion.p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 sm:mb-4 px-4">
                        Una interfaz intuitiva y poderosa
                    </h2>
                    <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto px-4">
                        Diseñada para que gestiones tu negocio sin complicaciones
                    </p>
                </FadeInUp>

                {/* Tab navigation */}
                <FadeInUp delay={0.1} className="mb-6 sm:mb-8 md:mb-10">
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 px-2">
                        {DEMO_SCREENS.map((screen, i) => (
                            <motion.button
                                key={screen.id}
                                onClick={() => setActiveTab(i)}
                                className={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm transition-all ${activeTab === i
                                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10"
                                    }`}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                {screen.title}
                            </motion.button>
                        ))}
                    </div>
                </FadeInUp>

                {/* Demo content */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 items-start">
                    {/* Info panel - mobile: below, desktop: left side */}
                    <motion.div
                        className="lg:col-span-2 order-2 lg:order-1"
                        key={activeTab}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 h-full">
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                                {DEMO_SCREENS[activeTab].title}
                            </h3>
                            <p className="text-sm sm:text-base text-slate-400 mb-4 sm:mb-6 leading-relaxed">
                                {DEMO_SCREENS[activeTab].description}
                            </p>

                            {/* Features list */}
                            <div className="space-y-2 sm:space-y-3">
                                <p className="text-xs sm:text-sm font-bold text-indigo-400 uppercase tracking-wide">
                                    Características
                                </p>
                                <StaggerContainer staggerDelay={0.05}>
                                    {DEMO_SCREENS[activeTab].features.map((feature, i) => (
                                        <StaggerItem key={i} direction="left">
                                            <div className="flex items-center gap-2 sm:gap-3 py-1.5 sm:py-2">
                                                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span className="text-sm sm:text-base text-slate-300">{feature}</span>
                                            </div>
                                        </StaggerItem>
                                    ))}
                                </StaggerContainer>
                            </div>
                        </div>
                    </motion.div>

                    {/* Screenshot - mobile: first, desktop: right side */}
                    <motion.div
                        className="lg:col-span-3 order-1 lg:order-2"
                        key={`img-${activeTab}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="relative group">
                            {/* Glow effect */}
                            <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-xl sm:rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />

                            {/* Image container */}
                            <div className="relative rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border border-white/10 bg-slate-900/50 shadow-2xl">
                                <Image
                                    src={DEMO_SCREENS[activeTab].image}
                                    alt={DEMO_SCREENS[activeTab].title}
                                    width={1200}
                                    height={700}
                                    className="w-full h-auto object-cover"
                                    priority
                                />

                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none" />
                            </div>

                            {/* Decorative elements - hidden on mobile */}
                            <div className="hidden sm:block absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full blur-2xl" />
                            <div className="hidden sm:block absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-20 sm:w-32 h-20 sm:h-32 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-2xl" />
                        </div>
                    </motion.div>
                </div>

                {/* Navigation dots - mobile only */}
                <div className="flex lg:hidden justify-center gap-2 mt-6">
                    {DEMO_SCREENS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveTab(i)}
                            className={`w-2 h-2 rounded-full transition-all ${activeTab === i
                                ? "bg-indigo-500 w-6"
                                : "bg-white/20 hover:bg-white/40"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
