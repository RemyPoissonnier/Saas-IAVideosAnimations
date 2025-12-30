export type IaModel = 'nanobanan' | 'runway' | 'pika' | 'luma' | 'custom'

export type IaGenerationMode = 'full' | 'imageToVideo' | 'textToVideo' | 'character' | 'extend'

export type IaRequestPayload = {
  // model: IaModel
  // mode: IaGenerationMode
  userId : string
  prompt: string
  options?: Record<string, unknown>
}

export type IaResponse = {
  requestId: string
  model: IaModel
  status: 'queued' | 'running' | 'succeeded' | 'failed'
  previewUrl?: string
  outputUrl?: string
  error?: string
}

const API_BASE = import.meta.env.VITE_IA_API_BASE ?? 'http://localhost:3000/api'

/**
 * Send a generation request to the IA backend. The model is selectable via payload.model.
 */
export async function sendPrompt(payload: IaRequestPayload): Promise<IaResponse> {
  
  const res = await fetch(`${API_BASE}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Unknown error')
    throw new Error(`IA request failed (${res.status}): ${errorText}`)
  }

  console.log("res json : " , res.json());
  

  return res.json() as Promise<IaResponse>
}

/**
 * Retrieve the status of a generation job by ID.
 */
export async function fetchIaStatus(requestId: string): Promise<IaResponse> {
  const res = await fetch(`${API_BASE}/status/${encodeURIComponent(requestId)}`)
  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Unknown error')
    throw new Error(`IA status failed (${res.status}): ${errorText}`)
  }
  return res.json() as Promise<IaResponse>
}
