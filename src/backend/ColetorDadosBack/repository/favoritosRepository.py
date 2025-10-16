from sqlalchemy.orm import Session
from dto.favoritoDTO import FavoritosRequest
from model.favoritosModel import Favoritos

class FavoriteRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(Favoritos).all()

    def add(self, favorito_request: FavoritosRequest):
        db_favorito = Favoritos(
            imdbID=favorito_request.imdbID,
            titulo=favorito_request.titulo,
            poster=favorito_request.poster,
            ano=favorito_request.ano,
        )
        self.db.add(db_favorito);
        self.db.commit();
        self.db.refresh(db_favorito);
        return db_favorito;

    def remove_by_imdbID(self, imdbID: str):
        favorito = self.db.query(Favoritos).filter_by(imdbID=imdbID).first();
        if favorito:
            self.db.delete(favorito);
            self.db.commit();

        return favorito;

    def get_by_imdbID(self, imdbID: str):
        return self.db.query(Favoritos).filter_by(imdbID=imdbID).first();