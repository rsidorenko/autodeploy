import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';

beforeAll(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/posuda-test');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}, 30000);

afterAll(async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
}, 30000);

describe('Тесты API продуктов', () => {
  it('GET /products должен вернуть массив продуктов', async () => {
    const res = await request(app)
      .get('/products')
      .set('Accept', 'application/json');
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.products)).toBe(true);
  }, 30000);

  it('GET /products/categories должен вернуть массив категорий', async () => {
    const res = await request(app)
      .get('/products/categories')
      .set('Accept', 'application/json');
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 30000);

  it('GET /products/search должен вернуть массив результатов поиска', async () => {
    const res = await request(app)
      .get('/products/search')
      .set('Accept', 'application/json');
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 30000);
}); 