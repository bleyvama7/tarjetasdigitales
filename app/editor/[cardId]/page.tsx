"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase/client";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

export default function EditorPage({ params }: { params: { cardId: string } }) {
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    company: "",
    bio: "",
    phone: "",
    email: "",
    city: "",
    reviewUrl: ""
  });

  // 1. Cargar los datos actuales de la tarjeta
  useEffect(() => {
    async function loadCard() {
      const { data, error } = await supabase
        .from("cards")
        .select("data, slug")
        .eq("id", params.cardId)
        .single();

      if (data) {
        setFormData({
          fullName: data.data.fullName || "",
          title: data.data.title || "",
          company: data.data.company || "",
          bio: data.data.bio || "",
          phone: data.data.phone || "",
          email: data.data.email || "",
          city: data.data.city || "",
          reviewUrl: data.data.reviewUrl || ""
        });
      }
      setLoading(false);
    }
    loadCard();
  }, [params.cardId, supabase]);

  // 2. Guardar los cambios
  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("cards")
      .update({ data: formData })
      .eq("id", params.cardId);

    if (error) {
      alert("Error al guardar: " + error.message);
    } else {
      alert("¡Tarjeta actualizada con éxito!");
      router.push("/dashboard");
    }
    setSaving(false);
  };

  if (loading) return <div className="min-h-screen bg-ink flex items-center justify-center"><Loader2 className="animate-spin text-white" /></div>;

  return (
    <div className="min-h-screen bg-ink p-6 text-white">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-display font-bold">Editar mi Tarjeta</h1>
        </div>

        <div className="glass rounded-2xl p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/60 mb-1 block">Nombre Completo</label>
              <input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full bg-panel border border-white/10 rounded-xl p-3 text-sm focus:border-brand-400 outline-none" />
            </div>
            <div>
              <label className="text-xs text-white/60 mb-1 block">Cargo / Profesión</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-panel border border-white/10 rounded-xl p-3 text-sm focus:border-brand-400 outline-none" />
            </div>
          </div>

          <div>
            <label className="text-xs text-white/60 mb-1 block">Biografía corta</label>
            <textarea rows={3} value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} className="w-full bg-panel border border-white/10 rounded-xl p-3 text-sm focus:border-brand-400 outline-none resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/60 mb-1 block">WhatsApp (Ej: 573136999315)</label>
              <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-panel border border-white/10 rounded-xl p-3 text-sm focus:border-brand-400 outline-none" />
            </div>
            <div>
              <label className="text-xs text-white/60 mb-1 block">Correo Electrónico</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-panel border border-white/10 rounded-xl p-3 text-sm focus:border-brand-400 outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/60 mb-1 block">Ciudad</label>
              <input type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full bg-panel border border-white/10 rounded-xl p-3 text-sm focus:border-brand-400 outline-none" />
            </div>
            <div>
              <label className="text-xs text-white/60 mb-1 block">Link de Reseña Google</label>
              <input type="url" value={formData.reviewUrl} onChange={(e) => setFormData({...formData, reviewUrl: e.target.value})} className="w-full bg-panel border border-white/10 rounded-xl p-3 text-sm focus:border-brand-400 outline-none" />
            </div>
          </div>

          <button onClick={handleSave} disabled={saving} className="btn-primary w-full mt-4 flex items-center justify-center gap-2">
            {saving ? <Loader2 className="animate-spin h-4 w-4" /> : <Save className="h-4 w-4" />}
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>
    </div>
  );
}
