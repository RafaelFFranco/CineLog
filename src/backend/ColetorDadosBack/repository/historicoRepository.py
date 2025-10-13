from sqlalchemy.orm import Session
from ..dto.historicoDTO import HistoricoRequest
from ..model.historicoModel import historico

class HistoricoRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(historico).all()

    def add(self, historico_request : HistoricoRequest):
        historico_novo = historico(
            imdbID = historico_request.imdbID,
            genero = historico_request.genero,
            ano = historico_request.ano,
            nome = historico_request.nome,
        );
        self.db.add(historico_novo);
        self.db.commit();
        self.db.refresh(historico_novo);
        return historico_novo;

    def delete_by_id(self, id):
        historico_encontrado = self.db.query(historico).filter_by(id=id).first();
        if historico_encontrado:
            self.db.delete(historico_encontrado);
            self.db.commit();

        return historico_encontrado;

    def delete_all(self):
        self.db.query(historico).delete();
        self.db.commit();

