const request = require('supertest');
const { expect } = require('chai');
const { app, startServer } = require('../server');

before(async () => {
    await startServer();
});


describe('Auth API', () => {
  describe('POST /api/auth/login', () => {
    it('should return 400 if username and password are not provided', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({});
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'Username and password are required');
    });

    it('should return 400 if username is not provided', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ password: 'testPassword123' });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'Username not given');
    });

    it('should return 400 if password is not provided', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'testUser' });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'Password not given');
    });

    it('should return 400 if username or password is incorrect', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'wrongUser', password: 'wrongPassword' });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'Username or password incorrect');
    });

    // Add more tests as needed
  });
});