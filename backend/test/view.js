const request = require('supertest');
const { expect } = require('chai');
const { app, startServer, endServer } = require('../server');

before(async () => {
  await startServer();
});

after(() => {
  endServer();
});

describe('Auth API', () => {
  describe('POST /api/auth/register and POST /api/auth/login', () => {
    const testUser = {
      username: 'testUser',
      password: 'testPassword123'
    };

    it('should return 400 if username and password are not provided for register', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({});
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'Username and password are required');
    });

    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('message', 'User registered successfully');
    });

    it('should return 400 if username and password are not provided for login', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({});
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'Username and password are required');
    });

    it('should return 400 if username is not provided for login', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ password: 'testPassword123' });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'Username not given');
    });

    it('should return 400 if password is not provided for login', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'testUser' });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'Password not given');
    });

    it('should return 400 if username or password is incorrect for login', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'wrongUser', password: 'wrongPassword' });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'Username or password incorrect');
    });

    it('should login with the registered user', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send(testUser);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message', 'Login successful');
    });

    // Add more tests as needed
  });
});