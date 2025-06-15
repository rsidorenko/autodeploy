import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/posuda-test');
}, 30000);

afterAll(async () => {
  await mongoose.disconnect();
}, 30000);

describe('Тесты API заказов', () => {
  it('GET /orders должен вернуть 401 или 404 для неавторизованного пользователя', async () => {
    const res = await request(app)
      .get('/orders')
      .set('Accept', 'application/json');
    expect([401, 404]).toContain(res.status);
  }, 30000);

  it('POST /orders должен вернуть 401 или 404 без авторизации', async () => {
    const res = await request(app)
      .post('/orders')
      .send({
        items: [],
        recipient: {
          firstName: 'Test',
          lastName: 'User'
        }
      })
      .set('Accept', 'application/json');
    expect([401, 404]).toContain(res.status);
  }, 30000);

  it('GET /orders/:id должен вернуть 401, 404 или 500 без авторизации', async () => {
    const res = await request(app)
      .get('/orders/123456789')
      .set('Accept', 'application/json');
    expect([401, 404, 500]).toContain(res.status);
  }, 30000);
}); 