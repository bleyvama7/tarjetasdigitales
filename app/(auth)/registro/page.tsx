"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase/client";
import { Sparkles, Mail, Lock, User, Loader2 } from "lucide-react";
import Link from "next/link";

export default function RegistroPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient(); // Se conecta solo al hacer clic

    // 1. Crear el usuario en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // 2. Crear su perfil en la tabla "profiles"
    if (authData.user) {
      const isAdmin = email === "bleyvama@gmail.com"; // Tu correo de admin
      
      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        full_name: fullName,
        email: email,
        role: isAdmin ? "admin" : "client",
      });

      if (profileError) {
        setError("Error al crear el perfil: " + profileError.message);
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-ink">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Crea tu cuenta</h1>
          <p className="mt-2 text-sm text-white/60">
            Regístrate para empezar a crear tu tarjeta.
          </p>
        </div>

        <form onSubmit={handleRegister} className="glass space-y-4 rounded-2xl p-6">
          {error && (
            <div className="rounded-lg bg-rose/10 p-3 text-xs text-rose text-center">
              {error}
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">Nombre Completo</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-panel/60 py-3 pl-10 pr-4 text-sm text-white focus:border-brand-400 focus:outline-none"
                placeholder="Tu nombre"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-panel/60 py-3 pl-10 pr-4 text-sm text-white focus:border-brand-400 focus:outline-none"
                placeholder="tu@correo.com"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-panel/60 py-3 pl-10 pr-4 text-sm text-white focus:border-brand-400 focus:outline-none"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-2 w-full"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Registrarme"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/50">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-brand-300 hover:text-white transition">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
