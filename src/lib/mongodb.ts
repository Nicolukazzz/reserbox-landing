// ============================================================================
// MONGODB CONNECTION - Singleton pattern for Next.js
// ============================================================================

import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const dbName = process.env.MONGO_DB_NAME || "reserbox_landing";

interface MongoConnection {
    client: MongoClient;
    db: Db;
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<MongoConnection> {
    // Check if URI is configured
    if (!uri) {
        throw new Error("MONGODB_URI no está configurado en las variables de entorno");
    }

    // Return cached connection if exists
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    // Create new connection
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db(dbName);

    // Cache the connection
    cachedClient = client;
    cachedDb = db;

    return { client, db };
}

// Collection names
export const COLLECTIONS = {
    PLANS: "plans",
    LEADS: "leads",
} as const;
