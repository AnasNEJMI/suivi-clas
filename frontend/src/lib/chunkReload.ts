const KEY = "chunk-reload-at"
const COOLDOWN_MS = 15_000

export function isChunkError(error: unknown): boolean {
  const msg = error instanceof Error ? `${error.name} ${error.message}` : String(error)
  return /Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed|Unable to preload CSS|ChunkLoadError/i.test(msg)
}

function recentlyReloaded(): boolean {
  try {
    return Date.now() - Number(sessionStorage.getItem(KEY) ?? 0) < COOLDOWN_MS
  } catch {
    return true // storage blocked: never auto-reload, to avoid a loop
  }
}

export function canReloadAutomatically(): boolean {
  return !recentlyReloaded()
}

export function reloadOnce(): boolean {
  if (recentlyReloaded()) return false
  try {
    sessionStorage.setItem(KEY, String(Date.now()))
  } catch {
    return false
  }
  window.location.reload()
  return true
}