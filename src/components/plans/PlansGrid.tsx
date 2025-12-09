"use client";

// ============================================================================
// PLANS GRID - Grid de planes para la sección de precios
// ============================================================================

import { Plan } from "@/types/plans";
import { PlanCard } from "./PlanCard";
import { FadeInUp } from "../animations";
import Link from "next/link";

interface PlansGridProps {
    plans: Plan[];
    loading?: boolean;
}

export function PlansGrid({ plans, loading = false }: PlansGridProps) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="p-8 rounded-2xl border border-white/10 bg-white/5 animate-pulse"
                    >
                        <div className="h-6 bg-white/10 rounded w-24 mb-2" />
                        <div className="h-4 bg-white/10 rounded w-20 mb-4" />
                        <div className="h-10 bg-white/10 rounded w-32 mb-6" />
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map((j) => (
                                <div key={j} className="h-4 bg-white/10 rounded w-full" />
                            ))}
                        </div>
                        <div className="h-12 bg-white/10 rounded-xl w-full mt-6" />
                    </div>
                ))}
            </div>
        );
    }

    if (plans.length === 0) {
        return (
            <div className="p-12 rounded-2xl border border-white/10 bg-white/5 text-center">
                <p className="text-slate-400 text-lg">No hay planes disponibles en este momento</p>
                <Link href="/contacto" className="text-indigo-400 hover:underline mt-2 inline-block">
                    Contáctanos para más información
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className={`grid grid-cols-1 ${plans.length === 2
                    ? "md:grid-cols-2 max-w-4xl mx-auto"
                    : "md:grid-cols-3"
                } gap-6 lg:gap-8`}>
                {plans.map((plan, i) => (
                    <PlanCard
                        key={plan.slug}
                        plan={plan}
                        variant="full"
                        animationDelay={i * 0.1}
                    />
                ))}
            </div>

            {/* Enterprise note */}
            <FadeInUp delay={0.4}>
                <div className="mt-12 text-center">
                    <p className="text-slate-400">
                        ¿Más de 15 empleados?{" "}
                        <Link href="/contacto" className="text-indigo-400 hover:text-indigo-300 underline">
                            Contáctanos para un plan personalizado
                        </Link>
                    </p>
                </div>
            </FadeInUp>
        </>
    );
}
