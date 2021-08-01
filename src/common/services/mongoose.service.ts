import mongoose from "mongoose";
import debug from "debug";

const log: debug.IDebugger = debug("App:Mongoose-Service");

class MongooseService {
  private count = 0;
  private mongooseOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 8000,
    useFindAndModify: false,
    useCreateIndex: true,
  };

  constructor() {
    this.connectWithRetry();
  }
  getMongoose() {
    return mongoose;
  }

  connectWithRetry = async () => {
    let dbUrl: any = process.env.MONGO_DOCKER_URI;
    // if (process.env.NODE_ENV === "development") {
    //   dbUrl = process.env.MONGO_LOCAL_URI;
    // } else if (process.env.NODE_ENV === "production") {
    //   dbUrl = process.env.MONGO_DOCKER_URI;
    // }
    log("Attempting MongoDB connection (will retry if needed)");
    mongoose.Promise = global.Promise;
    console.log(dbUrl)
    await mongoose
      .connect(dbUrl, this.mongooseOption)
      .then(() => {
        log("MongoDB Successfully connected");
      })
      .catch((err) => {
        const retrySeconds = 5;
        log(
          `MongoDB connection was Unsuccessful (will retry ${++this
            .count} after ${retrySeconds} seconds)`,
          { Error: err, dbUrl }
        );
        setTimeout(this.connectWithRetry, 5000);
      });
  };
}

export default new MongooseService();
