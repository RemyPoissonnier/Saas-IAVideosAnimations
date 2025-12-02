export type UserProfile = {
  name: string
  email: string
}

export type GenerationRecord = {
  id: string
  userEmail: string
  createdAt: string
  topic: string
  catType: string
  tone: string
  callToAction: string
  duration: number
  language: string
  overlay: string
  scriptBeats: string[]
  hashtags: string[]
  platform: 'tiktok'
  status: 'ready' | 'queued'
}

type DbSchema = {
  user?: UserProfile
  generations: GenerationRecord[]
}

const STORAGE_KEY = 'whisker-studio-db'

const SEED: DbSchema = {
  generations: [],
}

const isBrowser = typeof window !== 'undefined'

const safeStorage = (): Storage | null => {
  if (!isBrowser) return null
  try {
    return window.localStorage
  } catch (_err) {
    return null
  }
}

const readDb = (): DbSchema => {
  const store = safeStorage()
  if (!store) return structuredClone(SEED)
  const raw = store.getItem(STORAGE_KEY)
  if (!raw) {
    store.setItem(STORAGE_KEY, JSON.stringify(SEED))
    return structuredClone(SEED)
  }
  try {
    return JSON.parse(raw) as DbSchema
  } catch (_err) {
    store.removeItem(STORAGE_KEY)
    store.setItem(STORAGE_KEY, JSON.stringify(SEED))
    return structuredClone(SEED)
  }
}

const persistDb = (db: DbSchema) => {
  const store = safeStorage()
  if (!store) return
  store.setItem(STORAGE_KEY, JSON.stringify(db, null, 2))
  if (isBrowser) {
    window.dispatchEvent(new Event('local-db-update'))
  }
}

export const loadUser = (): UserProfile | null => {
  const db = readDb()
  return db.user ?? null
}

export const persistUser = (user: UserProfile) => {
  const db = readDb()
  db.user = user
  persistDb(db)
}

export const removeUser = () => {
  const db = readDb()
  delete db.user
  persistDb(db)
}

export const saveGeneration = (record: GenerationRecord) => {
  const db = readDb()
  db.generations = [record, ...db.generations].slice(0, 30)
  persistDb(db)
}

export const listGenerations = (userEmail?: string | null): GenerationRecord[] => {
  const db = readDb()
  if (!userEmail) return db.generations
  return db.generations.filter((item) => item.userEmail === userEmail)
}

export const exportDbAsJson = () => {
  const db = readDb()
  return JSON.stringify(db, null, 2)
}
