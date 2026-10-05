import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/_authenticated/perfil")({
  head: () => ({
    meta: [
      { title: "Mi perfil — Cátedra" },
      { name: "description", content: "Gestiona tus datos de alumno o profesor en Cátedra." },
      { property: "og:title", content: "Mi perfil — Cátedra" },
      { property: "og:description", content: "Tu perfil en Cátedra." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PerfilPage,
});

type Profile = {
  full_name: string;
  avatar_url: string | null;
  city: string | null;
  phone: string | null;
  subject: string | null;
  hourly_price: number | null;
  bio: string | null;
};

const input = "mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent";

function PerfilPage() {
  const { user } = Route.useRouteContext();
  console.log("USUARIO ACTUAL:", user.id);
  const [p, setP] = useState<Profile | null>(null);
  const [role, setRole] = useState<string>("alumno");
  const [photo, setPhoto] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
const [availability, setAvailability] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const [{ data: prof }, { data: roles }] = await Promise.all([
        supabase.from("profiles").select("full_name, avatar_url, city, phone, subject, hourly_price, bio").eq("id", user.id).maybeSingle(),
        supabase.from("user_roles").select("role").eq("user_id", user.id),
      ]);
      setP(prof ?? { full_name: "", avatar_url: null, city: null, phone: null, subject: null, hourly_price: null, bio: null });
      if (roles?.some((r) => r.role === "profesor")) {
  setRole("profesor");

  const { data: availabilityData } = await supabase
    .from("teacher_availability")
    .select("id, day_of_week, start_time, end_time")
    .eq("teacher_id", user.id)
    .order("day_of_week")
    .order("start_time");

  setAvailability(availabilityData ?? []);
        }
        const { data: bookingsData, error: bookingsError } = await supabase
  .from("bookings")
  .select("*")
  .eq(roles?.some((r) => r.role === "profesor") ? "teacher_id" : "student_id", user.id)
  .eq("status", "confirmed")
  .order("lesson_date", { ascending: true })
  .order("start_time", { ascending: true });
console.log("BOOKINGS DEBUG:", bookingsData, bookingsError, user.id);
setBookings(bookingsData ?? []);
      if (prof?.avatar_url) {
        const { data } = await supabase.storage.from("avatars").createSignedUrl(prof.avatar_url, 3600);
        setPhoto(data?.signedUrl ?? null);
      }
    })();
  }, [user.id]);

  async function upload(file: File) {
    const path = `${user.id}/avatar-${Date.now()}.${file.name.split(".").pop()}`;
    const { error } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (error) return setMsg("No se pudo subir la foto.");
    setP((prev) => (prev ? { ...prev, avatar_url: path } : prev));
    setPhoto(URL.createObjectURL(file));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!p) return;
    setSaving(true);
    setMsg(null);
    const { error } = await supabase.from("profiles").update(p).eq("id", user.id);
    setSaving(false);
    setMsg(error ? "No se pudo guardar." : "¡Guardado!");
  }
async function addAvailability(
  date: string,
  start: string,
  end: string
) {
  if (!start || !end || start >= end) {
    setMsg("Comprueba las horas seleccionadas.");
    return;
  }

  const { data, error } = await supabase
    .from("teacher_availability")
    .insert({
      
  teacher_id: user.id,
  lesson_date: date,
  start_time: start,
  end_time: end,
})
.select("id, lesson_date, start_time, end_time")
.single();
  if (error) {
    setMsg("No se pudo guardar el horario.");
    return;
  }

  setAvailability((prev) => [...prev, data]);
  setMsg("Horario añadido correctamente.");
} async function deleteAvailability(id: string) {
  const { error } = await supabase
    .from("teacher_availability")
    .delete()
    .eq("id", id)
    .eq("teacher_id", user.id);

  if (error) {
    setMsg("No se pudo eliminar el horario.");
    return;
  }

  setAvailability((prev) => prev.filter((slot) => slot.id !== id));
  setMsg("Horario eliminado.");
}
  const set = (k: keyof Profile) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setP((prev) => (prev ? { ...prev, [k]: k === "hourly_price" ? (e.target.value ? Number(e.target.value) : null) : e.target.value } : prev));

  return (
    <div className="min-h-screen bg-paper text-ink antialiased">
      <SiteHeader showNav={false} />
      <main className="mx-auto max-w-2xl px-5 py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {role === "profesor" ? "Cuenta de profesor" : "Cuenta de alumno"}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">Mi perfil</h1>

        {!p ? (
          <p className="mt-8 text-sm text-muted-foreground">Cargando…</p>
        ) : (
          <form onSubmit={save} className="mt-8 space-y-5 rounded-2xl border border-line bg-surface p-6">
            <div className="flex items-center gap-4">
              <div className="size-20 overflow-hidden rounded-full bg-soft">
                {photo && <img src={photo} alt="Tu foto" className="h-full w-full object-cover" />}
              </div>
              <label className="cursor-pointer rounded-full border border-line px-4 py-2 text-sm font-semibold transition-colors hover:border-accent">
                Cambiar foto
                <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
              </label>
            </div>
            <label className="block text-sm font-medium">Nombre<input value={p.full_name} onChange={set("full_name")} className={input} /></label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium">Ciudad<input value={p.city ?? ""} onChange={set("city")} className={input} /></label>
              <label className="block text-sm font-medium">Teléfono<input value={p.phone ?? ""} onChange={set("phone")} className={input} /></label>
            </div>
            {role === "profesor" && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium">Materia que enseñas<input value={p.subject ?? ""} onChange={set("subject")} placeholder="Ej: Excel avanzado" className={input} /></label>
                  <label className="block text-sm font-medium">Precio por hora (€)<input type="number" min={0} step="0.5" value={p.hourly_price ?? ""} onChange={set("hourly_price")} className={input} /></label>
                </div>
                <label className="block text-sm font-medium">Sobre ti<textarea rows={4} value={p.bio ?? ""} onChange={set("bio")} className={input} /></label>
                <div className="mt-6 border-t border-line pt-5">
  <h2 className="font-display text-lg font-bold">Mi disponibilidad</h2>
  <p className="mt-1 text-sm text-muted-foreground">
    Añade los días y horas en los que puedes dar clase.
  </p>

  <div className="mt-4 grid gap-3 sm:grid-cols-3">

<input id="availability-date" type="date" className={input} />
    <input id="availability-start" type="time" className={input} />
    <input id="availability-end" type="time" className={input} />
  </div>

 <button
  type="button"
  className="mt-3 rounded-xl border border-line px-4 py-2 text-sm font-semibold"
  onClick={() => {
    const date = document.getElementById("availability-date") as HTMLInputElement;
    const start = document.getElementById("availability-start") as HTMLInputElement;
    const end = document.getElementById("availability-end") as HTMLInputElement;

    addAvailability(date.value, start.value, end.value);
  }}
>
  Añadir horario
</button>
</div> <div className="mt-4 space-y-2">
  {availability.map((slot: any) => (
    <div
      key={slot.id}
      className="flex items-center justify-between rounded-xl border border-line px-4 py-3"
    >
      <span className="text-sm">
       {new Date(`${slot.lesson_date}T00:00:00`).toLocaleDateString("es-ES", {
  weekday: "long",
  day: "numeric",
  month: "long",
})}
{" · "}
        {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}
      </span>

      <button
        type="button"
        onClick={() => deleteAvailability(slot.id)}
        className="text-sm font-semibold text-red-600"
      >
        Eliminar
      </button>
    </div>
  ))}
</div> 
 </>
)}               
  <div className="mt-6 border-t border-line pt-5">
    <h2 className="font-display text-lg font-bold">
  {role === "profesor" ? "Próximas reservas" : "Mis reservas"}
</h2>

    {bookings.length === 0 ? (
      <p className="mt-2 text-sm text-muted-foreground">
        Todavía no tienes reservas.
      </p>
    ) : (
      <div className="mt-4 space-y-2">
        {bookings.map((booking: any) => (
          <div
            key={booking.id}
            className="rounded-xl border border-line px-4 py-3"
          >
            <p className="text-sm font-semibold">
              {new Date(`${booking.lesson_date}T00:00:00`).toLocaleDateString("es-ES", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
            <p className="text-sm text-muted-foreground">
              {booking.start_time.slice(0, 5)} - {booking.end_time.slice(0, 5)}
            </p>
          </div>
        ))}
      </div>
    )}
  </div>

              

            <div className="flex items-center gap-3">
              <button disabled={saving} className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-ink disabled:opacity-60">
                {saving ? "Guardando…" : "Guardar cambios"}
              </button>
              {msg && <span className="text-sm text-muted-foreground">{msg}</span>}
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
