from sqlalchemy.orm import Session
from ..dto import favoritoDTO;
from ..service.favoritosService import FavoritosService;
from fastapi import APIRouter, Depends, status, HTTPException;
from ..config.database import get_db;

router = APIRouter(
    prefix="/api/favoritos",
    tags=["Favoritos"]
)


@router.get('/get-all', response_model=list[favoritoDTO.FavoritosResponse], status_code=status.HTTP_200_OK)
def get_all(
    db: Session = Depends(get_db)
):
    try:
        service = FavoritosService(db=db);
        return service.get_all();
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e));

@router.delete('/remove/{imdbID}', status_code=status.HTTP_200_OK)
def remove_favorito(
    imdbID: str,
    db: Session = Depends(get_db)
):
    try:
        service = FavoritosService(db=db);
        deletado = service.remove_favorito(imdbID);
        if deletado == None:
            raise HTTPException(status_code=404, detail=f"Filme com id {imdbID} não encontrado");

        return HTTPException(status_code=204, detail="Deletado com sucesso.");
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Erro ao remover favorito." + str(e));

@router.post('/add', response_model=favoritoDTO.FavoritosResponse, status_code=status.HTTP_201_CREATED)
def add_favorito(
    favorito_request: favoritoDTO.FavoritosRequest,
    db: Session = Depends(get_db)
):
    try:
        service = FavoritosService(db=db);
        novo_favorito = service.add_favorito(favorito_request)
        if not novo_favorito:
            raise HTTPException(status_code=400, detail="Filme já existe nos favoritos.");
        return novo_favorito;
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e));