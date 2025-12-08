import Link from "next/link";
import { useState } from "react";

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/landing" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">R</span>
                        </div>
                        <span className="text-xl font-extrabold text-white">Reserbox</span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm text-slate-300 hover:text-white transition-colors">Funciones</a>
                        <a href="#industries" className="text-sm text-slate-300 hover:text-white transition-colors">Industrias</a>
                        <a href="#pricing" className="text-sm text-slate-300 hover:text-white transition-colors">Precios</a>
                        <a href="#faq" className="text-sm text-slate-300 hover:text-white transition-colors">FAQ</a>
                    </div>

                    {/* CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/" className="text-sm text-slate-300 hover:text-white transition-colors">
                            Iniciar sesión
                        </Link>
                        <Link
                            href="/contacto"
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                            Solicitar demo
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 text-slate-300"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {mobileOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div className="md:hidden py-4 border-t border-white/10">
                        <div className="flex flex-col gap-4">
                            <a href="#features" className="text-slate-300 hover:text-white">Funciones</a>
                            <a href="#industries" className="text-slate-300 hover:text-white">Industrias</a>
                            <a href="#pricing" className="text-slate-300 hover:text-white">Precios</a>
                            <a href="#faq" className="text-slate-300 hover:text-white">FAQ</a>
                            <Link href="/" className="text-slate-300">Iniciar sesión</Link>
                            <Link href="/contacto" className="text-indigo-400 font-medium">Solicitar demo</Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
