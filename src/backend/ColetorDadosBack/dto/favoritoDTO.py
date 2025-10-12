from pydantic import BaseModel



class FavoritosRequest(BaseModel):
    imdbID: str;

class FavoritosResponse(BaseModel):
    id : int;
    imdbID: str;