from sqlalchemy.orm import Session
from dto.favoritoDTO import FavoritosRequest
from repository.favoritosRepository import FavoriteRepository

class FavoritosService:

    def __init__(self,db : Session):
        self.repository = FavoriteRepository(db=db);


    def add_favorito(self,favorito_request:FavoritosRequest):
        return self.repository.add(favorito_request);

    def get_all(self):
        return self.repository.get_all();

    def remove_favorito_by_imdbID(self,imdbID: str):
        return self.repository.remove_by_imdbID(imdbID);

    def get_by_imdbID(self, imdbID: str):
        return self.repository.get_by_imdbID(imdbID);