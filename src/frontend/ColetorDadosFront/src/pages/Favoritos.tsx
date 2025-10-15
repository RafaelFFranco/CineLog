import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, Film } from "lucide-react";
import { Card } from "../componentes/ui/card";
import LoadingSpinner from "../componentes/Carregando";
import type { Favorito, Avaliacao } from "../types/filme";
import { backendService } from "../api/backend";
import { useToast } from "../hooks/use-toast";
import { cn } from "../util/utils";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Favorito[]>([]);
  const [ratings, setRatings] = useState<Record<string, Avaliacao>>({});
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setIsLoading(true);
    try {
      const [favoritesData, ratingsData] = await Promise.all([
        backendService.favoritos.getAll(),
        backendService.ratings.getAll(),
      ]);

     
      setFavorites(favoritesData);

      console.log("favoritesData:", favoritesData);

      const ratingsMap: Record<string, Avaliacao> = {};
      ratingsData.forEach((rating: Avaliacao) => {
        if (rating.imdbID) {
          ratingsMap[rating.imdbID] = rating;
        }
      });
      setRatings(ratingsMap);

    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      toast({
        title: "Erro ao carregar favoritos",
        description: "Não foi possível carregar seus filmes favoritos. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  console.log("Favoritos carregados:", favorites);
  console.log("Avaliações carregadas:", ratings);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="gradient-hero border-b border-border py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full gradient-gold">
              <Heart className="w-8 h-8 text-primary-foreground fill-current" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Meus Favoritos
          </h1>
          <p className="text-xl text-muted-foreground text-center">
            {favorites.length} {favorites.length === 1 ? "filme favorito" : "filmes favoritos"}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-semibold mb-2">
              Nenhum favorito ainda
            </h2>
            <p className="text-muted-foreground mb-6">
              Adicione filmes aos seus favoritos para vê-los aqui
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg gradient-gold text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Buscar Filmes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => {
              const rating = ratings[favorite.imdbID];
              const hasPoster = favorite.poster && favorite.poster !== "N/A";

              return (
                <Link
                  key={favorite.id}
                  to={`/movie/${favorite.imdbID}`}
                  className="group"
                >
                  <Card className="overflow-hidden gradient-card border-border hover-scale hover-glow h-full flex flex-col">
                    <div className="flex gap-4 p-4 flex-grow">
                      <div className="flex-shrink-0 w-24 h-36 rounded-lg overflow-hidden bg-muted">
                        {hasPoster ? (
                          <img
                            src={favorite.poster}
                            alt={favorite.titulo}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Film className="w-8 h-8 text-muted-foreground opacity-50" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                          {favorite.titulo}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {favorite.ano}
                        </p>

                        {rating && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={cn(
                                    "w-4 h-4",
                                    star <= rating.rating
                                      ? "fill-primary text-primary"
                                      : "text-muted-foreground"
                                  )}
                                />
                              ))}
                            </div>
                            {rating.comment && (
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {rating.comment}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;