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



# 🏛️ Decisões de Projeto
A arquitetura do projeto foi guiada pelos princípios de Separação de Concerns e Injeção de Dependência para garantir um código limpo, testável e de fácil manutenção.

## Backend
Adotei uma arquitetura em camadas com responsabilidades bem definidas:

- Controller: Gerencia as requisições HTTP e serve como ponto de entrada da API.
- Service: Executa a lógica e as regras de negócio da aplicação.
- Repository: Abstrai o acesso aos dados, isolando as consultas SQL do resto do sistema.
- Model: Define as entidades e a estrutura de dados do domínio.
- DTO: Modela os dados para transferência entre camadas e para o cliente, garantindo uma interface de comunicação clara e segura.
- Config: Centraliza as configurações e variáveis de ambiente.

A Injeção de Dependência é utilizada para desacoplar as camadas, o que simplifica a substituição de componentes e a escrita de testes unitários.

## Frontend
A estrutura de pastas foi organizada para maximizar o reuso de código:

- pages: Telas principais da aplicação.
- componentes: Componentes de UI reutilizáveis (botões, cards, etc.).
- api: Centraliza as chamadas para o backend.
- hooks: Lógica de estado reutilizável.
- util: Funções auxiliares.
