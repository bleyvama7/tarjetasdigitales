import { createClient } from "../../lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Verificar que eres admin
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") redirect("/dashboard");

  // Traer todos los usuarios y tarjetas
  const { data: clients } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
  const { data: cards } = await supabase.from("cards").select("*").order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-ink p-8 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-bold text-gradient">Panel de Administración</h1>
          <Link href="/dashboard" className="btn-ghost text-xs">Ir a mi Dashboard</Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Lista de Clientes */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Clientes Registrados ({clients?.length || 0})</h2>
            <div className="space-y-3">
              {clients?.map((client) => (
                <div key={client.id} className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                  <div>
                    <p className="text-sm font-medium">{client.full_name || "Sin nombre"}</p>
                    <p className="text-xs text-white/50">{client.email}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded-full ${client.role === 'admin' ? 'bg-brand-500/20 text-brand-300' : 'bg-white/10 text-white/50'}`}>
                    {client.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Lista de Tarjetas */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Tarjetas Creadas ({cards?.length || 0})</h2>
            <div className="space-y-3">
              {cards?.map((card) => (
                <div key={card.id} className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                  <div>
                    <p className="text-sm font-medium">/{card.slug}</p>
                    <p className="text-xs text-white/50">Plan: {card.plan}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded-full ${card.status === 'published' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                    {card.status}
                  </span>
                </div>
              ))}
              {cards?.length === 0 && <p className="text-sm text-white/40">Aún no hay tarjetas.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
