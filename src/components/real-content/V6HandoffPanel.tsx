export function V6HandoffPanel() {
  const tasks = [
    '把 private-redacted 记忆信号连接到私密档案版，而不是公开显示原始内容',
    '让 AI 世界助手只读取公开内容和脱敏元数据',
    '把真实内容的展览、路径和时间河作为 AI 推荐输入',
    '继续保持 productionLive=false，直到真实部署和人工签收完成',
  ]

  return (
    <section className="rounded-[3rem] border border-white/50 bg-white/80 p-6 shadow-soft md:p-8">
      <p className="text-xs tracking-[0.34em] text-moss">V6 HANDOFF</p>
      <h2 className="mt-3 text-3xl font-semibold">下一步：私密档案与 AI 世界助手深化</h2>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {tasks.map((task) => (
          <p key={task} className="rounded-[2rem] border border-white/60 bg-sand/60 p-4 text-sm text-ink/65">{task}</p>
        ))}
      </div>
    </section>
  )
}
