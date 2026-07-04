import { lifeNotes } from '@/features/real-content-v5'

export function LifeNoteStream() {
  return (
    <section className="rounded-[3rem] border border-white/50 bg-white/80 p-6 shadow-soft md:p-8">
      <p className="text-xs tracking-[0.34em] text-moss">LIFE NOTES</p>
      <h2 className="mt-3 text-3xl font-semibold">生活记录进入世界气候</h2>
      <div className="mt-8 grid gap-4">
        {lifeNotes.map((note) => (
          <article key={note.id} className="rounded-[2rem] border border-white/60 bg-sand/60 p-5">
            <p className="text-xs tracking-[0.28em] text-moss">{note.scene} · {note.privacy}</p>
            <h3 className="mt-3 text-xl font-semibold">{note.title}</h3>
            <p className="mt-3 text-sm leading-6 text-ink/65">{note.note}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
