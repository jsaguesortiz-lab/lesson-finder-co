import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Code2, ChefHat, Languages, Guitar, Plus } from "lucide-react";

import heroTeacher from "@/assets/hero-teacher.jpg";
import teacherDiego from "@/assets/teacher-diego.jpg";
import teacherLucia from "@/assets/teacher-lucia.jpg";
import teacherMarc from "@/assets/teacher-marc.jpg";
import teacherCarmen from "@/assets/teacher-carmen.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cátedra — Clases particulares con profesores verificados" },
      {
        name: "description",
        content:
          "Conecta con profesores particulares de cocina, Excel, Python, idiomas, música y más. Tú eliges la materia, el ritmo y la hora.",
      },
      { property: "og:title", content: "Cátedra — Aprende de quien sabe hacerlo" },
      {
        property: "og:description",
        content:
          "El marketplace que conecta a quien quiere aprender con quien sabe enseñar. Más de 1.400 profesores verificados.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const categories = [
  { icon: BarChart3, name: "Hoja de cálculo", count: "214 profesores" },
  { icon: Code2, name: "Programación", count: "388 profesores" },
  { icon: ChefHat, name: "Cocina", count: "152 profesores" },
  { icon: Languages, name: "Idiomas", count: "640 profesores" },
  { icon: Guitar, name: "Música", count: "198 profesores" },
  { icon: Plus, name: "Ver más", count: "12 áreas" },
];

const teachers = [
  {
    photo: teacherLucia,
    tag: "Excel avanzado",
    name: "Lucía Ferrer",
    rating: "4.9",
    bio: "Ex analista financiera · Madrid",
    price: "22 €",
  },
  {
    photo: teacherMarc,
    tag: "Python desde cero",
    name: "Marc Vidal",
    rating: "5.0",
    bio: "Ingeniero · Barcelona",
    price: "28 €",
  },
  {
    photo: teacherCarmen,
    tag: "Cocina casera",
    name: "Carmen Ríos",
    rating: "4.8",
    bio: "Chef particular · Sevilla",
    price: "19 €",
  },
];

const chips = ["Excel", "Python", "Cocina", "Idiomas", "Música", "+12"];

function Index() {
  return (
    <div className="min-h-screen bg-paper text-ink antialiased">
      <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/85 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#" className="flex items-baseline gap-1">
            <span className="font-display text-[22px] font-bold tracking-tight">Cátedra</span>
            <span className="font-serif text-xl italic text-accent">.</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-ink/70 md:flex">
            <a href="#categorias" className="transition-colors hover:text-ink">Categorías</a>
            <a href="#profesores" className="transition-colors hover:text-ink">Profesores</a>
            <a href="#como" className="transition-colors hover:text-ink">Cómo funciona</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#" className="hidden text-sm font-medium text-ink/70 transition-colors hover:text-ink sm:block">
              Iniciar sesión
            </a>
            <a href="#" className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-black">
              Únete
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-[1.05fr_.95fr] md:py-16">
          <div>
            <p className="animate-rise mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="size-1.5 rounded-full bg-accent"></span> +1.400 profesores verificados
            </p>
            <h1 className="animate-rise font-display text-[40px] font-bold leading-[1.03] tracking-tight text-balance sm:text-[52px]" style={{ animationDelay: "80ms" }}>
              Aprende de quien <span className="font-serif font-normal italic text-accent">sabe</span> hacerlo.
            </h1>
            <p className="animate-rise mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground text-pretty" style={{ animationDelay: "160ms" }}>
              Conecta con profesores particulares de todo. Tú eliges la materia, el ritmo y la hora; nosotros te ponemos en contacto.
            </p>

            <div className="animate-rise mt-7 rounded-2xl border border-line bg-surface p-2 ring-1 ring-black/5" style={{ animationDelay: "240ms" }}>
              <div className="flex flex-col gap-2 sm:flex-row">
                <label className="flex flex-1 items-center gap-2 rounded-xl px-3 py-3 text-sm text-muted-foreground">
                  <span className="text-base">⌕</span>
                  <span className="font-normal">¿Qué quieres aprender?</span>
                </label>
                <label className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm text-muted-foreground sm:w-40">
                  <span>Todas</span>
                  <span className="ml-auto text-xs">▾</span>
                </label>
                <button className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-ink">
                  Buscar
                </button>
              </div>
            </div>

            <div className="animate-rise mt-4 flex flex-wrap gap-2" style={{ animationDelay: "320ms" }}>
              {chips.map((chip) => (
                <span key={chip} className="cursor-default rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] font-medium text-ink/80">
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="animate-rise hidden md:block" style={{ animationDelay: "200ms" }}>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-[20px] bg-soft outline-1 -outline-offset-1 outline-black/5">
                <img src={heroTeacher} alt="Profesora en su estudio" width={1024} height={1280} className="h-full w-full object-cover" />
              </div>
              <div className="absolute -bottom-5 -left-5 w-52 rounded-2xl border border-line bg-surface p-3 ring-1 ring-black/5">
                <div className="flex items-center gap-3">
                  <img src={teacherDiego} alt="Diego, profesor de guitarra" width={816} height={816} loading="lazy" className="size-11 shrink-0 rounded-full object-cover outline-1 -outline-offset-1 outline-black/5" />
                  <div className="leading-tight">
                    <p className="text-sm font-semibold">Diego · Guitarrista</p>
                    <p className="text-xs text-muted-foreground">
                      4.9 <span className="text-star">★</span> · 1.200 lecciones
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-3 top-6 rounded-full bg-surface px-3 py-1.5 text-xs font-semibold text-ink shadow-sm ring-1 ring-black/5">
                Online · Hoy 18:00
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="categorias" className="border-t border-line/70">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">(a) Categorías</p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-balance sm:text-[28px]">
                Explora por lo que te apetece
              </h2>
            </div>
            <a href="#" className="hidden text-sm font-medium text-ink/70 transition-colors hover:text-accent sm:block">
              Ver todas →
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat, i) => (
              <div
                key={cat.name}
                className="group animate-rise rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-accent/40"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-soft text-ink/70">
                  <cat.icon className="size-5" strokeWidth={1.8} />
                </div>
                <p className="mt-3 text-sm font-semibold">{cat.name}</p>
                <p className="text-xs text-muted-foreground">{cat.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="profesores" className="border-t border-line/70 bg-surface/40">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">(b) Profesores destacados</p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-balance sm:text-[28px]">
                Los más reservados esta semana
              </h2>
            </div>
            <a href="#" className="hidden text-sm font-medium text-ink/70 transition-colors hover:text-accent sm:block">
              Ver todos →
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teachers.map((t, i) => (
              <article
                key={t.name}
                className="group animate-rise overflow-hidden rounded-[18px] border border-line bg-surface ring-1 ring-black/5"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-soft">
                  <img src={t.photo} alt={t.name} width={1024} height={768} loading="lazy" className="h-full w-full object-cover" />
                  <span className="absolute left-3 top-3 rounded-full bg-surface/90 px-2.5 py-1 text-[11px] font-semibold text-ink">
                    {t.tag}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-semibold">{t.name}</h3>
                    <span className="flex items-center gap-1 rounded-full bg-soft px-2 py-0.5 text-xs font-semibold">
                      <span className="text-star">★</span>
                      {t.rating}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{t.bio}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-line/70 pt-3">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-display text-lg font-bold text-ink">{t.price}</span>/hora
                    </p>
                    <button className="rounded-full bg-ink px-4 py-1.5 text-sm font-semibold text-paper transition-colors group-hover:bg-accent">
                      Reservar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="como" className="border-t border-line/70">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">(c) Cómo funciona</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-balance sm:text-[28px]">
              Un puente, no una escuela
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              Cátedra conecta personas. Tú eliges a tu profesor y pagas directamente; nosotros cuidamos el contacto y la confianza.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="animate-rise rounded-[20px] border border-line bg-surface p-6">
              <span className="inline-block rounded-full bg-soft px-3 py-1 text-xs font-semibold text-ink/70">Para ti</span>
              <ol className="mt-5 space-y-4">
                <li className="flex gap-3">
                  <span className="font-display text-sm font-bold text-accent">01</span>
                  <p className="text-sm">
                    <span className="font-semibold">Busca tu materia</span>{" "}
                    <span className="text-muted-foreground">y filtra por precio, ciudad u online.</span>
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="font-display text-sm font-bold text-accent">02</span>
                  <p className="text-sm">
                    <span className="font-semibold">Elige y reserva</span>{" "}
                    <span className="text-muted-foreground">horas con tu profesor de confianza.</span>
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="font-display text-sm font-bold text-accent">03</span>
                  <p className="text-sm">
                    <span className="font-semibold">Aprende a tu ritmo</span>{" "}
                    <span className="text-muted-foreground">y valora cada sesión.</span>
                  </p>
                </li>
              </ol>
              <a href="#" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-ink transition-colors hover:text-accent">
                Empezar a buscar →
              </a>
            </div>

            <div className="animate-rise rounded-[20px] bg-ink p-6 text-paper" style={{ animationDelay: "100ms" }}>
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-paper/80">Para profesores</span>
              <ol className="mt-5 space-y-4">
                <li className="flex gap-3">
                  <span className="font-display text-sm font-bold text-accent">01</span>
                  <p className="text-sm text-paper/80">
                    <span className="font-semibold text-paper">Crea tu perfil</span> y muestra tu especialidad y disponibilidad.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="font-display text-sm font-bold text-accent">02</span>
                  <p className="text-sm text-paper/80">
                    <span className="font-semibold text-paper">Recibe solicitudes</span> y confirma tus propias horas.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="font-display text-sm font-bold text-accent">03</span>
                  <p className="text-sm text-paper/80">
                    <span className="font-semibold text-paper">Cobra y crece</span> con reseñas que te abren puertas.
                  </p>
                </li>
              </ol>
              <a href="#" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-paper transition-colors hover:text-accent">
                Únete como profesor →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line/70">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              ¿Enseñas algo que otros quieren aprender?
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground text-pretty">
              Únete a la comunidad de Cátedra y convierte tu conocimiento en ingresos, en tus propios horarios, sin comisiones ocultas.
            </p>
          </div>
          <a
            href="#"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-semibold text-accent-foreground transition-colors hover:bg-accent-ink"
          >
            Registrarme como profesor <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </section>

      <footer className="border-t border-line/70 bg-surface/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-baseline gap-1">
            <span className="font-display text-lg font-bold tracking-tight">Cátedra</span>
            <span className="font-serif text-base italic text-accent">.</span>
            <span className="ml-3 text-xs text-muted-foreground">© 2026 · Marketplace de clases particulares</span>
          </div>
          <div className="flex gap-6 text-sm text-ink/60">
            <a href="#" className="transition-colors hover:text-ink">Privacidad</a>
            <a href="#" className="transition-colors hover:text-ink">Términos</a>
            <a href="#" className="transition-colors hover:text-ink">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
