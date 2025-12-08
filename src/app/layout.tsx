import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reserbox - Software de Reservas y Agenda con WhatsApp",
  description: "Automatiza tu agenda, recibe reservas 24/7 y envía recordatorios automáticos por WhatsApp. Ideal para barberías, salones, spas y consultorios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${font.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
