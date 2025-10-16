from sqlalchemy.orm import Session
from dto.avaliacaoDTO import AvaliacaoRequest
from model.avaliacaoModel import avaliacao

class AvaliacaoRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(avaliacao).all()

    def get_by_imdbID(self, imdbID):
        return self.db.query(imdbID).filter(avaliacao.imdbID == imdbID).all()

    def add(self, avaliacao_request : AvaliacaoRequest):
        db_avaliacao = avaliacao(
            imdbID=avaliacao_request.imdbID,
            nota=avaliacao_request.nota,
            comentario=avaliacao_request.comentario
        );

        self.db.add(db_avaliacao);
        self.db.commit();
        self.db.refresh(db_avaliacao);
        return db_avaliacao;

    def remove(self, id):
        avaliacao_delete = self.db.query(avaliacao).filter_by(id=id).first();
        if avaliacao_delete:
            self.db.delete(avaliacao);
            self.db.commit();

        return avaliacao_delete;


    def update(self, avaliacao):
        avaliacao_antiga = self.db.query(avaliacao).filter_by(id = avaliacao.id).first();
        if avaliacao_antiga:
            self.db.query(avaliacao).update(avaliacao);
