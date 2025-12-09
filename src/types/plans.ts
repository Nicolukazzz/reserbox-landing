// ============================================================================
// PLAN TYPES - Tipos para el sistema de planes
// ============================================================================

export interface PlanFeature {
    text: string;
    included: boolean;
}

export interface Plan {
    _id?: string;
    // Identificación
    slug: string;           // Identificador único (emprendedor, profesional, negocio)
    name: string;           // Nombre visible (Emprendedor, Profesional, Negocio)
    subtitle: string;       // Subtítulo (1 empleado, 2-5 empleados, etc.)
    description: string;    // Descripción corta

    // Precios
    price: number;          // Precio en COP
    currency: string;       // Moneda (COP, USD, etc.)
    period: string;         // Período (/mes, /año)

    // Configuración de empleados
    minEmployees: number;   // Mínimo de empleados
    maxEmployees: number;   // Máximo de empleados (-1 = ilimitado)

    // Características
    features: PlanFeature[];

    // Display
    highlighted: boolean;   // Si es el plan recomendado
    highlightLabel?: string; // Etiqueta (Más popular, Recomendado)
    ctaText: string;        // Texto del botón

    // Control
    isVisible: boolean;     // Si se muestra en el sitio
    order: number;          // Orden de aparición

    // Metadata
    createdAt: Date;
    updatedAt: Date;
}

// Para crear/actualizar planes (sin _id y fechas)
export type CreatePlanInput = Omit<Plan, '_id' | 'createdAt' | 'updatedAt'>;
export type UpdatePlanInput = Partial<CreatePlanInput>;

// Respuesta de la API
export interface PlansApiResponse {
    ok: boolean;
    plans?: Plan[];
    plan?: Plan;
    error?: string;
}
