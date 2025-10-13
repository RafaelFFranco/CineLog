from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped,mapped_column
from ..config.database import Base

class historico(Base):
    __tablename__ = 'tb_historico'

    id : Mapped[int] = mapped_column(Integer, primary_key=True);
    imdbID : Mapped[str] = mapped_column(String, nullable=False);
    nome : Mapped[str] = mapped_column(String, nullable=False);
    genero : Mapped[str] = mapped_column(String);
    ano : Mapped[int] = mapped_column(Integer);