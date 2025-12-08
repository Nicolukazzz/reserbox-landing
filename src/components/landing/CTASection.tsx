import Link from "next/link";

export function CTASection() {
    return (
        <section className="py-24 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="relative p-12 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-40 h-40 border border-white rounded-full" />
                        <div className="absolute bottom-0 right-0 w-60 h-60 border border-white rounded-full" />
                    </div>

                    <div className="relative text-center">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                            ¿Listo para automatizar tu agenda?
                        </h2>
                        <p className="text-lg text-indigo-100 mb-8 max-w-xl mx-auto">
                            Agenda una demo personalizada y te mostramos cómo Reserbox puede ayudarte
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/contacto"
                                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-indigo-50 transition-all"
                            >
                                Agendar demo gratis →
                            </Link>
                            <Link
                                href="/book/pelu_glamour"
                                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/20 text-white font-medium hover:bg-white/30 transition-all"
                            >
                                Ver demo en vivo
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
