from sqlalchemy import Column, Integer, String
from ..config.database import Base

class historico(Base):
    __tablename__ = 'historico'

    id = Column(Integer, primary_key=True)
    imdbID = Column(String,nullable=False)
    genero = Column(String)
    ano = Column(String)