"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcronymRoutes = void 0;
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
            .post(acronym_middleware_1.default.validateBodyFields, acronym_middleware_1.default.validateAcronymDoNotExist, acronym_controller_1.default.createAcronym);
        this.app.param("acronymId", acronym_middleware_1.default.getAcronymId);
        this.app
            .route("/acronym/:acronym")
            .all(acronym_middleware_1.default.validateAcronymExist, jwt_middleware_1.default.validJwtNeeded);
        this.app
            .route("/acronym/:acronym")
            .put(acronym_middleware_1.default.validateBodyFields, acronym_controller_1.default.putAcronym);
        this.app.route("/acronym/:acronym").delete(acronym_controller_1.default.removeAcronym);
        return this.app;
    }
}
exports.AcronymRoutes = AcronymRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNyb255bS5yb3V0ZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYWNyb255bS9hY3JvbnltLnJvdXRlLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSx5RkFBZ0U7QUFDaEUsMEZBQWlFO0FBQ2pFLHVGQUE4RDtBQUM5RCx1RUFBa0U7QUFFbEUsTUFBYSxhQUFjLFNBQVEsdUNBQWlCO0lBQ2xELFlBQVksR0FBd0I7UUFDbEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsY0FBYztRQUNaLElBQUksQ0FBQyxHQUFHO2FBQ0wsS0FBSyxDQUFDLFVBQVUsQ0FBQzthQUNqQixHQUFHLENBQUMsNEJBQWlCLENBQUMsZUFBZSxDQUFDO2FBQ3RDLElBQUksQ0FDSCw0QkFBaUIsQ0FBQyxrQkFBa0IsRUFDcEMsNEJBQWlCLENBQUMseUJBQXlCLEVBQzNDLDRCQUFpQixDQUFDLGFBQWEsQ0FDaEMsQ0FBQztRQUNKLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSw0QkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsR0FBRzthQUNMLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQzthQUMxQixHQUFHLENBQ0YsNEJBQWlCLENBQUMsb0JBQW9CLEVBQ3RDLHdCQUFhLENBQUMsY0FBYyxDQUM3QixDQUFDO1FBQ0osSUFBSSxDQUFDLEdBQUc7YUFDTCxLQUFLLENBQUMsbUJBQW1CLENBQUM7YUFDMUIsR0FBRyxDQUNGLDRCQUFpQixDQUFDLGtCQUFrQixFQUNwQyw0QkFBaUIsQ0FBQyxVQUFVLENBQzdCLENBQUM7UUFDSixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyw0QkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU1RSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztDQUNGO0FBL0JELHNDQStCQyJ9