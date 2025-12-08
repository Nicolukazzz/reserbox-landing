"use client";

import {
    FadeInUp,
    StaggerContainer,
    StaggerItem,
    HoverCard,
    motion
} from "@/components/animations";

const INDUSTRIES = [
    { icon: "💇‍♀️", name: "Salones de belleza", color: "from-pink-500 to-rose-600" },
    { icon: "💈", name: "Barberías", color: "from-blue-500 to-indigo-600" },
    { icon: "💅", name: "Manicure & Spa", color: "from-purple-500 to-violet-600" },
    { icon: "🏥", name: "Consultorios", color: "from-emerald-500 to-teal-600" },
    { icon: "🧘", name: "Centros de bienestar", color: "from-amber-500 to-orange-600" },
    { icon: "📸", name: "Estudios foto", color: "from-cyan-500 to-blue-600" },
];

export function IndustriesSection() {
    return (
        <section id="industries" className="py-24 px-4 bg-gradient-to-b from-transparent via-slate-800/50 to-transparent">
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
                        Industrias
                    </motion.p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                        Reserbox se adapta a tu negocio
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Sin importar tu industria, tenemos la solución perfecta para ti
                    </p>
                </FadeInUp>

                {/* Industries grid */}
                <StaggerContainer
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
                    staggerDelay={0.08}
                >
                    {INDUSTRIES.map((industry, i) => (
                        <StaggerItem key={i} direction="scale">
                            <HoverCard scale={1.08} lift={-10}>
                                <motion.div
                                    className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all text-center cursor-pointer h-full"
                                    whileHover={{
                                        boxShadow: "0 15px 30px -15px rgba(99, 102, 241, 0.25)",
                                    }}
                                >
                                    <motion.div
                                        className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${industry.color} flex items-center justify-center text-2xl mb-3 shadow-lg`}
                                        whileHover={{
                                            scale: 1.15,
                                            rotate: 5,
                                        }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        {industry.icon}
                                    </motion.div>
                                    <p className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{industry.name}</p>
                                </motion.div>
                            </HoverCard>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
