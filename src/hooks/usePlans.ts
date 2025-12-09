"use client";

// ============================================================================
// USE PLANS HOOK - Hook para obtener planes desde la API
// ============================================================================

import { useState, useEffect } from "react";
import { Plan, PlansApiResponse } from "@/types/plans";

interface UsePlansOptions {
    includeHidden?: boolean; // Para panel de admin
}

interface UsePlansReturn {
    plans: Plan[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export function usePlans(options: UsePlansOptions = {}): UsePlansReturn {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPlans = async () => {
        try {
            setLoading(true);
            setError(null);

            const queryParams = options.includeHidden ? "?all=true" : "";
            const response = await fetch(`/api/plans${queryParams}`);
            const data: PlansApiResponse = await response.json();

            if (!data.ok) {
                throw new Error(data.error || "Error al cargar planes");
            }

            setPlans(data.plans || []);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Error desconocido";
            setError(message);
            console.error("Error fetching plans:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, [options.includeHidden]);

    return {
        plans,
        loading,
        error,
        refetch: fetchPlans,
    };
}
