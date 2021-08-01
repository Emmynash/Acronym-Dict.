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
const acronym_dao_1 = __importDefault(require("../dao/acronym.dao"));
class AcronymService {
    create(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return acronym_dao_1.default.createAcronym(resource);
        });
    }
    list(from, limit, search) {
        return __awaiter(this, void 0, void 0, function* () {
            return acronym_dao_1.default.getAcronyms(from, limit, search);
        });
    }
    readAnAcronym(acronym) {
        return __awaiter(this, void 0, void 0, function* () {
            return acronym_dao_1.default.getAnAcronym(acronym);
        });
    }
    putAnAcronym(acronym, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return acronym_dao_1.default.putAnAcronym(acronym, resource);
        });
    }
    removeAnAcronym(acronym) {
        return __awaiter(this, void 0, void 0, function* () {
            return acronym_dao_1.default.removeAnAcronym(acronym);
        });
    }
}
exports.default = new AcronymService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNyb255bS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Fjcm9ueW0vc2VydmljZXMvYWNyb255bS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EscUVBQTRDO0FBRzVDLE1BQU0sY0FBYztJQUNaLE1BQU0sQ0FBQyxRQUFvQjs7WUFDL0IsT0FBTyxxQkFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxDQUFDO0tBQUE7SUFDSyxJQUFJLENBQUMsSUFBUyxFQUFFLEtBQVUsRUFBRSxNQUFXOztZQUMzQyxPQUFPLHFCQUFVLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDckQsQ0FBQztLQUFBO0lBRUssYUFBYSxDQUFDLE9BQWU7O1lBQ2pDLE9BQU8scUJBQVUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUMsQ0FBQztLQUFBO0lBRUssWUFBWSxDQUFDLE9BQWUsRUFBRSxRQUFvQjs7WUFDdEQsT0FBTyxxQkFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDcEQsQ0FBQztLQUFBO0lBQ0ssZUFBZSxDQUFDLE9BQWU7O1lBQ25DLE9BQU8scUJBQVUsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0MsQ0FBQztLQUFBO0NBQ0Y7QUFFRCxrQkFBZSxJQUFJLGNBQWMsRUFBRSxDQUFDIn0=