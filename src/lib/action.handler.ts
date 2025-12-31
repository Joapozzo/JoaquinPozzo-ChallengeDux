import { ZodError } from 'zod';

// Response estandarizada 
export type ActionResponse<T = unknown> = 
  | { success: true; data: T; error?: never }
  | { success: false; error: string; data?: never };


// Para mutaciones 
export async function handleAction<T>(
  action: () => Promise<T>
): Promise<ActionResponse<T>> {
  try {
    const data = await action();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Error en action:', error);

    if (error instanceof ZodError) {
      return {
        success: false,
        error: 'Datos de formulario inválidos: ' + error.issues[0].message,
      };
    }

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    // Error desconocido
    return {
      success: false,
      error: 'Ha ocurrido un error inesperado',
    };
  }
}

// Para queries - Server components
export async function handleServerAction<T>(
  action: () => Promise<T>
): Promise<T> {
  const result = await handleAction(action);
  
  if (!result.success) {
    throw new Error(result.error);
  }
  
  return result.data;
}

// Fetch centralizado para todas las peticiones API
export async function apiFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  return fetch(url, options);
}

// Helper para parsear respuestas HTTP
export async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const text = await response.text();
    const message = text.split('\n')[0].replace('Error: ', '').trim();

    throw new Error(
      message || `Error ${response.status}: ${response.statusText}`
    );
  }

  return response.json();
}
