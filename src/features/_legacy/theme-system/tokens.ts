import type { ThemeMode } from './model'
export const themeModes: ThemeMode[] = [
 { id:'nature', title:'自然浮屿', description:'森林、花园、云雾、季节变化，适合生活和照片。', layout:'organic-islands', tone:'soft living world', surfaceClass:'bg-[linear-gradient(135deg,#f8f2e6,#dfe9d9)]', accentClass:'text-moss' },
 { id:'cosmos', title:'星海宇宙', description:'深空、星轨、世界地图，适合导航和多世界网络。', layout:'star-navigation', tone:'deep spatial universe', surfaceClass:'bg-[linear-gradient(135deg,#111817,#26342f)] text-white', accentClass:'text-white' },
 { id:'library', title:'空中图书馆', description:'书页、索引、档案和长期传承。', layout:'archive-shelves', tone:'quiet knowledge archive', surfaceClass:'bg-[linear-gradient(135deg,#fffaf0,#eadfc9)]', accentClass:'text-clay' },
 { id:'atelier', title:'云上工坊', description:'创作台、工具、手稿、AI 建议和审计工作流。', layout:'workbench-panels', tone:'focused creative workbench', surfaceClass:'bg-[linear-gradient(135deg,#ffffff,#eef3ec)]', accentClass:'text-moss' },
]
