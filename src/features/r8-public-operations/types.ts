export type R8Visibility = 'public' | 'public-summary' | 'owner-only'

export type R8Channel = {
  id: string
  name: string
  audience: string
  visibility: R8Visibility
  cadence: string
  purpose: string
}

export type R8CalendarItem = {
  id: string
  title: string
  type: string
  visibility: R8Visibility
  status: 'planned' | 'ready' | 'published'
}

export type R8Risk = {
  id: string
  level: 'low' | 'medium' | 'high' | 'critical'
  mitigation: string
}

export type R8Summary = {
  stages: number
  batches: number
  channels: number
  calendarItems: number
  smokeTests: number
  risks: number
  productionLive: boolean
  releaseReady: boolean
  cleanProductionReady: boolean
}
