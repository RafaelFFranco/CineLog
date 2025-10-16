from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped,mapped_column
from config.database import Base

class Historico(Base):
    __tablename__ = 'tb_historico'

    id : Mapped[int] = mapped_column(Integer, primary_key=True);
    imdbID : Mapped[str] = mapped_column(String, nullable=False, unique=True);
    nome : Mapped[str] = mapped_column(String, nullable=False, unique=True);
    genero : Mapped[str] = mapped_column(String);
    ano : Mapped[int] = mapped_column(Integer);
    imdbRating : Mapped[str] = mapped_column(String);