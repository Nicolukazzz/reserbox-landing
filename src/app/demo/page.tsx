"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// ============================================================================
// DEMO PAGE - Simulates Reserbox booking experience
// ============================================================================

const DEMO_BUSINESS = {
    name: "Salón Glamour",
    slug: "salon-glamour",
    description: "Tu destino de belleza integral",
    phone: "573001234567",
    address: "Cra 15 #85-24, Bogotá",
    logo: "💇‍♀️",
};

const DEMO_SERVICES = [
    { id: 1, name: "Corte de cabello", duration: 45, price: 35000, icon: "✂️" },
    { id: 2, name: "Tinte completo", duration: 120, price: 120000, icon: "🎨" },
    { id: 3, name: "Manicure", duration: 45, price: 25000, icon: "💅" },
    { id: 4, name: "Pedicure", duration: 60, price: 35000, icon: "🦶" },
    { id: 5, name: "Tratamiento capilar", duration: 60, price: 80000, icon: "✨" },
    { id: 6, name: "Maquillaje", duration: 60, price: 65000, icon: "💄" },
];

const DEMO_EMPLOYEES = [
    { id: 1, name: "María García", role: "Estilista Senior", avatar: "👩‍🦰" },
    { id: 2, name: "Laura Pérez", role: "Colorista", avatar: "👩‍🦱" },
    { id: 3, name: "Carlos López", role: "Manicurista", avatar: "👨‍🦲" },
];

const DEMO_HOURS = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM",
    "04:30 PM", "05:00 PM", "05:30 PM",
];

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
    }).format(amount);
}

function getNextDays(count: number): { date: Date; label: string; dayName: string }[] {
    const days = [];
    const today = new Date();
    const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    for (let i = 0; i < count; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        days.push({
            date,
            label: `${date.getDate()} ${monthNames[date.getMonth()]}`,
            dayName: i === 0 ? "Hoy" : i === 1 ? "Mañana" : dayNames[date.getDay()],
        });
    }
    return days;
}

type Step = "services" | "employee" | "datetime" | "confirm" | "success";

export default function DemoPage() {
    const [step, setStep] = useState<Step>("services");
    const [selectedServices, setSelectedServices] = useState<number[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const days = getNextDays(7);

    const totalPrice = selectedServices.reduce((sum, id) => {
        const service = DEMO_SERVICES.find(s => s.id === id);
        return sum + (service?.price || 0);
    }, 0);

    const totalDuration = selectedServices.reduce((sum, id) => {
        const service = DEMO_SERVICES.find(s => s.id === id);
        return sum + (service?.duration || 0);
    }, 0);

    const handleServiceToggle = (id: number) => {
        setSelectedServices(prev =>
            prev.includes(id)
                ? prev.filter(s => s !== id)
                : [...prev, id]
        );
    };

    const handleConfirm = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setStep("success");
    };

    const renderStep = () => {
        switch (step) {
            case "services":
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-white mb-2">Selecciona tus servicios</h2>
                        <p className="text-slate-400 text-sm mb-6">Puedes elegir uno o más servicios</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {DEMO_SERVICES.map((service) => (
                                <button
                                    key={service.id}
                                    onClick={() => handleServiceToggle(service.id)}
                                    className={`
                                        p-4 rounded-xl border-2 text-left transition-all
                                        ${selectedServices.includes(service.id)
                                            ? "border-indigo-500 bg-indigo-500/10"
                                            : "border-white/10 bg-white/5 hover:border-white/20"
                                        }
                                    `}
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl">{service.icon}</span>
                                        <div className="flex-1">
                                            <p className="font-medium text-white">{service.name}</p>
                                            <p className="text-sm text-slate-400">{service.duration} min</p>
                                        </div>
                                        <span className="text-sm font-medium text-indigo-400">
                                            {formatCurrency(service.price)}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {selectedServices.length > 0 && (
                            <div className="pt-4 border-t border-white/10">
                                <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                                    <span>Total: {formatCurrency(totalPrice)}</span>
                                    <span>Duración aprox: {totalDuration} min</span>
                                </div>
                                <button
                                    onClick={() => setStep("employee")}
                                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:opacity-90 transition-all"
                                >
                                    Continuar →
                                </button>
                            </div>
                        )}
                    </div>
                );

            case "employee":
                return (
                    <div className="space-y-4">
                        <button onClick={() => setStep("services")} className="text-sm text-slate-400 hover:text-white mb-2">
                            ← Volver
                        </button>
                        <h2 className="text-xl font-bold text-white mb-2">¿Con quién deseas tu cita?</h2>
                        <p className="text-slate-400 text-sm mb-6">Elige tu profesional preferido</p>

                        <div className="space-y-3">
                            <button
                                onClick={() => {
                                    setSelectedEmployee(null);
                                    setStep("datetime");
                                }}
                                className="w-full p-4 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 text-left transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-xl">
                                        🎲
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">Sin preferencia</p>
                                        <p className="text-sm text-slate-400">Cualquier profesional disponible</p>
                                    </div>
                                </div>
                            </button>

                            {DEMO_EMPLOYEES.map((employee) => (
                                <button
                                    key={employee.id}
                                    onClick={() => {
                                        setSelectedEmployee(employee.id);
                                        setStep("datetime");
                                    }}
                                    className="w-full p-4 rounded-xl border border-white/10 bg-white/5 hover:border-indigo-500/50 text-left transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-xl">
                                            {employee.avatar}
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{employee.name}</p>
                                            <p className="text-sm text-slate-400">{employee.role}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                );

            case "datetime":
                return (
                    <div className="space-y-4">
                        <button onClick={() => setStep("employee")} className="text-sm text-slate-400 hover:text-white mb-2">
                            ← Volver
                        </button>
                        <h2 className="text-xl font-bold text-white mb-2">Elige fecha y hora</h2>
                        <p className="text-slate-400 text-sm mb-6">Selecciona el momento que prefieras</p>

                        {/* Date selector */}
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {days.map((day, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedDate(day.date)}
                                    className={`
                                        flex-shrink-0 px-4 py-3 rounded-xl text-center transition-all
                                        ${selectedDate?.toDateString() === day.date.toDateString()
                                            ? "bg-indigo-500 text-white"
                                            : "bg-white/5 border border-white/10 text-white hover:border-white/20"
                                        }
                                    `}
                                >
                                    <p className="text-xs text-slate-400">{day.dayName}</p>
                                    <p className="font-medium">{day.label}</p>
                                </button>
                            ))}
                        </div>

                        {/* Time selector */}
                        {selectedDate && (
                            <div>
                                <p className="text-sm text-slate-400 mb-3">Horarios disponibles:</p>
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                    {DEMO_HOURS.map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`
                                                py-2 px-3 rounded-lg text-sm font-medium transition-all
                                                ${selectedTime === time
                                                    ? "bg-indigo-500 text-white"
                                                    : "bg-white/5 border border-white/10 text-white hover:border-white/20"
                                                }
                                            `}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedDate && selectedTime && (
                            <button
                                onClick={() => setStep("confirm")}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:opacity-90 transition-all mt-4"
                            >
                                Continuar →
                            </button>
                        )}
                    </div>
                );

            case "confirm":
                const employee = selectedEmployee
                    ? DEMO_EMPLOYEES.find(e => e.id === selectedEmployee)
                    : null;

                return (
                    <div className="space-y-4">
                        <button onClick={() => setStep("datetime")} className="text-sm text-slate-400 hover:text-white mb-2">
                            ← Volver
                        </button>
                        <h2 className="text-xl font-bold text-white mb-2">Confirma tu reserva</h2>
                        <p className="text-slate-400 text-sm mb-6">Revisa los detalles y confirma</p>

                        {/* Summary card */}
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-lg">
                                    📅
                                </div>
                                <div>
                                    <p className="text-white font-medium">
                                        {selectedDate?.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" })}
                                    </p>
                                    <p className="text-sm text-indigo-400">{selectedTime}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-xs text-slate-500 uppercase tracking-wide">Servicios</p>
                                {selectedServices.map(id => {
                                    const service = DEMO_SERVICES.find(s => s.id === id);
                                    return service ? (
                                        <div key={id} className="flex justify-between text-sm">
                                            <span className="text-slate-300">{service.icon} {service.name}</span>
                                            <span className="text-slate-400">{formatCurrency(service.price)}</span>
                                        </div>
                                    ) : null;
                                })}
                            </div>

                            {employee && (
                                <div className="pt-3 border-t border-white/10">
                                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Profesional</p>
                                    <p className="text-sm text-white">{employee.avatar} {employee.name}</p>
                                </div>
                            )}

                            <div className="pt-3 border-t border-white/10">
                                <div className="flex justify-between">
                                    <span className="font-medium text-white">Total</span>
                                    <span className="font-bold text-indigo-400">{formatCurrency(totalPrice)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Customer info */}
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm text-slate-300 mb-1">Tu nombre</label>
                                <input
                                    type="text"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    placeholder="Ej: María García"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-300 mb-1">Tu WhatsApp</label>
                                <input
                                    type="tel"
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                    placeholder="Ej: 300 123 4567"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleConfirm}
                            disabled={!customerName || !customerPhone || isLoading}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Confirmando...
                                </>
                            ) : (
                                "Confirmar reserva ✓"
                            )}
                        </button>
                    </div>
                );

            case "success":
                return (
                    <div className="text-center py-8">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">¡Reserva confirmada!</h2>
                        <p className="text-slate-400 mb-6">
                            Te enviamos un mensaje de confirmación por WhatsApp con los detalles de tu cita.
                        </p>

                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6 text-left">
                            <p className="text-xs text-slate-500 uppercase tracking-wide mb-3">Resumen</p>
                            <p className="text-white font-medium mb-1">
                                {selectedDate?.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" })}
                            </p>
                            <p className="text-indigo-400 text-sm mb-3">{selectedTime}</p>
                            <p className="text-sm text-slate-300">
                                {selectedServices.map(id => DEMO_SERVICES.find(s => s.id === id)?.name).join(", ")}
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-6">
                            <p className="text-sm text-emerald-400">
                                💬 Recibirás un recordatorio por WhatsApp 24 horas antes de tu cita
                            </p>
                        </div>

                        <Link
                            href="/"
                            className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:opacity-90 transition-all"
                        >
                            Volver al inicio
                        </Link>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-slate-900">
            {/* Header */}
            <header className="border-b border-white/10 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-10">
                <div className="max-w-lg mx-auto px-4 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-2xl">
                            {DEMO_BUSINESS.logo}
                        </div>
                        <div>
                            <h1 className="font-bold text-white">{DEMO_BUSINESS.name}</h1>
                            <p className="text-sm text-slate-400">{DEMO_BUSINESS.description}</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="max-w-lg mx-auto px-4 py-8">
                {/* Progress indicator */}
                {step !== "success" && (
                    <div className="flex items-center gap-2 mb-8">
                        {["services", "employee", "datetime", "confirm"].map((s, i) => (
                            <React.Fragment key={s}>
                                <div
                                    className={`
                                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                                        ${["services", "employee", "datetime", "confirm"].indexOf(step) >= i
                                            ? "bg-indigo-500 text-white"
                                            : "bg-white/10 text-slate-500"
                                        }
                                    `}
                                >
                                    {i + 1}
                                </div>
                                {i < 3 && (
                                    <div
                                        className={`
                                            flex-1 h-1 rounded
                                            ${["services", "employee", "datetime", "confirm"].indexOf(step) > i
                                                ? "bg-indigo-500"
                                                : "bg-white/10"
                                            }
                                        `}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                )}

                {renderStep()}
            </main>

            {/* Footer */}
            <footer className="border-t border-white/10 py-4">
                <div className="max-w-lg mx-auto px-4">
                    <p className="text-center text-xs text-slate-500">
                        Powered by <span className="text-indigo-400 font-medium">Reserbox</span>
                    </p>
                </div>
            </footer>
        </div>
    );
}
