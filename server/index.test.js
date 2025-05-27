const request = require('supertest');
const express = require('express');

let app;

describe('Meal Planner API', () => {
  beforeEach(() => {
    app = require('../server/index');
  });

  it('GET /api/meals returns array', async () => {
    const res = await request(app).get('/api/meals');
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.statusCode).toBe(200);
  });

  it('POST /api/meals adds a meal', async () => {
    const res = await request(app).post('/api/meals').send({ name: 'Test Meal' });
    expect(res.body.name).toBe('Test Meal');
    expect(res.statusCode).toBe(201);
  });

  it('GET /api/recipes returns array', async () => {
    const res = await request(app).get('/api/recipes');
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.statusCode).toBe(200);
  });

  it('POST /api/recipes adds a recipe', async () => {
    const res = await request(app).post('/api/recipes').send({ name: 'Test Recipe' });
    expect(res.body.name).toBe('Test Recipe');
    expect(res.statusCode).toBe(201);
  });

  it('GET /api/shopping-list returns array', async () => {
    const res = await request(app).get('/api/shopping-list');
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.statusCode).toBe(200);
  });

  it('POST /api/shopping-list adds an item', async () => {
    const res = await request(app).post('/api/shopping-list').send({ name: 'Test Item' });
    expect(res.body.name).toBe('Test Item');
    expect(res.statusCode).toBe(201);
  });
});
