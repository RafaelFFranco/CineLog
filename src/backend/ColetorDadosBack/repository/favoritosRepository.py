from sqlalchemy.orm import Session
from ..dto.favoritoDTO import FavoritosRequest
from ..model.favoritosModel import favoritos

class FavoriteRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(favoritos).all()

    def add(self, favorito_request: FavoritosRequest):
        db_favorito = favoritos(
            imdbID=favorito_request.imdbID
        )
        self.db.add(db_favorito);
        self.db.commit();
        self.db.refresh(db_favorito);
        return db_favorito;

    def remove(self, imdbID: str):
        favorito = self.db.query(favoritos).filter_by(imdbID=imdbID).first();
        if favorito:
            self.db.delete(favorito);
            self.db.commit();

        return favorito;