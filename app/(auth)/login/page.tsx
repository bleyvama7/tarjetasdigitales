"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase/client";
import { Sparkles, Mail, Lock, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient(); // Se conecta solo al hacer clic

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Correo o contraseña incorrectos.");
      setLoading(false);
    } else {
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
          <h1 className="font-display text-2xl font-bold text-white">Inicia sesión</h1>
          <p className="mt-2 text-sm text-white/60">
            Ingresa a tu panel para gestionar tu tarjeta digital.
          </p>
        </div>

        <form onSubmit={handleLogin} className="glass space-y-4 rounded-2xl p-6">
          {error && (
            <div className="rounded-lg bg-rose/10 p-3 text-xs text-rose text-center">
              {error}
            </div>
          )}

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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-panel/60 py-3 pl-10 pr-4 text-sm text-white focus:border-brand-400 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-2 w-full"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Entrar a mi cuenta"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/50">
          ¿Aún no tienes cuenta?{" "}
          <Link href="/registro" className="text-brand-300 hover:text-white transition">
            Comprar una tarjeta
          </Link>
        </p>
      </div>
    </div>
  );
}
