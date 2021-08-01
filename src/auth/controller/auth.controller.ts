import express from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import debug from "debug";

const log: debug.IDebugger = debug("App:Auth-Controller");

// /@ts-expect-error
const jwtSecret: string = "jwtS3cr3twh@ts03v3r";
const tokenExpirationInSeconds = 3600;

class AuthController {
  async createJwt(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      console.log(jwtSecret);
      const refreshId = req.body.acronym + jwtSecret;
      const salt = crypto.createSecretKey(crypto.randomBytes(16));
      const hash = crypto
        .createHmac("sha512", salt)
        .update(refreshId)
        .digest("base64");
      req.body.refreshKey = salt.export;
      const token = jwt.sign(req.body, jwtSecret, {
        expiresIn: tokenExpirationInSeconds,
      });
      res.status(201).write(token);
      return next();
    } catch (error) {
      log("jwt error %0", error);
      res.status(500).send();
    }
  }
}

export default new AuthController();
