import Link from "next/link";

export function HeroSection() {
    return (
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="max-w-5xl mx-auto text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm text-indigo-200">🚀 Lanzamiento especial - Primeros clientes con descuento</span>
                </div>

                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight mb-6">
                    El software de reservas que
                    <br />
                    <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">conecta con WhatsApp</span>
                </h1>

                {/* Subheadline */}
                <p className="text-xl sm:text-2xl text-slate-300 max-w-2xl mx-auto mb-10">
                    Automatiza tu agenda, recibe reservas 24/7 y envía recordatorios automáticos.
                    Todo desde un dashboard intuitivo.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <Link
                        href="/contacto"
                        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-indigo-500/25"
                    >
                        Solicitar demo gratis →
                    </Link>
                    <Link
                        href="/book/pelu_glamour"
                        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
                    >
                        Ver demo en vivo
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                    <div>
                        <p className="text-3xl font-bold text-white">80%</p>
                        <p className="text-sm text-slate-400">Menos ausencias</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-white">5min</p>
                        <p className="text-sm text-slate-400">Para configurar</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-white">24/7</p>
                        <p className="text-sm text-slate-400">Recibe reservas</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
