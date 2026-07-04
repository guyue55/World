import type { V2ContentRecord, V2VaultRecord } from './domain'

const now = () => new Date().toISOString()

export class InMemoryV2Repository {
  private readonly contents = new Map<string, V2ContentRecord>()
  private readonly vaultItems = new Map<string, V2VaultRecord>()

  constructor() {
    this.contents.set('welcome', {
      id: 'welcome',
      title: '古月浮屿 V2 服务化起点',
      slug: 'welcome',
      visibility: 'public',
      body: 'V2 introduces service boundaries while preserving the public world.',
      updatedAt: now(),
    })
  }

  listPublicContent() {
    return [...this.contents.values()].filter((item) => item.visibility === 'public')
  }

  upsertContent(record: Omit<V2ContentRecord, 'updatedAt'>) {
    const next = { ...record, updatedAt: now() }
    this.contents.set(record.id, next)
    return next
  }

  listVaultItems(ownerId: string) {
    return [...this.vaultItems.values()].filter((item) => item.ownerId === ownerId)
  }

  upsertVaultItem(record: Omit<V2VaultRecord, 'updatedAt'>) {
    const next = { ...record, updatedAt: now() }
    this.vaultItems.set(record.id, next)
    return next
  }
}

export const v2Repository = new InMemoryV2Repository()
