import { useState } from "react";

const FAQS = [
    {
        q: "¿Cuánto tiempo toma configurar Reserbox?",
        a: "Menos de 10 minutos. Solo necesitas agregar tus servicios, empleados y horarios. ¡Listo para recibir reservas!",
    },
    {
        q: "¿Cómo funciona el bot de WhatsApp?",
        a: "El bot se conecta a tu WhatsApp Business y responde automáticamente. Tus clientes pueden reservar, consultar disponibilidad y recibir recordatorios directamente en WhatsApp.",
    },
    {
        q: "¿Puedo empezar con Básico y luego subir a Pro?",
        a: "¡Por supuesto! Puedes cambiar de plan en cualquier momento. Tus datos se conservan.",
    },
    {
        q: "¿Hay contrato o permanencia mínima?",
        a: "No. Pagas mes a mes y puedes cancelar cuando quieras. Sin letra pequeña.",
    },
    {
        q: "¿Cómo es el proceso de onboarding?",
        a: "Después de registrarte, agendamos una reunión virtual para configurar tu cuenta juntos y resolver todas tus dudas.",
    },
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-24 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-sm uppercase tracking-widest text-indigo-400 mb-4 font-bold">FAQ</p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                        Preguntas frecuentes
                    </h2>
                </div>

                <div className="space-y-4">
                    {FAQS.map((faq, i) => (
                        <div
                            key={i}
                            className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full px-6 py-4 flex items-center justify-between text-left"
                            >
                                <span className="text-lg font-bold text-white">{faq.q}</span>
                                <svg
                                    className={`w-5 h-5 text-slate-400 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {openIndex === i && (
                                <div className="px-6 pb-4">
                                    <p className="text-base text-slate-400 leading-relaxed">{faq.a}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
