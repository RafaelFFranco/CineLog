import axios from "axios";

const API_KEY = import.meta.env.TMDB_API_KEY;

const apiClient = axios.create({
    baseURL: "https://api.themoviedb.org/",
    headers: {
        "Content-Type": "application/json",
    },
});

export const buscarFilmesPopulares = async () => {
    try {
        const response = await apiClient.get(`3/movie/popular?api_key=${API_KEY}?language=en`, {});

        return response.data;
    } catch (e) {
        console.error("Erro ao buscar filmes populares:", e);
    }
}