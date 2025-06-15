const request = require('supertest');
const app = require('../app');

describe('User Auth API', () => {
  const urlApi = '/auth';

  it('should fail login with invalid credentials', async () => {
    const response = await request(app).post(`${urlApi}/login`).send({
      email: 'nonexistent@test.com',
      password: 'wrongpassword',
    });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid email or password');
  });
});
