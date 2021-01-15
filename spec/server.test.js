/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-curly-spacing */
const {MongoClient} = require('mongodb');
const request = require('supertest');
const app = require('../server/server');

describe("Server", () => {
  let connection;
  let db;

  beforeEach(async () => {
    await db.collection('itemlist').deleteMany({});
  });

  beforeAll(async () => {
    connection = await MongoClient.connect('mongodb://localhost/itemlist', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = await connection.db();
  });

  afterAll(async () => {
    await connection.close();
  });

  it("should make a GET request to get docs from database", async () => {
    const response = await request(app).get("/items");
    expect(response.statusCode).toBe(200);
  });

  it("should make a POST request to add doc to database", async () => {
    const response = await request(app).post("/items")
      .send({
        _id: 101,
        images: [],
        thumbs: [],
        favorite: false,
      });
    expect(response.statusCode).toBe(201);
    await request(app).put("/items")
      .send({
        _id: 101,
        images: [],
        thumbs: [],
        favorite: false,
      });
  });

  it("should make a PUT request to delete doc from database", async () => {
    await request(app).post("/items")
      .send({
        _id: 101,
        images: [],
        thumbs: [],
        favorite: false,
      });
    const response = await request(app).put("/items")
      .send({
        _id: 101,
        images: [],
        thumbs: [],
        favorite: false,
      });
    expect(response.statusCode).toBe(201);
  });

  it("should make a PATCH request to find and update a doc in database", async () => {
    await request(app).post("/items")
      .send({
        _id: 101,
        images: [],
        thumbs: [],
        favorite: false,
      });
    const response = await request(app).patch("/items")
      .send({
        _id: 101,
        images: [],
        thumbs: [],
        favorite: false,
      });
    expect(response.statusCode).toBe(204);
    await request(app).put("/items")
      .send({
        _id: 101,
        images: [],
        thumbs: [],
        favorite: false,
      });
  });
});
