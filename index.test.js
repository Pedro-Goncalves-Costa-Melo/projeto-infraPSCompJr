const request = require('supertest');
const app = require('./index');

describe('Teste de Infraestrutura', () => {
  it('Deve responder na raiz com status 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });
});