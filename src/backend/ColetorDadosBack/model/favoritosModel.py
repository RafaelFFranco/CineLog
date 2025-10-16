from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped,mapped_column
from config.database import Base

class Favoritos(Base):
    __tablename__ = 'tb_favoritos'

    id : Mapped[int] = mapped_column(Integer, primary_key=True);
    imdbID : Mapped[str] = mapped_column(String, nullable=False, unique=True);
    titulo : Mapped[str] = mapped_column(String, nullable=False, unique=True);
    poster : Mapped[str] = mapped_column(String);
    ano : Mapped[str] = mapped_column(String);




