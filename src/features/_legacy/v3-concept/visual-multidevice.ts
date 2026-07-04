import taskMap from '../../../data/v3-concept/05-visual-universe-multidevice-task-map.json'

export function getV3VisualUniverseMultideviceTaskMap() {
  return {
    taskMap,
    summary: {
      visualViews: taskMap.visualViews.length,
      deviceModes: taskMap.deviceModes.length,
      performanceBudgets: taskMap.performanceBudgets.length,
      implementationTasks: taskMap.implementationTasks.length,
      nonNegotiableRules: taskMap.nonNegotiableRules.length,
      ready: taskMap.ready,
    },
  }
}
