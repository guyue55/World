type Bucket = { startedAt: number; count: number }

export class LighthouseRateLimiter {
  private readonly buckets = new Map<string, Bucket>()
  constructor(private readonly limit = 12, private readonly windowMs = 60_000) {}

  consume(key: string, now = Date.now()) {
    const current = this.buckets.get(key)
    if (!current || now - current.startedAt >= this.windowMs) {
      this.buckets.set(key, { startedAt: now, count: 1 })
      return { allowed: true, remaining: this.limit - 1, retryAfterSeconds: 0 }
    }
    if (current.count >= this.limit) {
      return { allowed: false, remaining: 0, retryAfterSeconds: Math.max(1, Math.ceil((this.windowMs - (now - current.startedAt)) / 1000)) }
    }
    current.count += 1
    return { allowed: true, remaining: this.limit - current.count, retryAfterSeconds: 0 }
  }

  reset() { this.buckets.clear() }
}

export const lighthouseRateLimiter = new LighthouseRateLimiter()
