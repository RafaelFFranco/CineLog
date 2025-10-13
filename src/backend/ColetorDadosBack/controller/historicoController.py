from sqlalchemy.orm import Session
from ..dto import historicoDTO;
from ..service.historicoService import HistoricoService;
from fastapi import APIRouter, Depends, status, HTTPException;
from ..config.database import get_db;

router = APIRouter(
    prefix="/api/historico",
    tags=["Historico"]
)

@router.get("/get-all", response_model=list[historicoDTO.HistoricoResponse], status_code=status.HTTP_200_OK)
def get_all_historico(db: Session = Depends(get_db)):
    try:
        service = HistoricoService(db);
        return service.get_all();
    except:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Historico not found");

@router.post("/add", response_model=historicoDTO.HistoricoResponse, status_code=status.HTTP_201_CREATED)
def add_historico(
        historico_request: historicoDTO.HistoricoRequest,
        db: Session = Depends(get_db),
):
    service = HistoricoService(db);
    try:
        return service.add(historico_request);
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e));

@router.delete("/delete/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_historico_by_id(
    id : int,
    db: Session = Depends(get_db)
):
    service = HistoricoService(db);
    try:
        return service.delete_by_id(id);
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e));

@router.delete("/delete-all",status_code=status.HTTP_204_NO_CONTENT)
def delete_all_historico(db: Session = Depends(get_db)):
    service = HistoricoService(db);
    try:
       service.delete_all();
       return HTTPException(status_code=204, detail="Historico deletado");
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e));
