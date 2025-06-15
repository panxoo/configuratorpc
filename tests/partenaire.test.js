const request = require('supertest');
const app = require('../app');
require('dotenv').config();

describe('Partenaires API', () => {
  const token = process.env.TOKEN;
  const urlApi = '/api/partenaires';

  describe(`GET ${urlApi}/`, () => {
    it('should return partenaire list (even empty)', async () => {
      const response = await request(app).get(`${urlApi}/`).set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('partenaire');
      expect(Array.isArray(response.body.partenaire)).toBe(true);
    });
  });

  describe(`GET ${urlApi}/:id`, () => {
    it('should return 404 for non-existing id', async () => {
      const response = await request(app).get(`${urlApi}/6846d8d3c90934a98cc14660`).set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(400);
    });
  });
});
