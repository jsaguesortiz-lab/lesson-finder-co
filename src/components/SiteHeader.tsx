import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSessionUser } from "@/hooks/use-session";

export function SiteHeader({ showNav = true }: { showNav?: boolean }) {
  const { user, ready } = useSessionUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/85 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-baseline gap-1">
          <span className="font-display text-[22px] font-bold tracking-tight">Cátedra</span>
          <span className="font-serif text-xl italic text-accent">.</span>
        </Link>
        {showNav && (
          <nav className="hidden items-center gap-8 text-sm font-medium text-ink/70 md:flex">
            <a href="/#categorias" className="transition-colors hover:text-ink">Categorías</a>
            <a href="/#profesores" className="transition-colors hover:text-ink">Profesores</a>
            <a href="/#como" className="transition-colors hover:text-ink">Cómo funciona</a>
          </nav>
        )}
        <div className="flex min-h-9 items-center gap-2">
          {ready && user ? (
            <>
              <Link to="/perfil" className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-accent">
                Mi perfil
              </Link>
              <button onClick={signOut} className="text-sm font-medium text-ink/70 transition-colors hover:text-ink">
                Salir
              </button>
            </>
          ) : ready ? (
            <>
              <Link to="/auth" className="hidden text-sm font-medium text-ink/70 transition-colors hover:text-ink sm:block">
                Iniciar sesión
              </Link>
              <Link to="/auth" search={{ modo: "registro" }} className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-accent">
                Únete
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
