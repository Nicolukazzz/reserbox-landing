"use client";

import { useState } from "react";
import Image from "next/image";
import {
    FadeInUp,
    StaggerContainer,
    StaggerItem,
    HoverCard,
    motion
} from "../animations";
import { AnimatePresence } from "framer-motion";

// Imágenes de demo organizadas por categoría
const DEMO_SCREENSHOTS = [
    {
        id: "tablero",
        title: "Tablero principal",
        description: "Vista general con resumen de citas del día, estadísticas y accesos rápidos",
        image: "/demo-images/tablero-general.png",
        icon: "📊",
    },
    {
        id: "calendario",
        title: "Calendario de reservas",
        description: "Visualiza todas las citas en formato calendario semanal o mensual",
        image: "/demo-images/reservas-calendario.png",
        icon: "📅",
    },
    {
        id: "ingresos",
        title: "Balance e ingresos",
        description: "Control total de tus ingresos con gráficos y reportes detallados",
        image: "/demo-images/balance-ingresos.png",
        icon: "💰",
    },
];

// Screenshots adicionales del sistema (Desktop)
const ADDITIONAL_SCREENSHOTS = [
    {
        id: "escritorio-1",
        image: "/demo-images/Screenshot 2025-12-08 233611.png",
        alt: "Vista del tablero - Escritorio",
    },
    {
        id: "escritorio-2",
        image: "/demo-images/Screenshot 2025-12-08 233634.png",
        alt: "Gestión de reservas",
    },
    {
        id: "escritorio-3",
        image: "/demo-images/Screenshot 2025-12-08 233648.png",
        alt: "Calendario de citas",
    },
    {
        id: "escritorio-4",
        image: "/demo-images/Screenshot 2025-12-08 233704.png",
        alt: "Gestión de clientes",
    },
    {
        id: "escritorio-5",
        image: "/demo-images/Screenshot 2025-12-08 233721.png",
        alt: "Configuración de servicios",
    },
    {
        id: "escritorio-6",
        image: "/demo-images/Screenshot 2025-12-08 233726.png",
        alt: "Estadísticas del negocio",
    },
];

// Screenshots del móvil/WhatsApp
const MOBILE_SCREENSHOTS = [
    {
        id: "movil-1",
        image: "/demo-images/20251209_044540000_iOS.png",
        alt: "Bot de WhatsApp - Bienvenida",
    },
    {
        id: "movil-2",
        image: "/demo-images/20251209_044543000_iOS.png",
        alt: "Bot de WhatsApp - Servicios",
    },
    {
        id: "movil-3",
        image: "/demo-images/20251209_044550000_iOS.png",
        alt: "Bot de WhatsApp - Selección",
    },
    {
        id: "movil-4",
        image: "/demo-images/20251209_044603000_iOS.png",
        alt: "Bot de WhatsApp - Horarios",
    },
    {
        id: "movil-5",
        image: "/demo-images/20251209_044607000_iOS.png",
        alt: "Bot de WhatsApp - Confirmación",
    },
];

export function DemoGallerySection() {
    const [activeTab, setActiveTab] = useState<"features" | "desktop" | "whatsapp">("features");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <section id="demo-gallery" className="py-16 sm:py-24 px-4 bg-gradient-to-b from-slate-800/30 via-transparent to-slate-800/30">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <FadeInUp className="text-center mb-8 sm:mb-12">
                    <motion.p
                        className="text-sm uppercase tracking-widest text-indigo-400 mb-4 font-bold"
                        initial={{ opacity: 0, letterSpacing: "0.1em" }}
                        whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Conoce el Sistema
                    </motion.p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4">
                        Así funciona Reserbox
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
                        Un vistazo a las herramientas que tendrás para gestionar tu negocio de forma simple y profesional
                    </p>
                </FadeInUp>

                {/* Tabs */}
                <FadeInUp delay={0.1} className="flex justify-center mb-8 sm:mb-12">
                    <div className="inline-flex p-1 rounded-xl bg-white/5 border border-white/10 gap-1">
                        {[
                            { id: "features", label: "Funciones principales", icon: "✨" },
                            { id: "desktop", label: "Vista completa", icon: "🖥️" },
                            { id: "whatsapp", label: "Bot WhatsApp", icon: "💬" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                className={`
                                    px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all
                                    ${activeTab === tab.id
                                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                    }
                                `}
                            >
                                <span className="mr-1 sm:mr-2">{tab.icon}</span>
                                <span className="hidden sm:inline">{tab.label}</span>
                                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                            </button>
                        ))}
                    </div>
                </FadeInUp>

                {/* Content based on active tab */}
                <AnimatePresence mode="wait">
                    {activeTab === "features" && (
                        <motion.div
                            key="features"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <StaggerContainer
                                className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
                                staggerDelay={0.1}
                            >
                                {DEMO_SCREENSHOTS.map((screenshot, i) => (
                                    <StaggerItem key={screenshot.id} direction="up">
                                        <HoverCard scale={1.02} lift={-6}>
                                            <motion.div
                                                className="group relative rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all overflow-hidden cursor-pointer"
                                                onClick={() => setSelectedImage(screenshot.image)}
                                                whileHover={{
                                                    boxShadow: "0 20px 40px -20px rgba(99, 102, 241, 0.3)",
                                                }}
                                            >
                                                {/* Image container */}
                                                <div className="relative aspect-video overflow-hidden">
                                                    <Image
                                                        src={screenshot.image}
                                                        alt={screenshot.title}
                                                        fill
                                                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />

                                                    {/* Icon badge */}
                                                    <div className="absolute top-3 left-3 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-indigo-500/90 to-purple-600/90 flex items-center justify-center text-lg sm:text-xl backdrop-blur-sm">
                                                        {screenshot.icon}
                                                    </div>

                                                    {/* Zoom indicator */}
                                                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Info */}
                                                <div className="p-4 sm:p-5">
                                                    <h3 className="text-base sm:text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                                                        {screenshot.title}
                                                    </h3>
                                                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                                                        {screenshot.description}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        </HoverCard>
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>
                        </motion.div>
                    )}

                    {activeTab === "desktop" && (
                        <motion.div
                            key="desktop"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                                {ADDITIONAL_SCREENSHOTS.map((screenshot, i) => (
                                    <motion.div
                                        key={screenshot.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        onClick={() => setSelectedImage(screenshot.image)}
                                        className="group relative aspect-video rounded-lg sm:rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-indigo-500/50 transition-all"
                                    >
                                        <Image
                                            src={screenshot.image}
                                            alt={screenshot.alt}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors" />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "whatsapp" && (
                        <motion.div
                            key="whatsapp"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* WhatsApp screenshots - móvil style */}
                            <div className="flex flex-col items-center">
                                <div className="mb-6 text-center">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                        <span className="text-emerald-400 text-2xl">💬</span>
                                        <span className="text-emerald-200 text-sm">Tus clientes reservan directo por WhatsApp</span>
                                    </div>
                                </div>

                                <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 px-4 -mx-4 scrollbar-hide max-w-full">
                                    {MOBILE_SCREENSHOTS.map((screenshot, i) => (
                                        <motion.div
                                            key={screenshot.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            onClick={() => setSelectedImage(screenshot.image)}
                                            className="flex-shrink-0 group relative w-[180px] sm:w-[220px] rounded-2xl overflow-hidden cursor-pointer border-2 border-white/10 hover:border-emerald-500/50 transition-all shadow-xl hover:shadow-emerald-500/20"
                                        >
                                            {/* Phone frame effect */}
                                            <div className="relative aspect-[9/19.5] bg-slate-800">
                                                <Image
                                                    src={screenshot.image}
                                                    alt={screenshot.alt}
                                                    fill
                                                    className="object-cover group-hover:scale-[1.02] transition-transform"
                                                />
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-slate-900 to-transparent">
                                                <p className="text-xs text-white/70 text-center truncate">{screenshot.alt}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <p className="text-sm text-slate-500 mt-4 text-center">
                                    ← Desliza para ver más capturas →
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Lightbox Modal */}
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-lg"
                            onClick={() => setSelectedImage(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.8 }}
                                className="relative max-w-5xl max-h-[90vh] w-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
                                >
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <Image
                                    src={selectedImage}
                                    alt="Vista ampliada"
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto max-h-[85vh] object-contain rounded-xl border border-white/10"
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
