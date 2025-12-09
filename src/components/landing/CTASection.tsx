"use client";

import Link from "next/link";
import {
    FadeInUp,
    Floating,
    motion
} from "../animations";

export function CTASection() {
    return (
        <section className="py-24 px-4 overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <FadeInUp>
                    <motion.div
                        className="relative p-12 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 overflow-hidden"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {/* Animated background pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <Floating duration={4} distance={15}>
                                <div className="absolute top-0 left-0 w-40 h-40 border border-white rounded-full" />
                            </Floating>
                            <Floating duration={5} distance={20} delay={0.5}>
                                <div className="absolute bottom-0 right-0 w-60 h-60 border border-white rounded-full" />
                            </Floating>
                            <Floating duration={6} distance={10} delay={1}>
                                <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-white rounded-full" />
                            </Floating>
                        </div>

                        {/* Animated gradient overlay */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                            animate={{
                                x: ["-200%", "200%"],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatDelay: 2,
                                ease: "linear",
                            }}
                        />

                        <div className="relative text-center">
                            <motion.h2
                                className="text-3xl sm:text-4xl font-extrabold text-white mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                ¿Listo para automatizar tu agenda?
                            </motion.h2>
                            <motion.p
                                className="text-lg text-indigo-100 mb-8 max-w-xl mx-auto"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                Agenda una demo personalizada y te mostramos cómo Reserbox puede ayudarte
                            </motion.p>
                            <motion.div
                                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href="/contacto"
                                        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-indigo-50 transition-all inline-block"
                                    >
                                        Prueba gratis 15 días →
                                    </Link>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href="/demo"
                                        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/20 text-white font-medium hover:bg-white/30 transition-all text-center inline-block"
                                    >
                                        Ver reserva demostrativa
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </FadeInUp>
            </div>
        </section>
    );
}
