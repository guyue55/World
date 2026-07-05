import fs from 'node:fs'
import path from 'node:path'
import navigationStateContract from '../data/domains/experience/navigation-state-contract.json'
import interactionComponentContract from '../data/core/interaction-component-contract.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  const nav = read('src/components/navigation/RouteAwareNav.tsx')
  const mobile = read('src/components/navigation/MobileRouteNav.tsx')
  const collapsible = read('src/components/interaction/AccessibleCollapsible.tsx')
  const tabs = read('src/components/interaction/AccessibleTabs.tsx')
  const pathsPage = read('src/app/paths/page.tsx')
  const statusPage = read('src/app/status/page.tsx')
  const skeletonPage = read('src/app/_legacy/skeleton/page.tsx')

  if (!nav.includes('usePathname')) errors.push('desktop navigation must use pathname')
  if (!mobile.includes('usePathname')) errors.push('mobile navigation must use pathname')
  if (!nav.includes('aria-current')) errors.push('desktop navigation missing aria-current')
  if (!mobile.includes('aria-current')) errors.push('mobile navigation missing aria-current')
  if (!collapsible.includes('aria-expanded')) errors.push('collapsible missing aria-expanded')
  if (!collapsible.includes('aria-controls')) errors.push('collapsible missing aria-controls')
  if (!tabs.includes('role="tablist"')) errors.push('tabs missing tablist role')
  if (!tabs.includes('aria-selected')) errors.push('tabs missing aria-selected')
  if (!pathsPage.includes('PathTabs')) errors.push('paths page does not use PathTabs')
  if (!skeletonPage.includes('AccessibleCollapsible')) errors.push('skeleton page does not use collapsible')

  const navItems = navigationStateContract.items
  if (navItems.length < 6) errors.push('navigation contract items too few')
  if (!navItems.some((item) => item.href === '/' && item.match === 'exact')) {
    errors.push('home navigation must use exact matching')
  }

  const componentIds = new Set(interactionComponentContract.components.map((item) => item.id))
  ;['RouteAwareNav', 'AccessibleCollapsible', 'AccessibleTabs'].forEach((id) => {
    if (!componentIds.has(id)) errors.push(`missing interaction contract component: ${id}`)
  })

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Interaction state check passed.')
}

main()
