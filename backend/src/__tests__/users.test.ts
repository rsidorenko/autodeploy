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

describe('Тесты API пользователей', () => {
  it('GET /users/profile должен вернуть 401 без авторизации', async () => {
    const res = await request(app)
      .get('/users/profile')
      .set('Accept', 'application/json');
    
    expect(res.status).toBe(401);
  }, 30000);

  it('POST /users/register должен вернуть 400 при неверных данных', async () => {
    const res = await request(app)
      .post('/users/register')
      .send({
        email: 'invalid-email',
        password: '123'
      })
      .set('Accept', 'application/json');
    
    expect(res.status).toBe(400);
  }, 30000);

  it('POST /users/login должен вернуть 401 при неверных учетных данных', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        email: 'test@test.com',
        password: 'wrongpassword'
      })
      .set('Accept', 'application/json');
    
    expect(res.status).toBe(401);
  }, 30000);
}); 