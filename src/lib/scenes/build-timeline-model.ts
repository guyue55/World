import type { PublicWorldObjectIndex } from '@/lib/public-world-objects'
import { formatWorldEventActor, formatWorldEventType } from '@/lib/timeline'
import { getWorldSceneAsset, type WorldSceneAsset } from '@/lib/world-scene-assets'

export type TimelineEventView = {
  id: string
  title: string
  description: string
  date: string
  typeLabel: string
  actorLabel: string
  areaLabels: string[]
  nodeHref: string | null
  nodeTitle: string | null
  contentRevisionSha256: string | null
}

export type TimelineAnchorView = {
  id: string
  date: string
  dateLabel: string
  seasonLabel: string
  x: number
  y: number
  mobileX: number
  mobileY: number
  eventIds: string[]
}

export type TimelineViewModel = {
  title: string
  arrivalLine: string
  asset: WorldSceneAsset
  anchors: TimelineAnchorView[]
  events: TimelineEventView[]
  latestAnchorId: string
}

function formatDate(date: string) {
  const parsed = new Date(`${date}T00:00:00Z`)
  if (Number.isNaN(parsed.getTime())) return date
  return new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric', timeZone: 'UTC' }).format(parsed)
}

function seasonForDate(date: string) {
  const month = Number(date.slice(5, 7))
  if (month >= 3 && month <= 5) return '春 · 萌发'
  if (month >= 6 && month <= 8) return '夏 · 生长'
  if (month >= 9 && month <= 11) return '秋 · 沉淀'
  return '冬 · 静读'
}

function anchorPosition(index: number, total: number) {
  const progress = total <= 1 ? 0.5 : index / (total - 1)
  return {
    x: 18 + progress * 48,
    y: 72 - progress * 40 + Math.sin(progress * Math.PI * 3) * 8,
    mobileX: index === total - 1 ? 50 : index % 2 === 0 ? 27 : 68,
    mobileY: 78 - progress * 42,
  }
}

export function buildTimelineViewModel(index: PublicWorldObjectIndex): TimelineViewModel {
  const events = [...index.events]
    .sort((left, right) => left.date.localeCompare(right.date) || left.id.localeCompare(right.id))
    .map((event) => {
      const nodeReference = (event.nodeIds ?? []).map((id) => index.nodeRefs.find((node) => node.id === id)).find(Boolean)
      return {
        id: event.id,
        title: event.title,
        description: event.description,
        date: event.date,
        typeLabel: formatWorldEventType(event.type),
        actorLabel: formatWorldEventActor(event.actor),
        areaLabels: (event.areaIds ?? []).map((id) => index.areaById.get(id)?.worldName).filter((title): title is string => Boolean(title)),
        nodeHref: nodeReference?.href ?? null,
        nodeTitle: nodeReference?.title ?? null,
        contentRevisionSha256: nodeReference?.contentRevisionSha256 ?? null,
      }
    })

  const eventIdsByDate = new Map<string, string[]>()
  for (const event of events) {
    const ids = eventIdsByDate.get(event.date) ?? []
    ids.push(event.id)
    eventIdsByDate.set(event.date, ids)
  }
  const dates = [...eventIdsByDate.keys()].sort()
  const anchors = dates.map((date, anchorIndex) => ({
    id: `time-${date}`,
    date,
    dateLabel: formatDate(date),
    seasonLabel: seasonForDate(date),
    ...anchorPosition(anchorIndex, dates.length),
    eventIds: eventIdsByDate.get(date) ?? [],
  }))

  return {
    title: '时间河',
    arrivalLine: '沿着水光回看世界如何从一枚种子长成今日的模样。',
    asset: getWorldSceneAsset('timeline'),
    anchors,
    events,
    latestAnchorId: anchors.at(-1)?.id ?? '',
  }
}
