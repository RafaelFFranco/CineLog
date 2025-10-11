from sqlalchemy.orm import Session
from ..model.favoritosModel import favoritos

class FavoriteRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(favoritos).all()

    def get_all_by_imdbID(self, imdbID):
        return self.db.query(imdbID).filter(favoritos.imdbID == imdbID).all()

    def add(self, favorito):
        self.db.add(favorito);
        self.db.commit();
        self.db.refresh(favorito);
        return favorito;

    def remove(self, id):
        self.db.query(favoritos).filter_by(id=id).delete();

    def update(self, favorito):
        self.db.query(favoritos).filter_by(id = favorito.id).update(favorito);