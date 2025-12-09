# Sistema de Planes Dinámicos - Reserbox

## Arquitectura

El sistema de planes está diseñado para ser **modular, escalable y fácil de administrar** desde la base de datos.

## Estructura de Archivos

```
src/
├── types/
│   └── plans.ts              # Tipos TypeScript para planes
├── lib/
│   └── mongodb.ts            # Conexión a MongoDB (singleton)
├── hooks/
│   └── usePlans.ts           # Hook para obtener planes
├── components/
│   └── plans/
│       ├── index.ts          # Barrel export
│       ├── PlanCard.tsx      # Tarjeta de plan (full/compact)
│       ├── PlanSelector.tsx  # Selector para formularios
│       └── PlansGrid.tsx     # Grid para sección de precios
└── app/
    └── api/
        └── plans/
            ├── route.ts      # GET/POST planes
            └── seed/
                └── route.ts  # Inicializar planes
```

## Inicializar Planes

Para crear los planes por defecto en la base de datos:

```bash
# Opción 1: Visitar en el navegador
http://localhost:3000/api/plans/seed

# Opción 2: Usando curl
curl http://localhost:3000/api/plans/seed
```

## Modelo de Datos (Plan)

```typescript
interface Plan {
    _id?: string;
    slug: string;           // Identificador único (emprendedor, profesional)
    name: string;           // Nombre visible
    subtitle: string;       // Subtítulo (1 empleado, 2-5 empleados)
    description: string;    // Descripción corta
    
    price: number;          // Precio en COP
    currency: string;       // Moneda (COP, USD)
    period: string;         // Período (/mes, /año)
    
    minEmployees: number;   // Mínimo de empleados
    maxEmployees: number;   // Máximo (-1 = ilimitado)
    
    features: PlanFeature[];
    
    highlighted: boolean;   // Si es el plan recomendado
    highlightLabel?: string; // Etiqueta (Más popular)
    ctaText: string;        // Texto del botón
    
    isVisible: boolean;     // Si se muestra
    order: number;          // Orden de aparición
    
    createdAt: Date;
    updatedAt: Date;
}
```

## APIs Disponibles

### GET /api/plans
Obtiene todos los planes visibles.

```bash
# Todos los planes visibles
curl http://localhost:3000/api/plans

# Todos los planes (incluye ocultos, para admin)
curl http://localhost:3000/api/plans?all=true
```

### POST /api/plans
Crea un nuevo plan.

```bash
curl -X POST http://localhost:3000/api/plans \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "enterprise",
    "name": "Enterprise",
    "subtitle": "Ilimitado",
    "description": "Para grandes empresas",
    "price": 199000,
    "currency": "COP",
    "period": "/mes",
    "minEmployees": 16,
    "maxEmployees": -1,
    "features": [
      { "text": "Todo ilimitado", "included": true }
    ],
    "highlighted": false,
    "ctaText": "Contactar ventas",
    "isVisible": true,
    "order": 4
  }'
```

### GET /api/plans/seed
Inicializa los planes por defecto si no existen.

## Uso en Componentes

### En la sección de precios (Landing)
```tsx
import { usePlans } from "@/hooks/usePlans";
import { PlansGrid } from "@/components/plans";

function PricingSection() {
    const { plans, loading, error } = usePlans();
    return <PlansGrid plans={plans} loading={loading} />;
}
```

### En formularios (Selector)
```tsx
import { usePlans } from "@/hooks/usePlans";
import { PlanSelector } from "@/components/plans";

function ContactForm() {
    const { plans, loading } = usePlans();
    const [selectedPlan, setSelectedPlan] = useState("");
    
    return (
        <PlanSelector
            plans={plans}
            selectedPlan={selectedPlan}
            onSelectPlan={setSelectedPlan}
            loading={loading}
        />
    );
}
```

## Administración de Planes

Para modificar planes directamente en MongoDB:

```javascript
// En MongoDB Compass o shell

// Cambiar precio de un plan
db.plans.updateOne(
    { slug: "profesional" },
    { $set: { price: 79000, updatedAt: new Date() } }
)

// Ocultar un plan
db.plans.updateOne(
    { slug: "negocio" },
    { $set: { isVisible: false, updatedAt: new Date() } }
)

// Cambiar orden
db.plans.updateOne(
    { slug: "emprendedor" },
    { $set: { order: 2 } }
)

// Agregar una feature
db.plans.updateOne(
    { slug: "profesional" },
    { $push: { features: { text: "Nueva función", included: true } } }
)

// Cambiar el plan destacado
db.plans.updateMany({}, { $set: { highlighted: false } })
db.plans.updateOne(
    { slug: "negocio" },
    { $set: { highlighted: true, highlightLabel: "Mejor valor" } }
)
```

## Planes por Defecto

| Plan | Empleados | Precio | Destacado |
|------|-----------|--------|-----------|
| Emprendedor | 1 | $39,000 | No |
| Profesional | 2-5 | $69,000 | ✅ Sí |
| Negocio | 6-15 | $99,000 | No |

## Variables de Entorno Requeridas

```env
MONGODB_URI=mongodb+srv://...
MONGO_DB_NAME=reserbox_landing
```
