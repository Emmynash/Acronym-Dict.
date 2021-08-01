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
const express_validator_1 = require("express-validator");
const acronym_service_1 = __importDefault(require("../services/acronym.service"));
class AcronymMiddleware {
    validateBodyFields(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.acronym &&
                req.body.definition &&
                express_validator_1.body(req.body.acronym).isString() &&
                express_validator_1.body(req.body.definition).isString()) {
                return next();
            }
            else {
                return res
                    .status(400)
                    .send({ error: "Acronym and definition are required strings" });
            }
        });
    }
    validateAcronymExist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const acronym = yield acronym_service_1.default.readAnAcronym(req.params.acronym);
            if (acronym) {
                res.locals.acronym = acronym;
                return next();
            }
            else {
                res.status(400).send({ error: "Acronym does not exist" });
            }
        });
    }
    validateAcronymDoNotExist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const acronym = yield acronym_service_1.default.readAnAcronym(req.body.acronym);
            if (acronym) {
                return res.status(400).send({ error: "Acronym already exist" });
            }
            else {
                res.locals.acronym = acronym;
                return next();
            }
        });
    }
    getAcronymId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.id = req.params.id;
            next();
        });
    }
}
exports.default = new AcronymMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNyb255bS5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Fjcm9ueW0vbWlkZGxld2FyZS9hY3JvbnltLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSx5REFBeUM7QUFDekMsa0ZBQXlEO0FBRXpELE1BQU0saUJBQWlCO0lBQ2Ysa0JBQWtCLENBQ3RCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixJQUNFLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTztnQkFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVO2dCQUNuQix3QkFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFO2dCQUNqQyx3QkFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQ3BDO2dCQUNBLE9BQU8sSUFBSSxFQUFFLENBQUM7YUFDZjtpQkFBTTtnQkFDTCxPQUFPLEdBQUc7cUJBQ1AsTUFBTSxDQUFDLEdBQUcsQ0FBQztxQkFDWCxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsNkNBQTZDLEVBQUUsQ0FBQyxDQUFDO2FBQ25FO1FBQ0gsQ0FBQztLQUFBO0lBQ0ssb0JBQW9CLENBQ3hCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixNQUFNLE9BQU8sR0FBRyxNQUFNLHlCQUFjLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkUsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUM3QixPQUFPLElBQUksRUFBRSxDQUFDO2FBQ2Y7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDO2FBQzNEO1FBQ0gsQ0FBQztLQUFBO0lBQ0sseUJBQXlCLENBQzdCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixNQUFNLE9BQU8sR0FBRyxNQUFNLHlCQUFjLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckUsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxDQUFDLENBQUM7YUFDakU7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUM3QixPQUFPLElBQUksRUFBRSxDQUFDO2FBQ2Y7UUFDSCxDQUFDO0tBQUE7SUFDSyxZQUFZLENBQ2hCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUM1QixJQUFJLEVBQUUsQ0FBQztRQUNULENBQUM7S0FBQTtDQUNGO0FBQ0Qsa0JBQWUsSUFBSSxpQkFBaUIsRUFBRSxDQUFDIn0=