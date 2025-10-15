import { useState } from "react";
import type { FormEvent } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Buscar filmes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 h-14 text-lg bg-card border-border focus:border-primary"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="px-8 h-14 gradient-gold text-primary-foreground font-semibold hover:opacity-90"
          disabled={isLoading || !query.trim()}
        >
          Buscar
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
