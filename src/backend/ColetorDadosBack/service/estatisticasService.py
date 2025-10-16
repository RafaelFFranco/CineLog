# service/estatisticasService.py

from sqlalchemy.orm import Session
from collections import Counter
from repository.estatisticasRepository import EstatisticasRepository


class EstatisticasService:
    def __init__(self, db: Session):
        self.repositorio = EstatisticasRepository(db)

    def calcular_estatisticas(self):
        historico_completo = self.repositorio.listar_historico_completo()

        if not historico_completo:
            return {
                "totalBuscas": 0, "generoMaisBuscado": None, "generos": [],
                "decadaPreferida": None, "notaMedia": 0.0, "anos": []
            }

        total_buscas = len(historico_completo)
        estatisticas_genero = self.calcular_estatisticas_genero(historico_completo)
        decada_preferida = self.calcular_decada_preferida(historico_completo)

        media_avaliacao = self.repositorio.buscar_media_avaliacao()
        distribuicao_ano = self.repositorio.buscar_distribuicao_ano()

        distribuicao_ano = [{"ano": ano, "contagem": contagem} for ano, contagem in distribuicao_ano]

        #objeto final da resposta
        return {
            "buscasTotais": total_buscas,
            "generoMaisBuscado": estatisticas_genero["genero_mais_procurado"],
            "distribuicaoGenero": estatisticas_genero["distribuicao_generos"],
            "decadaFavorita": f"{decada_preferida}s" if decada_preferida else None,
            "notaMedia": round(media_avaliacao, 2) if media_avaliacao else 0.0,
            "distribuicaoAno": distribuicao_ano
        }

    def calcular_estatisticas_genero(self, historico: list):
        todos_os_generos = []
        for item in historico:
            if item.genero:
                generos = [g.strip() for g in item.genero.split(',')]
                todos_os_generos.extend(generos)

        contagem_generos = Counter(todos_os_generos)
        if not contagem_generos:
            return {"genero_mais_procurado": None, "distribuicao_generos": []}

        distribuicao = [{"genero": g, "contagem": c} for g, c in contagem_generos.items()]
        distribuicao.sort(key=lambda x: x['contagem'], reverse=True)

        genero_mais_procurado = distribuicao[0]

        return {
            "genero_mais_procurado": genero_mais_procurado,
            "distribuicao_generos": distribuicao
        }

    def calcular_decada_preferida(self, historico: list):
        if not any(item.ano for item in historico):
            return None

        decadas = [(item.ano // 10) * 10 for item in historico if item.ano]
        contagem_decadas = Counter(decadas)

        if not contagem_decadas:
            return None

        return contagem_decadas.most_common(1)[0][0]