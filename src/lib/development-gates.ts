import developmentGates from '../../data/development-gates.json'
import { evaluateWorldKernel } from './world-kernel'

export type DevelopmentGate = {
  id: string
  name: string
  status: 'active' | 'next' | 'reserved'
  entryCriteria?: string[]
  exitCriteria?: string[]
}

export type GateReport = {
  current: DevelopmentGate | undefined
  next: DevelopmentGate[]
  kernelPass: boolean
  blockingErrors: number
}

export function getDevelopmentGates(): DevelopmentGate[] {
  return developmentGates.stages as DevelopmentGate[]
}

export function getGateReport(): GateReport {
  const kernel = evaluateWorldKernel()

  return {
    current: getDevelopmentGates().find((gate) => gate.status === 'active'),
    next: getDevelopmentGates().filter((gate) => gate.status === 'next'),
    kernelPass: kernel.blockingErrors === 0,
    blockingErrors: kernel.blockingErrors,
  }
}
