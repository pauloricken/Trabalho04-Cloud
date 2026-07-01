\# NewsCloud API



\## Trabalho Final - Cloud Computing



\## Aluno



Paulo Vitor Ricken Antunes



\## Tema



12 - Aplicativo de Notícias e Blogs



\## Descrição do Projeto



Este projeto consiste em uma API REST desenvolvida para simular o backend de um aplicativo de notícias e blogs. A aplicação recebeu o nome de \*\*NewsCloud API\*\* e possui rotas para verificação de status, listagem de notícias e consulta de uma notícia específica pelo identificador.



A proposta do projeto é demonstrar o desenvolvimento de uma API funcional, com dados simulados armazenados em arquivo JSON externo, testes unitários automatizados e pipeline de Integração Contínua utilizando GitHub Actions.



\## Tecnologias Utilizadas



\* Node.js

\* Express

\* Jest

\* Supertest

\* ESLint

\* Docker

\* Docker Compose

\* GitHub Actions



\## Estrutura do Projeto



```text

newscloud-api/

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

│   ├── package-lock.json

│   └── .eslintrc.json

├── .github/

│   └── workflows/

│       └── ci.yml

├── docker-compose.yml

├── .gitignore

└── README.md

```



\## Rotas da API



\### GET /status



Retorna informações de saúde da aplicação.



Exemplo:



```text

http://localhost:3000/status

```



\### GET /noticias



Retorna a lista de notícias simuladas.



Exemplo:



```text

http://localhost:3000/noticias

```



\### GET /noticias/{id}



Retorna uma notícia específica pelo identificador.



Exemplo:



```text

http://localhost:3000/noticias/1

```



Caso o identificador não exista, a API retorna status HTTP 404.



Exemplo:



```text

http://localhost:3000/noticias/999

```



\## Execução Local sem Docker



Entre na pasta da API:



```bash

cd api

```



Instale as dependências:



```bash

npm install

```



Execute os testes:



```bash

npm test

```



Execute a análise estática:



```bash

npm run lint

```



Inicie a aplicação:



```bash

npm start

```



A API ficará disponível em:



```text

http://localhost:3000

```



\## Execução com Docker



Na raiz do projeto, execute:



```bash

docker compose up -d --build

```



Caso deseje executar diretamente pela imagem Docker já criada:



```bash

docker run -d --name newscloud-api -p 3000:3000 newscloud-api-newscloud-api:latest

```



Para verificar o container:



```bash

docker ps

```



Para parar o container:



```bash

docker rm -f newscloud-api

```



\## Testes Unitários



Os testes estão localizados em:



```text

api/tests/api.test.js

```



Foram implementados testes para:



\* validar retorno HTTP 200 da rota `GET /noticias`;

\* validar a estrutura JSON retornada;

\* validar retorno HTTP 404 para identificador inexistente;

\* validar a rota `GET /status`.



Para executar:



```bash

cd api

npm test

```



\## Integração Contínua



O pipeline de CI está configurado no arquivo:



```text

.github/workflows/ci.yml

```



A cada push na branch principal, o GitHub Actions executa:



\* checkout do código;

\* configuração do Node.js;

\* instalação das dependências;

\* análise estática com ESLint;

\* execução dos testes unitários.



\## Dados Simulados



Os dados utilizados pela API estão no arquivo:



```text

api/data/noticias.json

```



Esse arquivo contém registros simulados e coerentes com o tema de notícias e blogs.



