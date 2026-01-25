export const API_BASE = "http://localhost:3000/api";

// types.ts (ou en haut du fichier)
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * Used for send request for our API, localhost api
 * @param urendpointl start for / url
 * @param payload 
 * @returns json.data
 */
export async function apiClient<T>(
  endpoint: string, 
  method: HttpMethod = 'GET', 
  payload?: unknown // 'unknown' est plus sûr que 'any'
): Promise<T> {
  
  // Gestion propre de l'URL (évite les doubles // si API_BASE finit par /)
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE}${cleanEndpoint}`;

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      // Tu pourras ajouter d'autres headers ici (ex: langue)
    },
    credentials: "include", // 👈 INDISPENSABLE pour envoyer ton cookie 'session'
  };

  if (payload && method !== 'GET') {
    options.body = JSON.stringify(payload);
  }

  try {
    const res = await fetch(url, options);

    // Gestion d'erreur avancée
    if (!res.ok) {
      // On tente de lire le JSON d'erreur du serveur, sinon texte brut
      const errorData = await res.json().catch(() => null);
      const errorMessage = errorData?.error || errorData?.message || await res.text();
      throw new Error(errorMessage || `Erreur ${res.status}`);
    }

    const json = await res.json();
    
    // Si ton API renvoie toujours { data: ... }, tu peux le déballer ici
    return json.data ?? json; 

  } catch (error) {
    console.error(`❌ API Error [${method} ${endpoint}]:`, error);
    throw error; // On relance pour que l'UI puisse afficher un message
  }
}