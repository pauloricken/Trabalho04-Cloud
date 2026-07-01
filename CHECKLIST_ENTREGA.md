# Checklist rápido de entrega

## 1. Testar local

```bash
cd api
npm install
npm test
npm run lint
npm start
```

Abrir:
- http://localhost:3000/status
- http://localhost:3000/noticias
- http://localhost:3000/noticias/1
- http://localhost:3000/noticias/999

## 2. Testar com Docker

```bash
docker compose up -d --build
docker ps
docker compose down
```

## 3. Fazer no mínimo 5 commits

```bash
git init
git add README.md
git commit -m "docs: adiciona readme inicial do projeto"

git add api/data/noticias.json
git commit -m "dados: adiciona noticias simuladas em json"

git add api/src
git commit -m "api: implementa rotas de status e noticias"

git add api/tests
git commit -m "testes: adiciona testes unitarios da api"

git add .github/workflows/ci.yml api/.eslintrc.json api/Dockerfile docker-compose.yml relatorio-modelo.md CHECKLIST_ENTREGA.md
git commit -m "devops: adiciona pipeline ci e suporte docker"
```

## 4. Enviar para GitHub

```bash
git branch -M main
git remote add origin LINK_DO_SEU_REPOSITORIO
git push -u origin main
```

## 5. Prints obrigatórios sugeridos

- API rodando localmente no terminal
- GET /status no navegador
- GET /noticias no navegador
- GET /noticias/1 no navegador
- GET /noticias/999 mostrando 404
- npm test com testes passando
- npm run lint passando
- docker compose up -d --build
- GitHub Actions verde com data
- Histórico de commits no GitHub

## 6. Entregar no Classroom

- Link do GitHub público
- Relatório técnico final em PDF
- Declaração de Autoria preenchida e assinada
