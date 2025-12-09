"use client";

import {
    FadeInUp,
    StaggerContainer,
    StaggerItem,
    HoverCard,
    motion
} from "../animations";

const TESTIMONIALS = [
    {
        quote: "Desde que uso Reserbox, mis cancelaciones bajaron un 70%. Los recordatorios automáticos son geniales.",
        author: "María García",
        role: "Dueña de Salón Glamour",
        avatar: "👩",
    },
    {
        quote: "El bot de WhatsApp me ahorra horas al día. Mis clientes reservan solos y yo me enfoco en atenderlos.",
        author: "Carlos Mendoza",
        role: "Barbería El Clásico",
        avatar: "👨",
    },
    {
        quote: "Por fin tengo todo organizado. Antes usaba cuadernos y perdía citas. Ahora todo está en la nube.",
        author: "Ana Martínez",
        role: "Spa Zen",
        avatar: "👩‍🦰",
    },
];

export function TestimonialsSection() {
    return (
        <section className="py-24 px-4 bg-gradient-to-b from-transparent via-slate-800/30 to-transparent overflow-hidden">
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
                        Testimonios
                    </motion.p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                        Lo que dicen nuestros clientes
                    </h2>
                </FadeInUp>

                {/* Testimonials grid */}
                <StaggerContainer
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    staggerDelay={0.15}
                >
                    {TESTIMONIALS.map((testimonial, i) => (
                        <StaggerItem key={i} direction="up">
                            <HoverCard scale={1.03} lift={-8}>
                                <motion.div
                                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all h-full"
                                    whileHover={{
                                        boxShadow: "0 20px 40px -20px rgba(99, 102, 241, 0.25)",
                                    }}
                                >
                                    {/* Stars with stagger */}
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, j) => (
                                            <motion.span
                                                key={j}
                                                className="text-amber-400"
                                                initial={{ opacity: 0, scale: 0 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.1 + j * 0.05, type: "spring" }}
                                            >
                                                ★
                                            </motion.span>
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <motion.p
                                        className="text-slate-300 mb-6 leading-relaxed"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        "{testimonial.quote}"
                                    </motion.p>

                                    {/* Author */}
                                    <div className="flex items-center gap-3">
                                        <motion.div
                                            className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg"
                                            whileHover={{ scale: 1.1, rotate: 10 }}
                                        >
                                            {testimonial.avatar}
                                        </motion.div>
                                        <div>
                                            <p className="text-sm font-bold text-white">{testimonial.author}</p>
                                            <p className="text-xs text-slate-400">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </HoverCard>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
