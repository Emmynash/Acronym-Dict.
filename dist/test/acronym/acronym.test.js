"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../app"));
const chai_1 = require("chai");
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
let accessToken = "";
let acronym = "";
const acronymDetails = {
    acronym: "LOC",
    definition: "Laugh Out Clean",
};
describe("acronym endpoints", function () {
    let request;
    before(function () {
        request = supertest_1.default.agent(app_1.default);
    });
    it("should allow a POST to /acronym", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.post("/acronym").send(acronymDetails);
            chai_1.expect(res.status).to.be.equal(201);
            chai_1.expect(res.body).to.not.be.empty;
            chai_1.expect(res.body).to.be.an("object");
            chai_1.expect(res.body.accessToken).to.be.a("string");
            accessToken = res.body.accessToken;
            acronym = res.body.acronym.acronym;
        });
    });
    it("should allow a fuzzy search to /acronym?from=0&limit=10&search=:search", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.get("/acronym?from=0&limit=10&search=lo").send();
            chai_1.expect(res.status).to.be.equal(200);
            chai_1.expect(res.body).to.not.be.empty;
            chai_1.expect(res.body).to.be.an("array");
        });
    });
    describe("without a valid access token", function () {
        it("should disallow a PUT to /acronym/:acronym with invalid acronym", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield request
                    .put(`/acronym/1`)
                    .set({ Authorization: `Bearer ${accessToken}` })
                    .send({ acronym: "LOH", definition: "Love You Loads" });
                chai_1.expect(res.status).to.be.equal(400);
                chai_1.expect(res.body).to.not.be.empty;
            });
        });
        it("should disallow a PUT to /acronym/:acronym with empty body", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield request
                    .put(`/acronym/${acronym}`)
                    .set({ Authorization: `Bearer ${accessToken}` })
                    .send();
                chai_1.expect(res.status).to.be.equal(400);
                chai_1.expect(res.body).to.not.be.empty;
            });
        });
        it("should disallow a PUT to /acronym/:acronym with invalid access token", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield request
                    .put(`/acronym/${acronym}`)
                    .set({ Authorization: `Bearer token` })
                    .send({ acronym: "LOC", definition: "Love You Loads" });
                chai_1.expect(res.status).to.be.equal(403);
                chai_1.expect(res.body).to.be.empty;
            });
        });
        it("should disallow a PUT to /acronym/:acronym with no access token", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield request
                    .put(`/acronym/${acronym}`)
                    .send({ acronym: "LOL", definition: "Love You Loads" });
                chai_1.expect(res.status).to.be.equal(401);
                chai_1.expect(res.body).to.be.empty;
            });
        });
        it("should disallow a DELETE to /acronym/:acronym with invalid acronym", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield request
                    .delete(`/acronym/1`)
                    .set({ Authorization: `Bearer ${accessToken}` })
                    .send();
                chai_1.expect(res.status).to.be.equal(400);
                chai_1.expect(res.body).to.not.be.empty;
            });
        });
        it("should disallow a DELETE to /acronym/:acronym with invalid access token", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield request
                    .delete(`/acronym/${acronym}`)
                    .set({ Authorization: `Bearer ${"accessToken"}` })
                    .send();
                chai_1.expect(res.status).to.be.equal(403);
                chai_1.expect(res.body).to.be.empty;
            });
        });
        it("should disallow a DELETE to /acronym/:acronym with no access token", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield request.delete(`/acronym/${acronym}`).send();
                chai_1.expect(res.status).to.be.equal(401);
                chai_1.expect(res.body).to.be.empty;
            });
        });
        describe("with a valid access token", function () {
            it("should allow a PUT to /acronym/:acronym", function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const res = yield request
                        .put(`/acronym/${acronym}`)
                        .set({ Authorization: `Bearer ${accessToken}` })
                        .send({ acronym: "LOB", definition: "Love Out big" });
                    chai_1.expect(res.status).to.be.equal(204);
                    chai_1.expect(res.body).to.be.empty;
                    acronym = "LOB";
                });
            });
            it("should allow a DELETE to /acronym/:acronym", function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const res = yield request
                        .delete(`/acronym/${acronym}`)
                        .set({ Authorization: `Bearer ${accessToken}` })
                        .send();
                    chai_1.expect(res.status).to.be.equal(204);
                    chai_1.expect(res.body).to.be.empty;
                });
            });
        });
    });
    after(function (done) {
        app_1.default.close(() => {
            mongoose_1.default.connection.close(done);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNyb255bS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGVzdC9hY3JvbnltL2Fjcm9ueW0udGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUE0QjtBQUM1QiwrQkFBOEI7QUFDOUIsMERBQWtDO0FBQ2xDLHdEQUFnQztBQUVoQyxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDckIsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLE1BQU0sY0FBYyxHQUFHO0lBQ3JCLE9BQU8sRUFBRSxLQUFLO0lBQ2QsVUFBVSxFQUFFLGlCQUFpQjtDQUM5QixDQUFDO0FBQ0YsUUFBUSxDQUFDLG1CQUFtQixFQUFFO0lBQzVCLElBQUksT0FBaUMsQ0FBQztJQUN0QyxNQUFNLENBQUM7UUFDTCxPQUFPLEdBQUcsbUJBQVMsQ0FBQyxLQUFLLENBQUMsYUFBRyxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsaUNBQWlDLEVBQUU7O1lBQ3BDLE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDaEUsYUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwQyxhQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNqQyxhQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BDLGFBQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFF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