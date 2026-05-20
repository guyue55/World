import navigationStateContract from '../../data/navigation-state-contract.json'

export type NavigationItem = {
  id: string
  label: string
  href: string
  match: 'exact' | 'section'
  desktop: boolean
  mobile: boolean
}

export function getNavigationItems(): NavigationItem[] {
  return navigationStateContract.items as NavigationItem[]
}

export function isNavigationItemActive(pathname: string, item: Pick<NavigationItem, 'href' | 'match'>) {
  if (item.match === 'exact') return pathname === item.href

  return pathname === item.href || pathname.startsWith(`${item.href}/`)
}
