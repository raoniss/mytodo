import { Request, Response } from "express";
import { Utilisateur } from "../model/Utilisateur";
import { client } from "../config/db";
import { ObjectID } from "bson";


export const sigin = async (req: Request, res: Response) => {
  let utilisateur = new Utilisateur(req.body.name, req.body.password);
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



export const deleteuser = async (req: Request, res: Response) => {
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

export const updateuser = (req: Request, res: Response) => {};

export const addtodo = (req: Request, res: Response) => {};

export const updatetodo = (req: Request, res: Response) => {};

export const deletetodo = (req: Request, res: Response) => {};

export const listtodo = (req: Request, res: Response) => {};
