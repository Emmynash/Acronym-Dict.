import express from "express";
import jwt from "jsonwebtoken";
import { JWT } from "../../common/types/jwt.type";

// @ts-expect-error
const jwtSecret: string = process.env.JWT_SECRET;

class JwtMiddleware {
  async validJwtNeeded(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.headers["authorization"]) {
      const token = req.headers["authorization"].split(" ");
      try {
        if (token[0] === "Bearer") {
          res.locals.jwt = jwt.verify(token[1], jwtSecret) as JWT;
          return next();
        } else {
          return res.status(401).send();
        }
      } catch (error) {
        res.status(403).send();
      }
    } else {
      res.status(401).send();
    }
  }
}

export default new JwtMiddleware();
