const request = require('supertest');
const app = require('../app');

describe('User Config API', () => {
  const urlApi = '/api/userconfig';
  const token = process.env.TOKEN;

  it('should return configs list (even empty)', async () => {
    const response = await request(app).get(urlApi).set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('configs');
    expect(Array.isArray(response.body.configs)).toBe(true);
  });
});
