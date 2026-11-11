import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Tarjetas Digitales · Tu presentación profesional, lista en minutos",
  description:
    "Crea tu tarjeta de presentación digital con WhatsApp, redes sociales, reseñas de Google, ubicación Waze y galería. Digital o física con NFC. Desde $50.000.",
  metadataBase: new URL("https://tarjetasdigitales.lat"),
  openGraph: {
    title: "Tarjetas Digitales · Presentación profesional en minutos",
    description:
      "Tu perfil profesional con todos tus enlaces, reseñas y QR. Editable para siempre. Pago único anual.",
    url: "https://tarjetasdigitales.lat",
    siteName: "Tarjetas Digitales",
    locale: "es_CO",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={`${inter.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
