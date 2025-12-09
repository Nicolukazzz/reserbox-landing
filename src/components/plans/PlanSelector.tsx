"use client";

// ============================================================================
// PLAN SELECTOR - Grid de planes para seleccionar en formularios
// Responsive y modular
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
    // Loading skeleton
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="p-5 rounded-xl border border-white/10 bg-white/5 animate-pulse"
                    >
                        <div className="flex items-baseline gap-2 mb-2">
                            <div className="h-5 bg-white/10 rounded w-24" />
                            <div className="h-4 bg-white/10 rounded w-20" />
                        </div>
                        <div className="h-4 bg-white/10 rounded w-20" />
                    </div>
                ))}
            </div>
        );
    }

    // Empty state
    if (plans.length === 0) {
        return (
            <div className="p-8 rounded-xl border border-white/10 bg-white/5 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-700/50 flex items-center justify-center">
                    <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <p className="text-slate-400">No hay planes disponibles</p>
                <p className="text-sm text-slate-500 mt-1">Intenta recargar la página</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {/* Grid - always 3 columns on desktop for 3 plans */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {plans.map((plan, index) => (
                    <PlanCard
                        key={plan.slug}
                        plan={plan}
                        variant="compact"
                        selected={selectedPlan === plan.slug}
                        onSelect={(p) => onSelectPlan(p.slug)}
                        animationDelay={index}
                    />
                ))}
            </div>

            {/* Helper text */}
            {!selectedPlan && (
                <p className="text-sm text-slate-500 text-center">
                    Selecciona un plan para continuar
                </p>
            )}
        </div>
    );
}
