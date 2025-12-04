type UserPayload = {
  name: string
  email: string
  password?: string
}

export type AuthResponse = {
  token: string
  user: {
    name: string
    email: string
    id?: string
  }
  subscription?: SubscriptionInfo
  usage?: UsageInfo
}

export type SubscriptionInfo = {
  plan: string
  renewsAt?: string
  status: 'active' | 'past_due' | 'canceled' | 'trial'
  paymentHistory?: PaymentRecord[]
}

export type PaymentRecord = {
  id: string
  amount: number
  currency: string
  createdAt: string
  status: 'succeeded' | 'pending' | 'failed'
  description?: string
}

export type UsageInfo = {
  tokensLeft: number
  tokensUsed?: number
  periodStart?: string
  periodEnd?: string
}

const AUTH_BASE = import.meta.env.VITE_AUTH_API_BASE ?? '/api/auth'

const saveAuthToLocal = (data: AuthResponse) => {
  localStorage.setItem('auth-session', JSON.stringify(data))
}

export const loadAuthFromLocal = (): AuthResponse | null => {
  const raw = localStorage.getItem('auth-session')
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthResponse
  } catch {
    return null
  }
}

export async function signin(payload: UserPayload): Promise<AuthResponse> {
  const res = await fetch(`${AUTH_BASE}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error')
    throw new Error(`Signin failed (${res.status}): ${text}`)
  }
  const data = (await res.json()) as AuthResponse
  saveAuthToLocal(data)
  return data
}

export async function signup(payload: UserPayload): Promise<AuthResponse> {
  const res = await fetch(`${AUTH_BASE}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error')
    throw new Error(`Signup failed (${res.status}): ${text}`)
  }
  const data = (await res.json()) as AuthResponse
  saveAuthToLocal(data)
  return data
}
