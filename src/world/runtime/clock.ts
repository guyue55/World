export type WorldDayPeriod = 'dawn' | 'day' | 'dusk' | 'night'
export type WorldSeason = 'spring' | 'summer' | 'autumn' | 'winter'

export type WorldTimeSnapshot = {
  nowEpochMs: number
  timeZone: string
  dayProgress: number
  dayPeriod: WorldDayPeriod
  season: WorldSeason
  seasonProgress: number
  worldDateKey: string
}

export const WORLD_TIME_ZONE = 'Asia/Shanghai'

type ZonedDateParts = {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
  millisecond: number
}

function readZonedDateParts(nowEpochMs: number, timeZone: string): ZonedDateParts {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3,
    hourCycle: 'h23',
  })
  const values = Object.fromEntries(formatter.formatToParts(new Date(nowEpochMs)).map((part) => [part.type, part.value]))
  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour),
    minute: Number(values.minute),
    second: Number(values.second),
    millisecond: Number(values.fractionalSecond ?? 0),
  }
}

function getDayPeriod(hour: number): WorldDayPeriod {
  if (hour >= 5 && hour < 9) return 'dawn'
  if (hour >= 9 && hour < 17) return 'day'
  if (hour >= 17 && hour < 21) return 'dusk'
  return 'night'
}

function getSeasonWindow(parts: ZonedDateParts) {
  const { year, month } = parts
  if (month >= 3 && month <= 5) return { season: 'spring' as const, start: Date.UTC(year, 2, 1), end: Date.UTC(year, 5, 1) }
  if (month >= 6 && month <= 8) return { season: 'summer' as const, start: Date.UTC(year, 5, 1), end: Date.UTC(year, 8, 1) }
  if (month >= 9 && month <= 11) return { season: 'autumn' as const, start: Date.UTC(year, 8, 1), end: Date.UTC(year, 11, 1) }
  if (month === 12) return { season: 'winter' as const, start: Date.UTC(year, 11, 1), end: Date.UTC(year + 1, 2, 1) }
  return { season: 'winter' as const, start: Date.UTC(year - 1, 11, 1), end: Date.UTC(year, 2, 1) }
}

export function buildWorldTimeSnapshot(nowEpochMs: number, timeZone: string): WorldTimeSnapshot {
  if (!Number.isFinite(nowEpochMs)) throw new TypeError('World Clock epoch must be finite.')
  const parts = readZonedDateParts(nowEpochMs, timeZone)
  const wallClockMs = (((parts.hour * 60 + parts.minute) * 60 + parts.second) * 1_000) + parts.millisecond
  const localCalendarMs = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second, parts.millisecond)
  const seasonWindow = getSeasonWindow(parts)
  const seasonProgress = (localCalendarMs - seasonWindow.start) / (seasonWindow.end - seasonWindow.start)
  const pad = (value: number) => String(value).padStart(2, '0')

  return {
    nowEpochMs,
    timeZone,
    dayProgress: Math.min(1, Math.max(0, wallClockMs / 86_400_000)),
    dayPeriod: getDayPeriod(parts.hour),
    season: seasonWindow.season,
    seasonProgress: Math.min(1, Math.max(0, seasonProgress)),
    worldDateKey: `${parts.year}-${pad(parts.month)}-${pad(parts.day)}`,
  }
}
