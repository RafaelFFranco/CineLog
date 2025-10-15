import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { cn } from "../util/utils";

interface RatingFormProps {
  initialRating?: number;
  initialComment?: string;
  onSubmit: (rating: number, comment: string) => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

const RatingForm = ({
  initialRating = 0,
  initialComment = "",
  onSubmit,
  onCancel,
  isEditing = false,
}: RatingFormProps) => {
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, comment);
    }
  };

  return (
    <div className="space-y-4 p-6 rounded-lg gradient-card border border-border">
      <div>
        <label className="block text-sm font-medium mb-2">
          Sua avaliação
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={cn(
                  "w-8 h-8 transition-colors",
                  star <= (hoveredRating || rating)
                    ? "fill-primary text-primary"
                    : "text-muted-foreground"
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium mb-2">
          Comentário
        </label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Compartilhe sua opinião sobre o filme..."
          className="min-h-[100px] bg-background border-border resize-none"
        />
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleSubmit}
          disabled={rating === 0}
          className="gradient-gold text-primary-foreground hover:opacity-90"
        >
          {isEditing ? "Atualizar Avaliação" : "Salvar Avaliação"}
        </Button>
        {onCancel && (
          <Button onClick={onCancel} variant="outline">
            Cancelar
          </Button>
        )}
      </div>
    </div>
  );
};

export default RatingForm;
