from sqlalchemy import Integer, String, Text
from sqlalchemy.orm import Mapped,mapped_column
from ..config.database import Base

class avaliacao(Base):
    __tablename__ = 'tb_avaliacao'

    id : Mapped[int] = mapped_column(Integer, primary_key=True);
    imdbID : Mapped[str] = mapped_column(String,nullable=False,unique=True);
    nota : Mapped[int] = mapped_column(Integer,default=0,nullable=False);
    comentario : Mapped[str] = mapped_column(Text);