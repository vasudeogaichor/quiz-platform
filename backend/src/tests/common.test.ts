import request from 'supertest';
import {app} from '../index';
import bcrypt from 'bcrypt';

jest.mock('../models/User', () => ({
  findOne: jest.fn().mockImplementation(({ email }) => {
    if (email === '1@gmail.com') {
      return Promise.resolve({
        email: '1@gmail.com',
        password: bcrypt.hashSync('Endgame@2019', 10), // Simulate hashed password
      });
    }
    return Promise.resolve(null);
  }),
}));

describe('GET /api/health', () => {
  it('should return status 200', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
  });
});

// describe('POST /api/auth/login', () => {
//   it('should return status 200 when valid credentials are provided', async () => {
//     const response = await request(app)
//       .post('/api/auth/login')
//       .send({ username: 'user', password: 'password' });
//     expect(response.status).toBe(200);
//   });

//   it('should return status 401 for invalid credentials', async () => {
//     const response = await request(app)
//       .post('/api/auth/login')
//       .send({ username: 'invalid', password: 'wrong' });
//     expect(response.status).toBe(401);
//   });
// });
