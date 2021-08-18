import debug from "debug";
import shortId from "shortid";
import { AcronymDto } from "../dto/acronym";
import MongooseService from "../../common/services/mongoose.service";
import mongooseFuzzySearching, {
  MongooseFuzzyModel,
} from "mongoose-fuzzy-searching";
import { IAcronym } from "../../common/interfaces/acronym.interface";
import { acronym } from "../../../seed/acronym/acronym";

const log: debug.IDebugger = debug("App:Acronym-Dao");

class AcronymDao {
  constructor() {
    log("Create new instance of Dao");
  }
  Schema = MongooseService.getMongoose().Schema;
  AcronymSchema = new this.Schema(
    {
      _id: String,
      acronym: String,
      definition: String,
    },
    { id: false }
  );

  schemaPlugin = this.AcronymSchema.plugin(mongooseFuzzySearching, {
    fields: ["acronym", "definition"],
  });
  Acronym = MongooseService.getMongoose().model<IAcronym>(
    "Acronym",
    this.schemaPlugin
  ) as MongooseFuzzyModel<IAcronym>;

  bulkWriteAcronym() {
    return this.Acronym.bulkWrite(
      acronym.map((acr) => ({
        updateOne: {
          filter: { _id: acr._id },
          update: { $set: acr },
          upsert: true,
        },
      }))
    ).then((res) => {
      if (res) {
        log("bulk acronyms with definitions added");
      } else {
        log("bulk create was unsuccessful");
      }
    });
  }
  async createAcronym(acronymDetails: AcronymDto) {
    const acronymId = shortId.generate();
    const res = new this.Acronym({
      _id: acronymId,
      ...acronymDetails,
    });
    await res.save();
    return res;
  }

  escapeRegex(text: string) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
  async getAcronyms(from: string, limit: string, search: string) {
    if (!search) {
      return await this.Acronym.find()
        .limit(parseInt(limit))
        .skip(parseInt(from))
        .exec();
    } else {
      const regex = new RegExp(this.escapeRegex(search), "gi");
      return await this.Acronym.find({ acronym: regex })
        .limit(parseInt(limit))
        .skip(parseInt(from))
        .exec();
    }
  }

  getAnAcronym(acronym: string) {
    return this.Acronym.findOne({ acronym: acronym }).exec();
  }
  putAnAcronym(acronym: string, acronymDetails: AcronymDto) {
    return this.Acronym.findOneAndUpdate(
      { acronym: acronym },
      { $set: acronymDetails },
      { new: true }
    ).exec();
  }

  removeAnAcronym(acronym: string) {
    return this.Acronym.findOneAndDelete({ acronym: acronym }).exec();
  }
}

export default new AcronymDao();
