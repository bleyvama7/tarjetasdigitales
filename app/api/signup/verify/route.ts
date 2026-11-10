import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token");
  if (!token) return NextResponse.json({ ok: false, error: "Token faltante" });

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: p } = await admin
    .from("pending_signups")
    .select("*")
    .eq("token", token)
    .eq("consumed", false)
    .gt("expires_at", new Date().toISOString())
    .single();

  if (!p) return NextResponse.json({ ok: false, error: "Enlace inválido o vencido" });

  return NextResponse.json({ ok: true, pending: p });
}