from sqlalchemy.orm import Session
from ..model.historicoModel import historico

class FavoriteRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(historico).all()

    def add(self, historico):
        self.db.add(historico);
        self.db.commit();
        self.db.refresh(historico);
        return historico;

    def remove(self, id):
        self.db.query(historico).filter_by(id=id).delete();

    def update(self, historico):
        self.db.query(historico).filter_by(id = historico.id).update(historico);