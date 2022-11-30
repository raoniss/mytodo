import { Utilisateur } from "../model/Utilisateur";
import { Secret, sign, SignOptions, verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
require("dotenv").config();

const privateKey: Secret = {
  key: String(process.env.ACCESS_TOKEN),
  passphrase: "hello",
};

//*generation du token
export const generateAcessToken = (user: Utilisateur) => {
  const payload = user;

  const sigInOption: SignOptions = {
    algorithm: "RS256",
    expiresIn: "1h",
  };

  return sign(payload, privateKey, sigInOption);
};


//*verification du token
export const verifyAcessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message : "Vous devez vous authentifiés"});
  } else {
    let user = verify(token, privateKey);
    res.status(200).json(user);
    next();
  }
};
