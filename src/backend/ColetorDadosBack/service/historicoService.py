from ..repository.historicoRepository import *

class HistoricoRepository:
    def __init__(self, dbSession):
        self.repository = HistoricoRepository(dbSession);


    def get_all(self):
        return self.repository.get_all();

    def add(self, historico):
        self.repository.add(historico);

    def remove(self, id):
        self.repository.remove(id);