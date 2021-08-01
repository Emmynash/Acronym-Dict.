import express from "express";
import { body } from "express-validator";
import AcronymMiddleware from "./middleware/acronym.middleware";
import AcronymController from "./controllers/acronym.controller";
import JwtMiddleware from "../auth/middleware/jwt.middleware";
import AuthController from "../auth/controller/auth.controller";
import { CommonRouteConfig } from "../common/common.route.config";

export class AcronymRoutes extends CommonRouteConfig {
  constructor(app: express.Application) {
    super(app, "AcronymRoutes");
  }

  configureRoute() {
    this.app
      .route("/acronym")
      .get(AcronymController.listAllAcronyms)
      .post(
        body("acronym").isString(),
        body("definition").isString(),
        AcronymMiddleware.validateRequiredBodyFields,
        AcronymMiddleware.validateAcronymDoNotExist,
        AcronymController.createAcronym
      );
    this.app.param("acronymId", AcronymMiddleware.getAcronymId);
    this.app
      .route("/acronym/:acronym")
      .all(
        AcronymMiddleware.validateAcronymExist,
        JwtMiddleware.validJwtNeeded
      );
    this.app
      .route("/acronym/:acronym")
      .put(
        body("acronym").isString(),
        body("definition").isString(),
        AcronymMiddleware.validateRequiredBodyFields,
        AcronymController.putAcronym
      );
    this.app.route("/acronym/:acronym").delete(AcronymController.removeAcronym);

    return this.app;
  }
}
