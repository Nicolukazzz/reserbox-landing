"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = () => {
        setMobileOpen(false);
    };

    const navItems = [
        { href: "#features", label: "Funciones" },
        { href: "#industries", label: "Industrias" },
        { href: "#pricing", label: "Precios" },
        { href: "#faq", label: "FAQ" },
    ];

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
                : "bg-slate-900/80 backdrop-blur-xl border-b border-white/5"
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href="/" className="flex items-center gap-2">
                            <motion.div
                                className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
                                whileHover={{ rotate: 10 }}
                            >
                                <span className="text-white font-bold text-sm">R</span>
                            </motion.div>
                            <span className="text-xl font-extrabold text-white">Reserbox</span>
                        </Link>
                    </motion.div>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item, i) => (
                            <motion.a
                                key={item.href}
                                href={item.href}
                                className="text-sm text-slate-300 hover:text-white transition-colors relative"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -2 }}
                            >
                                {item.label}
                                <motion.span
                                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500"
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.2 }}
                                />
                            </motion.a>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <motion.a
                            href="#pricing"
                            className="text-sm text-slate-300 hover:text-white transition-colors"
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Ver planes
                        </motion.a>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/contacto"
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-opacity inline-block"
                            >
                                Prueba gratis
                            </Link>
                        </motion.div>
                    </div>

                    {/* Mobile menu button */}
                    <motion.button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 text-slate-300"
                        whileTap={{ scale: 0.9 }}
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <AnimatePresence mode="wait">
                                {mobileOpen ? (
                                    <motion.path
                                        key="close"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        exit={{ pathLength: 0 }}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <motion.g
                                        key="menu"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </motion.g>
                                )}
                            </AnimatePresence>
                        </svg>
                    </motion.button>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            className="md:hidden py-4 border-t border-white/10"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <motion.div
                                className="flex flex-col gap-4"
                                initial="closed"
                                animate="open"
                                variants={{
                                    open: { transition: { staggerChildren: 0.05 } },
                                    closed: {},
                                }}
                            >
                                {navItems.map((item) => (
                                    <motion.a
                                        key={item.href}
                                        href={item.href}
                                        onClick={handleNavClick}
                                        className="text-slate-300 hover:text-white transition-colors"
                                        variants={{
                                            open: { opacity: 1, x: 0 },
                                            closed: { opacity: 0, x: -20 },
                                        }}
                                    >
                                        {item.label}
                                    </motion.a>
                                ))}
                                <motion.div
                                    variants={{
                                        open: { opacity: 1, x: 0 },
                                        closed: { opacity: 0, x: -20 },
                                    }}
                                >
                                    <Link
                                        href="/contacto"
                                        onClick={handleNavClick}
                                        className="text-indigo-400 font-medium"
                                    >
                                        Prueba gratis →
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}
