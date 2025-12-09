// ============================================================================
// SEED PLANS - Script to initialize plans in the database
// Run with: npx ts-node --project tsconfig.json src/scripts/seed-plans.ts
// Or add to package.json: "seed:plans": "ts-node src/scripts/seed-plans.ts"
// ============================================================================

import { MongoClient } from "mongodb";
import { Plan } from "../types/plans";

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

async function seedPlans() {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.MONGO_DB_NAME || "reserbox_landing";

    if (!uri) {
        console.error("❌ MONGODB_URI no está definido en las variables de entorno");
        process.exit(1);
    }

    console.log("🔌 Conectando a MongoDB...");
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection("plans");

        // Check if plans already exist
        const existingCount = await collection.countDocuments();

        if (existingCount > 0) {
            console.log(`⚠️  Ya existen ${existingCount} planes en la base de datos.`);
            console.log("   Para reiniciar, ejecuta primero: db.plans.drop()");
            return;
        }

        // Insert default plans
        const now = new Date();
        const plansWithDates = DEFAULT_PLANS.map(plan => ({
            ...plan,
            createdAt: now,
            updatedAt: now,
        }));

        const result = await collection.insertMany(plansWithDates);

        console.log(`✅ ${result.insertedCount} planes creados exitosamente:`);
        DEFAULT_PLANS.forEach(plan => {
            console.log(`   - ${plan.name} (${plan.slug}): $${plan.price.toLocaleString()} COP`);
        });

    } catch (error) {
        console.error("❌ Error al inicializar planes:", error);
        throw error;
    } finally {
        await client.close();
        console.log("🔌 Conexión cerrada");
    }
}

// Run if called directly
seedPlans().catch(console.error);
