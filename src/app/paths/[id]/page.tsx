import { notFound } from 'next/navigation'
import { JourneyRouteStage } from '@/components/paths/JourneyRouteStage'
import { createPageMetadata } from '@/lib/metadata'
import { getAllPaths, getPathById } from '@/lib/paths'
import { getPublicWorldObjectIndex } from '@/lib/public-world-objects'
import { buildPathDetailModel } from '@/lib/scenes/build-path-model'

export const dynamicParams = true
type PathPageParams = { id: string }

export function generateStaticParams() {
  return getAllPaths().map((path) => ({ id: path.id }))
}

export async function generateMetadata({ params }: { params: Promise<PathPageParams> }) {
  const { id } = await params
  const path = getPathById(id)
  if (!path) return createPageMetadata({ title: '路径不存在', path: '/paths' })
  return createPageMetadata({ title: path.title, description: path.description, path: `/paths/${path.id}` })
}

export default async function PathDetailPage({ params }: { params: Promise<PathPageParams> }) {
  const { id } = await params
  const model = buildPathDetailModel(getPublicWorldObjectIndex(), id)
  if (!model) notFound()
  return <main><JourneyRouteStage model={model} /></main>
}
