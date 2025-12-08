"use client";

import { useState } from "react";
import {
    FadeInUp,
    StaggerContainer,
    StaggerItem,
    motion
} from "@/components/animations";
import { AnimatePresence } from "framer-motion";

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
                {/* Section header */}
                <FadeInUp className="text-center mb-16">
                    <motion.p
                        className="text-sm uppercase tracking-widest text-indigo-400 mb-4 font-bold"
                        initial={{ opacity: 0, letterSpacing: "0.1em" }}
                        whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        FAQ
                    </motion.p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                        Preguntas frecuentes
                    </h2>
                </FadeInUp>

                {/* FAQ accordion */}
                <StaggerContainer className="space-y-4" staggerDelay={0.1}>
                    {FAQS.map((faq, i) => (
                        <StaggerItem key={i} direction="up">
                            <motion.div
                                className={`rounded-2xl bg-white/5 border overflow-hidden transition-colors ${openIndex === i ? "border-indigo-500/50" : "border-white/10"
                                    }`}
                                whileHover={{
                                    borderColor: openIndex === i ? "rgba(99, 102, 241, 0.5)" : "rgba(255, 255, 255, 0.2)"
                                }}
                            >
                                <motion.button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className="w-full px-6 py-4 flex items-center justify-between text-left group"
                                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
                                >
                                    <span className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{faq.q}</span>
                                    <motion.svg
                                        className="w-5 h-5 text-slate-400 flex-shrink-0 ml-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        animate={{ rotate: openIndex === i ? 180 : 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </motion.svg>
                                </motion.button>

                                <AnimatePresence>
                                    {openIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            <div className="px-6 pb-4">
                                                <motion.p
                                                    className="text-base text-slate-400 leading-relaxed"
                                                    initial={{ y: -10, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{ delay: 0.1 }}
                                                >
                                                    {faq.a}
                                                </motion.p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
