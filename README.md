# Desafio-Tecnico-Coletor-de-Dados-de-Filmes

## Contextualização
O Coletor de Dados de Filmes é uma aplicação fullstack onde o usuário pode buscar filmes, 
favoritar seus filmes preferidos, registrar reviews pessoais e 
coletar/analisar dados sobre suas buscas e preferências cinematográficas. 
O sistema tem como foco o controle pessoal de filmes assistidos com elementos de 
organização e análise de dados, funcionando como uma ferramenta pessoal que 
coleta insights sobre seus hábitos de busca.


## 🎯 Funcionalidades

- Coleta de Dados (OMDb API): API pública que retorna dados sobre filmes.

- Armazenamento Persistente: Os dados coletados são salvos em um banco de dados SQLite.

- API RESTful:  API desenvolvida com FastAPI para armazenar informações do usuário como filmes favoritos, avaliações e histórico


## 🏛️ Decisões de Projeto

 O backend do projeto foi estruturado em um modelo MVC utilizando o padrão de projeto injeção de dependência,
separando as responsabilidades da aplicação em camadas específicas (model,repository,service,controller,config,dto).
  - model -> Modelos (tabelas) da aplicação no seu estado sensível
  - repository -> Centraliza as consultas SQL do sistema.
  - service -> Lida com as regras de negócio.
  - controller -> Concentra os endpoints das entidades do projeto.
  - config -> Responsável por lidar com configurações das tecnologias do projeto, conexão com banco de dados por exemplo.
  - dto -> Data Transfer Objects, têm como objetivo encapsular o estado das entidade para facilitar a comunicação com interfaces externas e as diversas camadas do software.

### O frontend foi estruturado em com pastas api,componentes,hooks,pages e util
