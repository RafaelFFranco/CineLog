from sqlalchemy import Column, Integer, String
from ..config.database import Base

class favoritos(Base):
    __tablename__ = 'favoritos'

    id = Column(Integer, primary_key=True)
    imdbID : Column(String)




