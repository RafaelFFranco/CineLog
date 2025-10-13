from sqlalchemy.orm import Session
from ..dto import avaliacaoDTO;
from ..service.avaliacaoService import AvaliacaoService;
from fastapi import APIRouter, Depends, status, HTTPException;
from ..config.database import get_db;

router = APIRouter(
    prefix="/api/avaliacoes",
    tags=["Avaliacoes"]
)


@router.get('/get-all', response_model=list[avaliacaoDTO.AvaliacaoResponse], status_code=status.HTTP_200_OK)
def get_all(
    db: Session = Depends(get_db)
):
    try:
        service = AvaliacaoService(db=db);
        return service.get_all();
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e));

@router.get('/get/{imdbID}', response_model=avaliacaoDTO.AvaliacaoResponse, status_code=status.HTTP_200_OK)
def get_by_imdbID(
        imdbID: int,
        db: Session = Depends(get_db)
):
    try:
        service = AvaliacaoService(db=db);
        avaliacao = service.get_by_imdbID(imdbID);
        if not avaliacao:
            raise HTTPException(status_code=404, detail=f"Avaliacao para o filme com imdbID: {imdbID} não encontrado");

        return avaliacao;
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e));

@router.delete('/remove/{imdbID}', status_code=status.HTTP_200_OK)
def remove_avaliacao(
    imdbID: str,
    db: Session = Depends(get_db)
):
    try:
        service = AvaliacaoService(db=db);
        deletado = service.remove(imdbID);
        if deletado == None:
            raise HTTPException(status_code=404, detail=f"Filme com id {imdbID} não encontrado");

        return HTTPException(status_code=204, detail="Deletado com sucesso.");
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e));

@router.post('/add', response_model=avaliacaoDTO.AvaliacaoResponse, status_code=status.HTTP_201_CREATED)
def add_avaliacao(
    avaliacao_request : avaliacaoDTO.AvaliacaoRequest,
    db : Session = Depends(get_db)
):
    try:
        service = AvaliacaoService(db=db);
        nova_avaliacao = service.add(avaliacao_request);
        if not nova_avaliacao:
            raise HTTPException(status_code=400, detail="Filme já avaliado.");
        return nova_avaliacao;
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e));

@router.put('/update', response_model=avaliacaoDTO.AvaliacaoResponse, status_code=status.HTTP_200_OK)
def update_avaliacao(
        avaliacao_request : avaliacaoDTO.AvaliacaoRequest,
        db : Session = Depends(get_db),
):
    try:
        service = AvaliacaoService(db=db);
        nova_avaliacao = service.update(avaliacao_request);
        if not nova_avaliacao:
            raise HTTPException(status_code=409, detail="Não foi possível alterar avaliacao.");

        return nova_avaliacao;
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e));