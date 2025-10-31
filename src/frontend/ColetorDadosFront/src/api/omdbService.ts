import type { Filme as Movie, FilmeDetalhes as MovieDetails} from "../types/filme";

//Chave OMDB exposta para facilitar teste do software, em ambiente de prod seria adicionado em uma .env
const OMDB_API_KEY = process.env.OMDB_API_KEY ; 
const OMDB_BASE_URL = "https://www.omdbapi.com/";

interface OMDbSearchResponse {
  Search?: Movie[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

interface OMDbDetailResponse extends Partial<MovieDetails> {
  Response: string;
  Error?: string;
}

export const omdbService = {
  searchMovies: async (query: string): Promise<Movie[]> => {
    try {
      const response = await fetch(
        `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&type=movie`
      );
      
      if (!response.ok) {
        throw new Error("Falha ao buscar filmes");
      }

      const data: OMDbSearchResponse = await response.json();
      
      if (data.Response === "False") {
        if (data.Error === "Movie not found!") {
          return [];
        }
        throw new Error(data.Error || "Erro ao buscar filmes");
      }

      return data.Search || [];
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      throw error;
    }
  },

  getMovieDetails: async (imdbId: string): Promise<MovieDetails> => {
    try {
      const response = await fetch(
        `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${imdbId}&plot=full`
      );
      
      if (!response.ok) {
        throw new Error("Falha ao buscar detalhes do filme");
      }

      const data: OMDbDetailResponse = await response.json();
      
      if (data.Response === "False") {
        throw new Error(data.Error || "Erro ao buscar detalhes do filme");
      }

      return data as MovieDetails;
    } catch (error) {
      console.error("Erro ao buscar detalhes do filme:", error);
      throw error;
    }
  },
};
