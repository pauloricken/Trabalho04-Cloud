const request = require('supertest');
const { app } = require('../src/app');

describe('NewsCloud API', () => {
  test('GET /noticias deve retornar HTTP 200 e lista de registros', async () => {
    const response = await request(app).get('/noticias');
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.count).toBeGreaterThanOrEqual(10);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test('GET /noticias deve retornar a estrutura JSON esperada', async () => {
    const response = await request(app).get('/noticias');
    const primeiraNoticia = response.body.data[0];
    expect(primeiraNoticia).toHaveProperty('id');
    expect(primeiraNoticia).toHaveProperty('titulo');
    expect(primeiraNoticia).toHaveProperty('categoria');
    expect(primeiraNoticia).toHaveProperty('autor');
    expect(primeiraNoticia).toHaveProperty('publicadoEm');
    expect(primeiraNoticia).toHaveProperty('resumo');
    expect(primeiraNoticia).toHaveProperty('status');
  });

  test('GET /noticias/999 deve retornar HTTP 404 para id inexistente', async () => {
    const response = await request(app).get('/noticias/999');
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.error.message).toBe('Notícia não encontrada');
  });

  test('GET /status deve retornar informações de saúde da aplicação', async () => {
    const response = await request(app).get('/status');
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe('NewsCloud API');
    expect(response.body.data.version).toBe('1.0.0');
    expect(response.body.data.status).toBe('online');
  });
});
