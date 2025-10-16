// Types para dados de filmes da OMDb API
export interface Filme {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

export interface FilmeDetalhes extends Filme {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
}

// Types para dados do backend
export interface Avaliacao {
  id: string;
  imdbID: string;
  nota: number;
  comentario: string;
}

export interface Favorito {
  id: string;
  imdbID: string;
  titulo: string;
  poster: string;
  ano: string;
}

export interface Historico {
  id: string;
  query: string;
}

export interface Estatisticas {
  buscasTotais: number;
  generoMaisBuscado: {
    genero: string;
    contagem: number;
  };
  distribuicaoGenero: Array<{
    genero: string;
    contagem: number;
  }>;
  decadaFavorita: string;
  notaMedia: number;
  distribuicaoAno: Array<{
    ano: string;
    contagem: number;
  }>;
}
