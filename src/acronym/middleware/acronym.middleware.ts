import express from "express";
import AcronymService from "../services/acronym.service";
import debug from "debug";

const log: debug.IDebugger = debug("App-Acronym-Middleware");

class AcronymMiddleware {
  async validateRequiredBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body.acronym && req.body.definition) {
      return next();
    } else {
      return res
        .status(400)
        .send({ error: "Acronym and definition are required" });
    }
  }
  async validateAcronymExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const acronym = await AcronymService.readAnAcronym(req.params.acronym);
    if (acronym) {
      res.locals.acronym = acronym;
      return next();
    } else {
      res.status(400).send({ error: "Acronym does not exist" });
    }
  }
  async validateAcronymDoNotExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const acronym = await AcronymService.readAnAcronym(req.body.acronym);
    if (acronym) {
      return res.status(400).send({ error: "Acronym already exist" });
    } else {
      res.locals.acronym = acronym;
      return next();
    }
  }
  async getAcronymId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.id;
    next();
  }
}
export default new AcronymMiddleware();
