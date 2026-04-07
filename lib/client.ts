import type { TechfestEvent } from '@/types/event'
import type { RegistrationFormValues } from '@/lib/validations/registration'

// Default to local backend if .env isn't set
const base = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ?? 'http://localhost:8000'

/** List visible events — uses API */
export async function fetchEvents(): Promise<TechfestEvent[]> {
  const res = await fetch(`${base}/api/events`)
  if (!res.ok) throw new Error('Failed to load events')
  return res.json() as Promise<TechfestEvent[]>
}

/** Fetch specific event by slug */
export async function fetchEventBySlug(slug: string): Promise<TechfestEvent | null> {
  const res = await fetch(`${base}/api/events/${encodeURIComponent(slug)}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Failed to load event')
  return res.json() as Promise<TechfestEvent>
}

export interface RegistrationResponse {
  ok: boolean
  referenceId: string
  eventSlug: string
  message: string
}

export async function submitRegistration(
  eventId: string,
  payload: RegistrationFormValues
): Promise<RegistrationResponse> {
  const res = await fetch(`${base}/api/registrations/${eventId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || 'Registration failed')
  }
  
  return res.json() as Promise<RegistrationResponse>
}
