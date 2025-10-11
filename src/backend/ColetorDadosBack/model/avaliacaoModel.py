from sqlalchemy import Column, Integer, String, Text
from ..config.database import Base

class avaliacao(Base):
    __tablename__ = 'avaliacao'

    id = Column(Integer, primary_key=True)
    imdbID = Column(String,nullable=False)
    nota = Column(Integer, default=0, nullable=False)
    comentario = Column(Text)