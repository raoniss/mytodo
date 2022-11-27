"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listtodo = exports.deletetodo = exports.updatetodo = exports.addtodo = exports.updateuser = exports.deleteuser = exports.login = exports.sigin = void 0;
const Utilisateur_1 = require("../model/Utilisateur");
const db_1 = require("../config/db");
const bson_1 = require("bson");
const sigin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let utilisateur = new Utilisateur_1.Utilisateur(req.body.name, req.body.password);
    try {
        let result = yield db_1.client
            .db()
            .collection("utilisateurs")
            .insertOne(utilisateur);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.sigin = sigin;
const login = (req, res) => {
    // let utilisateur = new Utilisateur(req.body.name, req.body.password);
};
exports.login = login;
const deleteuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = new bson_1.ObjectID(req.params.id);
        let result = yield db_1.client
            .db()
            .collection("utilisateurs")
            .deleteOne({ _id: id });
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.deleteuser = deleteuser;
const updateuser = (req, res) => { };
exports.updateuser = updateuser;
const addtodo = (req, res) => { };
exports.addtodo = addtodo;
const updatetodo = (req, res) => { };
exports.updatetodo = updatetodo;
const deletetodo = (req, res) => { };
exports.deletetodo = deletetodo;
const listtodo = (req, res) => { };
exports.listtodo = listtodo;
