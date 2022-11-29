"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
require('dotenv').config();
//Used middleware
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send(process.env.ACCESS_TOKEN);
});
(0, db_1.connect)("mongodb+srv://aniss:KwgdWLslzHlqzypG@clusterniss.dzoumty.mongodb.net/?retryWrites=true&w=majority", (err) => {
    if (err) {
        console.log("Erreur lors de la connexion à la base de données");
        process.exit(-1);
    }
    else {
        console.log("Connexion à la base de données établie");
        app.listen(port, () => {
            console.log(`L'attente de requetes au port ${port}`);
        });
    }
});
