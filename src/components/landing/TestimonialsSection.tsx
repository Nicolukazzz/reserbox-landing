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
        <section className="py-24 px-4 bg-gradient-to-b from-transparent via-slate-800/30 to-transparent">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-sm uppercase tracking-widest text-indigo-400 mb-4 font-bold">Testimonios</p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                        Lo que dicen nuestros clientes
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {TESTIMONIALS.map((testimonial, i) => (
                        <div
                            key={i}
                            className="p-6 rounded-2xl bg-white/5 border border-white/10"
                        >
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, j) => (
                                    <span key={j} className="text-amber-400">★</span>
                                ))}
                            </div>
                            <p className="text-slate-300 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">{testimonial.author}</p>
                                    <p className="text-xs text-slate-400">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
