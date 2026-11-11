import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { PublicCard } from "../../components/PublicCard";
import type { Metadata } from "next";

// Esta línea evita que Vercel intente construir la página si la base de datos está vacía
export const dynamic = "force-dynamic";

const anon = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function generateMetadata({
  params,
}: { params: { slug: string } }): Promise<Metadata> {
  const { data: card } = await anon
    .from("cards")
    .select("data")
    .eq("slug", params.slug)
    .eq("status", "published")
    .maybeSingle();

  if (!card) return { title: "Tarjeta no encontrada" };

  const d = card.data as Record<string, any>;
  return {
    title: `${d.fullName || "Tarjeta"} · Tarjetas Digitales`,
    description: d.bio || `Tarjeta de presentación de ${d.fullName}`,
    openGraph: {
      title: d.fullName,
      description: d.bio,
      images: d.avatarUrl ? [d.avatarUrl] : undefined,
    },
  };
}

export default async function CardPage({ params }: { params: { slug: string } }) {
  const { data: card } = await anon
    .from("cards")
    .select("slug, data")
    .eq("slug", params.slug)
    .eq("status", "published")
    .maybeSingle();

  if (!card) notFound();

  return <PublicCard slug={card.slug} data={card.data as any} />;
}
