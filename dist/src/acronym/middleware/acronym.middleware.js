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
const acronym_service_1 = __importDefault(require("../services/acronym.service"));
const debug_1 = __importDefault(require("debug"));
const log = debug_1.default("App-Acronym-Middleware");
class AcronymMiddleware {
    validateRequiredBodyFields(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.acronym && req.body.definition) {
                return next();
            }
            else {
                return res
                    .status(400)
                    .send({ error: "Acronym and definition are required" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNyb255bS5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Fjcm9ueW0vbWlkZGxld2FyZS9hY3JvbnltLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxrRkFBeUQ7QUFDekQsa0RBQTBCO0FBRTFCLE1BQU0sR0FBRyxHQUFvQixlQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUU3RCxNQUFNLGlCQUFpQjtJQUNmLDBCQUEwQixDQUM5QixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDM0MsT0FBTyxJQUFJLEVBQUUsQ0FBQzthQUNmO2lCQUFNO2dCQUNMLE9BQU8sR0FBRztxQkFDUCxNQUFNLENBQUMsR0FBRyxDQUFDO3FCQUNYLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxxQ0FBcUMsRUFBRSxDQUFDLENBQUM7YUFDM0Q7UUFDSCxDQUFDO0tBQUE7SUFDSyxvQkFBb0IsQ0FDeEIsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLE1BQU0sT0FBTyxHQUFHLE1BQU0seUJBQWMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2RSxJQUFJLE9BQU8sRUFBRTtnQkFDWCxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0JBQzdCLE9BQU8sSUFBSSxFQUFFLENBQUM7YUFDZjtpQkFBTTtnQkFDTCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSx3QkFBd0IsRUFBRSxDQUFDLENBQUM7YUFDM0Q7UUFDSCxDQUFDO0tBQUE7SUFDSyx5QkFBeUIsQ0FDN0IsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLE1BQU0sT0FBTyxHQUFHLE1BQU0seUJBQWMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyRSxJQUFJLE9BQU8sRUFBRTtnQkFDWCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLENBQUMsQ0FBQzthQUNqRTtpQkFBTTtnQkFDTCxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0JBQzdCLE9BQU8sSUFBSSxFQUFFLENBQUM7YUFDZjtRQUNILENBQUM7S0FBQTtJQUNLLFlBQVksQ0FDaEIsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQzVCLElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQztLQUFBO0NBQ0Y7QUFDRCxrQkFBZSxJQUFJLGlCQUFpQixFQUFFLENBQUMifQ==