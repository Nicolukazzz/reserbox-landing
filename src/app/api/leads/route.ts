import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

// ============================================================================
// LEADS API - Save leads and notify via WhatsApp
// ============================================================================

interface Lead {
    _id?: ObjectId;
    // Contact info
    name: string;
    email: string;
    phone: string;
    // Business info
    businessName: string;
    industry: string;
    employeeCount: string;
    city: string;
    // Interest
    plan: string;
    howFound: string;
    message: string;
    // Metadata
    createdAt: string;
    status: "new" | "contacted" | "demo_scheduled" | "converted" | "lost";
    notes?: string;
}

// MongoDB connection
async function getCollection() {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URL || "";
    if (!uri) throw new Error("MongoDB URI not configured");

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("reserbox");
    return { collection: db.collection<Lead>("leads"), client };
}

// Send WhatsApp notification using Meta API
async function sendWhatsAppNotification(lead: Lead) {
    const token = process.env.META_WHATSAPP_TOKEN;
    const phoneNumberId = process.env.META_PHONE_NUMBER_ID;
    const notifyPhone = process.env.NOTIFY_WHATSAPP_NUMBER; // Your personal number

    if (!token || !phoneNumberId || !notifyPhone) {
        console.log("WhatsApp notification not configured, skipping...");
        return false;
    }

    const message = `🚀 *NUEVO LEAD RESERBOX*

👤 *${lead.name}*
📱 ${lead.phone}
📧 ${lead.email}

🏢 *Negocio:* ${lead.businessName}
📍 ${lead.city || "Sin ciudad"}
🏷️ ${lead.industry}
👥 ${lead.employeeCount || "No especificado"}

💰 *Plan:* ${lead.plan === "pro" ? "PRO ($99k)" : "BÁSICO ($49k)"}
📣 Fuente: ${lead.howFound || "No especificado"}

${lead.message ? `💬 Mensaje: ${lead.message}` : ""}

_Contactar lo antes posible!_`;

    try {
        const response = await fetch(
            `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messaging_product: "whatsapp",
                    to: notifyPhone,
                    type: "text",
                    text: { body: message },
                }),
            }
        );

        if (!response.ok) {
            const error = await response.text();
            console.error("WhatsApp API error:", error);
            return false;
        }

        console.log("WhatsApp notification sent successfully");
        return true;
    } catch (error) {
        console.error("Error sending WhatsApp notification:", error);
        return false;
    }
}

// POST - Create new lead
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        const { name, email, phone, businessName, industry, plan } = body;

        if (!name || !email || !phone || !businessName || !industry || !plan) {
            return NextResponse.json(
                { ok: false, error: "Campos obligatorios faltantes" },
                { status: 400 }
            );
        }

        const { collection, client } = await getCollection();

        // Create lead document
        const lead: Lead = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.replace(/\D/g, ""), // Only digits
            businessName: businessName.trim(),
            industry,
            employeeCount: body.employeeCount || "",
            city: body.city?.trim() || "",
            plan,
            howFound: body.howFound || "",
            message: body.message?.trim() || "",
            createdAt: new Date().toISOString(),
            status: "new",
        };

        // Check for duplicate (same email or phone in last 24h)
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        const existing = await collection.findOne({
            $or: [{ email: lead.email }, { phone: lead.phone }],
            createdAt: { $gte: yesterday },
        });

        if (existing) {
            await client.close();
            return NextResponse.json(
                { ok: false, error: "Ya recibimos tu solicitud. Te contactaremos pronto." },
                { status: 409 }
            );
        }

        // Insert lead
        const result = await collection.insertOne(lead);
        await client.close();

        // Send WhatsApp notification (async, don't wait)
        sendWhatsAppNotification(lead).catch(console.error);

        return NextResponse.json({
            ok: true,
            data: { id: result.insertedId.toString() },
        });
    } catch (error) {
        console.error("Error creating lead:", error);
        return NextResponse.json(
            { ok: false, error: "Error al procesar la solicitud" },
            { status: 500 }
        );
    }
}

// GET - List leads (for admin)
export async function GET(request: NextRequest) {
    try {
        // TODO: Add authentication check here
        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status");

        const { collection, client } = await getCollection();

        const query = status ? { status: status as Lead["status"] } : {};
        const leads = await collection
            .find(query)
            .sort({ createdAt: -1 })
            .limit(100)
            .toArray();

        await client.close();

        return NextResponse.json({ ok: true, data: leads });
    } catch (error) {
        console.error("Error fetching leads:", error);
        return NextResponse.json(
            { ok: false, error: "Error al obtener leads" },
            { status: 500 }
        );
    }
}
