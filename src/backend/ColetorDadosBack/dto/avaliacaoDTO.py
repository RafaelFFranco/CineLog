from pydantic import BaseModel

class AvaliacaoRequest(BaseModel):
    imdbID : str;
    nota : int;
    comentario : str;

class AvaliacaoResponse(BaseModel):
    id : int;
    imdbID: str;
    nota: int;
    comentario: str;
