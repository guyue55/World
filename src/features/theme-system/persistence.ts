import type { ThemeModeId } from './model'
export const themeStorageKey = 'word-life-theme-mode'
export function isThemeModeId(value: string): value is ThemeModeId { return value === 'nature' || value === 'cosmos' || value === 'library' || value === 'atelier' }
export function getDefaultThemeMode(): ThemeModeId { return 'cosmos' }
