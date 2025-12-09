// ============================================================================
// SEED PLANS API - Endpoint para inicializar planes en la base de datos
// GET /api/plans/seed - Crea los planes por defecto si no existen
// ============================================================================

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, COLLECTIONS } from "@/lib/mongodb";
import { Plan } from "@/types/plans";

// Force dynamic to prevent static generation errors
export const dynamic = "force-dynamic";

// Default plans configuration
const DEFAULT_PLANS: Omit<Plan, "_id" | "createdAt" | "updatedAt">[] = [
    {
        slug: "emprendedor",
        name: "Emprendedor",
        subtitle: "1 empleado",
        description: "Perfecto para profesionales independientes",
        price: 39000,
        currency: "COP",
        period: "/mes",
        minEmployees: 1,
        maxEmployees: 1,
        features: [
            { text: "Tablero de gestión completo", included: true },
            { text: "Página de reservas online", included: true },
            { text: "Calendario de citas", included: true },
            { text: "Gestión de servicios", included: true },
            { text: "Gestión de clientes", included: true },
            { text: "Recordatorios por WhatsApp", included: true },
            { text: "Métricas básicas", included: true },
        ],
        highlighted: false,
        ctaText: "Comenzar ahora",
        isVisible: true,
        order: 1,
    },
    {
        slug: "profesional",
        name: "Profesional",
        subtitle: "2-5 empleados",
        description: "Ideal para equipos pequeños",
        price: 69000,
        currency: "COP",
        period: "/mes",
        minEmployees: 2,
        maxEmployees: 5,
        features: [
            { text: "Todo del plan Emprendedor", included: true },
            { text: "Hasta 5 empleados", included: true },
            { text: "Horarios por empleado", included: true },
            { text: "Asignación de servicios", included: true },
            { text: "Recordatorios ilimitados", included: true },
            { text: "Reportes detallados", included: true },
            { text: "Soporte prioritario", included: true },
        ],
        highlighted: true,
        highlightLabel: "Más popular",
        ctaText: "Comenzar ahora",
        isVisible: true,
        order: 2,
    },
    {
        slug: "negocio",
        name: "Negocio",
        subtitle: "6-15 empleados",
        description: "Para negocios en crecimiento",
        price: 99000,
        currency: "COP",
        period: "/mes",
        minEmployees: 6,
        maxEmployees: 15,
        features: [
            { text: "Todo del plan Profesional", included: true },
            { text: "Hasta 15 empleados", included: true },
            { text: "Múltiples sucursales", included: true },
            { text: "Reportes avanzados", included: true },
            { text: "Exportación de datos", included: true },
            { text: "Soporte VIP", included: true },
            { text: "Capacitación incluida", included: true },
        ],
        highlighted: false,
        ctaText: "Comenzar ahora",
        isVisible: true,
        order: 3,
    },
];

export async function GET(request: NextRequest) {
    try {
        const { db } = await connectToDatabase();
        const collection = db.collection<Plan>(COLLECTIONS.PLANS);

        // Check if plans already exist
        const existingCount = await collection.countDocuments();

        if (existingCount > 0) {
            const plans = await collection.find({}).sort({ order: 1 }).toArray();
            return NextResponse.json({
                ok: true,
                message: `Ya existen ${existingCount} planes en la base de datos`,
                plans,
                seeded: false,
            });
        }

        // Insert default plans
        const now = new Date();
        const plansWithDates: Plan[] = DEFAULT_PLANS.map(plan => ({
            ...plan,
            createdAt: now,
            updatedAt: now,
        }));

        await collection.insertMany(plansWithDates);

        return NextResponse.json({
            ok: true,
            message: `${DEFAULT_PLANS.length} planes creados exitosamente`,
            plans: plansWithDates,
            seeded: true,
        });

    } catch (error) {
        console.error("Error seeding plans:", error);
        return NextResponse.json(
            { ok: false, error: "Error al inicializar planes" },
            { status: 500 }
        );
    }
}
