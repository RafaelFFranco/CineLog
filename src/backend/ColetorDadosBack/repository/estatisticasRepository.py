from sqlalchemy.orm import Session
from sqlalchemy import func
from model.historicoModel import Historico

class EstatisticasRepository:
    def __init__(self, db: Session):
        self.db = db

    def listar_historico_completo(self) -> list[Historico]:
        return self.db.query(Historico).all()

    def buscar_media_avaliacao(self) -> float | None:
        return self.db.query(func.avg(Historico.imdbRating)).scalar()

    def buscar_distribuicao_ano(self) -> list:
        resultado_query = (
            self.db.query(
                Historico.ano,
                func.count(Historico.ano).label("contagem")
            )
            .group_by(Historico.ano)
            .order_by(Historico.ano.desc())
            .all()
        )
        return resultado_query