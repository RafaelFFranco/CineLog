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

    getByMovieId: async (movieId: string): Promise<Favorite | null> => {
      try {
        return await fetchAPI(`/favoritos/${movieId}`);
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

    getByMovieId: async (movieId: string): Promise<Rating | null> => {
      try {
        return await fetchAPI(`/avaliacoes/movie/${movieId}`);
      } catch {
        return null;
      }
    },

    create: async (movieId: string, rating: number, comment: string): Promise<Rating> => {
      return fetchAPI("/avaliacoes/add", {
        method: "POST",
        body: JSON.stringify({ movieId, rating, comment }),
      });
    },

    update: async (ratingId: string, rating: number, comment: string): Promise<Rating> => {
      return fetchAPI(`/avaliacoes/${ratingId}`, {
        method: "PUT",
        body: JSON.stringify({ rating, comment }),
      });
    },

    delete: async (ratingId: string): Promise<void> => {
      return fetchAPI(`/ratings/${ratingId}`, {
        method: "DELETE",
      });
    },
  },

  // Histórico de buscas
  searchHistory: {
    add: async (query: string): Promise<void> => {
      return fetchAPI("/search-history", {
        method: "POST",
        body: JSON.stringify({ query }),
      });
    },
  },

  // Estatísticas
  statistics: {
    get: async (): Promise<Statistics> => {
      return fetchAPI("/statistics");
    },
  },
};
