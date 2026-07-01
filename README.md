# Trabalho Final - API com Fluxo DevOps

## Aluno
Paulo Vitor Ricken Antunes

## Tema
12 - Aplicativo de Notícias e Blogs

## Descrição
Este repositório contém uma API REST chamada **NewsCloud API**, criada para simular o backend de um aplicativo de notícias e blogs.

A API disponibiliza informações de saúde da aplicação, uma lista de notícias simuladas e a busca de uma notícia específica pelo identificador. Os dados foram mantidos em um arquivo JSON externo, dentro da pasta `api/data`, para separar a regra da API dos dados simulados.

## Tecnologias utilizadas
- Node.js
- Express
- Jest
- Supertest
- ESLint
- Docker
- Docker Compose
- GitHub Actions

## Estrutura do projeto

```text
trabalho-final-newscloud-api/
├── api/
│   ├── src/
│   │   ├── app.js
│   │   └── server.js
│   ├── data/
│   │   └── noticias.json
│   ├── tests/
│   │   └── api.test.js
│   ├── Dockerfile
│   ├── package.json
│   └── .eslintrc.json
├── .github/
│   └── workflows/
│       └── ci.yml
├── docker-compose.yml
├── relatorio-modelo.md
└── README.md
```

## Rotas da API

### GET /status

Retorna informações de saúde da aplicação.

### GET /noticias

Retorna uma lista com no mínimo 10 notícias simuladas.

### GET /noticias/{id}

Retorna uma notícia específica pelo identificador. Quando o id não existe, retorna HTTP 404.

## Como executar localmente sem container

```bash
cd api
npm install
npm test
npm run lint
npm start
```

Depois acesse:

```text
http://localhost:3000/status
http://localhost:3000/noticias
http://localhost:3000/noticias/1
```

## Como executar com Docker

Na raiz do projeto:

```bash
docker compose up -d --build
```

Depois acesse:

```text
http://localhost:3000/status
http://localhost:3000/noticias
http://localhost:3000/noticias/1
```

Para parar:

```bash
docker compose down
```

## Testes unitários

Foram implementados 4 testes:

1. Retorno HTTP 200 da rota `GET /noticias`;
2. Validação da estrutura JSON dos registros;
3. Retorno HTTP 404 para id inexistente;
4. Validação da rota `GET /status`.

Para executar:

```bash
cd api
npm test
```

## Pipeline CI

O workflow está em `.github/workflows/ci.yml`.

A cada push na branch `main`, o GitHub Actions executa checkout, instalação das dependências, análise estática com ESLint e testes unitários.

## Observação sobre uso de ferramentas de apoio

O projeto deve ser revisado e compreendido antes da entrega. Em caso de uso de ferramentas de apoio, registre no relatório técnico conforme as orientações da disciplina.
