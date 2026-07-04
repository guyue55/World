import { NextResponse } from 'next/server'
import { requireOwner } from '@/lib/owner-auth'

type R6DraftNode = {
  id: string
  title: string
  visibility: 'private' | 'draft' | 'public'
  updatedAt: string
}

let runtimeNodes: R6DraftNode[] = []

function jsonNoStore(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { 'cache-control': 'no-store' } })
}

export function GET(request: Request) {
  const guard = requireOwner(request, 'owner-only-draft-index')
  if (!guard.allowed) return guard.response

  return jsonNoStore({ scope: 'owner-only-draft-index', items: runtimeNodes })
}

export async function POST(request: Request) {
  const guard = requireOwner(request, 'owner-only-draft-create')
  if (!guard.allowed) return guard.response

  const body = await request.json().catch(() => ({})) as Partial<R6DraftNode>
  const title = typeof body.title === 'string' && body.title.trim() ? body.title.trim() : '未命名节点'
  const item: R6DraftNode = {
    id: typeof body.id === 'string' && body.id.trim() ? body.id.trim() : `r6-node-${Date.now()}`,
    title,
    visibility: body.visibility === 'public' || body.visibility === 'draft' || body.visibility === 'private' ? body.visibility : 'draft',
    updatedAt: new Date().toISOString(),
  }

  runtimeNodes = [item, ...runtimeNodes.filter((node) => node.id !== item.id)]

  return jsonNoStore({ ok: true, item }, 201)
}

export async function PATCH(request: Request) {
  const guard = requireOwner(request, 'owner-only-draft-update')
  if (!guard.allowed) return guard.response

  const body = await request.json().catch(() => ({})) as Partial<R6DraftNode>
  if (typeof body.id !== 'string' || !body.id.trim()) {
    return jsonNoStore({ ok: false, error: 'id_required' }, 400)
  }

  const existing = runtimeNodes.find((node) => node.id === body.id)
  const updated: R6DraftNode = {
    id: body.id,
    title: typeof body.title === 'string' && body.title.trim() ? body.title.trim() : existing?.title ?? '未命名节点',
    visibility: body.visibility === 'public' || body.visibility === 'draft' || body.visibility === 'private' ? body.visibility : existing?.visibility ?? 'draft',
    updatedAt: new Date().toISOString(),
  }

  runtimeNodes = [updated, ...runtimeNodes.filter((node) => node.id !== updated.id)]

  return jsonNoStore({ ok: true, item: updated })
}
