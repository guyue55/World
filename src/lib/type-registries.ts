import type { LifeStage, NodeType, RelationType, WorldEvent, WorldEventType, Visibility } from './types'

export const NODE_TYPE_REGISTRY: Record<NodeType, { label: string; description: string }> = {
  article: { label: '文章', description: '较完整的公开或半公开文本内容。' },
  project: { label: '项目', description: '产品、工具、实验或长期建设对象。' },
  fragment: { label: '碎片', description: '尚未完整成形的灵感、短念或草稿。' },
  memory: { label: '记忆', description: '生活、照片、旅行或可回望片刻。' },
  photo: { label: '照片', description: '以图像为主的节点。' },
  document: { label: '文档', description: '规范、说明、工程或世界设计文档。' },
  letter: { label: '信件', description: '面向某个人或未来的表达。' },
  place: { label: '地点', description: '真实或世界化地点。' },
  object: { label: '物件', description: '具有纪念、项目或叙事意义的对象。' },
  rule: { label: '规则', description: '世界法则、工程守门或 AI 守则。' },
  path: { label: '路径', description: '旅人行走路线本身。' },
  event: { label: '事件', description: '世界时间河中的事件节点。' },
}

export const RELATION_TYPE_REGISTRY: Record<RelationType, string> = {
  topic: '主题相关',
  time: '时间相关',
  project: '项目相关',
  place: '地点相关',
  person: '人物相关',
  memory: '记忆相关',
  inspired: '启发',
  derived: '派生',
  implemented: '实现',
  summarized: '总结',
  publicVersionOf: '公开版本',
  privateSourceOf: '私密来源',
  revivedFrom: '复活自',
}

export const WORLD_EVENT_TYPE_REGISTRY: Record<WorldEventType, string> = {
  'world-concept-formed': '世界观形成',
  'principle-created': '原则形成',
  'node-created': '节点创建',
  'node-updated': '节点更新',
  'node-published': '节点发布',
  'node-archived': '节点归档',
  'node-revived': '节点复活',
  'area-created': '区域创建',
  'area-awakened': '区域点亮',
  'rule-triggered': '规则触发',
  'ai-suggestion-approved': 'AI 建议采纳',
  'snapshot-created': '快照创建',
  'season-changed': '季节变化',
}

export const WORLD_EVENT_ACTOR_REGISTRY: Record<NonNullable<WorldEvent['actor']>, string> = {
  creator: '创作者',
  rule: '规则',
  ai: 'AI 建议',
  system: '系统',
}

export const LIFE_STAGE_REGISTRY: Record<LifeStage, string> = {
  seed: '种子',
  sprout: '萌芽',
  growing: '生长中',
  bloom: '盛放',
  fruit: '结果',
  archive: '沉淀',
  relic: '遗迹',
  dormant: '休眠',
  silent: '沉默',
}

export const VISIBILITY_REGISTRY: Record<Visibility, string> = {
  public: '公开',
  semiPublic: '半公开',
  private: '私密',
  family: '家庭',
  partner: '伴侣',
  vault: '保险箱',
  sealed: '封存',
  silent: '沉默',
}
