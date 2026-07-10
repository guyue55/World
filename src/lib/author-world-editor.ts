import authorWorldEditorContract from '../../data/domains/operations/author-world-editor-dry-run-v1.json'
import { buildContentLifeLoopFact, buildContentLifeNodeFact, type ContentLifeLoopFact } from './content-life'
import { getAllAreas } from './areas'
import { getAllPaths } from './paths'
import { getAllRelations } from './relations'
import { getPublicWorldEvents } from './world-events'
import type { LifeStage, Node, NodeType, Relation, Visibility } from './types'

export type AuthorWorldEditorContract = typeof authorWorldEditorContract

export type AuthorNodeDraft = {
  id: string
  slug: string
  title: string
  worldTitle?: string
  type: NodeType
  areaId: string
  summary: string
  contentPath: string
  tags: string[]
  visibility?: Visibility
  lifeStage?: LifeStage
  permissionAuthority?: 'data-contract' | 'server' | 'frontend'
  featured?: Node['featured']
  ai?: Node['ai']
  relations?: Array<Pick<Relation, 'to' | 'type' | 'note' | 'reviewed'>>
  pathIds?: string[]
  eventDraft?: {
    id: string
    title: string
    date: string
    description: string
  }
  asset?: {
    source: string
    license: string
    bytes: number
  }
}

export type AuthorDraftValidationIssue = {
  id: string
  severity: 'error' | 'warning'
  message: string
}

export type AuthorDraftImpactPreview = {
  atlas: string
  archive: string
  paths: string
  timeline: string
  lighthouse: string
  featured: string
  absorptionScenes: ContentLifeLoopFact['absorptionScenes']
  absorptionScore: number
}

export type AuthorDraftValidationResult = {
  draftId: string
  valid: boolean
  featuredAllowed: boolean
  issues: AuthorDraftValidationIssue[]
  impactPreview: AuthorDraftImpactPreview
}

export type AuthorWorldEditorSummary = {
  name: string
  version: string
  mode: 'readonly-dry-run'
  localOnly: boolean
  frontendWritesWorldSource: boolean
  frontendPermissionAuthority: boolean
  permissionFactSource: string
  moduleCount: number
  modules: Array<{
    id: string
    label: string
    requiredFieldCount: number
  }>
  validation: {
    validDraftPasses: boolean
    invalidDraftsBlocked: number
    validDraftIssueCount: number
  }
  impactPreview: AuthorDraftImpactPreview
  maintenanceHints: string[]
}

const authorAreaId = 'origin'
const recommendedPathId = 'first-visit'
const relatedNodeId = 'node-world-manifesto'

export const authorWorldEditorSampleDraft: AuthorNodeDraft = {
  id: 'draft-author-world-editor-sample',
  slug: 'author-world-editor-sample',
  title: '作者维护台示例节点',
  worldTitle: '维护台试写点',
  type: 'article',
  areaId: authorAreaId,
  summary: '作者用中文填写标题、摘要、区域、关系和路径后，先看到进入世界各场景的影响预览。',
  contentPath: 'content/drafts/author-world-editor-sample.md',
  tags: ['authoring', 'world-editor', 'dry-run'],
  visibility: 'public',
  lifeStage: 'sprout',
  permissionAuthority: 'data-contract',
  featured: {
    recommended: true,
  },
  ai: {
    generated: false,
    reviewed: true,
    summary: '作者维护台示例节点说明本地 dry-run 如何把公开内容预览进星图、档案、旅程、时间河和灯塔。',
  },
  relations: [
    {
      to: relatedNodeId,
      type: 'derived',
      note: '它从世界宣言延伸出作者维护方式，帮助后续内容进入同一条公开世界线。',
      reviewed: true,
    },
  ],
  pathIds: [recommendedPathId],
  eventDraft: {
    id: 'evt-draft-author-world-editor-sample',
    title: '作者维护台开始 dry-run 演练',
    date: '2026-07-10',
    description: '作者在写入世界源之前先看到校验、权限和多场景吸收预览。',
  },
  asset: {
    source: 'project-internal',
    license: 'project-owned',
    bytes: 0,
  },
}

export const authorWorldEditorInvalidDrafts: AuthorNodeDraft[] = [
  {
    ...authorWorldEditorSampleDraft,
    id: 'draft-missing-summary',
    slug: 'draft-missing-summary',
    summary: '',
  },
  {
    ...authorWorldEditorSampleDraft,
    id: 'draft-missing-area',
    slug: 'draft-missing-area',
    areaId: 'unknown-area',
  },
  {
    ...authorWorldEditorSampleDraft,
    id: 'draft-frontend-permission',
    slug: 'draft-frontend-permission',
    permissionAuthority: 'frontend',
  },
]

function createIssue(id: string, severity: AuthorDraftValidationIssue['severity'], message: string): AuthorDraftValidationIssue {
  return { id, severity, message }
}

function toPreviewNode(draft: AuthorNodeDraft): Node {
  return {
    id: draft.id,
    slug: draft.slug,
    title: draft.title,
    worldTitle: draft.worldTitle,
    type: draft.type,
    areaId: draft.areaId,
    summary: draft.summary,
    contentPath: draft.contentPath,
    tags: draft.tags,
    visibility: draft.visibility ?? 'silent',
    lifeStage: draft.lifeStage ?? 'silent',
    source: 'manual',
    layer: 'interpretation',
    featured: draft.featured,
    ai: draft.ai,
    createdAt: '2026-07-10',
  }
}

function toPreviewRelations(draft: AuthorNodeDraft): Relation[] {
  return (draft.relations ?? []).map((relation, index) => ({
    id: `draft-relation-${draft.id}-${index}`,
    from: draft.id,
    to: relation.to,
    type: relation.type,
    strength: 0.8,
    source: 'manual',
    reviewed: relation.reviewed,
    note: relation.note,
  }))
}

export function getAuthorWorldEditorContract(): AuthorWorldEditorContract {
  return authorWorldEditorContract
}

export function validateAuthorNodeDraft(draft: AuthorNodeDraft): AuthorDraftValidationResult {
  const issues: AuthorDraftValidationIssue[] = []
  const areas = getAllAreas()
  const paths = getAllPaths()
  const relations = getAllRelations()
  const events = getPublicWorldEvents()
  const area = areas.find((item) => item.id === draft.areaId)
  const selectedPaths = paths.filter((path) => (draft.pathIds ?? []).includes(path.id))
  const summaryLength = draft.summary.trim().length
  const relationReasons = draft.relations?.filter((relation) => relation.note?.trim() && relation.reviewed) ?? []

  if (!draft.title.trim()) issues.push(createIssue('missing-title', 'error', '缺少标题。'))
  if (!draft.slug.trim()) issues.push(createIssue('missing-slug', 'error', '缺少 slug。'))
  if (summaryLength < authorWorldEditorContract.featuredGate.minSummaryLength) {
    issues.push(createIssue('summary-too-short', 'error', `摘要至少需要 ${authorWorldEditorContract.featuredGate.minSummaryLength} 个字符。`))
  }
  if (!area) issues.push(createIssue('missing-area', 'error', `区域不存在或未进入事实源：${draft.areaId}`))
  if (!draft.visibility) issues.push(createIssue('missing-visibility', 'error', '缺少 visibility，不能进入公开精选。'))
  if (!draft.lifeStage) issues.push(createIssue('missing-life-stage', 'error', '缺少生命周期阶段。'))
  if (!draft.contentPath.trim()) issues.push(createIssue('missing-content-path', 'error', '缺少正文路径。'))
  if (draft.visibility !== 'public') issues.push(createIssue('not-public', 'warning', '非 public 内容不会进入公开精选。'))
  if (draft.permissionAuthority !== 'data-contract' && draft.permissionAuthority !== 'server') {
    issues.push(createIssue('permission-authority-invalid', 'error', '权限事实源必须来自数据契约或服务端，不能来自前端。'))
  }
  if (relationReasons.length === 0) issues.push(createIssue('missing-relation-reason', 'error', '至少需要一条已复核关系解释。'))
  if (selectedPaths.length === 0) issues.push(createIssue('missing-path-absorption', 'error', '至少需要进入一条公开旅程。'))
  if (!draft.eventDraft?.date || !draft.eventDraft.title.trim()) {
    issues.push(createIssue('missing-event-draft', 'warning', '缺少时间事件草稿，时间河不会出现明确锚点。'))
  }
  if (!draft.asset?.source || !draft.asset.license) {
    issues.push(createIssue('missing-asset-license', 'warning', '若使用资产，需要补来源和授权。'))
  }

  const previewNode = toPreviewNode(draft)
  const previewRelations = [...relations, ...toPreviewRelations(draft)]
  const previewEvents = draft.eventDraft
    ? [
        ...events,
        {
          id: draft.eventDraft.id,
          type: 'node-created' as const,
          title: draft.eventDraft.title,
          date: draft.eventDraft.date,
          description: draft.eventDraft.description,
          nodeIds: [draft.id],
          areaIds: area ? [area.id] : [],
          visibility: draft.visibility,
          actor: 'creator' as const,
        },
      ]
    : events
  const previewPaths = paths.map((path) => {
    if (!(draft.pathIds ?? []).includes(path.id) || path.nodeSlugs.includes(draft.slug)) return path
    return { ...path, nodeSlugs: [...path.nodeSlugs, draft.slug] }
  })
  const fact = buildContentLifeNodeFact({
    node: previewNode,
    paths: previewPaths,
    relations: previewRelations,
    events: previewEvents,
  })
  const loopFact = buildContentLifeLoopFact(fact)
  const hasErrors = issues.some((issue) => issue.severity === 'error')
  const featuredRequested = Boolean(draft.featured?.home || draft.featured?.representative || draft.featured?.recommended || draft.featured?.pathCore)
  const featuredAllowed = !featuredRequested || (!hasErrors && draft.visibility === 'public' && loopFact.absorptionScore >= 4)

  return {
    draftId: draft.id,
    valid: !hasErrors,
    featuredAllowed,
    issues,
    impactPreview: {
      atlas: area ? `将进入 ${area.worldName}，作为 ${area.realName} 下的新地点。` : '不会进入星图：区域不存在。',
      archive: draft.visibility === 'public' && summaryLength > 0 ? '将进入公开档案馆，可被检索和回看。' : '不会进入公开档案馆。',
      paths: selectedPaths.length > 0 ? `将进入 ${selectedPaths.map((path) => path.title).join('、')}。` : '尚未进入任何公开旅程。',
      timeline: draft.eventDraft ? `将出现时间锚点：${draft.eventDraft.title}。` : '尚未进入时间河。',
      lighthouse: relationReasons.length > 0 && (draft.ai?.summary || draft.summary) ? '将进入灯塔只读公开事实源。' : '灯塔证据不足，暂不推荐。',
      featured: featuredAllowed ? '可进入精选候选。' : '精选候选被校验阻止。',
      absorptionScenes: loopFact.absorptionScenes,
      absorptionScore: loopFact.absorptionScore,
    },
  }
}

export function getAuthorWorldEditorSummary(): AuthorWorldEditorSummary {
  const validResult = validateAuthorNodeDraft(authorWorldEditorSampleDraft)
  const invalidResults = authorWorldEditorInvalidDrafts.map(validateAuthorNodeDraft)

  return {
    name: authorWorldEditorContract.name,
    version: authorWorldEditorContract.version,
    mode: 'readonly-dry-run',
    localOnly: authorWorldEditorContract.scope.localOnly,
    frontendWritesWorldSource: authorWorldEditorContract.scope.frontendWritesWorldSource,
    frontendPermissionAuthority: authorWorldEditorContract.scope.frontendPermissionAuthority,
    permissionFactSource: authorWorldEditorContract.authority.permissionFactSource,
    moduleCount: authorWorldEditorContract.modules.length,
    modules: authorWorldEditorContract.modules.map((module) => ({
      id: module.id,
      label: module.label,
      requiredFieldCount: module.requiredFields.length,
    })),
    validation: {
      validDraftPasses: validResult.valid && validResult.featuredAllowed,
      invalidDraftsBlocked: invalidResults.filter((result) => !result.valid || !result.featuredAllowed).length,
      validDraftIssueCount: validResult.issues.length,
    },
    impactPreview: validResult.impactPreview,
    maintenanceHints: [
      '先用中文草稿做 dry-run，再写入 nodes / relations / paths / world-events。',
      '无摘要、无区域、无权限事实源或无关系解释时，不允许进入精选。',
      '前端只展示校验结果和影响预览，不直接写世界源文件。',
    ],
  }
}
