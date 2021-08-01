import "dotenv/config";
import express from "express";
import * as http from "http";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import debug from "debug";
import cors from "cors";
import helmet from "helmet";
import { CommonRouteConfig } from "./src/common/common.route.config";
import { AcronymRoutes } from "./src/acronym/acronym.route.config";

const app: express.Application = express();
const log: debug.IDebugger = debug("app");
const server: http.Server = http.createServer(app);
const routes: Array<CommonRouteConfig> = [];

const port = process.env.NODE_LOCAL_PORT;

app.use(helmet());
app.use(cors());
app.use(express.json());

const loggerOption: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOption.meta = false;
  if (typeof global.it === "function") {
    loggerOption.level = "http";
  }
}

app.use(expressWinston.logger(loggerOption));

const runningMsg = `app running at http://localhost:${port}`;
routes.push(new AcronymRoutes(app));

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMsg);
});

export default server.listen(port, () => {
  routes.forEach((route: CommonRouteConfig) => {
    log(`Route configure for ${route.getName()}`);
  });
  console.log(runningMsg);
});
