import taskMap from '../data/v3-concept/05-visual-universe-multidevice-task-map.json'

const errors: string[] = []

if (taskMap.visualViews.length < 5) errors.push('visual views too few')
if (!taskMap.deviceModes.includes('mobile-stacked')) errors.push('mobile stacked mode missing')
if (!taskMap.deviceModes.includes('semantic-list-only')) errors.push('semantic list only mode missing')
if (!taskMap.nonNegotiableRules.includes('宇宙视图必须有语义降级')) {
  errors.push('semantic fallback rule missing')
}
if (!taskMap.nonNegotiableRules.includes('核心内容不能依赖 3D/WebXR 才能访问')) {
  errors.push('3D/WebXR non-dependency rule missing')
}
if (!taskMap.implementationTasks.includes('define accessibility QA matrix')) {
  errors.push('accessibility QA task missing')
}
if (!taskMap.implementationTasks.includes('define performance budget check')) {
  errors.push('performance budget task missing')
}

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V3 concept batch 05 check passed.')
