import { Request, Response } from "express";
import { Utilisateur } from "../model/Utilisateur";
import { client } from "../config/db";
import { ObjectID } from "bson";
import * as bcrypt from "bcrypt";
import { generateAcessToken } from "../utils/jwt";

const saltRounds = 10;

//*creation d'un compte utilisateur
export const sigup = async (req: Request, res: Response) => {
  let utilisateur = new Utilisateur(
    req.body.name,
    await bcrypt.hash(req.body.password, saltRounds)
  );
  try {
    let result = await client
      .db()
      .collection("utilisateurs")
      .insertOne(utilisateur);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

//*connexion d'un compte utilisateur
export const sigin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const result = await client
    .db()
    .collection("utilisateurs")
    .find({ nom: username })
    .limit(1);
  if (!result) {
    res.json({ message: "Utilisateur n'existe pas" });
  } else if (!bcrypt.compare(password, result.motdepasse)) {
    res.json({ message: "Mot de passe incorrect" });
  } else {
    const user = generateAcessToken(result);
    res.json(user);
  }
};

//*suppression d'un compte utilisateur
export const deleted = async (req: Request, res: Response) => {
  try {
    let id = new ObjectID(req.params.id);
    let result = await client
      .db()
      .collection("utilisateurs")
      .deleteOne({ _id: id });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateuser = async (req: Request, res: Response) => {
  let id = new ObjectID(req.params.id);
  let utilisateur = req.body
  try {
    let result = await client
      .db()
      .collection("utilisateurs")
      .update({ _id: id }, { $set : utilisateur })
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addtodo = async (req: Request, res: Response) => {
  try {
    let id = new ObjectID(req.params.id);
    const todo = req.body.todo;
    let result = await client
      .db()
      .collection("utilisateurs")
      .update({ _id: id }, { $push: { todo: { $each: todo } } });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updatetodo = (req: Request, res: Response) => {};

export const deletetodo = (req: Request, res: Response) => {};

export const listtodo = (req: Request, res: Response) => {};
