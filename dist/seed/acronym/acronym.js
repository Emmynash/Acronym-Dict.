"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const acronym_json_1 = __importDefault(require("../data/acronym/acronym.json"));
const shortid_1 = __importDefault(require("shortid"));
class Seed {
    seedData() {
        let seedArray = [];
        acronym_json_1.default.map((data) => {
            const _id = shortid_1.default.generate();
            seedArray.push({
                _id,
                acronym: Object.keys(data).toString(),
                definition: Object.values(data).toString(),
            });
        });
        console.log(seedArray);
        return seedArray;
    }
}
exports.default = new Seed();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNyb255bS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlZWQvYWNyb255bS9hY3JvbnltLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0ZBQXVEO0FBQ3ZELHNEQUE4QjtBQUU5QixNQUFNLElBQUk7SUFDUixRQUFRO1FBQ04sSUFBSSxTQUFTLEdBQVEsRUFBRSxDQUFDO1FBQ3hCLHNCQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdkIsTUFBTSxHQUFHLEdBQVcsaUJBQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN2QyxTQUFTLENBQUMsSUFBSSxDQUFDO2dCQUNiLEdBQUc7Z0JBQ0gsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFO2dCQUNyQyxVQUFVLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUU7YUFDM0MsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7Q0FDRjtBQUVELGtCQUFlLElBQUksSUFBSSxFQUFFLENBQUMifQ==