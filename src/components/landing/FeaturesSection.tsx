"use client";

import {
    FadeInUp,
    StaggerContainer,
    StaggerItem,
    HoverCard,
    motion
} from "../animations";

const FEATURES = [
    {
        icon: "🌐",
        title: "Página de reservas online",
        description: "Tu propia página web donde tus clientes reservan 24/7. Profesional, fácil de compartir y personalizada con tu marca.",
    },
    {
        icon: "📅",
        title: "Calendario inteligente",
        description: "Visualiza todas tus citas en formato semanal o mensual. Gestiona horarios, bloquea fechas y organiza tu día fácilmente.",
    },
    {
        icon: "🔔",
        title: "Recordatorios por WhatsApp",
        description: "Reduce las ausencias hasta un 80%. Envía recordatorios automáticos a tus clientes antes de cada cita.",
    },
    {
        icon: "👥",
        title: "Gestión de clientes",
        description: "Base de datos completa con historial de citas, preferencias y notas de cada cliente.",
    },
    {
        icon: "📊",
        title: "Tablero de estadísticas",
        description: "Métricas en tiempo real: ingresos, servicios más solicitados, rendimiento del equipo.",
    },
    {
        icon: "👩‍💼",
        title: "Multi-empleado",
        description: "Gestiona horarios individuales, asigna servicios por empleado y controla la disponibilidad de cada uno.",
    },
];

export function FeaturesSection() {
    return (
        <section id="features" className="py-24 px-4">
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
                        Funcionalidades
                    </motion.p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                        Todo lo que necesitas para gestionar tu negocio
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Herramientas poderosas y fáciles de usar para automatizar tu día a día
                    </p>
                </FadeInUp>

                {/* Features grid with stagger animation */}
                <StaggerContainer
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
                    staggerDelay={0.1}
                >
                    {FEATURES.map((feature, i) => (
                        <StaggerItem key={i} direction="up" className="h-full">
                            <HoverCard scale={1.03} lift={-8} className="h-full">
                                <motion.div
                                    className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all hover:bg-white/[0.07] h-full flex flex-col"
                                    whileHover={{
                                        boxShadow: "0 20px 40px -20px rgba(99, 102, 241, 0.3)",
                                    }}
                                >
                                    <motion.div
                                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform flex-shrink-0"
                                        whileHover={{ rotate: [0, -10, 10, 0] }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {feature.icon}
                                    </motion.div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{feature.title}</h3>
                                    <p className="text-base text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors flex-grow">{feature.description}</p>
                                </motion.div>
                            </HoverCard>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
