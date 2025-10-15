import { Link } from "react-router-dom";
import { Film } from "lucide-react";
import type { Filme } from "../../types/filme";
import { Card } from "./card";

interface MovieCardProps {
  movie: Filme;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <Card className="group overflow-hidden gradient-card border-border hover-scale hover-glow cursor-pointer h-full">
        <div className="aspect-[2/3] relative overflow-hidden bg-muted">
          {hasPoster ? (
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Film className="w-16 h-16 text-muted-foreground opacity-50" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {movie.Title}
          </h3>
          <p className="text-sm text-muted-foreground">{movie.Year}</p>
        </div>
      </Card>
    </Link>
  );
};

export default MovieCard;
