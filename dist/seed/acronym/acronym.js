"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.acronym = void 0;
const acronym_json_1 = __importDefault(require("../acronym/acronym.json"));
const shortid_1 = __importDefault(require("shortid"));
const seedData = () => {
    let seedArray = [];
    acronym_json_1.default.map((data) => {
        const _id = shortid_1.default.generate();
        seedArray.push({
            _id,
            acronym: Object.keys(data).toString(),
            definition: Object.values(data).toString(),
        });
    });
    return seedArray;
};
exports.acronym = seedData();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNyb255bS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlZWQvYWNyb255bS9hY3JvbnltLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJFQUFrRDtBQUNsRCxzREFBOEI7QUFFOUIsTUFBTSxRQUFRLEdBQUcsR0FBRyxFQUFFO0lBQ3BCLElBQUksU0FBUyxHQUFRLEVBQUUsQ0FBQztJQUN4QixzQkFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3ZCLE1BQU0sR0FBRyxHQUFXLGlCQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUNiLEdBQUc7WUFDSCxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDckMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFO1NBQzNDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQyxDQUFDO0FBRVcsUUFBQSxPQUFPLEdBQUcsUUFBUSxFQUFFLENBQUMifQ==