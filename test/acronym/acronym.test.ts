import app from "../../app";
import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";

let accessToken = "";
let acronym = "";
const acronymDetails = {
  acronym: "LOC",
  definition: "Laugh Out Clean",
};
describe("acronym endpoints", function () {
  let request: supertest.SuperAgentTest;
  before(function () {
    request = supertest.agent(app);
  });
  it("should allow a POST to /acronym", async function () {
    const res = await request.post("/acronym").send(acronymDetails);
    expect(res.status).to.be.equal(201);
    expect(res.body).to.not.be.empty;
    expect(res.body).to.be.an("object");
    expect(res.body.accessToken).to.be.a("string");
    accessToken = res.body.accessToken;
    acronym = res.body.acronym.acronym;
  });
  it("should allow a fuzzy search to /acronym?from=0&limit=10&search=:search", async function () {
    const res = await request.get("/acronym?from=0&limit=10&search=lo").send();
    expect(res.status).to.be.equal(200);
    expect(res.body).to.not.be.empty;
    expect(res.body).to.be.an("array");
  });
  describe("without a valid access token", function () {
    it("should disallow a PUT to /acronym/:acronym with invalid acronym", async function () {
      const res = await request
        .put(`/acronym/1`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({ acronym: "LOH", definition: "Love You Loads" });
      expect(res.status).to.be.equal(400);
      expect(res.body).to.not.be.empty;
    });
    it("should disallow a PUT to /acronym/:acronym with empty body", async function () {
      const res = await request
        .put(`/acronym/${acronym}`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send();
      expect(res.status).to.be.equal(400);
      expect(res.body).to.not.be.empty;
    });
    it("should disallow a PUT to /acronym/:acronym with invalid access token", async function () {
      const res = await request
        .put(`/acronym/${acronym}`)
        .set({ Authorization: `Bearer token` })
        .send({ acronym: "LOC", definition: "Love You Loads" });
      expect(res.status).to.be.equal(403);
      expect(res.body).to.be.empty;
    });
    it("should disallow a PUT to /acronym/:acronym with no access token", async function () {
      const res = await request
        .put(`/acronym/${acronym}`)
        .send({ acronym: "LOL", definition: "Love You Loads" });
      expect(res.status).to.be.equal(401);
      expect(res.body).to.be.empty;
    });
    it("should disallow a DELETE to /acronym/:acronym with invalid acronym", async function () {
      const res = await request
        .delete(`/acronym/1`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send();
      expect(res.status).to.be.equal(400);
      expect(res.body).to.not.be.empty;
    });
    it("should disallow a DELETE to /acronym/:acronym with invalid access token", async function () {
      const res = await request
        .delete(`/acronym/${acronym}`)
        .set({ Authorization: `Bearer ${"accessToken"}` })
        .send();
      expect(res.status).to.be.equal(403);
      expect(res.body).to.be.empty;
    });
    it("should disallow a DELETE to /acronym/:acronym with no access token", async function () {
      const res = await request.delete(`/acronym/${acronym}`).send();
      expect(res.status).to.be.equal(401);
      expect(res.body).to.be.empty;
    });
    describe("with a valid access token", function () {
      it("should allow a PUT to /acronym/:acronym", async function () {
        const res = await request
          .put(`/acronym/${acronym}`)
          .set({ Authorization: `Bearer ${accessToken}` })
          .send({ acronym: "LOB", definition: "Love Out big" });
        expect(res.status).to.be.equal(204);
        expect(res.body).to.be.empty;
        acronym = "LOB";
      });
      it("should allow a DELETE to /acronym/:acronym", async function () {
        const res = await request
          .delete(`/acronym/${acronym}`)
          .set({ Authorization: `Bearer ${accessToken}` })
          .send();
        expect(res.status).to.be.equal(204);
        expect(res.body).to.be.empty;
      });
    });
  });
  after(function (done) {
    app.close(() => {
      mongoose.connection.close(done);
    });
  });
});
