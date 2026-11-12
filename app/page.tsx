import Image from "next/image";
import DemoCard from "../components/DemoCard";
import {
  Sparkles, Zap, ShieldCheck, Smartphone, QrCode, BarChart3,
  Star, MapPin, MessageCircle, ArrowRight, Check, Nfc,
  Palette, Globe, Users, Edit3,
} from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "WhatsApp sin guardar contacto",
    desc: "Tus clientes te escriben con un toque. No necesitan agregar tu número a su agenda.",
  },
  {
    icon: Star,
    title: "Reseña directa en Google",
    desc: "Un botón lleva al perfil de Google Business de tu cliente y deja la reseña sin fricción.",
  },
  {
    icon: MapPin,
    title: "Llega con Waze o Google Maps",
    desc: "Tu dirección se abre directo en la app de navegación que prefiera tu contacto.",
  },
  {
    icon: Palette,
    title: "Diseño 100% personalizable",
    desc: "Logo, foto, colores, galería, tipografía. Cada tarjeta se ve única y profesional.",
  },
  {
    icon: QrCode,
    title: "QR inteligente incluido",
    desc: "Imprime tu QR donde quieras. Siempre apunta a tu tarjeta actualizada.",
  },
  {
    icon: BarChart3,
    title: "Analíticas en tiempo real",
    desc: "Mira cuántas personas ven tu tarjeta y a qué enlace le dan clic.",
  },
];

const pricing = [
  {
    name: "Digital",
    price: "50.000",
    tagline: "Tu tarjeta, lista en minutos",
    features: [
      "Tarjeta digital publicada en minutos",
      "Editor visual con plantillas premium",
      "WhatsApp, redes, reseña Google, Waze",
      "QR personalizado descargable",
      "Analíticas de vistas y clics",
      "Vigencia de 1 año, renovable",
    ],
    cta: "Comprar tarjeta digital",
    highlight: false,
  },
  {
    name: "Física + NFC",
    price: "150.000",
    tagline: "Deja una impresión que se recuerda",
    features: [
      "Todo lo del plan Digital, incluido",
      "Tarjeta física premium con chip NFC",
      "Acércala al celular y comparte al instante",
      "Envío a todo Colombia incluido",
      "Diseño impreso con tu marca",
      "Reemplazo de tarjeta por pérdida*",
    ],
    cta: "Pedir tarjeta NFC",
    highlight: true,
  },
];

const faqs = [
  {
    q: "¿Cuánto tarda mi tarjeta en estar lista?",
    a: "Minutos. Al confirmar el pago recibes un correo con acceso al editor. Eliges plantilla, pones tu información y publicas. No necesitas saber nada técnico.",
  },
  {
    q: "¿Qué pasa cuando vence el año?",
    a: "Te avisamos antes para renovar. Si renuevas, todo sigue funcionando. Si no, tu tarjeta queda en modo pausa sin perder tu información.",
  },
  {
    q: "¿La tarjeta física NFC funciona con cualquier celular?",
    a: "Con la gran mayoría de Android (2018+) y todos los iPhone desde el 7. Al acercarla, se abre tu tarjeta digital automáticamente.",
  },
  {
    q: "¿Puedo cambiar mi información después?",
    a: "Sí, cuando quieras y sin costo. La tarjeta física apunta a tu perfil digital, así que nunca se queda obsoleta.",
  },
  {
    q: "¿En cuánto tiempo llega la tarjeta física?",
    a: "En Colombia, entre 3 y 7 días hábiles después de tu compra. Recibes número de guía por correo.",
  },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* NAV */}
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-ink/70 backdrop-blur-xl">
        <div className="section flex items-center justify-between py-4">
          <a href="#" className="flex items-center gap-2 font-display font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent">
              <Sparkles className="h-4 w-4" />
            </span>
            Tarjetas Digitales
          </a>
          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <a href="#beneficios" className="hover:text-white">Beneficios</a>
            <a href="#demo" className="hover:text-white">Demo</a>
            <a href="#precios" className="hover:text-white">Precios</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </nav>
          <a href="#precios" className="btn-primary text-xs">
            Crear mi tarjeta
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-32 md:pt-40">
        <div className="mesh-bg absolute inset-0 -z-10 opacity-80" />
        <div className="section grid gap-14 pb-20 md:grid-cols-2 md:items-center md:pb-32">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Nuevo · Ahora con IA para crear tu bio
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl">
              Tu presentación <span className="text-gradient">profesional</span>, lista en minutos.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/60 md:text-lg">
              Crea tu tarjeta de presentación digital con WhatsApp, redes, reseñas de Google,
              Waze y QR. Compártela por WhatsApp al instante. <span className="text-white/90">Editable para siempre.</span>
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#precios" className="btn-primary">
                Comprar mi tarjeta <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#demo" className="btn-ghost">
                Ver demo en vivo
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-white/50">
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400" /> Pago único anual
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400" /> Sin apps
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400" /> Funciona en iOS y Android
              </span>
            </div>
          </div>

          <div className="animate-float">
            <DemoCard />
          </div>
        </div>
      </section>

      {/* STATS / PRUEBA SOCIAL */}
      <section className="border-y border-white/5 bg-panel/50">
        <div className="section grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {[
            { k: "+1.200", v: "Tarjetas creadas" },
            { k: "12 s", v: "Promedio de carga" },
            { k: "100%", v: "Editables" },
            { k: "4.9★", v: "Satisfacción" },
          ].map((s) => (
            <div key={s.v} className="text-center">
              <div className="font-display text-2xl font-bold text-gradient">{s.k}</div>
              <div className="text-xs text-white/50">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFICIOS */}
      <section id="beneficios" className="section py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">Todo lo que necesitas</p>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            Una tarjeta que <span className="text-gradient">trabaja por ti</span> 24/7
          </h2>
          <p className="mt-3 text-white/60">
            No es solo un enlace: es tu mejor vendedor, siempre actualizado y listo para compartir.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-white/8 bg-panel/60 p-6 transition hover:border-brand-400/40 hover:bg-panel"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/20 to-accent/20 text-brand-300 transition group-hover:from-brand-500 group-hover:to-accent group-hover:text-white">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" className="relative py-24">
        <div className="mesh-bg absolute inset-0 -z-10 opacity-40" />
        <div className="section grid gap-14 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">Demo interactiva</p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Así se ve tu <span className="text-gradient">nueva tarjeta</span>
            </h2>
            <p className="mt-4 text-white/60">
              Todos los botones funcionan. Pulsa WhatsApp, abre la ruta en Waze, deja una reseña en Google
              o comparte por WhatsApp —sin que tengas que guardar el número en tu agenda.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/70">
              {[
                "WhatsApp directo sin guardar contacto",
                "Reseña de Google a un toque",
                "Navegación abierta en Waze o Maps",
                "Galería visual de tus proyectos",
                "QR descargable para imprimir donde quieras",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="animate-float">
            <DemoCard />
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="section py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">3 pasos</p>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            De la compra a tu tarjeta publicada, <span className="text-gradient">hoy mismo</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { n: "01", icon: Zap, t: "Compra tu plan", d: "Pago seguro con PSE, Nequi, tarjeta o Bancolombia." },
            { n: "02", icon: Edit3, t: "Personaliza", d: "Elige plantilla, sube tu foto y logo, agrega tus enlaces. La IA te ayuda con la bio." },
            { n: "03", icon: Globe, t: "Comparte y publica", d: "Tu URL única y QR están listos. Compártela por WhatsApp con un clic." },
          ].map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-white/8 bg-panel/60 p-8">
              <div className="absolute right-6 top-6 font-display text-4xl font-bold text-white/5">{s.n}</div>
              <s.icon className="mb-4 h-6 w-6 text-accent" />
              <h3 className="font-display text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-white/60">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" className="relative py-24">
        <div className="mesh-bg absolute inset-0 -z-10 opacity-50" />
        <div className="section">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">Precios claros</p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Un pago, <span className="text-gradient">un año entero</span>
            </h2>
            <p className="mt-3 text-white/60">Sin suscripciones mensuales. Sin sorpresas. Renueva cuando quieras.</p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
            {pricing.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-3xl border p-8 transition ${
                  p.highlight
                    ? "border-brand-400/50 bg-gradient-to-b from-brand-500/10 to-panel card-shadow"
                    : "border-white/10 bg-panel/60 hover:border-white/20"
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-8 rounded-full bg-gradient-to-r from-brand-500 to-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                    Recomendado
                  </span>
                )}
                <div className="flex items-center gap-2">
                  {p.highlight ? <Nfc className="h-4 w-4 text-brand-300" /> : <Smartphone className="h-4 w-4 text-white/60" />}
                  <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                </div>
                <p className="mt-1 text-xs text-white/50">{p.tagline}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-xs text-white/50">$</span>
                  <span className="font-display text-4xl font-bold">{p.price}</span>
                  <span className="text-xs text-white/50">COP / año</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-sm text-white/70">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://checkout.bold.co/tu-link-${p.name.toLowerCase()}`}
                  className={`mt-8 block w-full rounded-full py-3 text-center text-sm font-semibold transition ${
                    p.highlight ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  {p.cta}
                </a>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-white/40">
            * Reemplazo de tarjeta física por pérdida aplica dentro del primer año, con costo de envío.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">Dudas frecuentes</p>
            <h2 className="mt-3 font-display text-3xl font-bold">
              Resolvemos lo que <span className="text-gradient">te preocupa</span>
            </h2>
            <p className="mt-4 text-sm text-white/60">
              ¿Tienes otra duda? Escríbenos por WhatsApp y te respondemos en minutos.
            </p>
            <a
              href="https://wa.me/573000000000?text=Hola,%20quiero%20info%20sobre%20las%20tarjetas%20digitales"
              className="btn-ghost mt-6 text-xs"
            >
              <MessageCircle className="h-4 w-4" /> Escribir por WhatsApp
            </a>
          </div>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-white/8 bg-panel/60 p-5 transition hover:border-white/15"
              >
                <summary className="flex cursor-pointer items-center justify-between font-medium">
                  {f.q}
                  <span className="ml-4 text-white/40 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-500/20 via-panel to-accent/10 p-12 text-center md:p-20">
          <div className="mesh-bg absolute inset-0 -z-10 opacity-60" />
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold md:text-5xl">
            Deja de repartir tarjetas que se <span className="text-gradient">pierden</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Crea tu tarjeta digital hoy. Se ve profesional, se comparte en un toque y nunca queda desactualizada.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#precios" className="btn-primary">
              Empezar ahora <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#demo" className="btn-ghost">Ver otra vez la demo</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12">
        <div className="section flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2 font-display font-bold">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            Tarjetas Digitales
          </div>
          <nav className="flex flex-wrap items-center gap-6 text-xs text-white/50">
            <a href="#">Términos</a>
            <a href="#">Privacidad</a>
            <a href="#">Tratamiento de datos</a>
            <a href="https://wa.me/573000000000">Contacto</a>
          </nav>
          <p className="text-xs text-white/40">© {new Date().getFullYear()} · tarjetasdigitales.lat</p>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/573136999315?text=Hola,%20quiero%20mi%20tarjeta%20digital"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 shadow-xl shadow-emerald-500/40 transition hover:scale-105"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </a>
    </main>
  );
}
