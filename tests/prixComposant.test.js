const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

describe('PrixComposant API', () => {
  const token = process.env.TOKEN;
  const urlApi = '/api/prixcomposant';

  // Test GET /category_partenaire
  it('should return 404 if composant not found for category_partenaire', async () => {
    const response = await request(app)
      .get(`${urlApi}/category_partenaire`)
      .query({ category: '6146d8d3c90934a98cc14653', partenaire: '6146d8d3c90934a98cc1466b' })
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
  });

  // Test GET /composant_prix
  it('should return 404 if composant not found for composant_prix', async () => {
    const response = await request(app).get(`${urlApi}/composant_prix`).query({ composant: '6146d8d3c90934a98cc14653' }).set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
  });

  // Test GET /category_prixlow
  it('should return 404 if composant not found for category_prixlow', async () => {
    const response = await request(app).get(`${urlApi}/category_prixlow`).query({ category: '6146d8d3c90934a98cc14653' }).set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
  });
});
