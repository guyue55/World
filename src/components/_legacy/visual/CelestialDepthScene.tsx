export function CelestialDepthScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[8%] top-[18%] h-28 w-40 rotate-[-10deg] rounded-[50%] border border-white/20 bg-white/10 blur-[1px]" />
      <div className="absolute right-[10%] top-[24%] h-40 w-64 rotate-[8deg] rounded-[50%] border border-moss/20 bg-moss/10 blur-[1px]" />
      <div className="absolute bottom-[8%] left-[20%] h-24 w-80 rounded-[50%] border border-sand/30 bg-sand/15 blur-[2px]" />
      <div className="absolute right-[28%] bottom-[8%] h-96 w-96 rounded-full bg-moss/20 blur-3xl" />
    </div>
  )
}
