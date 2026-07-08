export type VisualDepth = 'far' | 'middle' | 'near'
export type VisualMood = 'nature' | 'cosmos' | 'library' | 'atelier'

export const visualDepthLayers = [
  { id: 'far', title: '深空远景', purpose: '建立宇宙纵深、星海、远方世界的尺度感。' },
  { id: 'middle', title: '浮屿中景', purpose: '承载世界节点、内容岛屿和路径连接。' },
  { id: 'near', title: '近景工作台', purpose: '承载可阅读、可操作、可审计的信息。' },
] as const

export const visualMoods = [
  { id: 'nature', title: '自然浮屿', signal: '云雾、林光、四季', layoutHint: 'organic islands' },
  { id: 'cosmos', title: '星海宇宙', signal: '星门、轨道、深空', layoutHint: 'constellation navigation' },
  { id: 'library', title: '空中图书馆', signal: '书页、索引、档案', layoutHint: 'archive shelves' },
  { id: 'atelier', title: '云上工坊', signal: '工具、手稿、灯塔', layoutHint: 'workspace panels' },
] as const

export const visualFoundationPrinciple = '真实、近距离、震撼、有秩序的自由'
