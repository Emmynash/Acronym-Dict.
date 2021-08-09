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
const acronym_1 = require("../../../seed/data/01-acronym/acronym");
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
    bulkWriteAcronym() {
        return this.Acronym.bulkWrite(acronym_1.acronym.map((acr) => ({
            updateOne: {
                filter: { _id: acr._id },
                update: { $set: acr },
                upsert: true,
            },
        }))).then((res) => {
            if (res) {
                log("bulk acronyms with definitions added");
            }
            else {
                log("bulk create was unsuccessful");
            }
        });
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
            if (!search) {
                return yield this.Acronym.find()
                    .limit(parseInt(limit))
                    .skip(parseInt(from))
                    .exec();
            }
            else {
                const regex = new RegExp(this.escapeRegex(search), "gi");
                return yield this.Acronym.find({ acronym: regex })
                    .limit(parseInt(limit))
                    .skip(parseInt(from))
                    .exec();
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNyb255bS5kYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYWNyb255bS9kYW8vYWNyb255bS5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsc0RBQThCO0FBRTlCLDhGQUFxRTtBQUNyRSx3RkFFa0M7QUFFbEMsbUVBQWdFO0FBRWhFLE1BQU0sR0FBRyxHQUFvQixlQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUV0RCxNQUFNLFVBQVU7SUFDZDtRQUdBLFdBQU0sR0FBRywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUM5QyxrQkFBYSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FDN0I7WUFDRSxHQUFHLEVBQUUsTUFBTTtZQUNYLE9BQU8sRUFBRSxNQUFNO1lBQ2YsVUFBVSxFQUFFLE1BQU07U0FDbkIsRUFDRCxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FDZCxDQUFDO1FBRUYsaUJBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxrQ0FBc0IsRUFBRTtZQUMvRCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDO1NBQ2xDLENBQUMsQ0FBQztRQUNILFlBQU8sR0FBRywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FDM0MsU0FBUyxFQUNULElBQUksQ0FBQyxZQUFZLENBQ2MsQ0FBQztRQWxCaEMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDcEMsQ0FBQztJQW1CRCxnQkFBZ0I7UUFDZCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUMzQixpQkFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNwQixTQUFTLEVBQUU7Z0JBQ1QsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUU7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