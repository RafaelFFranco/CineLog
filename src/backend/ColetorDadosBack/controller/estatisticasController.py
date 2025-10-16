# controller/estatisticasController.py

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from config.database import get_db
from service.estatisticasService import EstatisticasService
from dto.estatisticasDTO import EstatisticasResponse

router = APIRouter(
    prefix="/api/estatisticas",
    tags=["Estatísticas"],
)

@router.get("/get",response_model=EstatisticasResponse,status_code=status.HTTP_200_OK)
def obter_estatisticas(db: Session = Depends(get_db), ):
    servico = EstatisticasService(db);
    estatisticas = servico.calcular_estatisticas();
    return estatisticas