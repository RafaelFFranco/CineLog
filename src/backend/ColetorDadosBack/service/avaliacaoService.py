from dto.avaliacaoDTO import AvaliacaoRequest
from repository.avalicaoRepository import AvaliacaoRepository;
from sqlalchemy.orm import Session;

class AvaliacaoService:
    def __init__(self, db : Session):
        self.repository = AvaliacaoRepository(db);


    def get_all(self):
        return self.repository.get_all();

    def get_by_imdbID(self, imdbID):
        return self.repository.get_by_imdbID(imdbID);

    def add(self, avaliacao_request : AvaliacaoRequest):
        return self.repository.add(avaliacao_request);

    def remove_by_imdbID(self, imdbID):
        return self.repository.remove_by_imdbID(imdbID);

    def update(self, avaliacao):
        return self.repository.update(avaliacao);