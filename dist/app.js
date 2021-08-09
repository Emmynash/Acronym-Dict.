"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const winston = __importStar(require("winston"));
const expressWinston = __importStar(require("express-winston"));
const debug_1 = __importDefault(require("debug"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const acronym_route_config_1 = require("./src/acronym/acronym.route.config");
const acronym_dao_1 = __importDefault(require("./src/acronym/dao/acronym.dao"));
acronym_dao_1.default.bulkWriteAcronym();
const app = express_1.default();
const log = debug_1.default("app");
const server = http.createServer(app);
const routes = [];
const port = process.env.NODE_LOCAL_PORT;
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(express_1.default.json());
const loggerOption = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.json(), winston.format.prettyPrint(), winston.format.colorize({ all: true })),
};
if (!process.env.DEBUG) {
    loggerOption.meta = false;
    if (typeof global.it === "function") {
        loggerOption.level = "http";
    }
}
app.use(expressWinston.logger(loggerOption));
const runningMsg = `app running at http://localhost:${port}`;
routes.push(new acronym_route_config_1.AcronymRoutes(app));
app.get("/", (req, res) => {
    res.status(200).send(runningMsg);
});
exports.default = server.listen(port, () => {
    routes.forEach((route) => {
        log(`Route configure for ${route.getName()}`);
    });
    console.log(runningMsg);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlCQUF1QjtBQUN2QixzREFBOEI7QUFDOUIsMkNBQTZCO0FBQzdCLGlEQUFtQztBQUNuQyxnRUFBa0Q7QUFDbEQsa0RBQTBCO0FBQzFCLGdEQUF3QjtBQUN4QixvREFBNEI7QUFFNUIsNkVBQW1FO0FBQ25FLGdGQUF1RDtBQUV2RCxxQkFBVSxDQUFDLGdCQUFnQixFQUFFLENBQUM7QUFFOUIsTUFBTSxHQUFHLEdBQXdCLGlCQUFPLEVBQUUsQ0FBQztBQUMzQyxNQUFNLEdBQUcsR0FBb0IsZUFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFDLE1BQU0sTUFBTSxHQUFnQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ25ELE1BQU0sTUFBTSxHQUE2QixFQUFFLENBQUM7QUFFNUMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7QUFFekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBTSxFQUFFLENBQUMsQ0FBQztBQUNsQixHQUFHLENBQUMsR0FBRyxDQUFDLGNBQUksRUFBRSxDQUFDLENBQUM7QUFDaEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFFeEIsTUFBTSxZQUFZLEdBQWlDO0lBQ2pELFVBQVUsRUFBRSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM5QyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQzVCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQ3JCLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQzVCLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQ3ZDO0NBQ0YsQ0FBQztBQUVGLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRTtJQUN0QixZQUFZLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUMxQixJQUFJLE9BQU8sTUFBTSxDQUFDLEVBQUUsS0FBSyxVQUFVLEVBQUU7UUFDbkMsWUFBWSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7S0FDN0I7Q0FDRjtBQUVELEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0FBRTdDLE1BQU0sVUFBVSxHQUFHLG1DQUFtQyxJQUFJLEVBQUUsQ0FBQztBQUM3RCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksb0NBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBRXBDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLEVBQUU7SUFDM0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbkMsQ0FBQyxDQUFDLENBQUM7QUFFSCxrQkFBZSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7SUFDdEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQXdCLEVBQUUsRUFBRTtRQUMxQyxHQUFHLENBQUMsdUJBQXVCLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDaEQsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzFCLENBQUMsQ0FBQyxDQUFDIn0=