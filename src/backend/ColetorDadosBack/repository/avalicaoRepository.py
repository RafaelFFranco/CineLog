from sqlalchemy.orm import Session
from ..model.avaliacaoModel import avaliacao

class FavoriteRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(avaliacao).all()

    def get_by_imdbID(self, imdbID):
        return self.db.query(imdbID).filter(avaliacao.imdbID == imdbID).all()

    def add(self, avaliacao):
        self.db.add(avaliacao);
        self.db.commit();
        self.db.refresh(avaliacao);
        return avaliacao;

    def remove(self, id):
        self.db.query(avaliacao).filter_by(id=id).delete();

    def update(self, avaliacao):
        self.db.query(avaliacao).filter_by(id = avaliacao.id).update(avaliacao);