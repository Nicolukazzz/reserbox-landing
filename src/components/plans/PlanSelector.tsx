"use client";

// ============================================================================
// PLAN SELECTOR - Grid de planes para seleccionar en formularios
// ============================================================================

import { Plan } from "@/types/plans";
import { PlanCard } from "./PlanCard";

interface PlanSelectorProps {
    plans: Plan[];
    selectedPlan: string;
    onSelectPlan: (planSlug: string) => void;
    loading?: boolean;
}

export function PlanSelector({
    plans,
    selectedPlan,
    onSelectPlan,
    loading = false,
}: PlanSelectorProps) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="p-4 rounded-xl border border-white/10 bg-white/5 animate-pulse"
                    >
                        <div className="h-4 bg-white/10 rounded w-20 mb-3" />
                        <div className="h-3 bg-white/10 rounded w-24 mb-2" />
                        <div className="h-3 bg-white/10 rounded w-16" />
                    </div>
                ))}
            </div>
        );
    }

    if (plans.length === 0) {
        return (
            <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-center">
                <p className="text-slate-400">No hay planes disponibles</p>
            </div>
        );
    }

    return (
        <div className={`grid grid-cols-1 ${plans.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
            } gap-4`}>
            {plans.map((plan) => (
                <PlanCard
                    key={plan.slug}
                    plan={plan}
                    variant="compact"
                    selected={selectedPlan === plan.slug}
                    onSelect={(p) => onSelectPlan(p.slug)}
                />
            ))}
        </div>
    );
}
