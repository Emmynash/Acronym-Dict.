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
const debug_1 = __importDefault(require("debug"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const acronym_service_1 = __importDefault(require("../services/acronym.service"));
const log = debug_1.default("App:Acronym-Service");
// @ts-expect-error
const jwtSecret = process.env.JWT_SECRET;
const tokenExpirationInSeconds = 3600;
class AcronymController {
    listAllAcronyms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const acronyms = yield acronym_service_1.default.list(req.query.from, req.query.limit, req.query.search);
            res.status(200).send(acronyms);
        });
    }
    createAcronym(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = jsonwebtoken_1.default.sign(req.body, jwtSecret, {
                    expiresIn: tokenExpirationInSeconds,
                });
                const acronym = yield acronym_service_1.default.create(req.body);
                res
                    .status(201)
                    .send({ acronym: acronym, accessToken: token });
            }
            catch (error) {
                log("jwt error %0", error);
                res.status(500).send();
            }
        });
    }
    putAcronym(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield acronym_service_1.default.putAnAcronym(req.params.acronym, req.body));
            res.status(204).send();
        });
    }
    removeAcronym(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield acronym_service_1.default.removeAnAcronym(req.params.acronym));
            res.status(204).send();
        });
    }
}
exports.default = new AcronymController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNyb255bS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Fjcm9ueW0vY29udHJvbGxlcnMvYWNyb255bS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esa0RBQTBCO0FBQzFCLGdFQUErQjtBQUUvQixrRkFBeUQ7QUFFekQsTUFBTSxHQUFHLEdBQW9CLGVBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQzFELG1CQUFtQjtBQUNuQixNQUFNLFNBQVMsR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztBQUNqRCxNQUFNLHdCQUF3QixHQUFHLElBQUksQ0FBQztBQUV0QyxNQUFNLGlCQUFpQjtJQUNmLGVBQWUsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUMvRCxNQUFNLFFBQVEsR0FBRyxNQUFNLHlCQUFjLENBQUMsSUFBSSxDQUN4QyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFDZCxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssRUFDZixHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FDakIsQ0FBQztZQUNGLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7S0FBQTtJQUVLLGFBQWEsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUM3RCxJQUFJO2dCQUNGLE1BQU0sS0FBSyxHQUFHLHNCQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO29CQUMxQyxTQUFTLEVBQUUsd0JBQXdCO2lCQUNwQyxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxPQUFPLEdBQUcsTUFBTSx5QkFBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3RELEdBQUc7cUJBQ0EsTUFBTSxDQUFDLEdBQUcsQ0FBQztxQkFDWCxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO2FBQ2xEO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2QsR0FBRyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDM0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN4QjtRQUNILENBQUM7S0FBQTtJQUVLLFVBQVUsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUMxRCxHQUFHLENBQUMsTUFBTSx5QkFBYyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNyRSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLENBQUM7S0FBQTtJQUVLLGFBQWEsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUM3RCxHQUFHLENBQUMsTUFBTSx5QkFBYyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDOUQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixDQUFDO0tBQUE7Q0FDRjtBQUVELGtCQUFlLElBQUksaUJBQWlCLEVBQUUsQ0FBQyJ9