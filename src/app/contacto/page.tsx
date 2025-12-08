"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// ============================================================================
// CONTACT FORM PAGE - RESERBOX
// ============================================================================

const INDUSTRIES = [
    "Salón de belleza",
    "Barbería",
    "Spa / Manicure",
    "Consultorio médico",
    "Centro de bienestar / Yoga",
    "Estudio fotográfico",
    "Tatuajes / Piercings",
    "Consultoría / Coaching",
    "Otro",
];

const EMPLOYEE_COUNTS = [
    "Solo yo",
    "2-5 empleados",
    "6-10 empleados",
    "Más de 10 empleados",
];

const HOW_FOUND = [
    "Búsqueda en Google",
    "Redes sociales",
    "Recomendación de un conocido",
    "Publicidad",
    "Otro",
];

type FormData = {
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
};

function ContactFormContent() {
    const searchParams = useSearchParams();
    const preselectedPlan = searchParams.get("plan") || "";

    const [form, setForm] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        businessName: "",
        industry: "",
        employeeCount: "",
        city: "",
        plan: preselectedPlan === "pro" ? "pro" : preselectedPlan === "basico" ? "basico" : "",
        howFound: "",
        message: "",
    });

    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    // Update plan if URL param changes
    useEffect(() => {
        if (preselectedPlan) {
            setForm(prev => ({ ...prev, plan: preselectedPlan }));
        }
    }, [preselectedPlan]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validation
        if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
            setError("Por favor completa los campos obligatorios");
            return;
        }

        if (!form.businessName.trim() || !form.industry) {
            setError("Por favor completa la información de tu negocio");
            return;
        }

        if (!form.plan) {
            setError("Por favor selecciona un plan");
            return;
        }

        setSubmitting(true);

        try {
            const response = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const result = await response.json();

            if (!result.ok) {
                setError(result.error || "Error al enviar el formulario");
                return;
            }

            setSubmitted(true);
        } catch (err) {
            setError("Hubo un error al enviar. Por favor intenta de nuevo.");
        } finally {
            setSubmitting(false);
        }
    };

    const updateForm = (field: keyof FormData, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
                <div className="max-w-lg w-full text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4">
                        ¡Gracias por tu interés!
                    </h1>
                    <p className="text-slate-300 mb-8">
                        Hemos recibido tu información. Nos pondremos en contacto contigo en las próximas 24 horas para agendar una demostración personalizada de Reserbox.
                    </p>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-8">
                        <p className="text-sm text-slate-400 mb-2">Mientras tanto, puedes:</p>
                        <Link
                            href="/book/pelu_glamour"
                            className="text-indigo-400 hover:underline"
                        >
                            Ver una demo en vivo de cómo funciona →
                        </Link>
                    </div>
                    <Link
                        href="/landing"
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        ← Volver al inicio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/landing" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">R</span>
                            </div>
                            <span className="text-xl font-bold text-white">Reserbox</span>
                        </Link>
                        <Link href="/landing" className="text-sm text-slate-300 hover:text-white">
                            ← Volver
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Form */}
            <main className="pt-24 pb-16 px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Solicita tu demo personalizada
                        </h1>
                        <p className="text-slate-400">
                            Cuéntanos sobre tu negocio y te mostraremos cómo Reserbox puede ayudarte
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Contact Info Section */}
                        <section>
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 text-sm flex items-center justify-center">1</span>
                                Tu información de contacto
                            </h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Nombre completo *
                                        </label>
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={(e) => updateForm("name", e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                            placeholder="Ej: María García"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            WhatsApp *
                                        </label>
                                        <input
                                            type="tel"
                                            value={form.phone}
                                            onChange={(e) => updateForm("phone", e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                            placeholder="Ej: 300 123 4567"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => updateForm("email", e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                        placeholder="Ej: maria@gmail.com"
                                        required
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Business Info Section */}
                        <section>
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 text-sm flex items-center justify-center">2</span>
                                Sobre tu negocio
                            </h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Nombre del negocio *
                                        </label>
                                        <input
                                            type="text"
                                            value={form.businessName}
                                            onChange={(e) => updateForm("businessName", e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                            placeholder="Ej: Salón Glamour"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Ciudad
                                        </label>
                                        <input
                                            type="text"
                                            value={form.city}
                                            onChange={(e) => updateForm("city", e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                            placeholder="Ej: Bogotá"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Tipo de negocio *
                                        </label>
                                        <select
                                            value={form.industry}
                                            onChange={(e) => updateForm("industry", e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                            required
                                        >
                                            <option value="" className="bg-slate-800">Selecciona...</option>
                                            {INDUSTRIES.map((ind) => (
                                                <option key={ind} value={ind} className="bg-slate-800">{ind}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            ¿Cuántos empleados?
                                        </label>
                                        <select
                                            value={form.employeeCount}
                                            onChange={(e) => updateForm("employeeCount", e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                        >
                                            <option value="" className="bg-slate-800">Selecciona...</option>
                                            {EMPLOYEE_COUNTS.map((count) => (
                                                <option key={count} value={count} className="bg-slate-800">{count}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Plan Selection */}
                        <section>
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 text-sm flex items-center justify-center">3</span>
                                ¿Qué plan te interesa?
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => updateForm("plan", "basico")}
                                    className={`p-4 rounded-xl border-2 text-left transition-all ${form.plan === "basico"
                                        ? "border-indigo-500 bg-indigo-500/10"
                                        : "border-white/10 bg-white/5 hover:border-white/20"
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-white">Básico</span>
                                        <span className="text-sm text-slate-400">$49.000/mes</span>
                                    </div>
                                    <p className="text-sm text-slate-400">Dashboard + Página de reservas</p>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => updateForm("plan", "pro")}
                                    className={`p-4 rounded-xl border-2 text-left transition-all relative ${form.plan === "pro"
                                        ? "border-indigo-500 bg-indigo-500/10"
                                        : "border-white/10 bg-white/5 hover:border-white/20"
                                        }`}
                                >
                                    <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs">
                                        Recomendado
                                    </span>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-white">Pro</span>
                                        <span className="text-sm text-slate-400">$99.000/mes</span>
                                    </div>
                                    <p className="text-sm text-slate-400">Todo + Bot de WhatsApp</p>
                                </button>
                            </div>
                        </section>

                        {/* Additional Info */}
                        <section>
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 text-sm flex items-center justify-center">4</span>
                                Información adicional
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        ¿Cómo nos encontraste?
                                    </label>
                                    <select
                                        value={form.howFound}
                                        onChange={(e) => updateForm("howFound", e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    >
                                        <option value="" className="bg-slate-800">Selecciona...</option>
                                        {HOW_FOUND.map((how) => (
                                            <option key={how} value={how} className="bg-slate-800">{how}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        ¿Algo más que quieras contarnos?
                                    </label>
                                    <textarea
                                        value={form.message}
                                        onChange={(e) => updateForm("message", e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
                                        placeholder="Ej: Tengo 2 sucursales, necesito integrar con mi sistema de pagos..."
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Error */}
                        {error && (
                            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                                <p className="text-sm text-rose-400">{error}</p>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Enviando...
                                </span>
                            ) : (
                                "Solicitar demo →"
                            )}
                        </button>

                        <p className="text-center text-sm text-slate-500">
                            Al enviar, aceptas que te contactemos para agendar la demo
                        </p>
                    </form>
                </div>
            </main>
        </div>
    );
}

// Wrapper with Suspense for useSearchParams
export default function ContactPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <ContactFormContent />
        </Suspense>
    );
}
