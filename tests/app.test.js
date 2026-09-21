const request = require('supertest');
const app = require('../app');

describe('Application endpoints', () => {
  test('GET /health should return healthy status', async () => {
    const response = await request(app).get('/health');

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('healthy');
  });

  test('GET / should return the application page', async () => {
    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('DevOps Fullstack Project');
  });
});
