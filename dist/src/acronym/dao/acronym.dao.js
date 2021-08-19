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
const acronym_1 = require("../../../seed/acronym/acronym");
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
        if (typeof global.it !== "function") {
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
        else {
            return null;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNyb255bS5kYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYWNyb255bS9kYW8vYWNyb255bS5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsc0RBQThCO0FBRTlCLDhGQUFxRTtBQUNyRSx3RkFFa0M7QUFFbEMsMkRBQXdEO0FBRXhELE1BQU0sR0FBRyxHQUFvQixlQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUV0RCxNQUFNLFVBQVU7SUFDZDtRQUdBLFdBQU0sR0FBRywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUM5QyxrQkFBYSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FDN0I7WUFDRSxHQUFHLEVBQUUsTUFBTTtZQUNYLE9BQU8sRUFBRSxNQUFNO1lBQ2YsVUFBVSxFQUFFLE1BQU07U0FDbkIsRUFDRCxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FDZCxDQUFDO1FBRUYsaUJBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxrQ0FBc0IsRUFBRTtZQUMvRCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDO1NBQ2xDLENBQUMsQ0FBQztRQUNILFlBQU8sR0FBRywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FDM0MsU0FBUyxFQUNULElBQUksQ0FBQyxZQUFZLENBQ2MsQ0FBQztRQWxCaEMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDcEMsQ0FBQztJQW1CRCxnQkFBZ0I7UUFDZCxJQUFJLE9BQU8sTUFBTSxDQUFDLEVBQUUsS0FBSyxVQUFVLEVBQUU7WUFDbkMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FDM0IsaUJBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3BCLFNBQVMsRUFBRTtvQkFD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