/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-curly-spacing */
const request = require("supertest");

describe("Server", () => {
  test("It should make a GET request", async () => {
    // const res =
    await request('http://localhost:3000')
      .get('/items')
      .expect(200);
    //   .expect('Content-Type', /json/);
    // expect(Array.isArray(res.body)).toBe(true);
    // expect(res.body.length).toBeGreaterThan(0);
  });
});
