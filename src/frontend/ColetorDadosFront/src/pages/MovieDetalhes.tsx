import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, Star, Calendar, Clock, Globe, Award, ArrowLeft } from "lucide-react";
import { Button } from "../componentes/ui/button";
import { Card } from "../componentes/ui/card";
import RatingForm from "../componentes/AvaliacaoForm";
import LoadingSpinner from "../componentes/Carregando";
import type{ FilmeDetalhes as MovieDetailsType, Avaliacao as RatingType } from "../types/filme";
import { omdbService } from "../api/omdbService";
import { backendService } from "../api/backend";
import { useToast } from "../hooks/use-toast";
import { cn } from "../util/utils";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState<string | null>(null);
  const [rating, setRating] = useState<RatingType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadMovieData(id);
    }
  }, [id]);

  const loadMovieData = async (movieId: string) => {
    setIsLoading(true);
    try {
      const [movieData, favoriteData, ratingData] = await Promise.all([
        omdbService.getMovieDetails(movieId),
        backendService.favoritos.getByMovieId(movieId),
        backendService.ratings.getByMovieId(movieId),
      ]);

      setMovie(movieData);
      setIsFavorite(!!favoriteData);
      setFavoriteId(favoriteData?.id || null);
      setRating(ratingData);
    } catch (error) {
      toast({
        title: "Erro ao carregar filme",
        description: "Não foi possível carregar os detalhes do filme.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!movie) return;

    try {
      if (isFavorite && favoriteId) {
        await backendService.favoritos.remove(favoriteId);
        setIsFavorite(false);
        setFavoriteId(null);
        toast({
          title: "Removido dos favoritos",
          description: `${movie.Title} foi removido dos seus favoritos.`,
        });
      } else {
        const favorite = await backendService.favoritos.add(
          movie.imdbID,
          movie.Title,
          movie.Poster,
          movie.Year
        );
        setIsFavorite(true);
        setFavoriteId(favorite.id);
        toast({
          title: "Adicionado aos favoritos",
          description: `${movie.Title} foi adicionado aos seus favoritos!`,
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar os favoritos.",
        variant: "destructive",
      });
    }
  };

  const handleSaveRating = async (ratingValue: number, comment: string) => {
    if (!movie) return;

    try {
      if (rating) {
        const updated = await backendService.ratings.update(rating.id, ratingValue, comment);
        setRating(updated);
        toast({
          title: "Avaliação atualizada",
          description: "Sua avaliação foi atualizada com sucesso!",
        });
      } else {
        const newRating = await backendService.ratings.create(movie.imdbID, ratingValue, comment);
        setRating(newRating);
        toast({
          title: "Avaliação salva",
          description: "Sua avaliação foi salva com sucesso!",
        });
      }
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar a avaliação.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRating = async () => {
    if (!rating) return;

    try {
      await backendService.ratings.delete(rating.id);
      setRating(null);
      toast({
        title: "Avaliação excluída",
        description: "Sua avaliação foi excluída com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir a avaliação.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Filme não encontrado</p>
      </div>
    );
  }

  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <div className="min-h-screen">
      {/* Hero Section with Backdrop */}
      <div className="relative">
        <div className="absolute inset-0 gradient-hero opacity-90" />
        {hasPoster && (
          <div 
            className="absolute inset-0 bg-cover bg-center blur-3xl opacity-20"
            style={{ backgroundImage: `url(${movie.Poster})` }}
          />
        )}
        
        <div className="relative container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <div className="grid md:grid-cols-[300px_1fr] gap-8 animate-fade-up">
            {/* Poster */}
            <div className="mx-auto md:mx-0">
              <Card className="overflow-hidden gradient-card shadow-card">
                {hasPoster ? (
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full aspect-[2/3] object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[2/3] bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">Sem imagem</span>
                  </div>
                )}
              </Card>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{movie.Title}</h1>
                <div className="flex flex-wrap gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {movie.Year}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {movie.Runtime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    {movie.Language}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {movie.Genre?.split(", ").map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleToggleFavorite}
                  className={cn(
                    "transition-smooth",
                    isFavorite
                      ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                      : "bg-card hover:bg-muted border border-border"
                  )}
                >
                  <Heart className={cn("w-4 h-4 mr-2", isFavorite && "fill-current")} />
                  {isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
                </Button>
              </div>

              {movie.Plot && movie.Plot !== "N/A" && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Sinopse</h2>
                  <p className="text-muted-foreground leading-relaxed">{movie.Plot}</p>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                {movie.Director && movie.Director !== "N/A" && (
                  <div>
                    <h3 className="font-semibold mb-1">Diretor</h3>
                    <p className="text-muted-foreground">{movie.Director}</p>
                  </div>
                )}
                {movie.Actors && movie.Actors !== "N/A" && (
                  <div>
                    <h3 className="font-semibold mb-1">Elenco</h3>
                    <p className="text-muted-foreground">{movie.Actors}</p>
                  </div>
                )}
              </div>

              {movie.Awards && movie.Awards !== "N/A" && (
                <div className="flex items-start gap-2 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <Award className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Prêmios</h3>
                    <p className="text-sm text-muted-foreground">{movie.Awards}</p>
                  </div>
                </div>
              )}

              {movie.imdbRating && movie.imdbRating !== "N/A" && (
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary fill-primary" />
                  <span className="text-2xl font-bold">{movie.imdbRating}</span>
                  <span className="text-muted-foreground">/10 IMDb</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rating Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Sua Avaliação</h2>
        
        {rating && !isEditing ? (
          <Card className="p-6 gradient-card border-border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "w-6 h-6",
                      star <= rating.rating
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    )}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteRating}
                >
                  Excluir
                </Button>
              </div>
            </div>
            {rating.comment && (
              <p className="text-muted-foreground">{rating.comment}</p>
            )}
          </Card>
        ) : (
          <RatingForm
            initialRating={rating?.rating}
            initialComment={rating?.comment}
            onSubmit={handleSaveRating}
            onCancel={rating ? () => setIsEditing(false) : undefined}
            isEditing={!!rating}
          />
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
