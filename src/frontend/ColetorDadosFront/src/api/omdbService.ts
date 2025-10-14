import type { FilmeDetalhes } from "../types/filme";
import axios from "axios";

const API_KEY=import.meta.env.OMDB_API_KEY;
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const buscarImdbIdPorNome = async (titulo: string) => {
    try {
        const response = await apiClient.get<FilmeDetalhes>('',{
            params: {
                s: titulo,
            },
        });
        return response.data;
    } catch (e) {
        console.error("Erro ao buscar filmes:", e);
    }
}

export const buscarDetalhesFilmePorId = async (imdbID: string) => {
    try {
        const response = await apiClient.get<FilmeDetalhes>('', {
            params: {
                i: imdbID,
                plot: 'full',
            },
        });
        return response.data;
    } catch (e) {
        console.error("Erro ao buscar detalhes do filme:", e);
    }
}