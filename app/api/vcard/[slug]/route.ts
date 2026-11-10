import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { buildVCard } from "../../../../lib/vcard";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: card } = await supabase
    .from("cards")
    .select("slug, data")
    .eq("slug", params.slug)
    .eq("status", "published")
    .single();

  if (!card) return new NextResponse("No encontrada", { status: 404 });

  const d = card.data as Record<string, any>;

  const vcf = buildVCard({
    fullName: d.fullName || "Contacto",
    title: d.title,
    company: d.company,
    phone: d.phone || "",
    email: d.email,
    website: d.website,
    address: d.address,
    city: d.city,
    country: d.country || "Colombia",
    note: d.bio,
    photoUrl: d.avatarUrl,
    socials: d.socials,
  });

  return new NextResponse(vcf, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${card.slug}.vcf"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
