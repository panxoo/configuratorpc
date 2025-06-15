const request = require('supertest');
const app = require('../app');

describe('User API', () => {
  const urlApi = '/api/users';
  const token = process.env.TOKEN;

  it('should return user list (even empty)', async () => {
    const response = await request(app).get(urlApi).set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('user');
    expect(Array.isArray(response.body.user)).toBe(true);
  });
});
