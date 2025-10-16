from pydantic import BaseModel;

class HistoricoRequest(BaseModel):
    imdbID : str;
    genero : str;
    ano : int;
    nome : str;
    imdbRating : str;

class HistoricoResponse(BaseModel):
    id : int;
    imdbID: str;
    nome: str;
    genero: str;
    ano: int;
    imdbRating: str;
