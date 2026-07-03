import { r6ApiContracts, r6AuditEvents, r6ExportJobs, r6ForbiddenTerms, r6Roles } from './data'

export function assertR6ServiceBoundary(): string[] {
  const errors: string[] = []

  if (!r6Roles.some((role) => role.id === 'owner')) errors.push('R6 must define owner role')
  if (!r6Roles.some((role) => role.id === 'visitor')) errors.push('R6 must define visitor role')

  const mutatingContracts = r6ApiContracts.filter((contract) => contract.mutates)
  if (mutatingContracts.length > 0) errors.push('R6 service bridge must not expose mutating API contracts before owner auth')

  const publicUnsafe = r6ApiContracts.filter((contract) => contract.visibility === 'public' && contract.path !== '/api/r6/service-health')
  if (publicUnsafe.length > 0) errors.push('Only service-health can be public in R6 service bridge')

  if (r6AuditEvents.some((event) => event.mutatesWorld)) errors.push('R6 audit events must not mutate world')
  if (r6ExportJobs.some((job) => job.containsPrivate === true)) errors.push('R6 export jobs must not contain private payloads')
  if (r6ForbiddenTerms.length < 4) errors.push('R6 privacy boundary must include forbidden terms')

  return errors
}
