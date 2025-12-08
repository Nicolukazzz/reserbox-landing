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
                <div className="text-center mb-16">
                    <p className="text-sm uppercase tracking-widest text-indigo-400 mb-4 font-bold">Industrias</p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                        Reserbox se adapta a tu negocio
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Sin importar tu industria, tenemos la solución perfecta para ti
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {INDUSTRIES.map((industry, i) => (
                        <div
                            key={i}
                            className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all text-center cursor-pointer"
                        >
                            <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${industry.color} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                                {industry.icon}
                            </div>
                            <p className="text-sm font-bold text-white">{industry.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
