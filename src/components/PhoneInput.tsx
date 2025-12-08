"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";

// ============================================================================
// COUNTRY DATA
// ============================================================================

export interface Country {
    code: string;      // ISO code (CO, US, MX, etc.)
    name: string;      // Display name
    dialCode: string;  // Phone prefix (57, 1, 52, etc.)
    flag: string;      // Emoji flag
}

// Latin American countries + common ones
export const COUNTRIES: Country[] = [
    { code: "CO", name: "Colombia", dialCode: "57", flag: "🇨🇴" },
    { code: "MX", name: "México", dialCode: "52", flag: "🇲🇽" },
    { code: "AR", name: "Argentina", dialCode: "54", flag: "🇦🇷" },
    { code: "CL", name: "Chile", dialCode: "56", flag: "🇨🇱" },
    { code: "PE", name: "Perú", dialCode: "51", flag: "🇵🇪" },
    { code: "EC", name: "Ecuador", dialCode: "593", flag: "🇪🇨" },
    { code: "VE", name: "Venezuela", dialCode: "58", flag: "🇻🇪" },
    { code: "PA", name: "Panamá", dialCode: "507", flag: "🇵🇦" },
    { code: "CR", name: "Costa Rica", dialCode: "506", flag: "🇨🇷" },
    { code: "GT", name: "Guatemala", dialCode: "502", flag: "🇬🇹" },
    { code: "HN", name: "Honduras", dialCode: "504", flag: "🇭🇳" },
    { code: "SV", name: "El Salvador", dialCode: "503", flag: "🇸🇻" },
    { code: "NI", name: "Nicaragua", dialCode: "505", flag: "🇳🇮" },
    { code: "BO", name: "Bolivia", dialCode: "591", flag: "🇧🇴" },
    { code: "PY", name: "Paraguay", dialCode: "595", flag: "🇵🇾" },
    { code: "UY", name: "Uruguay", dialCode: "598", flag: "🇺🇾" },
    { code: "DO", name: "Rep. Dominicana", dialCode: "1809", flag: "🇩🇴" },
    { code: "PR", name: "Puerto Rico", dialCode: "1787", flag: "🇵🇷" },
    { code: "CU", name: "Cuba", dialCode: "53", flag: "🇨🇺" },
    { code: "BR", name: "Brasil", dialCode: "55", flag: "🇧🇷" },
    { code: "US", name: "Estados Unidos", dialCode: "1", flag: "🇺🇸" },
    { code: "ES", name: "España", dialCode: "34", flag: "🇪🇸" },
];

// ============================================================================
// UTILITIES
// ============================================================================

function formatPhoneDisplay(phone: string): string {
    const digits = phone.replace(/\D/g, "");
    if (!digits) return "";
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    if (digits.length <= 10) return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`;
}

// ============================================================================
// PHONE INPUT COMPONENT
// ============================================================================

export interface PhoneInputProps {
    value: string;
    onChange: (fullNumber: string) => void;
    defaultCountry?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    id?: string;
    name?: string;
    required?: boolean;
    size?: "sm" | "md" | "lg";
    error?: string;
}

export function PhoneInput({
    value,
    onChange,
    defaultCountry = "CO",
    placeholder = "300 123 4567",
    disabled = false,
    className = "",
    id,
    name,
    required,
    size = "md",
    error,
}: PhoneInputProps) {
    // Find default country
    const defaultCountryObj = COUNTRIES.find(c => c.code === defaultCountry) || COUNTRIES[0];

    const [selectedCountry, setSelectedCountry] = useState<Country>(defaultCountryObj);
    const [localNumber, setLocalNumber] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    const filteredCountries = useMemo(() => {
        if (!search.trim()) return COUNTRIES;
        const s = search.toLowerCase();
        return COUNTRIES.filter(
            c => c.name.toLowerCase().includes(s) || c.dialCode.includes(s) || c.code.toLowerCase().includes(s)
        );
    }, [search]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
                setSearch("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Focus search on open
    useEffect(() => {
        if (isOpen && searchRef.current) {
            searchRef.current.focus();
        }
    }, [isOpen]);

    const handleCountrySelect = useCallback((country: Country) => {
        setSelectedCountry(country);
        setIsOpen(false);
        setSearch("");
        // Update parent with new country code
        const fullNumber = localNumber ? `${country.dialCode}${localNumber}` : "";
        onChange(fullNumber);
        inputRef.current?.focus();
    }, [localNumber, onChange]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
        setLocalNumber(digits);
        // Update parent with full number
        const fullNumber = digits ? `${selectedCountry.dialCode}${digits}` : "";
        onChange(fullNumber);
    }, [selectedCountry.dialCode, onChange]);

    // Size classes
    const sizeClasses = {
        sm: { button: "px-2 py-1.5 text-xs", input: "px-2 py-1.5 text-xs", flag: "text-sm" },
        md: { button: "px-3 py-2.5 text-sm", input: "px-3 py-2.5 text-sm", flag: "text-base" },
        lg: { button: "px-4 py-3 text-base", input: "px-4 py-3 text-base", flag: "text-lg" },
    };

    const sizes = sizeClasses[size];
    const hasError = !!error;

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            <div
                className={`
                    flex items-stretch rounded-xl overflow-hidden
                    border transition-all duration-200
                    ${hasError
                        ? "border-rose-500/50 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/20"
                        : "border-white/10 focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20"
                    }
                    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                `}
            >
                {/* Country selector button */}
                <button
                    type="button"
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    disabled={disabled}
                    className={`
                        flex items-center gap-1.5 
                        bg-white/5 hover:bg-white/10 
                        border-r border-white/10
                        transition-colors
                        focus:outline-none focus:bg-white/10
                        ${sizes.button}
                    `}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                >
                    <span className={sizes.flag}>{selectedCountry.flag}</span>
                    <span className="text-slate-300 font-medium">+{selectedCountry.dialCode}</span>
                    <svg
                        className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Phone number input */}
                <input
                    ref={inputRef}
                    type="tel"
                    id={id}
                    name={name}
                    value={formatPhoneDisplay(localNumber)}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    className={`
                        flex-1 min-w-0
                        bg-white/5 text-white
                        placeholder:text-slate-500
                        focus:outline-none
                        ${sizes.input}
                    `}
                />
            </div>

            {/* Error message */}
            {error && (
                <p className="mt-1 text-xs text-rose-400">{error}</p>
            )}

            {/* Dropdown */}
            {isOpen && (
                <div
                    className="
                        absolute top-full left-0 right-0 mt-1 z-50
                        max-h-64 overflow-hidden
                        bg-slate-800/95 backdrop-blur-sm
                        border border-white/10 rounded-xl shadow-2xl shadow-black/50
                    "
                >
                    {/* Search */}
                    <div className="p-2 border-b border-white/10">
                        <div className="relative">
                            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                ref={searchRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar país..."
                                className="
                                    w-full pl-8 pr-3 py-2
                                    bg-white/5 border border-white/10 rounded-lg
                                    text-sm text-white placeholder:text-slate-500
                                    focus:outline-none focus:border-indigo-500/50
                                "
                            />
                        </div>
                    </div>

                    {/* Country list */}
                    <ul className="max-h-48 overflow-y-auto py-1" role="listbox">
                        {filteredCountries.map((country) => (
                            <li key={country.code}>
                                <button
                                    type="button"
                                    onClick={() => handleCountrySelect(country)}
                                    className={`
                                        w-full flex items-center gap-3 px-3 py-2.5 text-left
                                        hover:bg-white/10 transition-colors
                                        ${selectedCountry.code === country.code ? "bg-indigo-500/20" : ""}
                                    `}
                                    role="option"
                                    aria-selected={selectedCountry.code === country.code}
                                >
                                    <span className="text-lg flex-shrink-0">{country.flag}</span>
                                    <span className="flex-1 text-sm text-white truncate">{country.name}</span>
                                    <span className="text-xs text-slate-400 font-mono">+{country.dialCode}</span>
                                </button>
                            </li>
                        ))}
                        {filteredCountries.length === 0 && (
                            <li className="px-3 py-4 text-center text-sm text-slate-500">
                                No se encontraron países
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default PhoneInput;
