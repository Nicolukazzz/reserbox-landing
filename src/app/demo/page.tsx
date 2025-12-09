"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

// ============================================================================
// DEMO PAGE - Sistema de reservas reactivo y en tiempo real
// El cliente puede ver todos los horarios disponibles al cambiar de especialista
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
    {
        id: 1,
        name: "María García",
        role: "Estilista Senior",
        avatar: "👩‍🦰",
        // Horarios diferentes por empleado para simular disponibilidad real
        blockedHours: ["10:00 AM", "02:00 PM", "04:30 PM"]
    },
    {
        id: 2,
        name: "Laura Pérez",
        role: "Colorista",
        avatar: "👩‍🦱",
        blockedHours: ["09:30 AM", "11:00 AM", "03:00 PM", "05:00 PM"]
    },
    {
        id: 3,
        name: "Carlos López",
        role: "Manicurista",
        avatar: "👨‍🦲",
        blockedHours: ["09:00 AM", "12:00 PM", "02:30 PM"]
    },
];

const ALL_HOURS = [
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

// Componente de selección de servicios
function ServiceSelector({
    selectedServices,
    onToggle
}: {
    selectedServices: number[];
    onToggle: (id: number) => void
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {DEMO_SERVICES.map((service) => (
                <button
                    key={service.id}
                    onClick={() => onToggle(service.id)}
                    className={`
                        p-3 sm:p-4 rounded-xl border-2 text-left transition-all
                        ${selectedServices.includes(service.id)
                            ? "border-indigo-500 bg-indigo-500/10"
                            : "border-white/10 bg-white/5 hover:border-white/20"
                        }
                    `}
                >
                    <div className="flex items-start gap-2 sm:gap-3">
                        <span className="text-xl sm:text-2xl">{service.icon}</span>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-white text-sm sm:text-base truncate">{service.name}</p>
                            <p className="text-xs sm:text-sm text-slate-400">{service.duration} min</p>
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-indigo-400 whitespace-nowrap">
                            {formatCurrency(service.price)}
                        </span>
                    </div>
                </button>
            ))}
        </div>
    );
}

// Componente de selección de empleado con disponibilidad reactiva
function EmployeeAndTimeSelector({
    selectedEmployee,
    selectedDate,
    selectedTime,
    onEmployeeSelect,
    onDateSelect,
    onTimeSelect,
}: {
    selectedEmployee: number | null;
    selectedDate: Date | null;
    selectedTime: string | null;
    onEmployeeSelect: (id: number | null) => void;
    onDateSelect: (date: Date) => void;
    onTimeSelect: (time: string) => void;
}) {
    const days = getNextDays(7);

    // Calcular horarios disponibles basados en el empleado seleccionado
    const availableHours = useMemo(() => {
        if (selectedEmployee === null) {
            // Sin preferencia - mostrar todos los horarios
            return ALL_HOURS;
        }
        const employee = DEMO_EMPLOYEES.find(e => e.id === selectedEmployee);
        if (!employee) return ALL_HOURS;

        return ALL_HOURS.filter(hour => !employee.blockedHours.includes(hour));
    }, [selectedEmployee]);

    // Limpiar hora seleccionada si ya no está disponible
    React.useEffect(() => {
        if (selectedTime && !availableHours.includes(selectedTime)) {
            onTimeSelect("");
        }
    }, [availableHours, selectedTime, onTimeSelect]);

    return (
        <div className="space-y-6">
            {/* Selector de empleado - Lado izquierdo en desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Columna de empleados */}
                <div className="space-y-3">
                    <h3 className="text-sm font-medium text-slate-400 mb-2">¿Con quién deseas tu cita?</h3>

                    {/* Opción sin preferencia */}
                    <button
                        onClick={() => onEmployeeSelect(null)}
                        className={`w-full p-3 sm:p-4 rounded-xl border text-left transition-all ${selectedEmployee === null
                                ? "border-indigo-500 bg-indigo-500/10"
                                : "border-white/10 bg-white/5 hover:border-white/20"
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-lg sm:text-xl">
                                🎲
                            </div>
                            <div>
                                <p className="font-medium text-white text-sm sm:text-base">Sin preferencia</p>
                                <p className="text-xs sm:text-sm text-slate-400">Cualquier profesional disponible</p>
                            </div>
                            {selectedEmployee === null && (
                                <div className="ml-auto">
                                    <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                    </button>

                    {/* Lista de empleados */}
                    {DEMO_EMPLOYEES.map((employee) => {
                        const hoursAvailable = ALL_HOURS.length - employee.blockedHours.length;
                        return (
                            <button
                                key={employee.id}
                                onClick={() => onEmployeeSelect(employee.id)}
                                className={`w-full p-3 sm:p-4 rounded-xl border text-left transition-all ${selectedEmployee === employee.id
                                        ? "border-indigo-500 bg-indigo-500/10"
                                        : "border-white/10 bg-white/5 hover:border-white/20"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-lg sm:text-xl">
                                        {employee.avatar}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-white text-sm sm:text-base">{employee.name}</p>
                                        <p className="text-xs sm:text-sm text-slate-400">{employee.role}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs text-emerald-400">{hoursAvailable} horarios</span>
                                        {selectedEmployee === employee.id && (
                                            <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center mt-1 ml-auto">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Columna de fecha y horarios - REACTIVA */}
                <div className="space-y-4 lg:border-l lg:border-white/10 lg:pl-6">
                    <h3 className="text-sm font-medium text-slate-400">Elige fecha y hora</h3>

                    {/* Selector de fecha */}
                    <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                        {days.map((day, i) => (
                            <button
                                key={i}
                                onClick={() => onDateSelect(day.date)}
                                className={`
                                    flex-shrink-0 px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-center transition-all min-w-[70px] sm:min-w-[80px]
                                    ${selectedDate?.toDateString() === day.date.toDateString()
                                        ? "bg-indigo-500 text-white"
                                        : "bg-white/5 border border-white/10 text-white hover:border-white/20"
                                    }
                                `}
                            >
                                <p className="text-[10px] sm:text-xs text-slate-400">{day.dayName}</p>
                                <p className="font-medium text-xs sm:text-sm">{day.label}</p>
                            </button>
                        ))}
                    </div>

                    {/* Horarios disponibles - SE ACTUALIZAN EN TIEMPO REAL */}
                    {selectedDate && (
                        <div className="animate-fadeIn">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-xs sm:text-sm text-slate-400">Horarios disponibles:</p>
                                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                                    {availableHours.length} disponibles
                                </span>
                            </div>

                            {availableHours.length > 0 ? (
                                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                                    {availableHours.map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => onTimeSelect(time)}
                                            className={`
                                                py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium transition-all
                                                ${selectedTime === time
                                                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                                                    : "bg-white/5 border border-white/10 text-white hover:border-indigo-500/50 hover:bg-indigo-500/10"
                                                }
                                            `}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-slate-400">
                                    <p className="text-2xl mb-2">😔</p>
                                    <p className="text-sm">No hay horarios disponibles con este especialista</p>
                                    <p className="text-xs text-slate-500 mt-1">Prueba seleccionando otro profesional</p>
                                </div>
                            )}
                        </div>
                    )}

                    {!selectedDate && (
                        <div className="text-center py-6 text-slate-500">
                            <p className="text-sm">👆 Selecciona una fecha para ver los horarios</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Componente de resumen y confirmación
function ConfirmationStep({
    selectedServices,
    selectedEmployee,
    selectedDate,
    selectedTime,
    customerName,
    customerPhone,
    onNameChange,
    onPhoneChange,
    onConfirm,
    isLoading,
}: {
    selectedServices: number[];
    selectedEmployee: number | null;
    selectedDate: Date | null;
    selectedTime: string | null;
    customerName: string;
    customerPhone: string;
    onNameChange: (value: string) => void;
    onPhoneChange: (value: string) => void;
    onConfirm: () => void;
    isLoading: boolean;
}) {
    const employee = selectedEmployee
        ? DEMO_EMPLOYEES.find(e => e.id === selectedEmployee)
        : null;

    const totalPrice = selectedServices.reduce((sum, id) => {
        const service = DEMO_SERVICES.find(s => s.id === id);
        return sum + (service?.price || 0);
    }, 0);

    const totalDuration = selectedServices.reduce((sum, id) => {
        const service = DEMO_SERVICES.find(s => s.id === id);
        return sum + (service?.duration || 0);
    }, 0);

    const isComplete = customerName.length >= 2 && customerPhone.length >= 7;

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Resumen de la reserva */}
            <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 space-y-4">
                <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wide">Resumen de tu reserva</h3>

                {/* Fecha y hora */}
                <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-lg">
                        📅
                    </div>
                    <div>
                        <p className="text-white font-medium text-sm sm:text-base">
                            {selectedDate?.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" })}
                        </p>
                        <p className="text-sm text-indigo-400">{selectedTime}</p>
                    </div>
                </div>

                {/* Servicios */}
                <div className="space-y-2">
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Servicios ({selectedServices.length})</p>
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

                {/* Profesional */}
                <div className="pt-3 border-t border-white/10">
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Profesional</p>
                    <p className="text-sm text-white">
                        {employee ? `${employee.avatar} ${employee.name}` : "🎲 Cualquier profesional disponible"}
                    </p>
                </div>

                {/* Total */}
                <div className="pt-3 border-t border-white/10">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="font-medium text-white">Total</span>
                            <span className="text-xs text-slate-400 ml-2">({totalDuration} min)</span>
                        </div>
                        <span className="font-bold text-lg text-indigo-400">{formatCurrency(totalPrice)}</span>
                    </div>
                </div>
            </div>

            {/* Datos del cliente */}
            <div className="space-y-3">
                <h3 className="text-sm font-medium text-slate-400">Tus datos para confirmar</h3>
                <div>
                    <label className="block text-sm text-slate-300 mb-1">Tu nombre</label>
                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => onNameChange(e.target.value)}
                        placeholder="Ej: María García"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none text-sm sm:text-base"
                    />
                </div>
                <div>
                    <label className="block text-sm text-slate-300 mb-1">Tu WhatsApp</label>
                    <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => onPhoneChange(e.target.value)}
                        placeholder="Ej: 300 123 4567"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none text-sm sm:text-base"
                    />
                </div>
            </div>

            {/* Botón de confirmar */}
            <button
                onClick={onConfirm}
                disabled={!isComplete || isLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
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
}

// Componente de éxito
function SuccessStep({
    selectedServices,
    selectedDate,
    selectedTime,
}: {
    selectedServices: number[];
    selectedDate: Date | null;
    selectedTime: string | null;
}) {
    return (
        <div className="text-center py-6 sm:py-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center animate-scaleIn">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">¡Reserva confirmada!</h2>
            <p className="text-slate-400 mb-6 text-sm sm:text-base px-4">
                Te enviamos un mensaje de confirmación por WhatsApp con los detalles de tu cita.
            </p>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6 text-left max-w-sm mx-auto">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-3">Resumen</p>
                <p className="text-white font-medium mb-1 text-sm sm:text-base">
                    {selectedDate?.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" })}
                </p>
                <p className="text-indigo-400 text-sm mb-3">{selectedTime}</p>
                <p className="text-xs sm:text-sm text-slate-300">
                    {selectedServices.map(id => DEMO_SERVICES.find(s => s.id === id)?.name).join(", ")}
                </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-6 max-w-sm mx-auto">
                <p className="text-sm text-emerald-400">
                    💬 Recibirás un recordatorio por WhatsApp 24 horas antes de tu cita
                </p>
            </div>

            <Link
                href="/"
                className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:opacity-90 transition-all text-sm sm:text-base"
            >
                Volver al inicio
            </Link>
        </div>
    );
}

type Step = "services" | "booking" | "confirm" | "success";

export default function DemoPage() {
    const [step, setStep] = useState<Step>("services");
    const [selectedServices, setSelectedServices] = useState<number[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setStep("success");
    };

    const canProceedToBooking = selectedServices.length > 0;
    const canProceedToConfirm = selectedDate && selectedTime;

    const stepTitles: Record<Step, string> = {
        services: "Selecciona tus servicios",
        booking: "Elige fecha, hora y profesional",
        confirm: "Confirma tu reserva",
        success: "",
    };

    const stepDescriptions: Record<Step, string> = {
        services: "Puedes elegir uno o más servicios",
        booking: "Los horarios se actualizan según el profesional que elijas",
        confirm: "Revisa los detalles y confirma",
        success: "",
    };

    return (
        <div className="min-h-screen bg-slate-900">
            {/* Header */}
            <header className="border-b border-white/10 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-4 py-3 sm:py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-xl sm:text-2xl">
                            {DEMO_BUSINESS.logo}
                        </div>
                        <div>
                            <h1 className="font-bold text-white text-sm sm:text-base">{DEMO_BUSINESS.name}</h1>
                            <p className="text-xs sm:text-sm text-slate-400">{DEMO_BUSINESS.description}</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
                {/* Progress indicator - Solo 3 pasos ahora */}
                {step !== "success" && (
                    <div className="flex items-center gap-2 mb-6 sm:mb-8">
                        {(["services", "booking", "confirm"] as Step[]).map((s, i) => (
                            <React.Fragment key={s}>
                                <button
                                    onClick={() => {
                                        // Solo permitir ir hacia atrás
                                        const currentIdx = ["services", "booking", "confirm"].indexOf(step);
                                        if (i < currentIdx) setStep(s);
                                    }}
                                    disabled={i >= ["services", "booking", "confirm"].indexOf(step)}
                                    className={`
                                        w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all
                                        ${["services", "booking", "confirm"].indexOf(step) >= i
                                            ? "bg-indigo-500 text-white"
                                            : "bg-white/10 text-slate-500"
                                        }
                                        ${i < ["services", "booking", "confirm"].indexOf(step) ? "cursor-pointer hover:bg-indigo-600" : ""}
                                    `}
                                >
                                    {i + 1}
                                </button>
                                {i < 2 && (
                                    <div
                                        className={`
                                            flex-1 h-1 rounded
                                            ${["services", "booking", "confirm"].indexOf(step) > i
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

                {/* Step title */}
                {step !== "success" && (
                    <div className="mb-6">
                        <h2 className="text-lg sm:text-xl font-bold text-white mb-1">{stepTitles[step]}</h2>
                        <p className="text-slate-400 text-sm">{stepDescriptions[step]}</p>
                    </div>
                )}

                {/* Step content */}
                {step === "services" && (
                    <div className="space-y-4 sm:space-y-6">
                        <ServiceSelector
                            selectedServices={selectedServices}
                            onToggle={handleServiceToggle}
                        />

                        {selectedServices.length > 0 && (
                            <div className="pt-4 border-t border-white/10">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-slate-400 mb-4">
                                    <span>Total: <span className="text-white font-medium">{formatCurrency(totalPrice)}</span></span>
                                    <span>Duración aprox: <span className="text-white font-medium">{totalDuration} min</span></span>
                                </div>
                                <button
                                    onClick={() => setStep("booking")}
                                    disabled={!canProceedToBooking}
                                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:opacity-90 transition-all disabled:opacity-50 text-sm sm:text-base"
                                >
                                    Continuar →
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {step === "booking" && (
                    <div className="space-y-6">
                        <EmployeeAndTimeSelector
                            selectedEmployee={selectedEmployee}
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                            onEmployeeSelect={setSelectedEmployee}
                            onDateSelect={setSelectedDate}
                            onTimeSelect={(time) => setSelectedTime(time || null)}
                        />

                        <div className="flex gap-3 pt-4 border-t border-white/10">
                            <button
                                onClick={() => setStep("services")}
                                className="px-4 sm:px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all text-sm sm:text-base"
                            >
                                ← Volver
                            </button>
                            <button
                                onClick={() => setStep("confirm")}
                                disabled={!canProceedToConfirm}
                                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:opacity-90 transition-all disabled:opacity-50 text-sm sm:text-base"
                            >
                                Continuar →
                            </button>
                        </div>
                    </div>
                )}

                {step === "confirm" && (
                    <div>
                        <button
                            onClick={() => setStep("booking")}
                            className="text-sm text-slate-400 hover:text-white mb-4 flex items-center gap-1"
                        >
                            ← Volver
                        </button>
                        <ConfirmationStep
                            selectedServices={selectedServices}
                            selectedEmployee={selectedEmployee}
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                            customerName={customerName}
                            customerPhone={customerPhone}
                            onNameChange={setCustomerName}
                            onPhoneChange={setCustomerPhone}
                            onConfirm={handleConfirm}
                            isLoading={isLoading}
                        />
                    </div>
                )}

                {step === "success" && (
                    <SuccessStep
                        selectedServices={selectedServices}
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                    />
                )}
            </main>

            {/* Footer */}
            <footer className="border-t border-white/10 py-4">
                <div className="max-w-3xl mx-auto px-4">
                    <p className="text-center text-xs text-slate-500">
                        Funciona con <span className="text-indigo-400 font-medium">Reserbox</span>
                    </p>
                </div>
            </footer>

            <style jsx>{`
                @keyframes scaleIn {
                    0% { transform: scale(0); opacity: 0; }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); opacity: 1; }
                }
                .animate-scaleIn {
                    animation: scaleIn 0.4s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
