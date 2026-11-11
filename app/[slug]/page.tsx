import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { PublicCard } from "../../components/PublicCard";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

// Función auxiliar para crear el cliente SOLO cuando se necesita
function getSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function generateMetadata({
  params,
}: { params: { slug: string } }): Promise<Metadata> {
  const supabase = getSupabaseClient(); // Se crea aquí dentro
  const { data: card } = await supabase
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
  const supabase = getSupabaseClient(); // Se crea aquí dentro
  const { data: card } = await supabase
    .from("cards")
    .select("slug, data")
    .eq("slug", params.slug)
    .eq("status", "published")
    .maybeSingle();

  if (!card) notFound();

  return <PublicCard slug={card.slug} data={card.data as any} />;
}
