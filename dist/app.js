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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlCQUF1QjtBQUN2QixzREFBOEI7QUFDOUIsMkNBQTZCO0FBQzdCLGlEQUFtQztBQUNuQyxnRUFBa0Q7QUFDbEQsa0RBQTBCO0FBQzFCLGdEQUF3QjtBQUN4QixvREFBNEI7QUFFNUIsNkVBQW1FO0FBRW5FLE1BQU0sR0FBRyxHQUF3QixpQkFBTyxFQUFFLENBQUM7QUFDM0MsTUFBTSxHQUFHLEdBQW9CLGVBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQyxNQUFNLE1BQU0sR0FBZ0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNuRCxNQUFNLE1BQU0sR0FBNkIsRUFBRSxDQUFDO0FBRTVDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO0FBRXpDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQU0sRUFBRSxDQUFDLENBQUM7QUFDbEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBRXhCLE1BQU0sWUFBWSxHQUFpQztJQUNqRCxVQUFVLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDOUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUM1QixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUNyQixPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUM1QixPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUN2QztDQUNGLENBQUM7QUFFRixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUU7SUFDdEIsWUFBWSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7SUFDMUIsSUFBSSxPQUFPLE1BQU0sQ0FBQyxFQUFFLEtBQUssVUFBVSxFQUFFO1FBQ25DLFlBQVksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0tBQzdCO0NBQ0Y7QUFFRCxHQUFHLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztBQUU3QyxNQUFNLFVBQVUsR0FBRyxtQ0FBbUMsSUFBSSxFQUFFLENBQUM7QUFDN0QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLG9DQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUVwQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxFQUFFO0lBQzNELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ25DLENBQUMsQ0FBQyxDQUFDO0FBRUgsa0JBQWUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO0lBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUF3QixFQUFFLEVBQUU7UUFDMUMsR0FBRyxDQUFDLHVCQUF1QixLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMxQixDQUFDLENBQUMsQ0FBQyJ9