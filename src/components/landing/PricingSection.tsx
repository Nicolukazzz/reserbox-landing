"use client";

import Link from "next/link";
import {
    FadeInUp,
    motion
} from "../animations";
import { PlansGrid } from "../plans";
import { usePlans } from "@/hooks/usePlans";

export function PricingSection() {
    const { plans, loading, error } = usePlans();

    return (
        <section id="pricing" className="py-24 px-4">
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
                        Precios
                    </motion.p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                        Planes que crecen contigo
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto mb-6">
                        Elige según el tamaño de tu equipo. Todos los planes incluyen:
                    </p>
                    {/* Trust badges */}
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-300">
                            ✓ 15 días gratis
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-sm text-indigo-300">
                            ✓ Configuración asistida
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm text-purple-300">
                            ✓ Soporte incluido
                        </span>
                    </div>
                </FadeInUp>

                {/* Error state */}
                {error && (
                    <div className="p-6 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center mb-8">
                        <p className="text-rose-400">{error}</p>
                        <p className="text-slate-400 text-sm mt-2">
                            Intenta recargar la página o{" "}
                            <Link href="/contacto" className="text-indigo-400 underline">
                                contáctanos directamente
                            </Link>
                        </p>
                    </div>
                )}

                {/* Plans grid - now dynamic */}
                <PlansGrid plans={plans} loading={loading} />
            </div>
        </section>
    );
}
