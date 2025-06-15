const request = require('supertest');
const app = require('../app');
require('dotenv').config();

describe('Composants API', () => {
  const token = process.env.TOKEN;

  describe('GET /api/composants', () => {
    it('should return composants list (even empty)', async () => {
      const response = await request(app).get('/api/composants').set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('composants');
    });
  });

  describe('GET /api/composants/:id', () => {
    it('should return 404 for non-existing id', async () => {
      const response = await request(app).get('/api/composants/6846d8d3c90934a98cc14660').set('Authorization', `Bearer ${token}`);

      // según tu código devuelve 404 si no existe
      expect(response.statusCode).toBe(404);
    });
  });
});
