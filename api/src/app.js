const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const API_NAME = 'NewsCloud API';
const API_VERSION = '1.0.0';

// Aqui eu deixei uma função separada só pra carregar o JSON.
// Fica melhor do que deixar os dados direto no código, pois o requisito pede arquivo externo.
function carregarNoticias() {
  const caminhoArquivo = path.join(__dirname, '..', 'data', 'noticias.json');
  const conteudo = fs.readFileSync(caminhoArquivo, 'utf-8');
  return JSON.parse(conteudo);
}

// Padronizei a resposta de sucesso, assim as rotas ficam parecidas e mais faceis de testar.
function respostaSucesso(res, data, extra = {}) {
  return res.status(200).json({
    success: true,
    ...extra,
    data
  });
}

// Essa função centraliza resposta de erro, principalmente 404 e 500.
function respostaErro(res, statusCode, message) {
  return res.status(statusCode).json({
    success: false,
    error: {
      statusCode,
      message
    }
  });
}

app.get('/status', (req, res) => {
  return respostaSucesso(res, {
    name: API_NAME,
    version: API_VERSION,
    status: 'online',
    checkedAt: new Date().toISOString()
  });
});

app.get('/noticias', (req, res) => {
  try {
    const noticias = carregarNoticias();
    return respostaSucesso(res, noticias, { count: noticias.length });
  } catch (error) {
    return respostaErro(res, 500, 'Falha ao carregar as notícias da API');
  }
});

app.get('/noticias/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    const noticias = carregarNoticias();
    const noticia = noticias.find((item) => item.id === id);

    if (!noticia) {
      return respostaErro(res, 404, 'Notícia não encontrada');
    }

    return respostaSucesso(res, noticia);
  } catch (error) {
    return respostaErro(res, 500, 'Falha ao buscar a notícia informada');
  }
});

// Caso alguém acesse uma rota que não existe, a API devolve 404.
app.use((req, res) => {
  return respostaErro(res, 404, 'Rota não encontrada');
});

module.exports = { app, carregarNoticias };
