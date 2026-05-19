import moduleArchitectureContract from '../../data/module-architecture-contract.json'
import dependencyDirectionContract from '../../data/dependency-direction-contract.json'
import componentContract from '../../data/component-contract.json'
import extensionInterfaceContract from '../../data/extension-interface-contract.json'
import couplingGuard from '../../data/coupling-guard.json'

export type ArchitectureIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
}

export function getModuleArchitectureContract() {
  return moduleArchitectureContract
}

export function getDependencyDirectionContract() {
  return dependencyDirectionContract
}

export function getComponentContract() {
  return componentContract
}

export function getExtensionInterfaceContract() {
  return extensionInterfaceContract
}

export function getCouplingGuard() {
  return couplingGuard
}

export function validateArchitectureContracts(): ArchitectureIssue[] {
  const issues: ArchitectureIssue[] = []

  moduleArchitectureContract.layers.forEach((layer) => {
    if (!layer.owns.length) {
      issues.push({
        id: `layer-owns-empty-${layer.id}`,
        severity: 'error',
        message: `模块层 ${layer.id} 缺少 owns。`,
      })
    }

    if (!layer.mustNotOwn.length) {
      issues.push({
        id: `layer-must-not-own-empty-${layer.id}`,
        severity: 'warning',
        message: `模块层 ${layer.id} 缺少 mustNotOwn。`,
      })
    }
  })

  dependencyDirectionContract.forbiddenImports.forEach((item) => {
    if (!item.reason) {
      issues.push({
        id: `forbidden-import-no-reason-${item.from}-${item.to}`,
        severity: 'error',
        message: `禁止依赖 ${item.from} -> ${item.to} 缺少原因。`,
      })
    }
  })

  extensionInterfaceContract.interfaces.forEach((item) => {
    if (!item.input || !item.output) {
      issues.push({
        id: `extension-interface-incomplete-${item.id}`,
        severity: 'error',
        message: `扩展接口 ${item.id} 缺少 input/output。`,
      })
    }
  })

  if (couplingGuard.antiPatterns.length < 6) {
    issues.push({
      id: 'anti-patterns-too-few',
      severity: 'warning',
      message: '反耦合反模式数量偏少。',
    })
  }

  return issues
}
