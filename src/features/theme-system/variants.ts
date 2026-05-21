import type { ThemeLayoutVariant } from './model'
export const themeLayoutVariants: Record<ThemeLayoutVariant, { label:string; grid:string; motion:string }> = {
 'organic-islands': { label:'自然岛屿布局', grid:'grid gap-4 md:grid-cols-2 xl:grid-cols-4', motion:'soft breathing' },
 'star-navigation': { label:'星图导航布局', grid:'grid gap-4 md:grid-cols-[1.2fr_0.8fr]', motion:'orbital hover' },
 'archive-shelves': { label:'档案书架布局', grid:'grid gap-4 md:grid-cols-3', motion:'page reveal' },
 'workbench-panels': { label:'工作台面板布局', grid:'grid gap-4 lg:grid-cols-[0.8fr_1.2fr]', motion:'panel focus' },
}
export function getThemeVariant(label: ThemeLayoutVariant){ return themeLayoutVariants[label] }
