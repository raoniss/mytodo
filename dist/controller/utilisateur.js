"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.listtodo = exports.deletetodo = exports.updatetodo = exports.addtodo = exports.updateuser = exports.deleted = exports.sigin = exports.sigup = void 0;
const Utilisateur_1 = require("../model/Utilisateur");
const db_1 = require("../config/db");
const bson_1 = require("bson");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("../utils/jwt");
const saltRounds = 10;
//*creation d'un compte utilisateur
const sigup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let utilisateur = new Utilisateur_1.Utilisateur(req.body.name, yield bcrypt.hash(req.body.password, saltRounds));
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
exports.sigup = sigup;
//*connexion d'un compte utilisateur
const sigin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const result = yield db_1.client
        .db()
        .collection("utilisateurs")
        .find({ nom: username })
        .limit(1);
    if (!result) {
        res.json({ message: "Utilisateur n'existe pas" });
    }
    else if (!bcrypt.compare(password, result.motdepasse)) {
        res.json({ message: "Mot de passe incorrect" });
    }
    else {
        const user = (0, jwt_1.generateAcessToken)(result);
        res.json(user);
    }
});
exports.sigin = sigin;
//*suppression d'un compte utilisateur
const deleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.deleted = deleted;
const updateuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = new bson_1.ObjectID(req.params.id);
    let utilisateur = req.body;
    try {
        let result = yield db_1.client
            .db()
            .collection("utilisateurs")
            .update({ _id: id }, { $set: utilisateur });
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.updateuser = updateuser;
const addtodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = new bson_1.ObjectID(req.params.id);
        const todo = req.body.todo;
        let result = yield db_1.client
            .db()
            .collection("utilisateurs")
            .update({ _id: id }, { $push: { todo: { $each: todo } } });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.addtodo = addtodo;
const updatetodo = (req, res) => { };
exports.updatetodo = updatetodo;
const deletetodo = (req, res) => { };
exports.deletetodo = deletetodo;
const listtodo = (req, res) => { };
exports.listtodo = listtodo;
