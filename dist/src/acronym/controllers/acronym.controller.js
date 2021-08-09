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
            const acronyms = yield acronym_service_1.default.list(req.query.from || 0, req.query.limit || 100, req.query.search);
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
                res.status(201).send({ acronym: acronym, accessToken: token });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNyb255bS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Fjcm9ueW0vY29udHJvbGxlcnMvYWNyb255bS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esa0RBQTBCO0FBQzFCLGdFQUErQjtBQUMvQixrRkFBeUQ7QUFFekQsTUFBTSxHQUFHLEdBQW9CLGVBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQzFELG1CQUFtQjtBQUNuQixNQUFNLFNBQVMsR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztBQUNqRCxNQUFNLHdCQUF3QixHQUFHLElBQUksQ0FBQztBQUV0QyxNQUFNLGlCQUFpQjtJQUNmLGVBQWUsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUMvRCxNQUFNLFFBQVEsR0FBRyxNQUFNLHlCQUFjLENBQUMsSUFBSSxDQUN4QyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQ25CLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEdBQUcsRUFDdEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQ2pCLENBQUM7WUFDRixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQyxDQUFDO0tBQUE7SUFFSyxhQUFhLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDN0QsSUFBSTtnQkFDRixNQUFNLEtBQUssR0FBRyxzQkFBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtvQkFDMUMsU0FBUyxFQUFFLHdCQUF3QjtpQkFDcEMsQ0FBQyxDQUFDO2dCQUNILE1BQU0sT0FBTyxHQUFHLE1BQU0seUJBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0RCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7YUFDaEU7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZCxHQUFHLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUMzQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3hCO1FBQ0gsQ0FBQztLQUFBO0lBRUssVUFBVSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQzFELEdBQUcsQ0FBQyxNQUFNLHlCQUFjLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsQ0FBQztLQUFBO0lBRUssYUFBYSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQzdELEdBQUcsQ0FBQyxNQUFNLHlCQUFjLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM5RCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLENBQUM7S0FBQTtDQUNGO0FBRUQsa0JBQWUsSUFBSSxpQkFBaUIsRUFBRSxDQUFDIn0=