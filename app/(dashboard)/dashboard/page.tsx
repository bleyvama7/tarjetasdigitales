import { createClient } from "../../../lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { Edit3, ExternalLink, Share2, Calendar, Sparkles } from "lucide-react";

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: card } = await supabase
    .from("cards")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (!card) {
    return (
      <div className="section py-20 text-center">
        <p className="text-white/60">Aún no tienes una tarjeta. Escríbenos por WhatsApp.</p>
      </div>
    );
  }

  const publicUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${card.slug}`;
  const daysLeft = Math.ceil(
    (new Date(card.expires_at).getTime() - Date.now()) / 86400000
  );

  return (
    <div className="section py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs text-white/50">Hola de nuevo</p>
          <h1 className="font-display text-2xl font-bold">
            {card.data?.fullName || "Tu tarjeta"}
          </h1>
        </div>
        <Link href={`/editor/${card.id}`} className="btn-primary text-xs">
          <Edit3 className="h-3.5 w-3.5" /> Editar tarjeta
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_320px]">
        {/* Card de estado */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-panel/60 p-6">
            <div className="flex items-start justify-between">
              <div>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  card.status === "published"
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "bg-amber-500/15 text-amber-300"
                }`}>
                  {card.status === "published" ? "Publicada" : "Borrador"}
                </span>
                <p className="mt-2 font-mono text-xs text-white/50">{publicUrl}</p>
              </div>
              {card.status === "published" && (
                <Link href={`/${card.slug}`} target="_blank" className="btn-ghost text-xs">
                  <ExternalLink className="h-3.5 w-3.5" /> Ver
                </Link>
              )}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-white/5 py-3">
                <div className="font-display text-xl font-bold text-gradient">0</div>
                <div className="text-[10px] text-white/50">Vistas</div>
              </div>
              <div className="rounded-xl bg-white/5 py-3">
                <div className="font-display text-xl font-bold text-gradient">0</div>
                <div className="text-[10px] text-white/50">Clics</div>
              </div>
              <div className="rounded-xl bg-white/5 py-3">
                <div className="font-display text-xl font-bold text-gradient">{daysLeft}</div>
                <div className="text-[10px] text-white/50">Días activos</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-panel/60 p-6">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Calendar className="h-4 w-4 text-accent" /> Renovación
            </h3>
            <p className="text-sm text-white/60">
              Tu plan vence el{" "}
              <span className="font-medium text-white">
                {new Date(card.expires_at).toLocaleDateString("es-CO", {
                  day: "numeric", month: "long", year: "numeric",
                })}
              </span>
              . Te avisaremos 30 días antes.
            </p>
          </div>
        </div>

        {/* QR + compartir */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-panel/60 p-6 text-center">
            <p className="mb-3 text-xs text-white/50">Tu código QR único</p>
            <div className="mx-auto w-fit rounded-2xl bg-white p-4">
              <QRCodeSVG value={publicUrl} size={160} />
            </div>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `Mira mi tarjeta digital: ${publicUrl}`
              )}`}
              target="_blank"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 py-2.5 text-xs font-semibold"
            >
              <Share2 className="h-3.5 w-3.5" /> Compartir por WhatsApp
            </a>
          </div>

          <div className="rounded-2xl border border-brand-400/30 bg-gradient-to-br from-brand-500/10 to-accent/5 p-6">
            <Sparkles className="mb-2 h-5 w-5 text-brand-300" />
            <p className="text-sm font-medium">¿Necesitas ayuda con tu diseño?</p>
            <p className="mt-1 text-xs text-white/60">
              Escríbenos y te ayudamos a pulir tu tarjeta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
