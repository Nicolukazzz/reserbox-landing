// ============================================================================
// PLANS API - GET and POST endpoints for plans management
// ============================================================================

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, COLLECTIONS } from "@/lib/mongodb";
import { Plan, CreatePlanInput } from "@/types/plans";

// Force dynamic to prevent static generation errors
export const dynamic = "force-dynamic";

// GET /api/plans - Get all visible plans (or all if admin)
export async function GET(request: NextRequest) {
    try {
        const { db } = await connectToDatabase();
        const { searchParams } = new URL(request.url);

        // Optional: Get all plans including hidden (for admin)
        const showAll = searchParams.get("all") === "true";

        const query = showAll ? {} : { isVisible: true };

        const plans = await db
            .collection<Plan>(COLLECTIONS.PLANS)
            .find(query)
            .sort({ order: 1 })
            .toArray();

        return NextResponse.json({
            ok: true,
            plans,
        });
    } catch (error) {
        console.error("Error fetching plans:", error);
        return NextResponse.json(
            { ok: false, error: "Error al obtener los planes", plans: [] },
            { status: 500 }
        );
    }
}

// POST /api/plans - Create a new plan (admin only in future)
export async function POST(request: NextRequest) {
    try {
        const { db } = await connectToDatabase();
        const body: CreatePlanInput = await request.json();

        // Validate required fields
        if (!body.slug || !body.name || typeof body.price !== 'number') {
            return NextResponse.json(
                { ok: false, error: "Faltan campos obligatorios" },
                { status: 400 }
            );
        }

        // Check if slug already exists
        const existing = await db
            .collection<Plan>(COLLECTIONS.PLANS)
            .findOne({ slug: body.slug });

        if (existing) {
            return NextResponse.json(
                { ok: false, error: "Ya existe un plan con este slug" },
                { status: 400 }
            );
        }

        const now = new Date();
        const plan: Plan = {
            ...body,
            createdAt: now,
            updatedAt: now,
        };

        const result = await db
            .collection<Plan>(COLLECTIONS.PLANS)
            .insertOne(plan);

        return NextResponse.json({
            ok: true,
            plan: { ...plan, _id: result.insertedId },
        });
    } catch (error) {
        console.error("Error creating plan:", error);
        return NextResponse.json(
            { ok: false, error: "Error al crear el plan" },
            { status: 500 }
        );
    }
}
