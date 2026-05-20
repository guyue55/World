import homepageComposition from '../../data/homepage-composition.json'
import homeCoverAssets from '../../data/home-cover-assets.json'
import type { Node } from './types'

export function getHomepageComposition() {
  return homepageComposition
}

export function getHomeCoverAssets() {
  return homeCoverAssets
}

export function resolveNodeCover(node: Node): string {
  if (node.cover) return node.cover

  const tags = new Set(node.tags)
  const matched = homeCoverAssets.covers.find((cover) => {
    return cover.useFor.some((key) => tags.has(key) || node.type === key || node.areaId === key)
  })

  return matched?.path ?? homeCoverAssets.fallback
}

export function getHomepageRhythm() {
  return [
    {
      id: 'tech',
      title: '技术与工程',
      description: '把系统、工具、架构与实践沉淀成可回看的星体。',
      href: '/archive?tag=tech',
    },
    {
      id: 'life',
      title: '生活与片刻',
      description: '让生活不是附录，而是世界持续生长的温度。',
      href: '/archive?tag=life',
    },
    {
      id: 'memory',
      title: '记忆与时间',
      description: '把过去、当下和未来放入同一条可回访的时间河。',
      href: '/timeline',
    },
    {
      id: 'future',
      title: '未来扩展',
      description: '骨架稳定后，世界可以继续长出更多空间和体验。',
      href: '/skeleton',
    },
  ]
}
