"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { IndustriesSection } from "@/components/landing/IndustriesSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { TrustSection } from "@/components/landing/TrustSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { CTASection } from "@/components/landing/CTASection";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-900">
            <Navbar />
            <main>
                <HeroSection />
                <FeaturesSection />
                <IndustriesSection />
                <PricingSection />
                <TestimonialsSection />
                <TrustSection />
                <FAQSection />
                <CTASection />
            </main>
            <Footer />
        </div>
    );
}
