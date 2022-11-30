import { NextFunction, Request, Response } from "express";
import { client } from "../config/db";
import * as bcrypt  from 'bcrypt';
import { generateAcessToken } from '../utils/jwt';

export const sigin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  const result = await client
    .db()
    .collection("utilisateurs")
    .find({ nom: username })
    .limit(1);
  if (!result) {
    res.json({ message: "Utilisateur n'existe pas" });
  }else if (!bcrypt.compare(password, result.motdepasse)) {
    res.json({ message: "Mot de passe incorrect" });
  }else{
    const user =generateAcessToken(result)
    res.json(user)
  }
};
