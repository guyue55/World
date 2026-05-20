export type V5Metric = {
  id: string
  kind: 'health' | 'error' | 'latency' | 'build' | 'agent-cost' | 'plugin-execution' | 'publishing'
  value: number
  unit: string
}

export class V5MetricsLedger {
  private readonly metrics: V5Metric[] = []

  add(metric: V5Metric) {
    this.metrics.push(metric)
  }

  list() {
    return [...this.metrics]
  }

  totalByKind(kind: V5Metric['kind']) {
    return this.metrics.filter((metric) => metric.kind === kind).reduce((sum, metric) => sum + metric.value, 0)
  }
}
