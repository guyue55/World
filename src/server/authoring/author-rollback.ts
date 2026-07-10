import fs from 'node:fs'
import path from 'node:path'
import { atomicWrite, sha256File, type AuthorBackupManifest } from './author-transaction'

export function rollbackAuthorDraft(root: string, backupId: string) {
  if (!/^author-[0-9]+-[a-z0-9-]+$/.test(backupId)) throw new Error('backup id 格式无效。')
  const backupRoot = path.resolve(root, '.world-author-backups', backupId)
  const allowedRoot = path.resolve(root, '.world-author-backups') + path.sep
  if (!backupRoot.startsWith(allowedRoot)) throw new Error('backup id 越出受控目录。')
  const manifestPath = path.join(backupRoot, 'manifest.json')
  if (!fs.existsSync(manifestPath)) throw new Error('备份 manifest 不存在。')
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as AuthorBackupManifest
  if (manifest.version !== 1 || manifest.backupId !== backupId || manifest.status !== 'applied') throw new Error('备份 manifest 状态无效。')

  for (const entry of manifest.entries) {
    const target = path.resolve(root, entry.relativePath)
    if (!target.startsWith(path.resolve(root) + path.sep)) throw new Error(`目标越出工作区：${entry.relativePath}`)
    if (!fs.existsSync(target) || sha256File(target) !== entry.afterSha256) throw new Error(`当前文件已变化，拒绝覆盖：${entry.relativePath}`)
  }
  for (const entry of manifest.entries) {
    const target = path.resolve(root, entry.relativePath)
    if (!entry.existed) { fs.rmSync(target, { force: true }); continue }
    if (!entry.backupPath) throw new Error(`备份文件缺失：${entry.relativePath}`)
    const backupFile = path.resolve(root, entry.backupPath)
    if (!backupFile.startsWith(backupRoot + path.sep) || !fs.existsSync(backupFile)) throw new Error(`备份文件非法：${entry.relativePath}`)
    atomicWrite(target, fs.readFileSync(backupFile, 'utf8'))
    if (entry.beforeSha256 && sha256File(target) !== entry.beforeSha256) throw new Error(`回滚 checksum 不一致：${entry.relativePath}`)
  }
  const rolledBack = { ...manifest, status: 'rolled-back' as const, rolledBackAt: new Date().toISOString() }
  atomicWrite(manifestPath, `${JSON.stringify(rolledBack, null, 2)}\n`)
  return { backupId, restoredFiles: manifest.entries.map((entry) => entry.relativePath) }
}
