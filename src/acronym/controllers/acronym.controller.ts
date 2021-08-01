import express from "express";
import debug from "debug";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import AcronymService from "../services/acronym.service";

const log: debug.IDebugger = debug("App:Acronym-Service");
// @ts-expect-error
const jwtSecret: string = process.env.JWT_SECRET;
const tokenExpirationInSeconds = 3600;

class AcronymController {
  async listAllAcronyms(req: express.Request, res: express.Response) {
    const acronyms = await AcronymService.list(
      req.query.from,
      req.query.limit,
      req.query.search
    );
    res.status(200).send(acronyms);
  }

  async createAcronym(req: express.Request, res: express.Response) {
    try {
      const token = jwt.sign(req.body, jwtSecret, {
        expiresIn: tokenExpirationInSeconds,
      });
      const acronym = await AcronymService.create(req.body);
      res
        .status(201)
        .send({ acronym: acronym, accessToken: token});
    } catch (error) {
      log("jwt error %0", error);
      res.status(500).send();
    }
  }

  async putAcronym(req: express.Request, res: express.Response) {
    log(await AcronymService.putAnAcronym(req.params.acronym, req.body));
    res.status(204).send();
  }

  async removeAcronym(req: express.Request, res: express.Response) {
    log(await AcronymService.removeAnAcronym(req.params.acronym));
    res.status(204).send();
  }
}

export default new AcronymController();
