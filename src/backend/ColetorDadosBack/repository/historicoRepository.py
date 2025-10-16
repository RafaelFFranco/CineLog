from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from dto.historicoDTO import HistoricoRequest
from model.historicoModel import Historico

class HistoricoRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(Historico).all()

    def add(self, historico_request : HistoricoRequest):
        if self.db.query(Historico).filter_by(imdbID=historico_request.imdbID).first():
            raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                                detail=f"O filme '{historico_request.nome}' já existe no histórico.")

        historico_novo = Historico(
            imdbID = historico_request.imdbID,
            genero = historico_request.genero,
            ano = historico_request.ano,
            nome = historico_request.nome,
            imdbRating = historico_request.imdbRating,
        );
        self.db.add(historico_novo);
        self.db.commit();
        self.db.refresh(historico_novo);
        return historico_novo;

    def delete_by_id(self, id):
        historico_encontrado = self.db.query(Historico).filter_by(id=id).first();
        if historico_encontrado:
            self.db.delete(historico_encontrado);
            self.db.commit();

        return historico_encontrado;

    def delete_all(self):
        self.db.query(Historico).delete();
        self.db.commit();

