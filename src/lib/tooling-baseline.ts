import toolingBaseline from '../../data/tooling-baseline.json'

export type ToolingIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
}

export function getToolingBaseline() {
  return toolingBaseline
}

export function validateToolingPackage(pkg: {
  scripts?: Record<string, string>
  devDependencies?: Record<string, string>
}): ToolingIssue[] {
  const issues: ToolingIssue[] = []

  toolingBaseline.requiredScripts.forEach((script) => {
    if (!pkg.scripts?.[script]) {
      issues.push({
        id: `missing-script-${script}`,
        severity: 'error',
        message: `package.json 缺少脚本：${script}`,
      })
    }
  })

  toolingBaseline.requiredDevDependencies.forEach((dep) => {
    if (!pkg.devDependencies?.[dep]) {
      issues.push({
        id: `missing-dev-dependency-${dep}`,
        severity: 'error',
        message: `package.json 缺少开发依赖：${dep}`,
      })
    }
  })

  if (pkg.scripts?.lint?.includes('next lint')) {
    issues.push({
      id: 'next-lint-deprecated',
      severity: 'error',
      message: 'lint 脚本不应继续使用 next lint。',
    })
  }

  return issues
}
