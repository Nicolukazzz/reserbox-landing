const FEATURES = [
    {
        icon: "📅",
        title: "Agenda online 24/7",
        description: "Tus clientes reservan cuando quieran, desde cualquier dispositivo. Sin llamadas, sin esperas.",
    },
    {
        icon: "💬",
        title: "Bot de WhatsApp",
        description: "Automatiza las reservas por WhatsApp. El bot atiende, agenda y confirma por ti.",
        proBadge: true,
    },
    {
        icon: "🔔",
        title: "Recordatorios automáticos",
        description: "Reduce las ausencias un 80%. Enviamos recordatorios automáticos antes de cada cita.",
    },
    {
        icon: "👥",
        title: "Gestión de clientes",
        description: "Base de datos completa con historial de citas, preferencias y notas.",
    },
    {
        icon: "📊",
        title: "Dashboard analítico",
        description: "Métricas en tiempo real: ingresos, servicios populares, rendimiento del equipo.",
    },
    {
        icon: "👩‍💼",
        title: "Multi-empleado",
        description: "Gestiona horarios individuales, asigna servicios y controla la disponibilidad.",
    },
];

export function FeaturesSection() {
    return (
        <section id="features" className="py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-sm uppercase tracking-widest text-indigo-400 mb-4 font-bold">Funcionalidades</p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                        Todo lo que necesitas para gestionar tu negocio
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Herramientas poderosas y fáciles de usar para automatizar tu día a día
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FEATURES.map((feature, i) => (
                        <div
                            key={i}
                            className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all hover:bg-white/[0.07]"
                        >
                            {feature.proBadge && (
                                <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-medium">
                                    Pro
                                </span>
                            )}
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-base text-slate-400 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
