from repository.historicoRepository import *

class HistoricoService:
    def __init__(self, dbSession):
        self.repository = HistoricoRepository(dbSession);


    def get_all(self):
        return self.repository.get_all();

    def add(self, historico : HistoricoRequest):
       return self.repository.add(historico);

    def delete_by_id(self, id):
       return self.repository.delete_by_id(id);

    def delete_all(self):
       self.repository.delete_all();