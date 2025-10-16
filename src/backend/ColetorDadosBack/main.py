from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from controller import favoritoController, avaliacaoController, historicoController, estatisticasController
from config.database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API Coletor de Dados de Filmes",
    description="API para o desafio técnico da dti digital, desenvolvida com FastAPI.",
    version="0.1.0"
)

origins=[
    "http://localhost",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      # Especifica as origens
    allow_credentials=True,
    allow_methods=["*"],        # Permite todos os métodos Http
    allow_headers=["*"],        # Permite todos os cabeçalhos
)



print("Incluindo routers")
app.include_router(favoritoController.router)
app.include_router(avaliacaoController.router)
app.include_router(historicoController.router)
app.include_router(estatisticasController.router)


@app.get("/")
def read_root():
    return {"status": "API no ar!", "documentacao": "/docs"}