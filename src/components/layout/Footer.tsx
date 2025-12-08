import Link from "next/link";

export function Footer() {
    return (
        <footer className="py-12 px-4 border-t border-white/10">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">R</span>
                            </div>
                            <span className="text-xl font-extrabold text-white">Reserbox</span>
                        </div>
                        <p className="text-sm text-slate-400">
                            Software de reservas con integración de WhatsApp para negocios de servicios.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <p className="text-sm font-bold text-white mb-4">Producto</p>
                        <ul className="space-y-2">
                            <li><a href="#features" className="text-sm text-slate-400 hover:text-white">Funciones</a></li>
                            <li><a href="#pricing" className="text-sm text-slate-400 hover:text-white">Precios</a></li>
                            <li><Link href="/book/pelu_glamour" className="text-sm text-slate-400 hover:text-white">Demo</Link></li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-sm font-bold text-white mb-4">Compañía</p>
                        <ul className="space-y-2">
                            <li><Link href="/contacto" className="text-sm text-slate-400 hover:text-white">Contacto</Link></li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-sm font-bold text-white mb-4">Legal</p>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-slate-400 hover:text-white">Privacidad</a></li>
                            <li><a href="#" className="text-sm text-slate-400 hover:text-white">Términos</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 text-center">
                    <p className="text-sm text-slate-500">
                        © 2025 Reserbox. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
