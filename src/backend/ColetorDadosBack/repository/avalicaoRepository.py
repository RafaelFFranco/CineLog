from fastapi import HTTPException
from sqlalchemy.orm import Session
from starlette import status

from dto.avaliacaoDTO import AvaliacaoRequest
from model.avaliacaoModel import Avaliacao

class AvaliacaoRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(Avaliacao).all()

    def get_by_imdbID(self, imdbID):
        return self.db.query(Avaliacao).filter_by(imdbID=imdbID).first()

    def add(self, avaliacao_request : AvaliacaoRequest):
        db_avaliacao = Avaliacao(
            imdbID=avaliacao_request.imdbID,
            nota=avaliacao_request.nota,
            comentario=avaliacao_request.comentario
        );

        self.db.add(db_avaliacao);
        self.db.commit();
        self.db.refresh(db_avaliacao);
        return db_avaliacao;

    def remove_by_imdbID(self, imdbID: str):
        avaliacao_delete = self.db.query(Avaliacao).filter_by(imdbID=imdbID).first();
        if avaliacao_delete:
            self.db.delete(avaliacao_delete);
            self.db.commit();

        return avaliacao_delete;


    def update(self, avaliacao_request: AvaliacaoRequest):
        query = self.db.query(Avaliacao).filter_by(imdbID=avaliacao_request.imdbID);
        db_avaliacao = query.first()

        if not db_avaliacao:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Avaliação não encontrada.")

        db_avaliacao.nota = avaliacao_request.nota
        db_avaliacao.comentario = avaliacao_request.comentario

        self.db.commit()
        self.db.refresh(db_avaliacao)

        return db_avaliacao;
