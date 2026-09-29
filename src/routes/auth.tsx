import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";

const search = z.object({
  modo: z.enum(["entrar", "registro"]).optional(),
  rol: z.enum(["alumno", "profesor"]).optional(),
});

export const Route = createFileRoute("/auth")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Entrar o registrarse — Cátedra" },
      { name: "description", content: "Crea tu cuenta de alumno o profesor en Cátedra, o inicia sesión." },
      { property: "og:title", content: "Entrar o registrarse — Cátedra" },
      { property: "og:description", content: "Únete a Cátedra como alumno o como profesor particular." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

const input = "w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent";

function AuthPage() {
  const s = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"entrar" | "registro">(s.modo ?? "entrar");
  const [role, setRole] = useState<"alumno" | "profesor">(s.rol ?? "alumno");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "registro") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/perfil", data: { full_name: name, role } },
        });
        if (error) throw error;
        setSent(true);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/perfil" });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error";
      setError(
        msg.includes("Invalid login") ? "Email o contraseña incorrectos." :
        msg.includes("Email not confirmed") ? "Confirma tu email antes de entrar (revisa tu bandeja)." :
        msg.includes("already registered") ? "Ese email ya tiene cuenta. Inicia sesión." :
        msg.includes("Password") ? "La contraseña debe tener al menos 6 caracteres." : msg,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-paper text-ink antialiased">
      <SiteHeader showNav={false} />
      <main className="mx-auto max-w-md px-5 py-12">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          {mode === "registro" ? <>Únete a <span className="font-serif font-normal italic text-accent">Cátedra</span></> : "Bienvenido de nuevo"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "registro" ? "Crea tu cuenta en un minuto." : "Inicia sesión para ver tu perfil."}
        </p>

        {sent ? (
          <div className="mt-8 rounded-2xl border border-line bg-surface p-6">
            <p className="font-semibold">Revisa tu correo</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Te hemos enviado un enlace a <b>{email}</b>. Púlsalo para confirmar tu cuenta y entrar.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-8 space-y-4 rounded-2xl border border-line bg-surface p-6">
            {mode === "registro" && (
              <>
                <div className="grid grid-cols-2 gap-2 rounded-xl bg-soft p-1">
                  {(["alumno", "profesor"] as const).map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setRole(r)}
                      className={`rounded-lg py-2 text-sm font-semibold transition-colors ${role === r ? "bg-surface text-ink shadow-sm" : "text-ink/60"}`}
                    >
                      {r === "alumno" ? "Quiero aprender" : "Quiero enseñar"}
                    </button>
                  ))}
                </div>
                <label className="block text-sm font-medium">
                  Nombre
                  <input required value={name} onChange={(e) => setName(e.target.value)} className={`${input} mt-1`} />
                </label>
              </>
            )}
            <label className="block text-sm font-medium">
              Email
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={`${input} mt-1`} />
            </label>
            <label className="block text-sm font-medium">
              Contraseña
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className={`${input} mt-1`} />
            </label>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button disabled={loading} className="w-full rounded-xl bg-accent py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-ink disabled:opacity-60">
              {loading ? "Un momento…" : mode === "registro" ? "Crear cuenta" : "Entrar"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {mode === "registro" ? "¿Ya tienes cuenta? " : "¿Aún no tienes cuenta? "}
          <button
            onClick={() => { setMode(mode === "registro" ? "entrar" : "registro"); setError(null); setSent(false); }}
            className="font-semibold text-ink underline-offset-4 hover:text-accent hover:underline"
          >
            {mode === "registro" ? "Inicia sesión" : "Regístrate"}
          </button>
        </p>
      </main>
    </div>
  );
}
