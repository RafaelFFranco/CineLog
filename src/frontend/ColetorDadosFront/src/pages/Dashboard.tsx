import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Star, Film } from "lucide-react";
import { Card } from "../componentes/ui/card";
import LoadingSpinner from "../componentes/Carregando";
import type { Estatisticas } from "../types/filme";
import { backendService } from "../api/backend";
import { useToast } from "../hooks/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#eab308", "#dc2626", "#3b82f6", "#10b981", "#8b5cf6", "#f59e0b"];

const Dashboard = () => {
  const [statistics, setStatistics] = useState<Estatisticas | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    setIsLoading(true);
    try {
      const data = await backendService.statistics.get();
      setStatistics(data);
    } catch (error) {
      toast({
        title: "Erro ao carregar estatísticas",
        description: "Não foi possível carregar suas estatísticas.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Erro ao carregar estatísticas</p>
      </div>
    );
  }

  const hasData = statistics.buscasTotais > 0;

  return (
    <div className="min-h-screen">
      <div className="gradient-hero border-b border-border py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full gradient-gold">
              <BarChart3 className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Meus Dados
          </h1>
          <p className="text-xl text-muted-foreground text-center">
            Estatísticas e insights sobre seus hábitos cinematográficos
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {!hasData ? (
          <div className="text-center py-16">
            <Film className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-semibold mb-2">
              Ainda sem dados
            </h2>
            <p className="text-muted-foreground">
              Comece a buscar filmes para ver suas estatísticas aqui
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6 gradient-card border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Film className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm text-muted-foreground">
                    Total de Buscas
                  </h3>
                </div>
                <p className="text-3xl font-bold">{statistics.buscasTotais}</p>
              </Card>

              <Card className="p-6 gradient-card border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-sm text-muted-foreground">
                    Gênero Favorito
                  </h3>
                </div>
                <p className="text-2xl font-bold">
                  {statistics.generoMaisBuscado.genero || "N/A"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {statistics.generoMaisBuscado.contagem} buscas
                </p>
              </Card>

              <Card className="p-6 gradient-card border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <BarChart3 className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-sm text-muted-foreground">
                    Década Preferida
                  </h3>
                </div>
                <p className="text-3xl font-bold">
                  {statistics.decadaFavorita || "N/A"}
                </p>
              </Card>

              <Card className="p-6 gradient-card border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Star className="w-5 h-5 text-primary fill-primary" />
                  </div>
                  <h3 className="font-semibold text-sm text-muted-foreground">
                    Nota Média
                  </h3>
                </div>
                <p className="text-3xl font-bold">
                  {statistics.notaMedia.toFixed(1)}
                </p>
                <p className="text-sm text-muted-foreground">de 5.0</p>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-8">
              {statistics.distribuicaoGenero.length > 0 && (
                <Card className="p-6 gradient-card border-border">
                  <h2 className="text-xl font-bold mb-6">Distribuição por Gênero</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statistics.distribuicaoGenero}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ genero, percent }) =>
                          `${genero}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="contagem"
                        nameKey="genero"
                      >
                        {statistics.distribuicaoGenero.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              )}

              {statistics.distribuicaoAno.length > 0 && (
                <Card className="p-6 gradient-card border-border">
                  <h2 className="text-xl font-bold mb-6">Filmes por Ano</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={statistics.distribuicaoAno}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis 
                        dataKey="ano" 
                        stroke="#888"
                        tick={{ fill: '#888' }}
                      />
                      <YAxis 
                        stroke="#888"
                        tick={{ fill: '#888' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1a1a1a',
                          border: '1px solid #333',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="contagem" fill="#eab308" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
