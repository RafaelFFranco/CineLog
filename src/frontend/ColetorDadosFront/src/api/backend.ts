import type{ Favorito as Favorite, Avaliacao as Rating, Estatisticas as Statistics } from "../types/filme";

// URL base do backend - ajustar conforme necessário
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000/api";

// Helper para fazer requests
const fetchAPI = async (endpoint: string, options?: RequestInit) => {
  const response = await fetch(`${BACKEND_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Erro desconhecido" }));
    throw new Error(error.message || "Erro na requisição");
  }

  return response.json();
};

export const backendService = {
  // Favoritos
  favoritos: {
    getAll: async (): Promise<Favorite[]> => {
      return fetchAPI("/favoritos/get-all");
    },

    add: async (imdbID: string, titulo: string, poster: string, ano: string): Promise<Favorite> => {
      return fetchAPI("/favoritos/add", {
        method: "POST",
        body: JSON.stringify({ imdbID, titulo, poster, ano }),
      });
    },

    remove: async (favoritoId: string): Promise<void> => {
      return fetchAPI(`/favoritos/remove/${favoritoId}`, {
        method: "DELETE",
      });
    },

    getByMovieId: async (imdbID: string): Promise<Favorite | null> => {
      try {
        return await fetchAPI(`/favoritos/get/${imdbID}`);
      } catch {
        return null;
      }
    },
  },

  // Avaliações
  ratings: {
    getAll: async (): Promise<Rating[]> => {
      return fetchAPI("/avaliacoes/get-all");
    },

    getByMovieId: async (imdbID: string): Promise<Rating | null> => {
      try {
        return await fetchAPI(`/avaliacoes/get/${imdbID}`);
      } catch {
        return null;
      }
    },

    create: async (imdbID: string, nota: number, comentario: string): Promise<Rating> => {
      return fetchAPI("/avaliacoes/add", {
        method: "POST",
        body: JSON.stringify({ imdbID, nota, comentario }),
      });
    },

    update: async (imdbID: string, nota: number, comentario: string): Promise<Rating> => {
      return fetchAPI(`/avaliacoes/update`, {
        method: "PUT",
        body: JSON.stringify({ imdbID, nota, comentario }),
      });
    },

    delete: async (imdbID: string): Promise<void> => {
      return fetchAPI(`/avaliacoes/remove/${imdbID}`, {
        method: "DELETE",
      });
    },
  },

  // Histórico de buscas
  searchHistory: {
    add: async (imdbID: string, genero: string, ano: string, nome: string, imdbRating: string): Promise<void> => {
      return fetchAPI("/historico/add", {
        method: "POST",
        body: JSON.stringify({ imdbID, genero, ano, nome, imdbRating }),
      });
    },
  },

  // Estatísticas
  statistics: {
    get: async (): Promise<Statistics> => {
      return fetchAPI("/estatisticas/get");
    },
  },
};
