import assemblyManifest from '../../data/foundation-assembly-manifest.json'
import environmentBaseline from '../../data/environment-baseline.json'
import repositoryContract from '../../data/repository-structure-contract.json'
import reproducibilityContract from '../../data/reproducibility-contract.json'

export type AssemblyIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
}

export function getAssemblyManifest() {
  return assemblyManifest
}

export function getEnvironmentBaseline() {
  return environmentBaseline
}

export function getRepositoryStructureContract() {
  return repositoryContract
}

export function getReproducibilityContract() {
  return reproducibilityContract
}

export function validateAssemblyData(): AssemblyIssue[] {
  const issues: AssemblyIssue[] = []

  if (assemblyManifest.mergeOrder.length < 10) {
    issues.push({
      id: 'merge-order-too-short',
      severity: 'error',
      message: '地基装配清单中的 mergeOrder 过短。',
    })
  }

  if (assemblyManifest.requiredRoots.length < 6) {
    issues.push({
      id: 'required-roots-too-few',
      severity: 'error',
      message: '地基装配清单中的 requiredRoots 过少。',
    })
  }

  if (environmentBaseline.requiredScripts.length < 8) {
    issues.push({
      id: 'required-scripts-too-few',
      severity: 'error',
      message: '环境基线中的 requiredScripts 过少。',
    })
  }

  if (repositoryContract.roots.length < 6) {
    issues.push({
      id: 'repository-roots-too-few',
      severity: 'error',
      message: '仓库结构契约中的 roots 过少。',
    })
  }

  if (reproducibilityContract.checks.length < 6) {
    issues.push({
      id: 'reproducibility-checks-too-few',
      severity: 'error',
      message: '可复现契约中的 checks 过少。',
    })
  }

  return issues
}
