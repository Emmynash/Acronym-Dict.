import express from "express";
import AcronymMiddleware from "./middleware/acronym.middleware";
import AcronymController from "./controllers/acronym.controller";
import JwtMiddleware from "../auth/middleware/jwt.middleware";
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
        AcronymMiddleware.validateBodyFields,
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
      .put(AcronymMiddleware.validateBodyFields, AcronymController.putAcronym);
    this.app.route("/acronym/:acronym").delete(AcronymController.removeAcronym);

    return this.app;
  }
}
