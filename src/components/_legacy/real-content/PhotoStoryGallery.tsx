import { photoStories } from '@/features/real-content-v5'

export function PhotoStoryGallery() {
  return (
    <section className="rounded-[3rem] border border-white/50 bg-white/80 p-6 shadow-soft md:p-8">
      <p className="text-xs tracking-[0.34em] text-moss">PHOTO STORIES</p>
      <h2 className="mt-3 text-3xl font-semibold">照片故事，而不是装饰配图</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {photoStories.map((story) => (
          <article key={story.id} className="rounded-[2rem] border border-white/60 bg-sand/60 p-5">
            <p className="text-xs tracking-[0.28em] text-moss">{story.status} · {story.assetId}</p>
            <h3 className="mt-3 text-xl font-semibold">{story.title}</h3>
            <p className="mt-2 text-sm text-ink/50">{story.locationHint}</p>
            <p className="mt-3 text-sm leading-6 text-ink/65">{story.narrative}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
