import { Link, useLocation } from "react-router-dom";
import { Film, Search, Heart, BarChart3 } from "lucide-react";
import { cn } from "../util/utils";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Buscar", icon: Search },
    { path: "/favorites", label: "Favoritos", icon: Heart },
    { path: "/dashboard", label: "Meus Dados", icon: BarChart3 },
  ];

  return (
    <nav className="border-b border-border gradient-card shadow-card sticky top-0 z-50 backdrop-blur-sm bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg gradient-gold">
              <Film className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MovieCollector
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-smooth",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
