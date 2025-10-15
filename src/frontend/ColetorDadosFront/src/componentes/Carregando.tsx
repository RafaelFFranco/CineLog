import { Film } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Film className="w-12 h-12 text-primary animate-pulse mb-4" />
      <p className="text-muted-foreground">Carregando...</p>
    </div>
  );
};

export default LoadingSpinner;
