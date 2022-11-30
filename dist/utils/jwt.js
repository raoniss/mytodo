"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAcessToken = exports.generateAcessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
require("dotenv").config();
const privateKey = {
    key: String(process.env.ACCESS_TOKEN),
    passphrase: "hello",
};
//*generation du token
const generateAcessToken = (user) => {
    const payload = user;
    const sigInOption = {
        algorithm: "RS256",
        expiresIn: "1h",
    };
    return (0, jsonwebtoken_1.sign)(payload, privateKey, sigInOption);
};
exports.generateAcessToken = generateAcessToken;
//*verification du token
const verifyAcessToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Vous devez vous authentifiés" });
    }
    else {
        let user = (0, jsonwebtoken_1.verify)(token, privateKey);
        res.status(200).json(user);
        next();
    }
};
exports.verifyAcessToken = verifyAcessToken;
