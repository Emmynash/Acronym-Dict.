"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcronymRoutes = void 0;
const express_validator_1 = require("express-validator");
const acronym_middleware_1 = __importDefault(require("./middleware/acronym.middleware"));
const acronym_controller_1 = __importDefault(require("./controllers/acronym.controller"));
const jwt_middleware_1 = __importDefault(require("../auth/middleware/jwt.middleware"));
const common_route_config_1 = require("../common/common.route.config");
class AcronymRoutes extends common_route_config_1.CommonRouteConfig {
    constructor(app) {
        super(app, "AcronymRoutes");
    }
    configureRoute() {
        this.app
            .route("/acronym")
            .get(acronym_controller_1.default.listAllAcronyms)
            .post(express_validator_1.body("acronym").isString(), express_validator_1.body("definition").isString(), acronym_middleware_1.default.validateRequiredBodyFields, acronym_middleware_1.default.validateAcronymDoNotExist, acronym_controller_1.default.createAcronym);
        this.app.param("acronymId", acronym_middleware_1.default.getAcronymId);
        this.app
            .route("/acronym/:acronym")
            .all(acronym_middleware_1.default.validateAcronymExist, jwt_middleware_1.default.validJwtNeeded);
        this.app
            .route("/acronym/:acronym")
            .put(express_validator_1.body("acronym").isString(), express_validator_1.body("definition").isString(), acronym_middleware_1.default.validateRequiredBodyFields, acronym_controller_1.default.putAcronym);
        this.app.route("/acronym/:acronym").delete(acronym_controller_1.default.removeAcronym);
        return this.app;
    }
}
exports.AcronymRoutes = AcronymRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNyb255bS5yb3V0ZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYWNyb255bS9hY3JvbnltLnJvdXRlLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSx5REFBeUM7QUFDekMseUZBQWdFO0FBQ2hFLDBGQUFpRTtBQUNqRSx1RkFBOEQ7QUFFOUQsdUVBQWtFO0FBRWxFLE1BQWEsYUFBYyxTQUFRLHVDQUFpQjtJQUNsRCxZQUFZLEdBQXdCO1FBQ2xDLEtBQUssQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsR0FBRzthQUNMLEtBQUssQ0FBQyxVQUFVLENBQUM7YUFDakIsR0FBRyxDQUFDLDRCQUFpQixDQUFDLGVBQWUsQ0FBQzthQUN0QyxJQUFJLENBQ0gsd0JBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFDMUIsd0JBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFDN0IsNEJBQWlCLENBQUMsMEJBQTBCLEVBQzVDLDRCQUFpQixDQUFDLHlCQUF5QixFQUMzQyw0QkFBaUIsQ0FBQyxhQUFhLENBQ2hDLENBQUM7UUFDSixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsNEJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLEdBQUc7YUFDTCxLQUFLLENBQUMsbUJBQW1CLENBQUM7YUFDMUIsR0FBRyxDQUNGLDRCQUFpQixDQUFDLG9CQUFvQixFQUN0Qyx3QkFBYSxDQUFDLGNBQWMsQ0FDN0IsQ0FBQztRQUNKLElBQUksQ0FBQyxHQUFHO2FBQ0wsS0FBSyxDQUFDLG1CQUFtQixDQUFDO2FBQzFCLEdBQUcsQ0FDRix3QkFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUMxQix3QkFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUM3Qiw0QkFBaUIsQ0FBQywwQkFBMEIsRUFDNUMsNEJBQWlCLENBQUMsVUFBVSxDQUM3QixDQUFDO1FBQ0osSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxNQUFNLENBQUMsNEJBQWlCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFNUUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7Q0FDRjtBQW5DRCxzQ0FtQ0MifQ==