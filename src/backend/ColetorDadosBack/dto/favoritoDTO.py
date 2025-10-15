from pydantic import BaseModel



class FavoritosRequest(BaseModel):
    imdbID: str;
    titulo : str;
    poster : str;
    ano : str;

class FavoritosResponse(BaseModel):
    id : int;
    imdbID: str;
    titulo: str;
    poster: str;
    ano: str;