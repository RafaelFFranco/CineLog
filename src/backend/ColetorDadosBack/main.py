from fastapi import FastAPI

from .controller import favoritoController, avaliacaoController, historicoController
from .config.database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API Coletor de Dados de Filmes",
    description="API para o desafio técnico da dti digital, desenvolvida com FastAPI.",
    version="0.1.0"
)

print("Incluindo o router de favoritos...")
app.include_router(favoritoController.router)
app.include_router(avaliacaoController.router)
app.include_router(historicoController.router)


@app.get("/")
def read_root():
    return {"status": "API no ar!", "documentacao": "/docs"}