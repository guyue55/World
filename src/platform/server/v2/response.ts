import type { V2ServiceResult } from './domain'

export function jsonResult<T>(result: V2ServiceResult<T>) {
  return Response.json(result, { status: result.status })
}

export function ok<T>(data: T, status = 200): V2ServiceResult<T> {
  return {
    ok: true,
    status,
    data,
  }
}

export function denied(reason: string): V2ServiceResult<never> {
  return {
    ok: false,
    status: 403,
    error: reason,
  }
}
