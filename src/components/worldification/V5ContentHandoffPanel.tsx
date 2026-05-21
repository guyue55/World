export function V5ContentHandoffPanel() {
  const tasks = [
    '填入真实文章、照片、项目记录和生活记录',
    '把内容节点绑定真实素材，而不是占位素材',
    '把时间河事件从示意转为真实经历',
    '把主题展览从结构变成可阅读展览',
    '保持 AI 灯塔边界：只建议、不越权',
  ]

  return (
    <section className="rounded-[3rem] border border-white/50 bg-white/75 p-6 shadow-soft md:p-8">
      <p className="text-xs tracking-[0.34em] text-moss">V5 HANDOFF</p>
      <h2 className="mt-3 text-3xl font-semibold">下一步：真实内容版</h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/65">V4 解决“像世界”，V5 必须解决“世界里真正有内容”。</p>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {tasks.map((task) => (
          <p key={task} className="rounded-[2rem] border border-white/60 bg-sand/60 p-4 text-sm text-ink/65">{task}</p>
        ))}
      </div>
    </section>
  )
}
