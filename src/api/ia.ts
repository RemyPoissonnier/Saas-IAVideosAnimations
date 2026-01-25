import { API_BASE } from "../components/hooks/apiClient";
import type { IaRequestPayload, IaResponse } from "./type";

// const API_BASE = import.meta.env.VITE_IA_API_BASE ?? 'http://localhost:3000/api'

/**
 * Send a generation request to the IA backend. The model is selectable via payload.model.
 */
export async function sendIaRequest(payload: IaRequestPayload): Promise<IaResponse> {
  
  const res = await fetch(`${API_BASE}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Unknown error')
    throw new Error(`IA request failed (${res.status}): ${errorText}`)
  }

  const json = await res.json() ;

  // On peut maintenant logger l'objet 'data' (qui est le résultat réel, pas une Promise)
  console.log("res json : ", json);
  
  // Et on retourne cet objet
  return json.data as IaResponse;
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
