const request = require("supertest");
const { expect } = require("chai");
const { app, startServer, endServer } = require("../server");

before(async () => {
  await startServer();
});

after(() => {
  endServer();

});

// Run the tests using: "npx mocha test/auth.test.js", while in the backend directory

describe("\nAuth API", () => {
  describe("\nPOST /api/auth/login and POST /api/auth/register", () => {

    // ----------------------------------------
    // TESTS FOR BASIC MISSING INPUT
    // ----------------------------------------

    // Test for missing username and password in login
    it("should return 400 if username and password are not provided in login", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({});
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("error", "Username and password are required");
    });

    // Test for missing username in login
    it("should return 400 if username is not provided in login", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ password: "testPassword123" });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("error", "Username not given");
    });

    // Test for missing password in login
    it("should return 400 if password is not provided in login", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ username: "testUser" });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("error", "Password not given");
    });

    // Test for missing username and password in register
    it("should return 400 if username and password are not provided in register", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({});
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("error", "Username and password are required");
    });

    // Test for missing username in register
    it("should return 400 if username is not provided in register", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({ password: "testPassword123" });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("error", "Username not given");
    });

    // Test for missing password in register
    it("should return 400 if password is not provided in register", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({ username: "testUser" });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("error", "Password not given");
    });

    // ----------------------------------------
    // INTEGRATION TESTS FOR LOGIN AND REGISTER
    // ----------------------------------------

    const generateRandomString = (length) => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    };

    const testUser = {
      username: "test" + generateRandomString(10),
      password: generateRandomString(15)
    };

    // Test for logging in with a unique username that does not exist
    it("should return 400 if logging in with a unique username", async () => {
      const res = await request(app)
      .post("/api/auth/login")
      .send(testUser);
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("error", "Username or password incorrect");
    });

    // Test for creating a user with a unique username
    it("should return 201 if creating a user with a unique username", async () => {
      const res = await request(app)
      .post("/api/auth/register")
      .send(testUser);
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("message", "Account created successfully");
    });

    // Test for logging in with correct username but wrong password
    it("should return 400 if logging in with correct username, wrong password", async () => {
      const res = await request(app)
      .post("/api/auth/login")
      .send({username: testUser.username, password: testUser.password + "fail"});
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("error", "Username or password incorrect");
    });

    // Test for logging in with correct password but wrong username
    it("should return 400 if logging in with correct password, wrong username", async () => {
      const res = await request(app)
      .post("/api/auth/login")
      .send({username: testUser.username + "fail", password: testUser.password});
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("error", "Username or password incorrect");
    });

    // Test for logging in with correct username and correct password
    it("should return 200 if logging in with correct username, correct password", async () => {
      const res = await request(app)
      .post("/api/auth/login")
      .send(testUser);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message", "Username and password correct");
    });
  });
});
