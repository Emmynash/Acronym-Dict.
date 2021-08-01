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
const shortid_1 = __importDefault(require("shortid"));
const mongoose_service_1 = __importDefault(require("../../common/services/mongoose.service"));
const mongoose_fuzzy_searching_1 = __importDefault(require("mongoose-fuzzy-searching"));
const log = debug_1.default("App:Acronym-Dao");
class AcronymDao {
    constructor() {
        this.Schema = mongoose_service_1.default.getMongoose().Schema;
        this.AcronymSchema = new this.Schema({
            _id: String,
            acronym: String,
            definition: String,
        }, { id: false });
        this.schemaPlugin = this.AcronymSchema.plugin(mongoose_fuzzy_searching_1.default, {
            fields: ["acronym", "definition"],
        });
        this.Acronym = mongoose_service_1.default.getMongoose().model("Acronym", this.schemaPlugin);
        log("Create new instance of Dao");
    }
    createAcronym(acronymDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const acronymId = shortid_1.default.generate();
            const res = new this.Acronym(Object.assign({ _id: acronymId }, acronymDetails));
            yield res.save();
            return res;
        });
    }
    escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
    getAcronyms(from, limit, search) {
        return __awaiter(this, void 0, void 0, function* () {
            const regex = new RegExp(this.escapeRegex(search), "gi");
            return yield this.Acronym.find({ acronym: regex })
                .limit(parseInt(limit))
                .skip(parseInt(from))
                .exec();
        });
    }
    getAnAcronym(acronym) {
        return this.Acronym.findOne({ acronym: acronym }).exec();
    }
    putAnAcronym(acronym, acronymDetails) {
        return this.Acronym.findOneAndUpdate({ acronym: acronym }, { $set: acronymDetails }, { new: true }).exec();
    }
    removeAnAcronym(acronym) {
        return this.Acronym.findOneAndDelete({ acronym: acronym }).exec();
    }
}
exports.default = new AcronymDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNyb255bS5kYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYWNyb255bS9kYW8vYWNyb255bS5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsc0RBQThCO0FBRTlCLDhGQUFxRTtBQUNyRSx3RkFFa0M7QUFHbEMsTUFBTSxHQUFHLEdBQW9CLGVBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRXRELE1BQU0sVUFBVTtJQUNkO1FBR0EsV0FBTSxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQzlDLGtCQUFhLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUM3QjtZQUNFLEdBQUcsRUFBRSxNQUFNO1lBQ1gsT0FBTyxFQUFFLE1BQU07WUFDZixVQUFVLEVBQUUsTUFBTTtTQUNuQixFQUNELEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUNkLENBQUM7UUFFRixpQkFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLGtDQUFzQixFQUFFO1lBQy9ELE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUM7U0FDbEMsQ0FBQyxDQUFDO1FBQ0gsWUFBTyxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUMzQyxTQUFTLEVBQ1QsSUFBSSxDQUFDLFlBQVksQ0FDYyxDQUFDO1FBbEJoQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBbUJLLGFBQWEsQ0FBQyxjQUEwQjs7WUFDNUMsTUFBTSxTQUFTLEdBQUcsaUJBQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNyQyxNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLGlCQUMxQixHQUFHLEVBQUUsU0FBUyxJQUNYLGNBQWMsRUFDakIsQ0FBQztZQUNILE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2pCLE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQztLQUFBO0lBRUQsV0FBVyxDQUFDLElBQVk7UUFDdEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFDSyxXQUFXLENBQUMsSUFBWSxFQUFFLEtBQWEsRUFBRSxNQUFjOztZQUMzRCxNQUFNLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3pELE9BQU8sTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztpQkFDL0MsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDcEIsSUFBSSxFQUFFLENBQUM7UUFDWixDQUFDO0tBQUE7SUFFRCxZQUFZLENBQUMsT0FBZTtRQUMxQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDM0QsQ0FBQztJQUNBLFlBQVksQ0FBQyxPQUFlLEVBQUUsY0FBMEI7UUFDdkQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUNsQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEVBQ3hCLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUNkLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDO0lBRUQsZUFBZSxDQUFDLE9BQWU7UUFDOUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkUsQ0FBQztDQUNGO0FBRUQsa0JBQWUsSUFBSSxVQUFVLEVBQUUsQ0FBQyJ9