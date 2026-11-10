"use client";

import { QRCodeSVG } from "qrcode.react";
import {
  MessageCircle, Phone, Mail, MapPin, Star, Share2, UserPlus,
  Instagram, Linkedin, Globe, ArrowUpRight, Download,
} from "lucide-react";

type Props = { slug: string; data: Record<string, any> };

export function PublicCard({ slug, data }: Props) {
  const d = data;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const publicUrl = `${siteUrl}/${slug}`;
  const vcardUrl = `/api/vcard/${slug}`;

  const wa = d.phone
    ? `https://wa.me/${d.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
        `¡Hola ${d.fullName?.split(" ")[0] || ""}! Vi tu tarjeta digital.`
      )}`
    : null;

  const waze = d.coords
    ? `https://waze.com/ul?ll=${d.coords.lat},${d.coords.lng}&navigate=yes`
    : null;
  const maps = d.coords
    ? `https://www.google.com/maps/search/?api=1&query=${d.coords.lat},${d.coords.lng}`
    : null;

  const share = `https://wa.me/?text=${encodeURIComponent(`Mira mi tarjeta: ${publicUrl}`)}`;

  return (
    <main className="min-h-screen bg-ink py-8">
      <div className="mx-auto max-w-md px-4">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-panel">
          <div className="h-28 bg-gradient-to-br from-brand-500 to-accent" />
          <div className="-mt-12 flex flex-col items-center px-5">
            {d.avatarUrl ? (
              <img
                src={d.avatarUrl}
                alt={d.fullName}
                className="h-24 w-24 rounded-full object-cover ring-4 ring-panel"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-rose to-brand-400 text-2xl font-bold ring-4 ring-panel">
                {(d.fullName || "?").slice(0, 2).toUpperCase()}
              </div>
            )}
            <h1 className="mt-3 font-display text-xl font-semibold">{d.fullName}</h1>
            {d.title && <p className="text-xs text-white/60">{d.title}</p>}
            {d.company && <p className="text-xs text-white/40">{d.company}</p>}
            {d.city && (
              <p className="mt-1 flex items-center gap-1 text-[11px] text-white/40">
                <MapPin className="h-3 w-3" /> {d.city}
              </p>
            )}
            {d.bio && (
              <p className="mt-3 text-center text-xs leading-relaxed text-white/70">
                {d.bio}
              </p>
            )}
          </div>

          {/* Acciones */}
          <div className="mt-5 grid grid-cols-3 gap-2 px-4">
            {wa && (
              <a href={wa} target="_blank" className="flex flex-col items-center gap-1 rounded-2xl bg-emerald-500/15 py-3 text-[10px] font-medium text-emerald-300">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            )}
            {d.phone && (
              <a href={`tel:${d.phone}`} className="flex flex-col items-center gap-1 rounded-2xl bg-white/5 py-3 text-[10px] font-medium text-white/80">
                <Phone className="h-4 w-4" /> Llamar
              </a>
            )}
            {d.email && (
              <a href={`mailto:${d.email}`} className="flex flex-col items-center gap-1 rounded-2xl bg-white/5 py-3 text-[10px] font-medium text-white/80">
                <Mail className="h-4 w-4" /> Correo
              </a>
            )}
          </div>

          {/* Redes */}
          {d.socials?.length > 0 && (
            <div className="mt-3 flex justify-center gap-2 px-4">
              {d.socials.map((s: any, i: number) => (
                <a key={i} href={s.url} target="_blank" aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 hover:bg-brand-500 hover:text-white">
                  {s.label?.toLowerCase().includes("insta") ? <Instagram className="h-4 w-4" /> :
                   s.label?.toLowerCase().includes("linked") ? <Linkedin className="h-4 w-4" /> :
                   <Globe className="h-4 w-4" />}
                </a>
              ))}
            </div>
          )}

          {/* Reseña Google + Waze */}
          <div className="mt-4 space-y-2 px-4">
            {d.reviewUrl && (
              <a href={d.reviewUrl} target="_blank"
                className="flex items-center justify-between rounded-2xl bg-amber-400/10 px-3 py-2.5 text-xs font-medium text-amber-300">
                <span className="flex items-center gap-2"><Star className="h-4 w-4" /> Déjame una reseña</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {(waze || maps) && (
              <div className="grid grid-cols-2 gap-2">
                {waze && (
                  <a href={waze} target="_blank" className="flex items-center justify-center gap-1.5 rounded-2xl bg-sky-400/10 py-2.5 text-[11px] font-medium text-sky-300">
                    <MapPin className="h-3.5 w-3.5" /> Waze
                  </a>
                )}
                {maps && (
                  <a href={maps} target="_blank" className="flex items-center justify-center gap-1.5 rounded-2xl bg-white/5 py-2.5 text-[11px] font-medium text-white/70">
                    <MapPin className="h-3.5 w-3.5" /> Maps
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Galería */}
          {d.gallery?.length > 0 && (
            <div className="mt-4 grid grid-cols-4 gap-1 px-4">
              {d.gallery.map((g: string, i: number) => (
                <img key={i} src={g} alt="" className="aspect-square rounded-xl object-cover ring-1 ring-white/10" />
              ))}
            </div>
          )}

          {/* Compartir + QR */}
          <div className="mt-4 flex items-center gap-3 border-t border-white/5 px-4 py-4">
            <div className="rounded-xl bg-white p-1.5">
              <QRCodeSVG value={publicUrl} size={44} />
            </div>
            <div className="flex-1 space-y-1.5">
              <a href={share} target="_blank" className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-500 py-2 text-[11px] font-semibold text-white">
                <Share2 className="h-3 w-3" /> Compartir por WhatsApp
              </a>
              <a href={vcardUrl} className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-white/5 py-2 text-[11px] font-medium text-white/70">
                <Download className="h-3 w-3" /> Descargar QR
              </a>
            </div>
          </div>

{/* Guardar contacto */}
<div className="border-t border-white/5 px-4 py-3">
  <a
    href="/api/vcard/camila-restrepo"
    download="camila-restrepo.vcf"
    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent py-2.5 text-xs font-semibold text-white transition hover:opacity-90"
  >
    <UserPlus className="h-3.5 w-3.5" /> Guardar en contactos
  </a>
</div>
}