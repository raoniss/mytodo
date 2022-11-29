import { Utilisateur } from "../model/Utilisateur";
import { Secret, sign, SignOptions } from "jsonwebtoken";
require("dotenv").config();

const generateAcessToken = (user: Utilisateur) => {
  const payload = user;
  const privateKey: Secret = {
    key: String(process.env.ACCESS_TOKEN),
    passphrase: "hello",
  };

  const sigInOption: SignOptions = {
    algorithm: "RS256",
    expiresIn: "1h",
  };

  return sign(payload, privateKey, sigInOption);
};