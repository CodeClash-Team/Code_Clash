const request = require("supertest");
const { expect } = require("chai");
const { app, startServer, endServer } = require("../server");

before(async () => {
  await startServer();
});

after(() => {
  endServer();

});


describe("\nAuth API", () => {
  describe("\nPOST /api/auth/login and POST /api/auth/register", () => {

    //TESTS FOR BASIC MISSING INPUT

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

    // INTEGRATION TESTS FOR LOGIN AND REGISTER

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
      username: generateRandomString(10),
      password: generateRandomString(15)
    };

    it("should return 201 if creating a user with a unique username", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send(testUser);
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("message", "Account created successfully");
    });



  });
});
