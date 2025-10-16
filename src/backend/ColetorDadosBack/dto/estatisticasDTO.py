from pydantic import BaseModel
from typing import List

# Modelo para a distribuição de gêneros
class DistribuicaoGenero(BaseModel):
    genero: str
    contagem: int

# Modelo para a distribuição de anos
class DistribuicaoAno(BaseModel):
    ano: int
    contagem: int

# Modelo completo da resposta da API
class EstatisticasResponse(BaseModel):
    buscasTotais: int
    generoMaisBuscado: DistribuicaoGenero | None
    distribuicaoGenero: List[DistribuicaoGenero]
    decadaFavorita: str | None
    notaMedia: float
    distribuicaoAno: List[DistribuicaoAno]