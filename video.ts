import express from "express";
import * as http from "http";
import cors from "cors";

const app: express.Application = express();
const server: http.Server = http.createServer(app);

app.use(cors());

class streamVideo {
  getVideo() {}
}
