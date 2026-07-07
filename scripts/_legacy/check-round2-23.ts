import fs from 'node:fs'
import { getDefaultThemeMode, isThemeModeId, themeStorageKey } from '../src/features/theme-system'
const errors:string[]=[]
for(const item of ['src/features/theme-system/persistence.ts','src/components/theme/ThemeSwitcher.tsx','src/app/theme-system/page.tsx','data/round-02/stage-06/23-theme-persistence-mobile.json']) if(!fs.existsSync(item)) errors.push(`missing ${item}`)
if(getDefaultThemeMode()!=='cosmos') errors.push('default theme invalid')
if(!isThemeModeId('nature')||isThemeModeId('unknown')) errors.push('theme guard invalid')
if(!themeStorageKey.includes('word-life')) errors.push('storage key must be namespaced')
const switcher=fs.readFileSync('src/components/theme/ThemeSwitcher.tsx','utf8')
if(!switcher.startsWith("'use client'")) errors.push('switcher must be client component')
if(!switcher.includes('useEffect')||!switcher.includes('aria-pressed')) errors.push('switcher missing hydration/a11y guard')
if(errors.length) throw new Error(errors.join('\n'))
console.log('Round 02 batch 23 checks passed.')
