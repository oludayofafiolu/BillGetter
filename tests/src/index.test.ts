const request = require("supertest");
const app = require("../../src/index");
import { Request, Response } from 'express';


describe("Test the root path", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/")
      .then((response: Response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
