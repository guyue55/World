import fs from 'node:fs'
import path from 'node:path'
import themeExhibitionMap from '../data/theme-exhibition-map.json'
import themeExhibitionImplementationContract from '../data/theme-exhibition-implementation-contract.json'
import releasePreparationFinalReport from '../data/release-preparation-final-report.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function main() {
  const errors: string[] = []

  if (themeExhibitionImplementationContract.route !== '/exhibitions') {
    errors.push('theme exhibition route must be /exhibitions')
  }

  if (themeExhibitionMap.exhibitions.length < 4) {
    errors.push('theme exhibition count too low')
  }

  if (!themeExhibitionMap.exhibitions.some((item) => item.visibility === 'planning-only')) {
    errors.push('planning-only exhibition boundary missing')
  }

  if (!exists('src/app/exhibitions/page.tsx')) {
    errors.push('missing exhibitions page')
  }

  if (!exists('src/components/exhibitions/ExhibitionHero.tsx')) {
    errors.push('missing ExhibitionHero')
  }

  if (!exists('src/components/exhibitions/ExhibitionGrid.tsx')) {
    errors.push('missing ExhibitionGrid')
  }

  if (releasePreparationFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('implementation must preserve not-ready-for-release')
  }

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Theme exhibitions check passed.')
}

main()
