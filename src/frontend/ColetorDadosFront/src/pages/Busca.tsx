import { useState } from "react";
import { Film } from "lucide-react";
import SearchBar from "../componentes/BarraBusca";
import MovieCard from "../componentes/MovieCard";
import LoadingSpinner from "../componentes/Carregando";
import type { Filme as Movie } from "../types/filme";
import { omdbService } from "../api/omdbService";
import { backendService } from "../api/backend";
import { useToast } from "../hooks/use-toast";

const Search = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setHasSearched(true);

    try {
      const results = await omdbService.searchMovies(query);
      setMovies(results);

      if (results.length === 0) {
        toast({
          title: "Nenhum resultado",
          description: "Nenhum filme encontrado com este termo.",
        });
      }
    } catch (error) {
      toast({
        title: "Erro na busca",
        description: "Não foi possível buscar os filmes. Tente novamente.",
        variant: "destructive",
      });
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero border-b border-border py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 space-y-4 animate-fade-up">
            <div className="inline-flex items-center justify-center p-3 rounded-full gradient-gold mb-4">
              <Film className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Descubra Filmes Incríveis
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Busque, avalie e organize sua coleção de filmes favoritos
            </p>
          </div>

          <div className="animate-fade-in">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <LoadingSpinner />
          ) : hasSearched ? (
            movies.length > 0 ? (
              <>
                <h2 className="text-2xl font-bold mb-6">
                  {movies.length} {movies.length === 1 ? "resultado encontrado" : "resultados encontrados"}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                  {movies.map((movie) => (
                    <div key={movie.imdbID} className="animate-scale-in">
                      <MovieCard movie={movie} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Film className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-xl text-muted-foreground">
                  Nenhum filme encontrado
                </p>
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <Film className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-xl text-muted-foreground">
                Faça uma busca para começar
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Search;
