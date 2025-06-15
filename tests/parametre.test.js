const request = require('supertest');
const app = require('../app');
require('dotenv').config();

describe('Parametre API', () => {
  const token = process.env.TOKEN;
  const urlApi = '/api/parametre';

  describe(`GET ${urlApi}/categories`, () => {
    it('should return categories list (even empty)', async () => {
      const response = await request(app).get(`${urlApi}/categories`).set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('categories');
      expect(Array.isArray(response.body.categories)).toBe(true);
    });
  });

  describe(`GET ${urlApi}/marques`, () => {
    it('should return marques list (even empty)', async () => {
      const response = await request(app).get(`${urlApi}/marques`).set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('marques');
      expect(Array.isArray(response.body.marques)).toBe(true);
    });
  });
});
