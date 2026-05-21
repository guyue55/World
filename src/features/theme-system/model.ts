export type ThemeModeId = 'nature' | 'cosmos' | 'library' | 'atelier'
export type ThemeLayoutVariant = 'organic-islands' | 'star-navigation' | 'archive-shelves' | 'workbench-panels'
export type ThemeMode = { id:ThemeModeId; title:string; description:string; layout:ThemeLayoutVariant; tone:string; surfaceClass:string; accentClass:string }
