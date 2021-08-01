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
const mongoose_1 = __importDefault(require("mongoose"));
const debug_1 = __importDefault(require("debug"));
const log = debug_1.default("App:Mongoose-Service");
class MongooseService {
    constructor() {
        this.count = 0;
        this.mongooseOption = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 8000,
            useFindAndModify: false,
            useCreateIndex: true,
        };
        this.connectWithRetry = () => __awaiter(this, void 0, void 0, function* () {
            let dbUrl = process.env.MONGO_DOCKER_URI;
            // if (process.env.NODE_ENV === "development") {
            //   dbUrl = process.env.MONGO_LOCAL_URI;
            // } else if (process.env.NODE_ENV === "production") {
            //   dbUrl = process.env.MONGO_DOCKER_URI;
            // }
            log("Attempting MongoDB connection (will retry if needed)");
            mongoose_1.default.Promise = global.Promise;
            console.log(dbUrl);
            yield mongoose_1.default
                .connect(dbUrl, this.mongooseOption)
                .then(() => {
                log("MongoDB Successfully connected");
            })
                .catch((err) => {
                const retrySeconds = 5;
                log(`MongoDB connection was Unsuccessful (will retry ${++this
                    .count} after ${retrySeconds} seconds)`, { Error: err, dbUrl });
                setTimeout(this.connectWithRetry, 5000);
            });
        });
        this.connectWithRetry();
    }
    getMongoose() {
        return mongoose_1.default;
    }
}
exports.default = new MongooseService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29vc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21tb24vc2VydmljZXMvbW9uZ29vc2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFnQztBQUNoQyxrREFBMEI7QUFFMUIsTUFBTSxHQUFHLEdBQW9CLGVBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBRTNELE1BQU0sZUFBZTtJQVVuQjtRQVRRLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixtQkFBYyxHQUFHO1lBQ3ZCLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLGtCQUFrQixFQUFFLElBQUk7WUFDeEIsd0JBQXdCLEVBQUUsSUFBSTtZQUM5QixnQkFBZ0IsRUFBRSxLQUFLO1lBQ3ZCLGNBQWMsRUFBRSxJQUFJO1NBQ3JCLENBQUM7UUFTRixxQkFBZ0IsR0FBRyxHQUFTLEVBQUU7WUFDNUIsSUFBSSxLQUFLLEdBQVEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztZQUM5QyxnREFBZ0Q7WUFDaEQseUNBQXlDO1lBQ3pDLHNEQUFzRDtZQUN0RCwwQ0FBMEM7WUFDMUMsSUFBSTtZQUNKLEdBQUcsQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO1lBQzVELGtCQUFRLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNsQixNQUFNLGtCQUFRO2lCQUNYLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQztpQkFDbkMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDVCxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztZQUN4QyxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ2IsTUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QixHQUFHLENBQ0QsbURBQW1ELEVBQUUsSUFBSTtxQkFDdEQsS0FBSyxVQUFVLFlBQVksV0FBVyxFQUN6QyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQ3RCLENBQUM7Z0JBQ0YsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMxQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQSxDQUFDO1FBOUJBLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFDRCxXQUFXO1FBQ1QsT0FBTyxrQkFBUSxDQUFDO0lBQ2xCLENBQUM7Q0EyQkY7QUFFRCxrQkFBZSxJQUFJLGVBQWUsRUFBRSxDQUFDIn0=