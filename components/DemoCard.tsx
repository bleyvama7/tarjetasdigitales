"use client";

import { QRCodeSVG } from "qrcode.react";
import {
  MessageCircle, Phone, Mail, MapPin, Star, Share2, Instagram,
  Linkedin, Globe, UserPlus, ArrowUpRight, Copy, Check,
} from "lucide-react";
import { useState } from "react";

const DEMO = {
  slug: "camila-restrepo",
  name: "Camila Restrepo",
  role: "Diseñadora de Marca Personal",
  city: "Bogotá, Colombia",
  bio: "Ayudo a emprendedores a construir marcas memorables. +8 años creando identidades que conectan.",
  phone: "573001234567", // sin + ni espacios
  email: "hola@camila.co",
  whatsappMessage: "¡Hola Camila! Vi tu tarjeta digital y quiero conocer tus servicios.",
  address: "Cra. 11 #93-45, Bogotá",
  coords: { lat: 4.6765, lng: -74.0482 },
  reviewUrl: "https://g.page/r/XXXXXXXXXXXX/review", // link de reseña de tu Google Business Profile
  socials: [
    { icon: Instagram, label: "Instagram", url: "https://instagram.com/camila" },
    { icon: Linkedin, label: "LinkedIn", url: "https://linkedin.com/in/camila" },
    { icon: Globe, label: "Portafolio", url: "https://camila.co" },
  ],
  gallery: [
    "linear-gradient(135deg,#a78bfa,#7c3aed)",
    "linear-gradient(135deg,#22d3ee,#0891b2)",
    "linear-gradient(135deg,#f472b6,#db2777)",
    "linear-gradient(135deg,#fbbf24,#f59e0b)",
  ],
};

export default function DemoCard() {
  const [copied, setCopied] = useState(false);

  const waHref = `https://wa.me/${DEMO.phone}?text=${encodeURIComponent(DEMO.whatsappMessage)}`;
  const waShareHref = `https://wa.me/?text=${encodeURIComponent(
    `Mira la tarjeta digital de ${DEMO.name}: https://tarjetasdigitales.lat/${DEMO.slug}`
  )}`;
  const wazeHref = `https://waze.com/ul?ll=${DEMO.coords.lat},${DEMO.coords.lng}&navigate=yes`;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${DEMO.coords.lat},${DEMO.coords.lng}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(`https://tarjetasdigitales.lat/${DEMO.slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="relative mx-auto w-full max-w-[360px]">
      {/* Glow detrás */}
      <div className="absolute -inset-6 -z-10 rounded-[48px] bg-gradient-to-br from-brand-500/40 via-accent/30 to-rose/30 blur-3xl animate-glow-pulse" />

      <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-panel/90 backdrop-blur-xl">
        {/* Portada */}
        <div className="h-24 w-full bg-gradient-to-br from-brand-500 via-brand-700 to-accent/70" />

        {/* Avatar */}
        <div className="-mt-10 flex flex-col items-center px-5">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-rose to-brand-400 ring-4 ring-panel flex items-center justify-center text-2xl font-display font-bold">
            CR
          </div>
          <h3 className="mt-3 font-display text-lg font-semibold">{DEMO.name}</h3>
          <p className="text-xs text-white/60">{DEMO.role}</p>
          <p className="mt-1 flex items-center gap-1 text-[11px] text-white/40">
            <MapPin className="h-3 w-3" /> {DEMO.city}
          </p>
          <p className="mt-3 text-center text-xs leading-relaxed text-white/70">
            {DEMO.bio}
          </p>
        </div>

        {/* Acciones principales */}
        <div className="mt-4 grid grid-cols-3 gap-2 px-4">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 rounded-2xl bg-emerald-500/15 py-2.5 text-[10px] font-medium text-emerald-300 transition hover:bg-emerald-500/25"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <a
            href={`tel:+${DEMO.phone}`}
            className="flex flex-col items-center gap-1 rounded-2xl bg-white/5 py-2.5 text-[10px] font-medium text-white/80 transition hover:bg-white/10"
          >
            <Phone className="h-4 w-4" /> Llamar
          </a>
          <a
            href={`mailto:${DEMO.email}`}
            className="flex flex-col items-center gap-1 rounded-2xl bg-white/5 py-2.5 text-[10px] font-medium text-white/80 transition hover:bg-white/10"
          >
            <Mail className="h-4 w-4" /> Correo
          </a>
        </div>

        {/* Redes sociales */}
        <div className="mt-3 flex items-center justify-center gap-2 px-4">
          {DEMO.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 transition hover:bg-brand-500 hover:text-white"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        {/* Reseña Google + Waze */}
        <div className="mt-4 space-y-2 px-4">
          <a
            href={DEMO.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-2xl bg-amber-400/10 px-3 py-2.5 text-xs font-medium text-amber-300 transition hover:bg-amber-400/20"
          >
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4" /> Déjame una reseña en Google
            </span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <div className="grid grid-cols-2 gap-2">
            <a
              href={wazeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-2xl bg-sky-400/10 py-2.5 text-[11px] font-medium text-sky-300 transition hover:bg-sky-400/20"
            >
              <MapPin className="h-3.5 w-3.5" /> Ir con Waze
            </a>
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-2xl bg-white/5 py-2.5 text-[11px] font-medium text-white/70 transition hover:bg-white/10"
            >
              <MapPin className="h-3.5 w-3.5" /> Google Maps
            </a>
          </div>
        </div>

        {/* Galería */}
        <div className="mt-4 grid grid-cols-4 gap-1 px-4">
          {DEMO.gallery.map((g, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl ring-1 ring-white/10"
              style={{ background: g }}
            />
          ))}
        </div>

        {/* Compartir + QR */}
        <div className="mt-4 flex items-center gap-3 border-t border-white/5 px-4 py-4">
          <div className="rounded-xl bg-white p-1.5">
            <QRCodeSVG value={`https://tarjetasdigitales.lat/${DEMO.slug}`} size={44} />
          </div>
          <div className="flex-1 space-y-1.5">
            <a
              href={waShareHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-500 py-2 text-[11px] font-semibold text-white transition hover:bg-emerald-600"
            >
              <Share2 className="h-3 w-3" /> Compartir por WhatsApp
            </a>
            <button
              onClick={copyLink}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-white/5 py-2 text-[11px] font-medium text-white/70 transition hover:bg-white/10"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? "¡Copiado!" : "Copiar enlace"}
            </button>
          </div>
        </div>

        {/* Guardar contacto */}
        <div className="border-t border-white/5 px-4 py-3">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-2.5 text-xs font-medium text-white/80 transition hover:bg-white/5">
            <UserPlus className="h-3.5 w-3.5" /> Guardar en contactos
          </button>
        </div>
      </div>
    </div>
  );
}